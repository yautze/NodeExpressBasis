import test from "../module/test"
import r from "../response/res"

const Test = (req, res) => {
    test.Test().then((data) => {
        res.send(r.R(data))
    }).catch((err) => {
        res.send(r.E(err))
    })
}

export { Test }