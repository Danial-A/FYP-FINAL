const feedback = require('../models/feedbackModel')


//get all feedbacks
module.exports.get_all_feedbacks = (req,res) =>{
    feedback.find({}).sort({createdAt: -1}).exec((err,feedbacks)=>{
        if(err) res.status(400).json({
            err,
            message:"Error getting feedbacks"
        })
        else{
            res.json(feedbacks)
        }
    })
}

//get feedback by id
module.exports.get_feedback_by_id = (req,res) =>{
    feedback.findById(req.params.id, (err,feedback) =>{
        if(err) res.status(400).json({
            err,
            message:"Error getting feedback"
        })
        else{
            res.json(feedback)
        }
    })
}

//delete feedback
module.exports.delete_feedback = (req,res)=>{
    feedback.findByIdAndDelete(req.params.id, (err,feedback)=>{
        if(err) res.status(400).json({
            err,
            message:"Error removing feedback"
        })
        else{
            res.json({
                message:"Report removed",
                feedback
            })
        }
    })
}

//new feedback 
module.exports.new_feedback = (req,res)=>{
    const {feedbackBody, email, name} = req.body;
    const newFeedback = new feedback({
        feedbackBody, email, name
    })
    newFeedback.save()
    .then(
        res.json({
            feedback:newFeedback,
            message:"Feedback Submitted!"
        })
    )
    .catch(err=>{
        res.status(400).json({
            err,
            message:"Error submitting feedback"
        })
    })
    
}
