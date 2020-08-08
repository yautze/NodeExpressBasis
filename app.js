import express from "express"
import bodyparser from "body-parser"
import todo from "./router/todo"
import cors from "cors"
const app = express()

// 跨網域
app.use(cors())

// 解析json格式(req.body)
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

app.use("/todos",todo)

// 沒有設定路徑的頁面
app.use((req,res,next) => {
    res.status(404).send('查無此頁面！')
    next();
});

// 設定後端爆炸時的頁面
app.use((err,req,res,next) => {
    console.log(err);
    res.status(500).send('後端爆了，請稍後再嘗試！')
    next();
})

export default app