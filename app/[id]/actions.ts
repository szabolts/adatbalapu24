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
    const connection = await getConnection();

    const session = await auth();
    const userId = await getUserId(connection, session?.user?.email);

    await connection.execute(
      `INSERT INTO KEPETLIKEOL (FelhasznaloID, KepID) VALUES (:userID, :kepid)`,
      [userId, id],
      { autoCommit: true }
    );
    await connection.close();
    revalidatePath(`/${id}`);
  } catch (error) {
    console.error(error);
    return { error: "like error" };
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
