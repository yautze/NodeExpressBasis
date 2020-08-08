import Joi from "joi"

const creatReq = Joi.object({
    thing : Joi.string().required(),
})

export {
    creatReq
}