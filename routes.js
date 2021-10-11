const express = require('express');
const Review = require('./models/Review');

const router = express.Router()

router.get("/reviews", async (req, res) => {
    const reviews = await Review.find({}, 'author subject rating content');
    res.send({listPosts: reviews})
})

router.get("/reviews/aggregation", async (req, res) => {
    var match = { subject: "COMP1511" };

    var group = {
        _id: "$subject",
        average: { $avg: "$rating"},
        count: { $sum: 1 }
    }

    var reviews = await Review.aggregate([{ $match: match }, { $group : group }])
    res.send({reviewList: reviews});
})

router.post("/reviews", async (req, res) => {
    var d = new Date();

    const review = new Review({
        author: req.body.author,
        subject: req.body.subject,
        rating: req.body.rating,
        content: req.body.content,
        date: d.toLocaleString()
    })

    await review.save();
    res.send(review);
})

router.get("/reviews/find", async (req, res) => {
    const reviews = await Review.find({$or: [{author: req.query.searchTerm}, {subject: req.query.searchTerm}]}, 'author subject rating content')
    res.send({listReviews: reviews});
})



router.get("/reviews/:reviewID", async (req, res) => {
    try {
        const review = await Review.findOne({_id: req.params.reviewID}, 'author subject rating content date');
        res.send(review);
    } catch {
        res.status(404);
        res.send({error: "Review not found"});
    }
})

router.delete("/reviews/:reviewID", async(req,res) =>{
    try {
        Review.deleteOne({_id: req.params.reviewID})
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({error: "Review not found"})
    }
})

router.patch("/reviews/:reviewID", async (req, res) => {
    try {
        var review = await Review.findOne({ _id: req.params.reviewID });
        review.content = req.body.content;
        await review.save();
        res.send(review);
    } catch {
        res.status(404);
        res.send({error: "Reivew not found"});
    }
})



module.exports = router