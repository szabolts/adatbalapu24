
import oracledb from 'oracledb';
import { User } from './types';
import { auth } from '@/auth';


oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "aesdeaesde123"

export async function fetchUsers() {

    const connection = await oracledb.getConnection ({
        user          : "test",
        password      : mypw,
        connectString : "159.69.117.79:1521/PODB"
    });

    
    const result = await connection.execute(
        `SELECT *
         FROM FELHASZNALO`,
        [],  // bind value for :id
    );

    // console.log(result.rows);
    await connection.close();
    return result.rows as User[];
}


export async function fetchCurrentUser() {
    const session = await auth();
    const email = session?.user?.email

    const connection = await oracledb.getConnection ({
        user          : "test",
        password      : mypw,
        connectString : "159.69.117.79:1521/PODB"
    });

    
    const result = await connection.execute(
        `SELECT *
         FROM FELHASZNALO
         WHERE EMAIL = :email`,
        [email],  
    );

    console.log(result.rows);
    await connection.close();
    return result.rows as User[];
}

export async function fetchKepek() {

    const connection = await oracledb.getConnection ({
        user          : "test",
        password      : mypw,
        connectString : "159.69.117.79:1521/PODB"
    });

    const result = await connection.execute(
        `SELECT *
         FROM KEP
         ORDER BY KEPID
         DESC`,
        [],  
    );
    // console.log(result.rows);
    await connection.close();

    return result.rows;
}

export const getAdminByEmail = async (email: string) => {

    const connection = await oracledb.getConnection ({
        user          : "test",
        password      : mypw,
        connectString : "159.69.117.79:1521/PODB"
    });


    try {
        const user = await connection.execute(
            `SELECT * 
            FROM FELHASZNALO
            WHERE email = :email
            AND Role = 'admin'`,
            [email]
        )
        await connection.close();
        return user.rows;
    } catch {
        return null;
    }
}




