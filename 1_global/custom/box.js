const circle = {
    radius : 0,
    setRadius : function(r){
        this.radius = r;
    },
    getArea : function(){
        return this. radius ** this.radius *Math.PI;
    }
};

console.log(module.exports);
module.exports = circle;
//exports = circle; 이건 안됨
console.log(module.exports);

/*
    exprots.add === module.exports.add 는 같지만
    exports = {} 를 해버리면 그냥 일반 변수 exports에 객체를 넣는 모양새가 되서
    module에 설정되지않아서 밖에서 File 접근이 불가능해진다.
*/