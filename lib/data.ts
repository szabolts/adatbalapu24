

import oracledb from 'oracledb';
import { User } from './types';

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
    return result.rows ;

}




