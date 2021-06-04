 const Joi = require('joi')

module.exports.userLoginValidation = (data)=>{
     //User validation for Login
    const schema = Joi.object({
        username: Joi.string().required().min(6),
        password: Joi.string().required().min(6),
    })
    return schema.validate(data);
 }

 module.exports.postValidationSchema = (data) =>{
     const schema = Joi.object({
         title: Joi.string().required().min(6),
         body:Joi.string().required().min(10),
         author: Joi.string().required(),
         postType:Joi.string().required()

     })
     return schema.validate(data)
 }

 module.exports.userRegisterValidation = (data) =>{
    //User data validation for at register route

    const schema = Joi.object({
       firstname: Joi.string().required().min(3),
       lastname: Joi.string().required().min(3),
       username: Joi.string().required().min(6),
       password: Joi.string().required().min(6),
       emailid: Joi.string().required().email(),
       dob: Joi.date().required()
    })
    return schema.validate(data)
}

module.exports.groupValidationSchema = (data) =>{
    const schema = Joi.object({
        title:Joi.string().required().min(6),
        description:Joi.string().required().min(6)
    })
    return schema.validate(data)
}