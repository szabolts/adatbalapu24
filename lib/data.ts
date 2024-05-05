import oracledb from "oracledb";
import {
  User,
  Kep,
  Kategoria,
  KategoriaEsElsoKep,
  TopLiked,
  TopUsersByUpload,
  TopUsersByReact,
  AvgLikesByCategories,
  KepKategoriak,
} from "./types";
import { auth } from "@/auth";
import { getConnection } from "@/lib/db";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "aesdeaesde123";

export async function fetchUsers() {
  const connection = await getConnection();

  const result = await connection.execute(
    `SELECT *
         FROM FELHASZNALO`,
    [] // bind value for :id
  );

  // console.log(result.rows);
  await connection.close();
  return result.rows as User[];
}

export async function fetchUserByEmail() {
  const session = await auth();
  const email = session?.user?.email;

  try {
    const connection = await getConnection();

    const result = await connection.execute(
      `SELECT *
         FROM FELHASZNALO
         WHERE EMAIL = :email`,
      [email]
    );

    // console.log(result.rows);
    await connection.close();
    return result.rows as User[];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function fetchUserById(id: string) {
  const connection = await getConnection();

  const result = await connection.execute(
    `SELECT *
         FROM FELHASZNALO
         WHERE FelhasznaloID = :id`,
    [id]
  );

  // console.log(result.rows);
  await connection.close();
  return result.rows as User[];
}

export async function fetchKepek() {
  const connection = await getConnection();

  const result = await connection.execute(
    `SELECT DISTINCT KEP.*, FELHASZNALO.Felhasznalonev
    FROM KEP
    JOIN FELHASZNALO ON KEP.FELHASZNALOID = FELHASZNALO.FelhasznaloID
    JOIN KATEGORIAJA ON KEP.KEPID = KATEGORIAJA.KEPID
    JOIN KATEGORIA ON KATEGORIAJA.KATEGORIAID = KATEGORIA.KATEGORIAID
    ORDER BY KEP.KEPID DESC`,
    []
  );

  await connection.close();

  return result.rows as Kep[];
}

export async function fetchKepekByKategoria(id: number) {
  const connection = await getConnection();

  const result = await connection.execute(
    `SELECT 
      k.KepID,
      k.Cim,
      k.Feltoltes_datum,
      k.Fajl_eleresi_utvonal,
      k.Prompt,
      k.FelhasznaloID
    FROM 
      Kep k
    INNER JOIN 
      Kategoriaja ka ON k.KepID = ka.KepID
    WHERE 
      ka.KategoriaID = :id`,
    [id]
  );

  await connection.close();

  return result.rows;
}

export async function fetchKategoria(id: number) {
  const connection = await getConnection();

  const result = await connection.execute(
    `SELECT * FROM KATEGORIA WHERE KATEGORIAID = :id`,
    [id]
  );

  await connection.close();

  return result.rows as Kategoria[];
}

export async function fetchCategories() {
  const connection = await getConnection();

  const result = await connection.execute(
    `SELECT 
        kat.KategoriaID,
        kat.Nev AS KategoriaNev,
        kat.Leiras AS KategoriaLeiras,
        kep.Fajl_eleresi_utvonal AS ElsoKepEleresiUt
    FROM 
        Kategoria kat
    INNER JOIN (
    SELECT 
        ka.KategoriaID,
        k.Fajl_eleresi_utvonal,
        ROW_NUMBER() OVER (PARTITION BY ka.KategoriaID ORDER BY k.Feltoltes_datum) AS rn
    FROM 
        Kep k
    INNER JOIN 
        Kategoriaja ka ON k.KepID = ka.KepID
    ) kep ON kat.KategoriaID = kep.KategoriaID AND kep.rn = 1`,
    []
  );

  await connection.close();
  // console.log("Categories: ", result.rows);
  return result.rows as KategoriaEsElsoKep[];
}

export async function fetchKepekById(id: string) {
  console.log("iiiiiddeeee: ", id);
  const connection = await getConnection();

  const result = await connection.execute(
    `SELECT KEP.*, FELHASZNALO.FELHASZNALONEV, KATEGORIA.NEV AS KATEGORIA_NEV
     FROM KEP
     INNER JOIN FELHASZNALO ON KEP.FelhasznaloID = FELHASZNALO.FelhasznaloID
     INNER JOIN KATEGORIAJA ON KEP.KepID = KATEGORIAJA.KepID
     INNER JOIN KATEGORIA ON KATEGORIAJA.KategoriaID = KATEGORIA.KategoriaID
     WHERE KEP.KepID = :id`,
    [id]
  );
  // console.log(result.rows);
  await connection.close();

  return result.rows as Kep[];
}

export const getAdminByEmail = async (email: string) => {
  const connection = await getConnection();

  try {
    const user = await connection.execute(
      `SELECT * 
            FROM FELHASZNALO
            WHERE email = :email
            AND Role = 'admin'`,
      [email]
    );
    await connection.close();
    return user.rows;
  } catch {
    return null;
  }
};

export async function getLikesByID(id: number) {
  try {
    const connection = await getConnection();

    const likes = await connection.execute(
      `SELECT kepID, COUNT(*) AS likeok_szama
       FROM KepetLikeol
       WHERE kepID = :id
       GROUP BY kepID`,
      [id]
    );

    if (!likes) {
      return 0;
    }

    await connection.close();
    // console.log("LIKES: ", likes.rows);
    return likes.rows;
  } catch (error) {
    console.error(error);
    return { error: "error fetching likes" };
  }
}

export async function fetchCommentsByID(id: number) {
  try {
    const connection = await getConnection();

    const comments = await connection.execute(
      `SELECT KOMMENT.*, FELHASZNALO.Felhasznalonev
     FROM KOMMENT
     INNER JOIN FELHASZNALO ON KOMMENT.FelhasznaloID = FELHASZNALO.FelhasznaloID
     WHERE KepID = :id
     ORDER BY DATUM`,
      [id]
    );

    await connection.close();
    // console.log("Comments: ", comments.rows);
    return comments.rows;
  } catch (error) {
    console.error(error);
    return { error: "error fetching likes" };
  }
}

export async function getKategoriak() {
  try {
    const connection = await getConnection();

    const kategoriak = await connection.execute(`SELECT * FROM KATEGORIA`);

    await connection.close();
    // console.log("Kategoriak: ", kategoriak.rows);
    return kategoriak.rows as Kategoria[];
  } catch (error) {
    console.error("Failed to fetch category:", error);
    throw new Error("Failed to fetch category.");
  }
}

export async function getKategoriakByKepId(kepId: number) {
  try {
    const connection = await getConnection();

    const kategoriak = await connection.execute(
      `SELECT KATEGORIA.* FROM KATEGORIA
       INNER JOIN KATEGORIAJA ON KATEGORIA.KATEGORIAID = KATEGORIAJA.KATEGORIAID
       WHERE KATEGORIAJA.KEPID = :kepId`,
      [kepId]
    );

    await connection.close();
    // console.log("Kategoriak by KepId: ", kategoriak.rows);
    return kategoriak.rows as KepKategoriak[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch categories by picture ID.");
  }
}

export async function getKommentLikeById(commentId: number) {
  try {
    const connection = await getConnection();

    const likes = await connection.execute(
      `SELECT COUNT(*) AS likeok_szama
       FROM KOMMENTETLIKEOL
       WHERE KOMMENTID = :commentId`,
      [commentId]
    );

    await connection.close();
    console.log("Komment likes: ", likes.rows);
    return likes.rows;
  } catch (error) {
    console.error(error);
    return { error: "error fetching comment likes" };
  }
}

export async function getTopLikedPictures() {
  try {
    const connection = await getConnection();

    const topLikedPictures = await connection.execute(
      `SELECT 
        k.KepID,
        k.Cim,
        k.Fajl_eleresi_utvonal,
        f.Felhasznalonev,
        COUNT(kl.FelhasznaloID) AS Likeok_szama
      FROM 
        Kep k
      JOIN 
        Felhasznalo f ON k.FelhasznaloID = f.FelhasznaloID
      LEFT JOIN 
        KepetLikeol kl ON k.KepID = kl.KepID
      GROUP BY 
        k.KepID, k.Cim, k.Fajl_eleresi_utvonal, f.Felhasznalonev
      ORDER BY 
        Likeok_szama DESC
      FETCH FIRST 8 ROWS ONLY`,
      []
    );

    await connection.close();
    // console.log("Top liked pictures: ", topLikedPictures.rows);
    return topLikedPictures.rows as TopLiked[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch top liked pictures.");
  }
}

export async function getTopUsersUpload() {
  try {
    const connection = await getConnection();

    const topUsers = await connection.execute(
      `SELECT 
        f.FelhasznaloID,
        f.Felhasznalonev,
        COUNT(k.KepID) AS Feltoltott_kepek_szama
      FROM 
        Felhasznalo f
      LEFT JOIN 
        Kep k ON f.FelhasznaloID = k.FelhasznaloID
      GROUP BY 
        f.FelhasznaloID, f.Felhasznalonev
      ORDER BY 
        Feltoltott_kepek_szama DESC
      FETCH FIRST 10 ROWS ONLY`,
      []
    );

    await connection.close();
    // console.log("Top liked pictures: ", topLikedPictures.rows);
    return topUsers.rows as TopUsersByUpload[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch top liked pictures.");
  }
}

export async function getTopUsersByReaction() {
  try {
    const connection = await getConnection();

    const topUsersReact = await connection.execute(
      `SELECT 
        f.FelhasznaloID,
        f.Felhasznalonev,
        COALESCE(SUM(kl.Likeok_szama), 0) AS Likeok_szama,
        COALESCE(SUM(ko.Kommentek_szama), 0) AS Kommentek_szama,
        COALESCE(SUM(kl.Likeok_szama), 0) + COALESCE(SUM(ko.Kommentek_szama), 0) AS Osszes_reakcio_szama
      FROM 
        Felhasznalo f
      LEFT JOIN 
          (SELECT 
              FelhasznaloID,
              COUNT(*) AS Likeok_szama
          FROM 
              KepetLikeol
          GROUP BY 
              FelhasznaloID) kl ON f.FelhasznaloID = kl.FelhasznaloID
      LEFT JOIN 
          (SELECT 
              FelhasznaloID,
              COUNT(*) AS Kommentek_szama
          FROM 
              Komment
          GROUP BY 
              FelhasznaloID) ko ON f.FelhasznaloID = ko.FelhasznaloID
      GROUP BY 
        f.FelhasznaloID, f.Felhasznalonev
      ORDER BY 
        Osszes_reakcio_szama DESC
      FETCH FIRST 10 ROWS ONLY`,
      []
    );

    await connection.close();
    // console.log("Top liked pictures: ", topLikedPictures.rows);
    return topUsersReact.rows as TopUsersByReact[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch top liked pictures.");
  }
}

export async function getAvgLikesByCategories() {
  try {
    const connection = await getConnection();

    const avgLikesByCategories = await connection.execute(
      `SELECT 
        kategoria.Nev AS Kategoria_nev,
        AVG(COALESCE(kl.Likeok_szama, 0)) AS Atlagos_likeok_szama
      FROM 
        Kategoria kategoria
      LEFT JOIN 
        (SELECT 
            k.KepID,
            COUNT(kl.FelhasznaloID) AS Likeok_szama
        FROM 
            Kep k
        LEFT JOIN 
            KepetLikeol kl ON k.KepID = kl.KepID
        GROUP BY 
            k.KepID) kl ON kategoria.KategoriaID = kl.KepID
      GROUP BY 
        kategoria.Nev`,
      []
    );

    await connection.close();
    // console.log("Top liked pictures: ", topLikedPictures.rows);
    return avgLikesByCategories.rows as AvgLikesByCategories[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch top liked pictures.");
  }
}

export async function getAvgPicByCategory() {
  try {
    const connection = await getConnection();

    const avgPicByCategory = await connection.execute(
      `SELECT 
        AVG(Kep_szama) AS Atlagos_kepek_szama
      FROM 
        (SELECT 
            COUNT(*) AS Kep_szama
        FROM 
            Kep k
        JOIN 
            Kategoriaja kj ON k.KepID = kj.KepID
        GROUP BY 
            kj.KategoriaID) kategoriakepek`,
      []
    );

    await connection.close();
    // console.log("Top liked pictures: ", topLikedPictures.rows);
    return avgPicByCategory.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch top liked pictures.");
  }
}

export async function getAbsoluteActivity() {
  try {
    const connection = await getConnection();

    const absoluteActivity = await connection.execute(
      `SELECT f.FelhasznaloID, f.Felhasznalonev, 
        COALESCE(kl.KepLikeSzam, 0) AS KepLikeSzam, 
        COALESCE(koml.KommentLikeSzam, 0) AS KommentLikeSzam,
        COALESCE(k.KommentSzam, 0) AS KommentSzam,
        COALESCE(kep.FeltoltottKepSzam, 0) AS FeltoltottKepSzam,
        (COALESCE(kl.KepLikeSzam, 0) + COALESCE(koml.KommentLikeSzam, 0) + COALESCE(k.KommentSzam, 0) + COALESCE(kep.FeltoltottKepSzam, 0)) AS Aktivitas
      FROM Felhasznalo f
      LEFT JOIN (
        SELECT FelhasznaloID, COUNT(*) AS KepLikeSzam
        FROM KepetLikeol
        GROUP BY FelhasznaloID
      ) kl ON f.FelhasznaloID = kl.FelhasznaloID
      LEFT JOIN (
        SELECT FelhasznaloID, COUNT(*) AS KommentLikeSzam
        FROM KommentetLikeol
        GROUP BY FelhasznaloID
      ) koml ON f.FelhasznaloID = koml.FelhasznaloID
      LEFT JOIN (
        SELECT FelhasznaloID, COUNT(*) AS KommentSzam
        FROM Komment
        GROUP BY FelhasznaloID
      ) k ON f.FelhasznaloID = k.FelhasznaloID
      LEFT JOIN (
        SELECT FelhasznaloID, COUNT(*) AS FeltoltottKepSzam
        FROM Kep
        GROUP BY FelhasznaloID
      ) kep ON f.FelhasznaloID = kep.FelhasznaloID
      ORDER BY Aktivitas DESC
      FETCH FIRST 8 ROW ONLY`,
      []
    );

    await connection.close();
    // console.log("Top liked pictures: ", topLikedPictures.rows);
    return absoluteActivity.rows as TopUsersByReact[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch top liked pictures.");
  }
}

export async function getBasicStats() {
  try {
    const connection = await getConnection();

    const basicStats = await connection.execute(
      `SELECT
          (SELECT COUNT(*) FROM Kep) AS KepSzam,
          (SELECT COUNT(*) FROM Kategoria) AS KategoriaSzam,
          (SELECT COUNT(*) FROM Felhasznalo) AS FelhasznaloSzam
      FROM dual`,
      []
    );

    await connection.close();
    // console.log("Top liked pictures: ", topLikedPictures.rows);
    return basicStats.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch top liked pictures.");
  }
}

export async function getBestUserFrom2Weeks() {
  try {
    const connection = await getConnection();

    const topUser2Week = await connection.execute(
      `WITH Aktivitas AS (
          SELECT F.Felhasznalonev, COUNT(*) AS osszes_muvelet
          FROM Felhasznalo F
          LEFT JOIN (
              SELECT FelhasznaloID
              FROM Kep
              WHERE Feltoltes_datum >= TRUNC(SYSDATE, 'DDD') - 14
              UNION ALL
              SELECT FelhasznaloID
              FROM Komment
              WHERE Datum >= TRUNC(SYSDATE, 'DDD') - 14
              UNION ALL
              SELECT FelhasznaloID
              FROM KommentetLikeol
              WHERE FelhasznaloID IN (
                  SELECT FelhasznaloID
                  FROM Komment
                  WHERE Datum >= TRUNC(SYSDATE, 'DDD') - 14
              )
              UNION ALL
              SELECT FelhasznaloID
              FROM KepetLikeol
              WHERE FelhasznaloID IN (
                  SELECT FelhasznaloID
                  FROM Kep
                  WHERE Feltoltes_datum >= TRUNC(SYSDATE, 'DDD') - 14
              )
          ) A ON F.FelhasznaloID = A.FelhasznaloID
          GROUP BY F.Felhasznalonev
        )
        SELECT Felhasznalonev, osszes_muvelet
        FROM Aktivitas
        WHERE osszes_muvelet = (
            SELECT MAX(osszes_muvelet)
            FROM Aktivitas
        )`,
      []
    );

    await connection.close();
     console.log("Top liked pictures: ", topUser2Week.rows);
    return topUser2Week.rows as TopUsersByReact[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch top liked pictures.");
  }
}
