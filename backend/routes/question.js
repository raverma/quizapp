const express = require('express');
//const multer = require('multer');
const Question = require('../models/question');
const { register } = require('ts-node');

const router = express.Router();
/*const storage = multer.diskStorage({
    destination: (req, file, cb) =>
     {
        cb(null, "backend/question/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.toLowerCase().replace(' ','-')) ;
    }
});*/

router.post('/api/questions', (req, res, next)=> {
    const url = req.protocol + "://" + req.get("host");
    let imagePath = null;
    if (!req.file==undefined){
        imagePath =url + "/images/question/" + req.file.filename;
    }
    console.log(req.body);
    const question = new Question({
        type: req.body.type,
        category: req.body.category,
        text: req.body.text,
        maxScore: req.body.score,
        imagePath: imagePath 
          
    });

    question.save().then((result)=>{
        res.status(201).json(
            {   message: "Your question has been added", 
                post: {
                    id: result._id,
                    type: result.type,
                    category: result.category,
                    text: result.text,
                    score: result.maxScore,
                    imagePath: result.imagePath
                }
            }
    )});
});


router.get('/api/questions',(req, res, next )=> {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const questionQuery = Question.find();
    let fetchedDocuments;
    if (pageSize && currentPage) {
        questionQuery
            .skip(pageSize * (currentPage - 1) )
            .limit(pageSize);
    }
    questionQuery
    .then((documents)=>{
        fetchedDocuments = documents;
        return Question.countDocuments();
    })
    .then(count => {
        res.status(200).json({
            message: "Questions fetched successfully",
            questions: fetchedDocuments,
            questionCount: count
        });
    })
    .catch((err) => {
        console.log(err);
        return;
    });

 
});

module.exports = router;