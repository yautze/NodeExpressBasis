import pool from "../env/dbconnection"
import mysql from "mysql"
import async from "async"

var con; // get a connection pool

class errData {
    constructor(code, msg) {
        this.code = code;
        this.msg = msg;
    }
}

module.exports = {
    Test : () => new Promise((resolve, reject) => {
        // 取得某一個 DB Connection
        pool.getConnection((err, connection) => {
            if(err){ // 取得失敗
                connection.release()
                reject(new errData(400, "DB Connect Faild"))
            }else{
                // Transaction 開始
                connection.beginTransaction((err) => {
                    if(err){ // Transaction 失敗
                        connection.release()
                        reject(new errData(400, "Transaction failed"))
                    }else{
                        // 第一條 sql
                        const sql = mysql.format('INSERT INTO `test`.`todo` (`id`, `thing`, `isDone`, `createTime`) VALUES (?, ?, ?, ?)',[1111111111, "testTransaction", 0, "2020-08-09 15:21:53"])
                        connection.query(sql, (err,result) => {
                            // 第一條 sql 執行結果失敗
                            if(err || result.affectedRows != 1){ 
                                connection.rollback(() => {
                                    connection.release()
                                    reject(new errData(400, "Create Data Failed(rollback)"))
                                })
                            }else{
                                // 第二條 sql
                                const sql2 = mysql.format("DELETE FROM `todo` WHERE id = ?", [1111111111])
                                // 第二條 sql 的執行
                                connection.query(sql2, (err,result) => {
                                    if(err){
                                        connection.rollback(() => {
                                            connection.release()
                                            reject(new errData(400,"Delete Data Failed(rollback)"))
                                        })
                                    }else if(result.affectedRows == 0){ // 是否有刪除到一筆資料
                                        connection.rollback(() => {
                                            connection.release()
                                            reject(new errData(404,"Data Not Found(rollback)"))
                                        })
                                        
                                    }else{
                                        // 最後一條 sql 執行成功後要commit
                                        connection.commit((err) => {
                                            connection.release()
                                            if (err) {
                                                connection.rollback(() => {
                                                    reject(new errData(404,"Commit Failed(rollback)"))
                                                })
                                            }
                                            resolve({msg : "Transaction Success!"})
                                        })
                                    }
                                    
                                })
                            }
                        })
                    }
                })
            }
        })
    }),
    // Test : () => new Promise((resolve,reject) => {
    //     async.auto({
    //         getCon : (callback) => {
    //             pool.getConnection((err, connection) => {
    //                 if(err){
    //                     callback(new errData(400, "DB Connect Faild"))
    //                 }else{
    //                     con = connection
    //                     callback(null,connection)
    //                 }
    //             })
    //         },
    //         transaction : ["getCon",(result,callback) => {
    //             con.beginTransaction((err) => {
    //                 if(err){
    //                     callback(new errData(400, "Transaction failed"))
    //                 }else{
    //                     callback(null,"")
    //                 }
    //             })
    //         }],
    //         create : ["transaction",(result,callback) => {
    //             const sql = mysql.format('INSERT INTO `test`.`todo` (`id`, `thing`, `isDone`, `createTime`) VALUES (?, ?, ?, ?)',[1111111111, "testTransaction", 0, "2020-08-09 15:21:53"])
    //             con.query(sql, (err,res) => {
    //                 // 第一條 sql 執行結果失敗
    //                 if(err || res.affectedRows != 1){
    //                     callback(new errData(400, "Create Data Failed(rollback)"))
    //                 }else{
    //                     callback(null,"")
    //                 }
    //             })
    //         }],
    //         delete : ["create",(result,callback) => {
    //             const sql2 = mysql.format("DELETE FROM `todo` WHERE id = ?", [1111111111])
    //             con.query(sql2, (err,res) => {
    //                 // 第二條sql執行結果
    //                 if(err){
    //                     callback(new errData(400,"Delete Data Failed(rollback)"))
    //                 }else if(res.affectedRows == 0){ // 是否有刪除到一筆資料
    //                     callback(new errData(404,"Data Not Found(rollback)"))   
    //                 }else{
    //                     callback(null,{msg : "Transaction Success!"})
    //                 }
    //             })
    //         }]
    //     }, (err,results) => {
    //         if(err){  // 只要有 err 就rollback
    //             con.rollback(()=>{
    //                 reject(err)
    //             })
    //         }else{   // 都成功就commit
    //             con.commit((err) =>{
    //                 if(err){
    //                     con.rollback()
    //                     con.release()
    //                     reject(new errData(404,"Commit Failed(rollback)"))
    //                 }else{
    //                     con.release()
    //                     resolve(results["delete"])
    //                 }
    //             })
    //         }
    //     })
    // })
}