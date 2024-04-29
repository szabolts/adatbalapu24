"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { getConnection } from "@/lib/db";
const oracledb = require("oracledb");
import { z } from "zod";
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


async function getUserId(connection: any, email: any) {
  const result = await connection.execute(
    `SELECT FelhasznaloID FROM Felhasznalo WHERE EMAIL = :email`,
    [email]
  );

  if (result.rows && Array.isArray(result.rows)) {
    console.log("------useridatUpdate title:", result.rows[0].FELHASZNALOID);
    return result.rows[0].FELHASZNALOID as string;
  }

  throw new Error("User not found");
}

export async function like(id: number) {
    try {
        const connection = await oracledb.getConnection({
          user: "test",
          password: mypw,
          connectString: "159.69.117.79:1521/PODB",
        });

        const session = await auth();

        const userID = await connection.execute(
            `SELECT FelhasznaloID FROM Felhasznalo WHERE EMAIL = :email`,
            [session?.user?.email],
        )

        const result = await connection.execute(
          `INSERT INTO KEPETLIKEOL (FelhasznaloID, KepID) VALUES (:userID, :kepid)`,
          [userID.rows[0].FELHASZNALOID, id],
          { autoCommit: true }
        );
        await connection.close();
        
        // if (!result) {
        //   return { error: "Gatya likeolas"}
        // }
    
      } catch (error) {
        console.error(error);
        return { error: "like error"}
      }

}

export async function getLikes(id: number) {
    try {
        const connection = await oracledb.getConnection({
          user: "test",
          password: mypw,
          connectString: "159.69.117.79:1521/PODB",
        });

        const session = await auth();

        const result = await connection.execute(
            `SELECT COUNT(*) AS likes FROM KEPETLIKEOL WHERE KepID = :id`,
            [id],
        );

        const isLikedResult = await connection.execute(
            `SELECT COUNT(*) AS isLiked FROM KEPETLIKEOL WHERE KepID = :id AND FelhasznaloID = (SELECT FelhasznaloID FROM Felhasznalo WHERE EMAIL = :email)`,
            [id, session?.user?.email],
        );

        const likes = result.rows[0].LIKES;
        const isLiked = isLikedResult.rows[0].ISLIKED > 0;

        await connection.close();

        return { likes, isLiked };
        
    } catch (error) {
        console.error(error);
        return { error: "get likes error" }
    }
}

export async function dislike(id: number) {
    try {
        const connection = await oracledb.getConnection({
          user: "test",
          password: mypw,
          connectString: "159.69.117.79:1521/PODB",
        });

        const session = await auth();

        const userID = await connection.execute(
            `SELECT FelhasznaloID FROM Felhasznalo WHERE EMAIL = :email`,
            [session?.user?.email],
        )

        const result = await connection.execute(
          `DELETE FROM KEPETLIKEOL WHERE FelhasznaloID = :userID AND KepID = :kepid`,
          [userID.rows[0].FELHASZNALOID, id],
          { autoCommit: true }
        );
        await connection.close();
        
        // if (!result) {
        //   return { error: "Gatya likeolas"}
        // }
    
      } catch (error) {
        console.error(error);
        return { error: "dislike error"}
      }

}

const CommentSchema = z.object({
  comment: z.string().max(255)

});

export async function comment(id: number, formData: FormData) {
  const { comment } = CommentSchema.parse({
    comment: formData.get("comment"),
  });

  try {
    const session = await auth();

    const connection = await getConnection();

    const userId = await getUserId(connection, session?.user?.email);

    await connection.execute(
      `INSERT INTO KOMMENT (TARTALOM, DATUM, FELHASZNALOID, KEPID) VALUES (:newcomment, SYSDATE, :newfelhasznaloId, :newkepid)`,
      [comment, userId, id],
      { autoCommit: true }
    );
    await connection.close();

    revalidatePath(`/${id}`);
  } catch (error) {
    console.error(error);
    return { error: "comment error" };
  }
}
