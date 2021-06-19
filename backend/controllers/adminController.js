const admin = require('../models/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



//get all adimins
module.exports.get_all_admins =  (req,res)=>{
    admin.find({}, (err,users)=>{
        err ? res.json(err) : res.json(users)
    })
}

//admin registration
module.exports.add_admin = async (req,res)=>{
    const emailExists = await admin.findOne({email: req.body.emailid})
    const usernameExists = await admin.findOne({username: req.body.username})

    if(emailExists){
        return res.status(400).send("Email already Exists")
    }
    if(usernameExists){
    return res.status(400).send("Username already Exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const username = req.body.username;
   const newUser = new admin({
       firstname,
       lastname,
       email,
       username,
       password: hashedPassword,
   }); 
   newUser.save()
   .then(()=> res.json("Registration successful"))
   .catch((err)=>{res.status(400).json({error: err, message:"Server failed to respond" })})
}

//admin login
module.exports.admin_login =async (req,res) =>{
    try{
        const user = await admin.findOne({email:req.body.email})
    if(!user){
        return res.status(401).send("Incorrect email Entered...")
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(401).send('Invalid Password...');

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({token, userid: user._id,username : user.username ,message:"Sign in successful!", email:user.email})
    }
    catch(err){
        res.json(err)
    }
}

module.exports.get_admin_by_id = (req,res)=>{
    admin.findById(req.params.id, (err,user)=>{
        if(err){
            return res.status(400).json({
                message:"Error getting user",
                err
            })
        }
        else{
            res.json(user)
        }
    })
}

//delete all admins
module.exports.admins_nuke = (req,res)=>{
    admin.deleteMany({}, (err,response)=>{
        if(err) res.status(400).json({
            err,
            message:"Error deleting admins"
        })
        else{
            res.json('Admins nuke deployed')
        }
    })
}