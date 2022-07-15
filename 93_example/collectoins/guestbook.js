const mongodb = require("mongodb");
const urm =  "mongodb+srv://bizpoll:0627204800@cluster0.9dbcz.mongodb.net/?retryWrites=true&w=majority";

function connect(){
    return new mongodb.MongoClient(urm).db("study").collection("visitors");
}

async function insertOne(obj){
    const guestbook =connect();

    let result = await guestbook.insertOne(obj);
    return result;
}

async function findAll(){
    const guestbook = connect();
    return await guestbook.find({}).sort("log",-1).toArray();
                                    //       역 정렬.
}

async function findById(id){
    const guestbook = connect();
    let obj =  await guestbook.findOne({_id : new mongodb.ObjectId(id)});
    return obj;
}

async function deleteById(id){
    const guestbook = connect();
    let result = await guestbook.deleteOne({_id : new mongodb.ObjectId(id)});
    return result;
}

async function updateById(id,obj){
    const guestbook = connect();
    let result = await guestbook.updateOne({_id : new mongodb.ObjectId(id)},{$set  : {
        "comment" : obj.comment,
        "name" : obj.name,
        "password" : obj.password,
        "log" : obj.log

    }});
    return result;
}

//객체를 exports한다.
module.exports = {
    insertOne,    findAll,    findById,    deleteById,    updateById,
};
