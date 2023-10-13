import React, { useState } from "react";

function Login() {
    const [cred,setCred]=useState({email:"",password:""})
const submitHandle= async (e)=>{
    try{
    const response=await fetch("http://localhost:5000/api/auth/login",{
        method:'POST',
        header:{
            'content-Type':'application/json'
        },
        body: JSON.stringify({
            email: cred.email,
            password: cred.password
          })
    })


    if (response.ok) {
        const json = await response.json();
        console.log(json);
      } else {
        console.error("Error in fetch request:", response.status);
      }
    }catch (error) {
      console.error("An error occurred:", error);
    }


}
const changeHandlePass=(e)=>{
    setCred({...cred,password: e.target.value})
}
const changeHandle=(e)=>{
    setCred({...cred,email: e.target.value})
}
  return (
    <div>
      <form >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
          onChange={changeHandle}
          value={cred.email}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
          value={cred.password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={changeHandlePass}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={submitHandle}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
