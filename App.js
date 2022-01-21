import React, {Fragment, useState} from "react"
import './App.css';
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
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
    if(response.data.message){
      setLoginStatus(response.data.message)
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

  
  <div className="App">
  
  
  <div className="registration">
    <h1> Registration </h1>
<label>Username</label> 
<input 
type="text"
onChange={(e) => {
  setUsernameReg(e.target.value);
}}
/>
<label> Password</label>
<input
type ="text"
onChange={(e) => {
  setPasswordReg(e.target.value);
}}
/>
<button onClick={register}> Register </button>
</div>





<div  className="login">
  <h1>Login</h1>
  <input 
  type="text" 
  placeholder="Username..." 
  onChange={(e) => {
    setUsernameLog(e.target.value);
  }}
   />
  <input
    type= "password"
     placeholder="Password..."
     onChange={(e) => {
      setPasswordLog(e.target.value);
    }}
     />
<button onClick={login}> Login </button>

</div>
<h1> {loginStatus}</h1>
</div>
</Fragment>
  );  
  }

export default App;
