import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = async (e) => {
    // Save changes logic goes here
    // For now, let's just log the updated description
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:8000/todos/${todo.todo_id}`,
        {
          method: "Put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      setShowModal(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <button
        className="text-white font-bold uppercase text-sm rounded hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      {showModal && (
        <Fragment>
          <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Todo</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-45 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleCloseModal}
                  >
                    <span className=" text-black  h-6 w-6 text-2xl opacity-100 block ">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <input
                    type="text"
                    className="text-black h-10 w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default EditTodo;
