

const oracledb = require('oracledb');

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
         FROM USERS`,
        [],  // bind value for :id
    );

    // console.log(result.rows);
    await connection.close();
    return result.rows;
}




