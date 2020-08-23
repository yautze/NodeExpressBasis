import order from "../module/order"
import r from "../response/res"

const Order = (req, res) => {
    order.Cook(req.params.num,req.body.extra).then((data) => {
        res.json(r.R(data))
    }).catch((err) => {
        res.json(r.E(err))
    })
}

export { Order }