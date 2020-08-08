const resData = {
    data : null,
    status : {
        code : 200,
        msg : "Success",
        time: 0
    }
} 
module.exports = {
    R : (data) => {
        resData.data = data
        resData.status.time = Math.floor(new Date() / 1000)
        return resData
    },
    E : (err) => {
        resData.status.code = err.code
        resData.status.msg = err.msg
        resData.status.time = Math.floor(new Date() / 1000)
        return resData
    }
}