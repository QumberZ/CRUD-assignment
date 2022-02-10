const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db");

//middleware
app.use(cors())
app.use(express.json()) 


 



//register
app.post("/register" , async (req, res) => {
 
try {
const username = req.body.username;
const password = req.body.regpassword;
const newUser = await pool.query(
    "INSERT INTO usertable (username, regpassword) VALUES ($1, $2) RETURNING * " ,
    [username, password]);
    res.json(newUser.rows[0]);
} catch (err) {
    console.error(err.message)
    
}


});



//login

app.post("/login" , async (req, res) => {

try {
 console.log(req.body);   
const username = req.body.username;
const password = req.body.password;
const returningUser = await pool.query(
    "SELECT * FROM usertable WHERE username = $1 AND regpassword = $2;" ,
    [username, password] 
)
    if(returningUser.rows.length){
        console.log(returningUser)
        res.send(returningUser.rows);
    }
    res.send({error: {message: "incorrect login"}}); 
} catch (err) {
    console.error(err.message)

} 

})
   


//Routes
// create a todo
app.post("/todos" , async (req, res) => {
try {
    console.log(req.body)
const {desciption} = req.body;
const newTodo = await pool.query(
    "INSERT INTO todo (desciption) VALUES($1) RETURNING *", 
[desciption]
);

res.json(newTodo.rows[0]);
} catch (err) {
    console.error(err.message);
}





})

// get all todo


app.get("/todos" , async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * From todo")
        res.json(allTodos.rows);


    } catch (err) {
        console.error(err.message)
    }



})

// get a todo

app.get("/todos/:id" , async(req, res) => {
try {
    
const {id} = req.params;
const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])

res.json(todo.rows[0])

} catch (err) {
    console.error(err.message)
}

})


// update a todo


app.put("/todos/:id", async(req, res) => {

    try {
        const {id} = req.params;
        const {desciption} =  req.body;
        const updateTodo = await pool.query("UPDATE todo SET desciption = $1 WHERE todo_id = $2", 
        [desciption, id]
        );
        
        res.json("Todo was updated!");

    } catch (err) {
        console.error(err.message)
    }
})


//delete a todo

app.delete("/todos/:id", async (req, res) => {

    try {
        
const {id} = req.params;
const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id
]);

res.json("Todo was deleted!")
 
    } catch (err) {
        console.error(message)
    }
})







app.listen(5000, () => {
    console.log("server has started on port 5000");

});
