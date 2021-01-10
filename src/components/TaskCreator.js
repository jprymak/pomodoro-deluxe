function TaskCreator() {
  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <form className="flex flex-col items-start justify-start p-2 border-2 border-solid border-black rounded-md">
        <label htmlFor="" className="my-1 w-full flex justify-between">
          What are you doing?
          <input className="outline-black ml-3 px-1" type="text" />
        </label>
        <label htmlFor="" className="my-1 w-full flex justify-between">
          Set session length in minutes
          <input className="outline-black ml-3 px-1" type="number" />
        </label>
        <label htmlFor="" className="my-1 w-full flex justify-between">
          Set break length in minutes
          <input className="outline-black ml-3 px-1" type="number" />
        </label>
        <label htmlFor="" className="my-1 w-full flex justify-between">
          Number of sessions
          <input className="outline-black ml-3 px-1" type="number" />
        </label>
        <button className="p-1 self-center border-solid border-2 border-black rounded-md mt-4">Accept</button>
      </form>
    </div>
  );
}

export default TaskCreator;
