import pool from "../env/dbconnection"
import mysql from "mysql"

class errData {
    constructor(code, msg) {
        this.code = code;
        this.msg = msg;
    }
}

module.exports = {
    // create todo
    Create : (data) => new Promise((resolve, reject) => {
        // 取得某一個 DB Connection
        pool.getConnection((err,connection) => {
            if(err){
                connection.release()
                reject(new errData(1010, "DB Connect Faild"))
            }
            const sql = mysql.format('INSERT INTO `todo` SET ?', data)
            // sql的執行
            connection.query(sql, (err,result) => {
                connection.release()
                if(err || result.affectedRows != 1){ 
                    reject(new errData(1011, "Create Data Failed"))
                }else{
                    resolve("")
                }
            })
        })
    }),
    // get todos list
    GetList : () => new Promise((resolve, reject) => {
        // 取得某一個 DB Connection
        pool.getConnection((err,connection) => {
            if(err){
                connection.release()
                reject(new errData(1010, "DB Connect Faild"))
            }
            const sql = 'SELECT * FROM `todo`'
            // sql的執行
            connection.query(sql, (err,result) => {
                connection.release()
                if(err){ 
                    reject(new errData(1012, "Get Data Failed"))
                }else if(result.length == 0){
                    reject(new errData(1013, "Not Found Data in `todo`"))
                }else{
                    resolve(result)
                }
            })
        })
    }),
    // get todo by id
    GetByStatus : (status) => new Promise((resolve, reject) => {
        // 取得某一個 DB Connection
        pool.getConnection((err,connection) => {
            if(err){
                connection.release()
                reject(new errData(1010, "DB Connect Faild"))
            }
            const sql = mysql.format("SELECT * FROM `todo` WHERE isDone = ?", [status])
            
            // sql的執行
            connection.query(sql, (err,result) => {
                connection.release()
                if(err){ 
                    reject(new errData(1012, "Get Data Failed"))
                }else if(result.length == 0){
                    reject(new errData(1013, "Not Found Data in `todo`"))
                }else{
                    resolve(result)
                }
            })
        })
    }),
    // delete todo by id
    Delete : (id) => new Promise((resolve, reject) => {
        // 取得某一個 DB Connection
        pool.getConnection((err, connection) => {
            if(err){
                connection.release()
                reject(new errData(1010,"DB Connect Faild"))  
            }
            const sql = mysql.format("DELETE FROM `todo` WHERE id = ?", [id])
            connection.query(sql, (err,result) => {
                connection.release()
                if(err){
                    reject(new errData(1014,"Delete Data Failed"))
                }else if(result.affectedRows == 0){ // 是否有刪除到一筆資料
                    reject(new errData(1013,"Data Not Found"))
                }else{
                    resolve("")
                }
            })
        })
    }),
    // update
    Update : (sql) => new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err){
                connection.release()
                reject(new errData(1010,"DB Connect Faild"))
            }
            connection.query(sql, (err,result) => {
                connection.release()
                if(err){
                    reject(new errData(1015,"Update Data Failed"))
                }else if(result.changedRows == 0){ // 是否有更新到一筆資料
                    reject(new errData(1013,"Data Not Found"))
                }else{
                    resolve("")
                }
            })
        })
    })
}