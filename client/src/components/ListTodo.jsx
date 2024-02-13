import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./editTodo";

function ListTodo() {
  const [todo, setTodos] = useState([]);
  const [delet, setDelet] = useState("");

  // Get all todos from server

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:8000/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Delele a todo
  const deleteTodo = async (id) => {
    try {
      const del = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
      });
      console.log(del);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, [todo]);

  return (
    <Fragment>
      <div className="container mx-auto mt-16">
        <h1 className="text-3xl font-bold mb-4 text-center">Todo List</h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todo.map((item) => (
                <tr key={item.todo_id} className="border-b">
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200">
                      <EditTodo todo={item} />
                    </button>
                    <button
                      onClick={() => deleteTodo(item.todo_id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:ring-red-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default ListTodo;
