
module.exports = {
    R : (data) => {
        return {
            data: data,
            status: {
                code: 200,
                msg: "suucess",
                time: Math.floor(new Date() / 1000)
            }
        }
    },
    E : (err) => {
        return {
            data: null,
            status: {
                code: err.code,
                msg: err.msg,
                time: Math.floor(new Date() / 1000)
            }
        }
    }
}