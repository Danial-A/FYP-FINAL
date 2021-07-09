const report = require('../models/PostReport')
const post = require('../models/postModel')
const user = require('../models/usermodel')
const mongoose = require('mongoose')

//get all reports
module.exports.get_all_reports = (req,res)=>{
    report.find({}).populate("userid", "username firstname lastname emailid").sort({createdAt: 1}).exec((err,reports)=>{
        if(err) res.status(400).json({
            err,
            message:"Error getting reports"
        })
        else{
            res.json(reports)
        }
    })
}

//new report
module.exports.new_report = (req,res)=>{
    const postExists = post.findById(req.params.id)
    if(!postExists) return res.status(404).json("Post does not exists")

    const userExists = user.findOne({_id:req.body.userid})
    if(!userExists) return res.status(404).json("User does not exists")

    const newReport = new report({
        postid: mongoose.Types.ObjectId(req.params.id) ,
        userid: mongoose.Types.ObjectId(req.body.userid),
        reason:req.body.reason,
        description:req.body.description
    })
    newReport.save()
    .then(res.json({
        message:"Post reported",
        report:newReport
    }))
    .catch(err=>{
        res.status(400).json({
            err,
            message:"Error reporting post"
        })
    })

}

//delete report by id
module.exports.delete_report = (req,res)=>{
    report.findByIdAndDelete(req.params.id, (err,report)=>{
        if(err) res.status(400).json({
            err,
            message:"Error removing report"
        })
        else{
            res.json({
                message:"Report removed",
                report
            })
        }
    })
}


//get report by id
module.exports.get_report_by_id = (req,res) =>{
    report.findById(req.params.id).populate("userid", "firstname lastname emailid username").exec((err,report)=>{
        err ? res.status(400).json({
            message:"Error getting the post",
            err
        }) :
        res.json(report)
    })
}

module.exports.reports_nuke = (req,res) =>{
    report.deleteMany({}, (err,reports)=>{
        if(err) return res.status(400).json({
            message:"Error deleting reports",
            err
        })
        else{
            res.json("Reports nuke deployed..")
        }
    })
}