function TaskPreview() {
  return (
    <div className="h-20 w-full">
        <h2 className="mx-auto w-full text-center mb-2">Preview</h2>
      <div className="w-full border-2 border-solid border-black rounded-md h-3/6 p-1 flex">
        <div className="h-full w-1/6 bg-black"></div>
        <div className="h-full w-2/6 bg-red-400"></div>
        <div className="h-full w-1/6 bg-black"></div>
        <div className="h-full w-2/6 bg-red-400"></div>
      </div>
      <div className="flex justify-around">
      <button className="p-1 self-center border-solid border-2 border-black rounded-md mt-4 w-20" disabled>
        Start
      </button>
      <button className="p-1 self-center border-solid border-2 border-black rounded-md mt-4 w-20" disabled>
        Pause
      </button>
      </div>
    </div>
  );
}

export default TaskPreview;
