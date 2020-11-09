const mysql = require('mysql');
const con = mysql.createConnection({
  host: '34.72.66.39',
  user: 'root',
  password: 'elpvto1234',
  database: 'proyecto'
});

con.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      console.log(err);
      return;
    }
    console.log('Connection established');
    
  });

  module.exports = con;