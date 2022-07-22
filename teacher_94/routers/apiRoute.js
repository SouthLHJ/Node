const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const accounts = require("../datas/accounts");
const articles = require("../datas/articles");

router.get("/account/idcheck", async (req, resp) => {
    let found = await accounts.getById(req.query.id);
    let result;
    if (found) {
        result = { "success": false };
    } else {
        result = { "success": true };
    }
    resp.json(result);
});

router.post("/article/comment", async (req, resp) => {
    let targetId = req.body.targetId;   // 원글의 아이디값
    let id = uuid.v4().split("-")[0];
    let comment = {
        _id: id,
        commenterId: req.session.user.id,
        commenterName: req.session.user.name,
        commenterImage: req.session.user.image,
        message: req.body.message,
        createdAt: new Date()
    };
    console.log(comment);
    let result = await articles.addComment(targetId, comment);
    if (result.acknowledged) {
        let found = await articles.getById(targetId);
        resp.json({ "success": true, comments: found.comments });
    } else {
        resp.json({ "success": false });
    }
});

router.get("/article/comment", async (req, resp) => {
    let targetId = req.query.targetId;   // 원글의 아이디값

    let found = await articles.getById(targetId);
    resp.json({ "success": true, comments: found.comments });

});





module.exports = router;