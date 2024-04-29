"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getConnection } from "@/lib/db";
const oracledb = require("oracledb");
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
    kategoria: formData.get("kategoria")
  });

  try {
    const connection = await getConnection();

    // Felhasználó adatainak frissítése az adatbázisban
    const result = await connection.execute(
      `BEGIN frissit_kepet_es_kategoriat(:p_kep_id, :p_cim, :p_fajl_eleresi_utvonal, :p_prompt, :p_kategoria_nev); END;`,
      [id, title, path, prompt, kategoria],
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
  
      await connection.execute(
        `DELETE FROM KEP WHERE KEPID = :id`,
        [id],
        { autoCommit: true }
      );
      await connection.close();
    } catch (error) {
      console.error(error);
    }
    revalidatePath("/dasboard/pictures");
    // redirect("/dashboard/categories");
  }