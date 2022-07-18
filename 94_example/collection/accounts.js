const mongodb = require("mongodb");
const urm =  "mongodb+srv://bizpoll:0627204800@cluster0.9dbcz.mongodb.net/?retryWrites=true&w=majority";

function connect(){
    return new mongodb.MongoClient(urm).db("study").collection("accounts");
}

async function insertOne(obj){
    const accounts = connect();

    let rst = await accounts.insertOne(obj);
    return rst;
}

async function findAll(){
    const accounts = connect();

    return await accounts.find().toArray();
}

async function findById(val){
    const accounts = connect();

    let obj =  await accounts.findOne({id : val});
    return obj;
}

async function deleteById(id){
    const accounts = connect();

    let rst =  await accounts.deleteOne({_id : new mongodb.ObjectId(id)});
    return rst;

}

async function updateById(id,obj){
    const accounts = connect();

    let result = await guestbook.updateOne({_id : new mongodb.ObjectId(id)},{$set  : {
        "id" : obj.id,
        "pw" : obj.pw,
        "email" : obj.email,
        "name" : obj.name,
        "contact" : obj.contat,
        "birth" : obj.birth,
        "log" : obj.log
    }});
    return result;    
}

//객체를 exports한다.
module.exports = {
    insertOne,    findAll,    findById,    deleteById,    updateById,
};
