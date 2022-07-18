const express = require("express");
const path = require("path");

const guestbook = require("./collectoins/guestbook");

app = express();

//셋팅
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"view"));

//미들웨어
app.use(express.urlencoded({"extended":true}));

// app.use("/guestbook",guestbookRouter); ??????????????????????????????????????????????????????????????

//라우팅
app.get("/",(req,res)=>{
    res.render("index",{
    })
})

app.route("/write")
    .get((req,res)=>{
        res.render("write",{
        })

    })
    .post((req,res)=>{
        let nick = req.body.nick;
        let password = req.body.password;
        let comment = req.body.textarea;

        const save = {
            name : nick,
            password : password,
            comment : comment,
            log : new Date().toLocaleString(),
        };

        guestbook.insertOne(save).then(rst =>{
            console.log(rst)
        }).finally(()=>{
            res.redirect("/list");
        })
    })

app.route("/list")
    .get(async(req,res)=>{
        const list = await guestbook.findAll();
        res.render("list",{list})
    })
    .post(async(req,res)=>{
        

        guestbook.deleteById(req.body.id).then(rst=>{
            console.log(rst);
        }).finally(()=>{
            res.redirect("/list");
        })
    })


app.route("/update")
    .get((req,res)=>{
        guestbook.findById(req.query.id).then(data=>{
            res.render("update",{
                id : data._id,
                name : data.name,
                password : data.password,
                comment : data.comment,
            })
        })
    })
    .post((req,res)=>{
        let name = req.body.name;
        let password = req.body.password;
        let comment = req.body.textarea;

        const save = {
            name : name,
            password : password,
            comment : comment,
            log : new Date().toLocaleString(),
        };  
        console.log(save)
        guestbook.updateById(req.body.id, save).then(rst =>{
            console.log(rst)

        }).finally(()=>{
            res.redirect("/list");
        })
    })

app.listen(8080)