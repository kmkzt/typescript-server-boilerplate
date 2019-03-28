import mysql from 'mysql'

export const connectSQL = async () => {
  const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'user',
    password : 'pass',
    database : 'database'
  });

  connection.connect()

  connection.query('SELECT * from users', function (err, rows, fields) {
    if (err) throw err
    console.log(rows)
  })

  connection.end()
}
