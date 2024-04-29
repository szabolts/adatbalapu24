import oracledb from 'oracledb';
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const mypw = "aesdeaesde123";

let connection: oracledb.Connection | null = null;

export async function getConnection() {
    connection = await oracledb.getConnection({
      user: "test",
      password: mypw,
      connectString: "159.69.117.79:1521/PODB",
    });


  return connection;
}