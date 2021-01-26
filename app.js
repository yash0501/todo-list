const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let tasks = [];
let complete = [];

app.get("/", (req, res)=>{
    res.render("index", {tasks: tasks, complete: complete});
})

app.post("/addtask", (req, res)=>{
    tasks.push(req.body.task);
    res.redirect("/");
})

app.post("/removetask", (req, res)=>{
    let completeTask = req.body.check;
    if(typeof completeTask ==="string"){
        complete.push(completeTask);
        tasks.splice(tasks.indexOf(completeTask), 1);
    }
    else if(typeof completeTask === "object"){
        completeTask.forEach(completed => {
            complete.push(completed);
        tasks.splice(tasks.indexOf(completed), 1);
        });
    }
    res.redirect("/");
})

app.listen(3000, ()=>{
    console.log("App listening to PORT 3000...");
})