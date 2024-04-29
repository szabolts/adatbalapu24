"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getConnection } from "@/lib/db";

const oracledb = require("oracledb");
import fs from "fs";
import path from "path";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// export type State = {
//   errors?: {
//     firstname?: string[];
//     lastname?: string[];
//     username?: string[];
//     email?: string[];
//     role?: string[];
//   };
//   message?: string | null;
// };

const UpdateShema = z.object({
  title: z.string(),
  path: z.string(),
  prompt: z.string(),
  kategoria: z.string(),
});

export async function updatePictureById(id: string, formData: FormData) {
  const { title, path, prompt, kategoria } = UpdateShema.parse({
    title: formData.get("title"),
    path: formData.get("path"),
    prompt: formData.get("prompt"),
    kategoria: formData.get("kategoria"),
  });

  try {
    const connection = await getConnection();

    // Felhasználó adatainak frissítése az adatbázisban
    const result = await connection.execute(
      `BEGIN frissit_kepet_es_kategoriat(:p_kep_id, :p_cim, :p_fajl_eleresi_utvonal, :p_prompt, :p_kategoria_nev); END;`,
      [id, title, path, prompt, kategoria]
      // { autoCommit: true }
    );

    console.log("Felhasználói adatok sikeresen frissítve:", result);
    await connection.close();
    console.log("Felhasználói adatok sikeresen frissítve.");
  } catch (error) {
    console.error(error);
    return { message: "Hiba történt a felhasználói adatok frissítése során." };
  }
  revalidatePath("/dasboard/pictures");
  redirect("/dashboard/pictures");
}

export async function deletePictureById(id: number) {
  try {
    const connection = await getConnection();

    const result: any = await connection.execute(
      `SELECT FAJL_ELERESI_UTVONAL FROM KEP WHERE KEPID = :id`,
      [id]
    );
    const filePath = `public/${result.rows[0]?.FAJL_ELERESI_UTVONAL}`;

    if (!filePath) {
      console.error(`No file path found for picture with id: ${id}`);
      return;
    }

    await connection.execute(`DELETE FROM KEP WHERE KEPID = :id`, [id], {
      autoCommit: true,
    });
    await connection.close();

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file: ${err}`);
      } else {
        console.log(`File deleted: ${filePath}`);
      }
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/dasboard/pictures");
}
