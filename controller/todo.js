import todo from "../module/todo"
import r from "../response/res"
import mysql from "mysql"
import sd from "silly-datetime"
import * as s from "../schemas/todo"

// create todo
const Create = (req, res) => {
    // 驗證封包內容
    const result = s.creatReq.validate(req.body)

    if (result.error != null){
        res.json(r.E({
                code : 400,
                msg : result.error.details[0].message
            })
        )
    }else{
        req.body.id = Math.floor(new Date() / 1000)
        req.body.createTime = sd.format(new Date(),'YYYY-MM-DD HH:mm:ss')

        todo.Create(req.body).then((data) =>{
            res.json(r.R(data))
        }).catch((err) => {
            res.json(r.E(err))
        })
    }
}

// get todos
const GetList = (req, res) => {
    todo.GetList().then((data) =>{
        res.json(r.R(data))
    }).catch((err) => {
        res.json(r.E(err))
    })
}

// get by ID
const GetByStatus = (req, res) => {
    todo.GetByStatus(req.params.status).then((data) =>{
        res.json(r.R(data))
    }).catch((err) => {
        res.json(r.E(err))
    })
}

// delete by ID
const Delete = (req, res) => {
    todo.Delete(req.params.id).then((data) => {
        res.json(r.R(data))
    }).catch((err) => {
        res.json(r.E(err))
    })
}

// update(更新成已完成)
const UpdateIsDone = (req, res) => {
    const sql = mysql.format("UPDATE `todo` SET isDone = '1' WHERE id = ?", [req.params.id])
    todo.Update(sql).then((data) => {
        res.json(r.R(data))
    }).catch((err) => {
        res.json(r.E(err))
    })
}

// update(更新todo內容)
const UpdateInfo = (req, res) => {
    // 驗證封包內容
    const result = s.creatReq.validate(req.body)
    if (result.error != null){
        res.json(r.E({
                code : 400,
                msg : result.error.details[0].message
            })
        )
    }else{
        const sql = mysql.format("UPDATE `todo` SET thing = ? WHERE id = ?", [req.body.thing, req.params.id])
        todo.Update(sql).then((data) => {
            res.json(r.R(data))
        }).catch((err) => {
            res.json(r.E(err))
        })
    }
}

export {
    Create,
    GetList,
    GetByStatus,
    Delete,
    UpdateIsDone,
    UpdateInfo
}