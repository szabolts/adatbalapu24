"use server"
import cuid from 'cuid';
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";
import { signIn, signOut, auth } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const mypw = "aesdeaesde123"

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
    const { firstname, lastname, username, email, password, password2 } = UserSchema.parse({
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
            user          : "test",
            password      : mypw,
            connectString : "159.69.117.79:1521/PODB"
        });

     const user = "user";  
     const result = await connection.execute(
        `INSERT INTO FELHASZNALO (FelhasznaloID, FELHASZNALONEV, VEZETEKNEV, KERESZTNEV, EMAIL, Jelszo, Role) VALUES (:id, :username, :firstname, :lastname, :email, :password, :role)`,
        [cuid(), username, firstname, lastname, email, bPassword, user],
        { autoCommit: true }
      );
      console.log("--------------Result",result);
      await connection.close();
      console.log("Succesfully created user");
      
  
    } catch (error) {
        console.error(error);
        return { message: "Hiba történt a regisztráció során." };
    }
    redirect('/login');
  }  

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
  
  export async function logOut() {
    await signOut();
  }