"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const mypw = "aesdeaesde123";

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