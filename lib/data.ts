import oracledb from "oracledb";
import { User, Kep, Kategoria } from "./types";
import { auth } from "@/auth";
import { getConnection } from "@/lib/db";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "aesdeaesde123";

export async function fetchUsers() {
  const connection = await getConnection();

  const result = await connection.execute(
    `SELECT *
         FROM FELHASZNALO`,
    []
  );

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

  await connection.close();
  return result.rows as User[];
}

export async function fetchKepek() {
  const connection = await getConnection();

  const result = await connection.execute(
    `SELECT *
         FROM KEP
         ORDER BY KEPID
         DESC`,
    []
  );

  await connection.close();

  return result.rows;
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
  console.log("Categories: ", result.rows);
  return result.rows;
}

export async function fetchKepekById(id: string) {
  console.log("iiiiiddeeee: ", id);
  const connection = await oracledb.getConnection({
    user: "test",
    password: mypw,
    connectString: "159.69.117.79:1521/PODB",
  });

  const result = await connection.execute(
    `SELECT KEP.*, FELHASZNALO.FELHASZNALONEV
     FROM KEP
     INNER JOIN FELHASZNALO ON KEP.FelhasznaloID = FELHASZNALO.FelhasznaloID
     WHERE KepID = :id`,
    [id]
  );
  // console.log(result.rows);
  await connection.close();

  return result.rows as Kep[];
}

export const getAdminByEmail = async (email: string) => {
  const connection = await oracledb.getConnection({
    user: "test",
    password: mypw,
    connectString: "159.69.117.79:1521/PODB",
  });

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
    const connection = await oracledb.getConnection({
      user: "test",
      password: mypw,
      connectString: "159.69.117.79:1521/PODB",
    });

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
    console.log("LIKES: ", likes.rows);
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
    console.log("Comments: ", comments.rows);
    return comments.rows;
  } catch (error) {
    console.error(error);
    return { error: "error fetching likes" };
  }
}
