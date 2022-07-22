const mongodb = require("mongodb");
const urm =  "mongodb+srv://bizpoll:0627204800@cluster0.9dbcz.mongodb.net/?retryWrites=true&w=majority";

//connection
function accountConnect(){
    return new mongodb.MongoClient(urm).db("study").collection("accounts");
}

function articleConnect(){
    return new mongodb.MongoClient(urm).db("study").collection("article");
}

//Account && Profile
async function insertOne(obj){
    const accounts = accountConnect();

    let rst = await accounts.insertOne(obj);
    return rst;
}

async function findAll(){
    const accounts = accountConnect();

    return await accounts.find().toArray();
}

async function findById(val){
    const accounts = accountConnect();

    let obj =  await accounts.findOne({id : val});
    return obj;
}

async function deleteById(id){
    const accounts = accountConnect();

    let rst =  await accounts.deleteOne({_id : new mongodb.ObjectId(id)});
    return rst;

}

async function updateById(val,obj){
    const accounts = accountConnect();

    let result = await accounts.updateOne({id : val},{$set  : {
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
    return await accountConnect().updateOne({id : userId}, {$set : {"image" : url}});
                                    //이 아이디 값의 저장공간에서 image라는 저장공간에 url를 저장시킨다.
}

//Article
async function insertArticle(obj){
    const article = articleConnect();

    let rst = await article.insertOne(obj);
    return rst;
}

async function findAllArticle(){
    const article = articleConnect();

    return await article.find().sort("createdAt",-1).toArray();
}

async function findByIdArticle(valId,valUniqeid){
    const article = articleConnect();
    if(valUniqeid){
        return await article.find({writerId : valId, _id : new mongodb.ObjectId(valUniqeid)}).sort("createdAt",-1).toArray();
    }
    else{
        return await article.find({writerId : valId}).sort("createdAt",-1).toArray();
    }
}

async function deleteByIdArticle(valUniqeid){
    const article = articleConnect();

    let rst =  await article.deleteOne({_id :  new mongodb.ObjectId(valUniqeid)});
    return rst;

}

async function insertArticleComment(valUniqeid,obj){
    const article = articleConnect();

    return await article.updateOne({_id : new mongodb.ObjectId(valUniqeid)}, {$push : {"comments": obj }} )
}

async function deleteArticleComment(valUniqeid,cmt_id){
    const article = articleConnect();

    // return await article.findOneAndUpdate({_id : new mongodb.ObjectId(valUniqeid)}, {$pull : {"comments": {"cmd_id" : cmt_id} }})
    return await article.updateOne({_id : new mongodb.ObjectId(valUniqeid)}, {$pull : { comments : {cmt_id : cmt_id} }} );
}

//객체를 exports한다.
module.exports = {
    //account
    insertOne,     findAll,        findById,         deleteById,         updateById,            updateUserImage ,
    //article
    insertArticle , findAllArticle, findByIdArticle, deleteByIdArticle , insertArticleComment , deleteArticleComment
};
