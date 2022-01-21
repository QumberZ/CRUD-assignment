import React, {Fragment, useState} from 'react'

const EditTodo = ({todo}) => {

    const [desciption, setDesciption] = useState(todo.desciption);


    //edit desciption function
const updateDesciption = async (e) => {
    e.preventDefault();
 try {

    const body = {desciption};
    const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}` , {
        method: "PUT",
        headers: {"Content-Type": "application/json"} ,
        body: JSON.stringify(body)

    })
window.location = "/"
  //  console.log(response);
 } catch (err) {
     console.error(err.message)
 }
}

    //console.log(todo)
    return (
    <Fragment>
<button type="button" className="btn btn-warning" data-toggle="modal" data-target= {`#id${todo.todo_id}`}>
  Edit
</button>
{/* 
id = id10
*/}

<div 
className="modal" 
id= {`id${todo.todo_id}`}
onClick={() => setDesciption(todo.desciption)}
>
  <div className="modal-dialog">
    <div className="modal-content">


      <div className="modal-header">
        <h4 className="modal-title">Edit Todo </h4>
        <button 
        type="button" 
        className="close"
         data-dismiss="modal" 
         onClick={() => setDesciption(todo.desciption)}
        >&times;
        </button>
      </div>

      <div className="modal-body">
        <input type= "text" className=" form-control" value = {desciption} onChange={e => 
            setDesciption(e.target.value)}
            />
      </div>

      <div className="modal-footer">

      <button type="button" 
        className="btn btn-warning"
         data-dismiss="modal"
         onClick={e => updateDesciption(e)}
         >
            Edit</button> 

        <button type="button" 
        className="btn btn-danger"
         data-dismiss="modal"
         onClick={() => setDesciption(todo.desciption)}
         >
            Close</button>
      </div>

    </div>
  </div>
</div>

    </Fragment>


    )
}
export default EditTodo