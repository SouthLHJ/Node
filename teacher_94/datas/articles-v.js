const mongodb = require("mongodb");
const uri = "mongodb+srv://edupoll:1q2w3e4r@cluster0.lc7bymt.mongodb.net/?retryWrites=true&w=majority";

function getCollection() {
    return new mongodb.MongoClient(uri).db("example").collection("artices");
}

module.exports.add = async function (article) {
    return await getCollection().insertOne(article)
}

module.exports.getAll = async function() {
    return await getCollection().find({}).sort("createdAt", -1).toArray();
}

exports.getVisibleSome =async function(userId) {
    const query = {"$or" : [{writerId : userId },  {  type : "public" } ] };
    return await getCollection().find(query).sort("createdAt", -1).toArray();
}

exports.getByWriter = async function (writerId) {
    return await getCollection().find({writerId : writerId }).sort("createdAt", -1).toArray();
}

exports.getById = async function(targetId) {
    return await getCollection().find({_id : new mongodb.ObjectId(targetId)}).toArray();
}



