import mysql from "mysql"

// Initialize pool 
var pool  = mysql.createPool({ 
    connectionLimit : 10, 
    host  : '127.0.0.1', 
    user  : 'root', 
    password : 'htclab', 
    database : 'test', 
    debug : false 
}); 

module.exports = pool; 