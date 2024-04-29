import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import oracledb from "oracledb";
import bcrypt from "bcryptjs";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const mypw = "aesdeaesde123";

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

const CategorySchema = z.object({
  name: z.string(),
  description: z.string(),
});

export async function createCategory(formData: FormData) {
  const { name, description } = CategorySchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: mypw,
      connectString: "159.69.117.79:1521/PODB",
    });

    const result = await connection.execute(
      `INSERT INTO KATEGORIA (KATEGORIAID, NEV, LEIRAS)
       VALUES (KATEGORIA_SEQ.nextval, :name, :description)`,
      [name, description],
      { autoCommit: true }
    );

    console.log("Kategória sikeresen létrehozva:", result);
    await connection.close();
    console.log("Kategória sikeresen létrehozva.");
  } catch (error) {
    console.error(error);
    return { message: "Hiba történt a kategória létrehozása során." };
  }
  revalidatePath("/dasboard/categories");
  redirect("/dashboard/categories");
}

export async function updateCategoryById(id: string, formData: FormData) {
  const { name, description } = CategorySchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: mypw,
      connectString: "159.69.117.79:1521/PODB",
    });

    const result = await connection.execute(
      `UPDATE KATEGORIA
       SET NEV = :name,
       LEIRAS = :description
       WHERE KATEGORIAID = :categoryId`,
      [name, description, id],
      { autoCommit: true }
    );

    console.log("Kategória sikeresen frissítve:", result);
    await connection.close();
    console.log("Kategória sikeresen frissítve.");
  } catch (error) {
    console.error(error);
    return { message: "Hiba történt a kategória frissítése során." };
  }
  revalidatePath("/dasboard/categories");
  redirect("/dashboard/categories");
}

export async function deleteCategoryById(id: string) {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: mypw,
      connectString: "159.69.117.79:1521/PODB",
    });

    await connection.execute(
      `DELETE FROM KATEGORIA WHERE KATEGORIAID = :id`,
      [id],
      { autoCommit: true }
    );
    await connection.close();
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/dasboard/categories");
  redirect("/dashboard/categories");
}
