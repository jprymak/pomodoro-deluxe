function TaskCreatorForm({
  onSubmit,
  task,
  sessionLengthInMinutes,
  breakLengthInMinutes,
  numberOfSessions,
  onTaskNameChange,
  onSessionLengthInMinutesChange,
  onBreakLengthInMinutesChange,
  onNumberOfSessionsChange,
}) {
  return (
    <div className="mx-auto flex items-center justify-center mb-6 ">
      <form
        onSubmit={onSubmit}
        className="w-auto min-w-min flex flex-col items-start justify-start p-2 border-2 border-solid border-black rounded-md"
      >
        <label htmlFor="" className="my-1 w-full flex justify-between w-96">
          What are you doing?
          <input
            value={task}
            onChange={onTaskNameChange}
            className="outline-black ml-3 px-1"
            type="text"
          />
        </label>
        <label htmlFor="" className="my-1 w-full flex justify-between">
          Set session length in minutes
          <input
            value={sessionLengthInMinutes}
            onChange={onSessionLengthInMinutesChange}
            className="outline-black ml-3 px-1"
            type="number"
          />
        </label>
        <label htmlFor="" className="my-1 w-full flex justify-between">
          Set break length in minutes
          <input
            value={breakLengthInMinutes}
            onChange={onBreakLengthInMinutesChange}
            className="outline-black ml-3 px-1"
            type="number"
          />
        </label>
        <label htmlFor="" className="my-1 w-full flex justify-between">
          Number of sessions
          <input
            value={numberOfSessions}
            onChange={onNumberOfSessionsChange}
            className="outline-black ml-3 px-1"
            type="number"
          />
        </label>
        <button className="p-1 self-center border-solid border-2 border-black rounded-md mt-4">
          Accept
        </button>
      </form>
    </div>
  );
}

export default TaskCreatorForm;
