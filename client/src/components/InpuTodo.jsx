import React, { Fragment } from "react";
import { useState } from "react";

function InpuTodo() {
  const [description, setDescription] = useState("");
  const handleChange = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!description) {
        alert("Please enter a task");
      } else {
        const body = { description };
        const response = await fetch("http://localhost:8000/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        window.location = "/";
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="font-bold text-xl pt-9 text-center">PERN Todo List</h1>

      <form className="mt-4 flex justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add todo..."
          className="border rounded-md px-4 py-2 w-2/4"
          value={description}
          onChange={handleChange}
        />
        <button className=" bg-cyan-600 rounded-lg mx-4 px-4"> Add</button>
      </form>
    </Fragment>
  );
}

export default InpuTodo;
