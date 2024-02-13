import React, { Fragment } from "react";
import InpuTodo from "./components/InpuTodo";
import ListTodo from "./components/ListTodo";

function App() {
  const gradientStyle = {
    background: "linear-gradient(120deg, #a1c4fd, #c2e9fb)", // Gradient colors
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif", // Font family
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    color: "black",
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: "2.5rem",
    marginBottom: "20px",
    animation: "colorChange 5s infinite alternate", // Color animation
  };

  return (
    <div style={gradientStyle}>
      <Fragment>
        <div className="">
          <h1 style={headingStyle}>Welcome to My Beautiful Todo App</h1>
          <InpuTodo />
          <ListTodo />
        </div>
      </Fragment>
    </div>
  );
}

export default App;
