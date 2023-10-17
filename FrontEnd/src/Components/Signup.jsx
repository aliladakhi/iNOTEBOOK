import React, { useEffect, useState } from "react";
import '../style/Signup.css';

function Signup() {
  const [type,setType]=useState("password");
  const [chk,setcheck]=useState(false);
  const [cred, setCred] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const saveCred = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: cred.username, email: cred.email, password: cred.password })
      });
  
      if (!response.ok) {
        console.error('Response Status:', response.status);
        throw new Error('Server responded with an error');
      }
      
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }




  const valueChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    if(chk){
      setType("text")
    }
    else{
      setType("password")
    }
    console.log(chk)
  }, [chk]);


  const checkchange=(e)=>{
    if(!chk){
    setcheck(true);
    }
    else{
      setcheck(false);
    }
  }
  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            username
          </label>
          <input
            name="username"
            onChange={valueChange}
            value={cred.username}
            type="text"
            className="form-control"
            id="username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            onChange={valueChange}
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
            onChange={valueChange}
            value={cred.password}
            name="password"
            type={type}
            className="form-control"
            id="exampleInputPassword1"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            value={chk}
            onClick={checkchange}
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            show passowrd
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm-password
          </label>
          <input
            disabled={cred.password.length === 0}
            onChange={valueChange}
            value={cred.confirm_password}
            name="confirm_password"
            type={type}
            className={`form-control ${cred.password !== cred.confirm_password && cred.password.length !== 0 ? 'error-focused' : 'okay-focused'}`}
            id="confirm_password"
          />
        </div>
        <button
          disabled={
            !(
              cred.password === cred.confirm_password &&
              cred.password.length !== 0
            )
          }
          type="submit"
          className="btn btn-primary"
          onClick={saveCred}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
