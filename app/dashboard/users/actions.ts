"use server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getConnection } from "@/lib/db";
const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const mypw = "aesdeaesde123";

export type State = {
  errors?: {
    firstname?: string[];
    lastname?: string[];
    username?: string[];
    email?: string[];
    role?: string[];
  };
  message?: string | null;
};

const UpdateShema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  username: z.string(),
  email: z.string().email(),
  role: z.string(),
});

export async function updateProfileById(id: string, formData: FormData) {
  const { firstname, lastname, username, email, role } = UpdateShema.parse({
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    username: formData.get("username"),
    email: formData.get("email"),
    role: formData.get("role"),
  });

  try {
    const connection = await getConnection();

    // Felhasználó adatainak frissítése az adatbázisban
    const result = await connection.execute(
      `UPDATE Felhasznalo
       SET Felhasznalonev = :username,
       Vezeteknev = :lastname,
       Keresztnev = :firstname,
       Email = :email,
       Role = :role
       WHERE FelhasznaloID = :userId`,
      [username, lastname, firstname, email, role, id],
      { autoCommit: true }
    );

    console.log("Felhasználói adatok sikeresen frissítve:", result);
    await connection.close();
    console.log("Felhasználói adatok sikeresen frissítve.");
  } catch (error) {
    console.error(error);
    return { message: "Hiba történt a felhasználói adatok frissítése során." };
  }
  revalidatePath("/dasboard/users");
  redirect("/dashboard/users");
}

export async function deleteProfileById(id: string) {
  try {
    const connection = await getConnection();

    await connection.execute(
      `DELETE FROM Felhasznalo WHERE FelhasznaloID = :id`,
      [id],
      { autoCommit: true }
    );
    await connection.close();
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/dasboard/users")
}
