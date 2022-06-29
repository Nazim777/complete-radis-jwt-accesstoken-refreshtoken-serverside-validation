import joi from 'joi'
const formvalidation= async(req,res,next)=>{
    const schema = joi.object({
        name:joi.string().required().max(50),
        email:joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password:joi.string().required().min(6)
    })
    const result = await schema.validate(req.body)
    if(result.error){
       return res.json({status:'failed','message':result.error.message})
    }
    next()
}
export default formvalidation
