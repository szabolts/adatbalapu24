"use server";
import cuid from "cuid";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut, auth } from "@/auth";
import NextAuth, { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { stat, mkdir, writeFile } from "fs/promises";
import path from 'path';
import { User } from "./types";
import { fetchUsers } from "./data";


const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const mypw = "aesdeaesde123";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const UserSchema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    password2: z.string().min(6),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export async function createUser(formData: FormData) {
  const { firstname, lastname, username, email, password, password2 } =
    UserSchema.parse({
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      password2: formData.get("password2"),
    });

  console.log(password);
  const bPassword = await bcrypt.hash(password, 10);
  console.log(bPassword);

  try {
    const connection = await oracledb.getConnection({
      user: "test",
      password: mypw,
      connectString: "159.69.117.79:1521/PODB",
    });

    const user = "user";
    const result = await connection.execute(
      `INSERT INTO FELHASZNALO (FelhasznaloID, FELHASZNALONEV, VEZETEKNEV, KERESZTNEV, EMAIL, Jelszo, Role) VALUES (:id, :username, :firstname, :lastname, :email, :password, :role)`,
      [cuid(), username, firstname, lastname, email, bPassword, user],
      { autoCommit: true }
    );
    console.log("--------------Result", result);
    await connection.close();
    
    if (!result) {
      return { error: "Gatya"}
    }

  } catch (error) {
    console.error(error);
    return { error: "asd"}
  }
  revalidatePath("/");
  redirect("/login");
}



const UploadSchema = z.object({
  image: z
    .any(),
  // .refine((files) => {
  //    return files?.[0]?.size <= MAX_UPLOAD_SIZE;
  // }, `Max image size is 3MB.`)
  // .refine(
  //   (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
  //   "Only .jpg, .jpeg, .png and .webp formats are supported."
  // ),
  title: z.string(),
  prompt: z.string()
});

export async function upload(formData: FormData) {
  const { title, prompt, image } = UploadSchema.parse({
    title: formData.get("title"),
    prompt: formData.get("prompt"),
    image: formData.get("image")
  });

  const buffer = Buffer.from(await image.arrayBuffer());
  const filename = image.name.replaceAll(" ", "_");
  try {
    await writeFile(
      path.join(process.cwd(), "/public/kepek/" + filename),
      buffer
    );
    console.log("Upload: ", title, prompt, filename)
  } catch (error) {
    console.error(error);
    return { message: "Upload failed" };
  }
  const path2 = `/kepek/${filename}`;
  const session = await auth();
  console.log("user: ", session);

  try {
    const connection = await oracledb.getConnection({
      user: "test",
      password: mypw,
      connectString: "159.69.117.79:1521/PODB",
    });

    const userID = await connection.execute(
      `SELECT FelhasznaloID FROM Felhasznalo WHERE EMAIL = :email`,
      [session?.user?.email],
    )
    console.log("---useridatUpdate title:", title)
    console.log("---useridatUpdate path:", path2)
    console.log("---useridatUpdate prompt:", prompt)
    console.log("------useridatUpdate userid: ", userID.rows[0].FELHASZNALOID)

    const result2 = await connection.execute(
      `INSERT INTO KEP (Cim, Feltoltes_datum, Fajl_eleresi_utvonal, prompt, FelhasznaloID) VALUES (:cim, SYSDATE, :path, :prompt, :userid)`,
      [title, path2, prompt, userID.rows[0].FELHASZNALOID],
      { autoCommit: true }
    );
    console.log("-------update result:", result2)
    await connection.close();
  } catch (error) {
    console.error(error);
    return { message: "ERROR at upload to database" };
  }
  revalidatePath("/");
  redirect("/");
}

const UpdateShema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

export async function updateProfile(formData: FormData) {
  const { firstname, lastname, username, email, password } =
    UpdateShema.parse({
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
  console.log("-----------------",email)
  try {
    // Felhasználó azonosítása
    const session = await auth();
    const userEmail = session?.user?.email; // Itt kell ellenőrizni a visszaadott objektumot
    if (!userEmail) {
      throw new Error("User email is not available.");
    }
    console.log(userEmail ," ez az useremail")

    const connection = await oracledb.getConnection({
      user: "test",
      password: mypw,
      connectString: "159.69.117.79:1521/PODB",
    });

    // Felhasználó azonosítójának lekérése az e-mail cím alapján
    const userResult = await connection.execute(
      `SELECT * FROM Felhasznalo WHERE EMAIL = :email`,
      [userEmail],
    );
    const userResultID = userResult.FELHASZNALOID;
    console.log("---------------------asd: ",userResult.rows[0].FELHASZNALOID)
    console.log("---useridatUpdate title:", firstname)
    console.log("---useridatUpdate path:", lastname)
    const userId = userResult.rows[0].FELHASZNALOID;
    // Felhasználó adatainak frissítése az adatbázisban
    const result = await connection.execute(
      `UPDATE Felhasznalo
       SET Felhasznalonev = :username,
       Vezeteknev = :lastname,
       Keresztnev = :firstname,
       Email = :email,
       WHERE FelhasznaloID = :userId`,
      [username, lastname, firstname, email, userId],
      { autoCommit: true }
    );

    console.log("Felhasználói adatok sikeresen frissítve:", result);
    await connection.close();
    console.log("Felhasználói adatok sikeresen frissítve.");
  } catch (error) {
    console.error(error);
    return { message: "Hiba történt a felhasználói adatok frissítése során." };
  }
  redirect("/");
  
}


export async function logOut() {
  await signOut();
}

