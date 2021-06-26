const report = require('../models/PostReport')
const post = require('../models/postModel')
const user = require('../models/usermodel')

//get all reports
module.exports.get_all_reports = (req,res)=>{
    report.find({}).populate('userid postid').sort({createdAt: 1}).exec((err,reports)=>{
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
        postid:req.params.id,
        userid:req.body.id,
        reason:req.body.reason,
        descrpiton:req.body.description
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