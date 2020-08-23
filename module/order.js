const OK = true

class errData {
    constructor(code, msg) {
        this.code = code;
        this.msg = msg;
    }
}


module.exports = {
    Cook: (num, extra) => new Promise((resolve, reject) => {
        if (OK) {
            resolve({msg: `您的${num}號餐，額外的要求:${extra}`})
        }else { 
            reject(new errData(1010, `抱歉!! ${num}號餐今天已賣完`))
        }
    })
}