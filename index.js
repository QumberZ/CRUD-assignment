const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db");


//middleware
app.use(cors())
app.use(express.json())


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
