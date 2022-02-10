import React, {Fragment, useState} from "react"
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
//import Register from "./components/register";
import Axios from "axios";


function App() {
const [usernameReg, setUsernameReg] = useState("")
const [passwordReg, setPasswordReg] = useState("")

const [usernameLog, setUsernameLog] = useState("")
const [passwordLog, setPasswordLog] = useState("")

const [loginStatus, setLoginStatus] = useState("")
const register = () => {
Axios.post("http://localhost:5000/register", {
  username: usernameReg,
  password: passwordReg,
}).then((response) => {
  console.log(response)
});

};




const login = () => {
  Axios.post("http://localhost:5000/login", {
    username: usernameLog,
    password: passwordLog,
  }).then((response) => {
    console.log(response)
    if(response.data.error){
      setLoginStatus(response.data.error.message)
    } else {
      setLoginStatus(response.data[0].username)
    }

  });
  
  };

  return (
  <Fragment> 

    <div className="container">
    <InputTodo /> 
    <ListTodos/>
    </div>
{/* 
    <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </BrowserRouter>
   */}
   <div className="container mt-5">
        <div className="text-center mt-2">
    
<div className="Signup">
    <h1> Signup</h1>
    <label 
    type="Username" 
    className="form-label">
    Username:{" "}
    </label>

    <input 
    type="text"
    className=" form-control"
    placeholder=" Enter Username..."
    onChange={(e) => {
        setUsernameReg(e.target.value);
    }}
    />
    </div>



   



<label 
text = "password"
text="passwordSign" 
className="form-label mt-2"> 
Password:{" "}
</label>
<input
type="password"
 className="mb-3"
 className="form-control"
 placeholder="Enter Password..."
onChange={(e) => {
    setPasswordReg(e.target.value)
}}
/>
<button 
onClick={register}
 className="btn btn-primary mt-3">
     {" "} Sign up {" "} 
     </button>
</div>


        





<div className="container mt-5">
        <div className="text-center mt-2">
          <div className="">
            <h1> Login </h1>
            <label type ="Username" className="form-label">
              Username:{" "}
            </label>
            <input
              text="text"
              className=" form-control"
              placeholder=" Username..."
              onChange={(e) => {
                setUsernameLog(e.target.value);
              }}
            />
          </div>

          <label type="password" className="form-label mt-2">
            Password:{" "}
          </label>
          <input
          type="password"
            className="mb-3"
            className="form-control"
            placeholder="Password..."
            onChange={(e) => {
              setPasswordLog(e.target.value);
            }}
          />

          <button onClick={login} className="btn btn-primary mt-3">
            {" "}
            Login{" "}
          </button>
        </div>
        </div>
        <h1> {loginStatus}</h1>

</div>
</Fragment>
  );  
  }

export default App;
