"use server";
import { getConnection } from "@/lib/db";
const oracledb = require("oracledb");
import { Stat1 } from "@/lib/types";
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export async function fetchStats1() {
  try {
    const connection = await getConnection();

    const result = await connection.execute(
      `SELECT FELHASZNALO.Felhasznalonev, COUNT(KEP.KepID) AS FeltoltottKepekSzama
         FROM FELHASZNALO
         INNER JOIN KEP ON FELHASZNALO.FelhasznaloID = KEP.FelhasznaloID
         GROUP BY FELHASZNALO.Felhasznalonev
         ORDER BY COUNT(KEP.KepID) DESC`,
      []
    );

    await connection.close();
    console.log("fetchStats1", result.rows);
    return result.rows as Stat1[];
  } catch (error) {
    console.error("Failed to fetch category:", error);
    throw new Error("Failed to fetch category.");
  }
}
