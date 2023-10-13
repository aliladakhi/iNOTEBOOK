import React from "react";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./Components/About";
import NoteState from "./Context/Notes/Notestate";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

export default function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert message= "this is a nice message"/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}
