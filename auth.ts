import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { User } from '@/lib/types';
const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "aesdeaesde123"

async function getUser(email: string): Promise<User | undefined>   {
    try {
    const connection = await oracledb.getConnection ({
        user          : "test",
        password      : mypw,
        connectString : "159.69.117.79:1521/PODB"
    });

    const user = await connection.execute(
      `SELECT * FROM USERS WHERE EMAIL = :email`,
        [email],
    );
    console.log("------user: ",user.rows[0]);
    await connection.close();
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          console.log("USERACT:" ,user)
          console.log("------pw:",password, user?.PASSWORD)
          if (!user) return null;

          const formattedUser = {
            id: user.ID,
            email: user.EMAIL,
            password: user.PASSWORD,
            name: user.NAME
          };

          const passwordsMatch = await bcrypt.compare(password, formattedUser.password);
          if (passwordsMatch) return formattedUser;
        }
        console.log(credentials);
        console.log(parsedCredentials)
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});