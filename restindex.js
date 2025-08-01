const express = require("express");
const app = express();
const path = require("path")
const port = 8080;
const { v4 : uuidv4} = require('uuid')
const methodOverride = require("method-override")
// uuidv4(); function to create new id
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,"public")))
// app.use(express.json());
app.use(methodOverride("_method"))

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

let posts = [
    {
        id: uuidv4(),
        username : "Anu",
        content : "nothing just going around",
    },
    {
        id: uuidv4(),
        username : "manu",
        content : "love to vibe code",
    },
    {
        id: uuidv4(),
        username : "Anil",
        content : "enjoying summer weekend at goa",
    }
]

app.get("/posts",(req,res) =>{
    res.render("restindex.ejs",{posts})
})

app.get("/posts/new",(req,res) =>{
    res.render("form.ejs")
});

app.post("/posts",(req,res) =>{
    let {username ,content} = req.body
    let id = uuidv4();
    posts.push({id,username,content});
    //  res.send("post request send");
    res.redirect("/posts")
});

app.get("/posts/:id",(req,res) => {
    let {id} = req.params;
    let post =  posts.find((p) => id === p.id)
    console.log(post);
    res.render("show.ejs",{ post })
  
});

app.patch("/posts/:id",(req,res) =>{
    let { id } = req.params;
    let newContent = req.body.content;
    console.log(newContent);
    
    let post =  posts.find((p) => id===p.id)
    post.content = newContent
    console.log(post);
    res.redirect("/posts")
});
app.get("/posts/:id/edit",(req,res) =>{
    let { id } = req.params;
    let post =  posts.find((p) => id===p.id)
    res.render("edit.ejs",{post})
})
app.delete("/posts/:id",(req,res) =>{
    let {id} = req.params;
    posts = posts.filter((t) => id !== t.id)
    // res.send("delete success")
    res.redirect("/posts")
})
app.listen(port,(req,res) => {
    console.log(`listening on port ${port}`);
})