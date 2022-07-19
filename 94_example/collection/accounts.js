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

async function updateById(val,obj){
    const accounts = connect();

    let result = await guestbook.updateOne({id : val},{$set  : {
        "id" : obj.id,
        "pw" : obj.pw,
        "email" : obj.email,
        "name" : obj.name,
        "contact" : obj.contact,
        "birth" : obj.birth,
        "log" : obj.log
    }});
    return result;    
}

async function updateUserImage(userId, url){
    return await connect().updateOne({id : userId}, {$set : {"image" : url}});
                                    //이 아이디 값의 저장공간에서 image라는 저장공간에 url를 저장시킨다.
}

//객체를 exports한다.
module.exports = {
    insertOne,    findAll,    findById,    deleteById,    updateById, updateUserImage
};
