
const movies = [
    {id : "mv01", name : "토르 - 러브 앤 썬더", img :"/static/85999_320.jpg"},
    {id : "mv02", name : "탑건 메버릭", img :"/static/85999_320.jpg"},
    {id : "mv01", name : "토르 - 러브 앤 썬다", img :"/static/85999_320.jpg"},
    {id : "mv01", name : "토르 - 러브 앤 썬다", img :"/static/85999_320.jpg"},

]
/*
    list.ejs 랜더링 할 때 이 배열을 넘겨주고 난 후


    for(let i = 0; i<movies.length; i++){
        <laber><%= movies[i].name %></label>
        <a href = "/seat?code=<%=movies[i].name%>">
            <img src = "<%=movies[i].img%>">
    }
*/