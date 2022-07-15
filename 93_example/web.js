const express = require("express");
const path = require("path");
const { MongoClient, MongoDBNamespace } = require("mongodb");
const urm =  "mongodb+srv://bizpoll:0627204800@cluster0.9dbcz.mongodb.net/?retryWrites=true&w=majority";

app = express();

//셋팅
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"view"));

//미들웨어
app.use(express.urlencoded({"extended":true}));

//라우팅
app.get("/",(req,res)=>{
    res.render("index",{

    })
})

app.route("/write")
    .get((req,res)=>{
        new mongodb.ObjectId(); //이것을 이용해야지 _id를 통해서 얻어낼 수 있다.
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
            log : Date(Date.now()),
        };

        console.log(save);
        const client = new MongoClient(urm);
        const visitors = client.db("study").collection("visitors");

        visitors.insertOne(save).then(result=>{
            console.log(result.acknowledged);
        }).finally(()=>{
            client.close();
            res.redirect("/list");
        })
    })

app.get("/list",async(req,res)=>{
    const client = new MongoClient(urm);
    const visitors = client.db("study").collection("visitors");

    const list = await visitors.find().toArray();

    res.render("list",{list})

    client.close();
})

app.listen(8080)