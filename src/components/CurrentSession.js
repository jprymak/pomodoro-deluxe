function CurrentSession({currentSession}) {
  const { task, sessionBlockWidth, sessionLengthInMinutes, breakBlockWidth, breakLengthInMinutes, previewBlocks } = currentSession;
  return (
    <div>
      <div>Current Session</div>
      <div className="h-40 w-full">
        <h2 className="mx-auto w-full text-center mb-2">{task}</h2>
        <div className="w-full border-2 border-solid border-black rounded-md h-3/6 p-1 flex">
          {previewBlocks.map((block) => {
            return block == "session" ? (
              <div
                style={{ width: `${sessionBlockWidth}%` }}
                className="flex flex-col"
              >
                <p className="w-full text-center">{sessionLengthInMinutes}</p>
                <div className="h-full bg-red-400"></div>
              </div>
            ) : (
              <div
                style={{ width: `${breakBlockWidth}%` }}
                className="flex flex-col"
              >
                <p className="w-full text-center">{breakLengthInMinutes}</p>
                <div className="h-full bg-black"></div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-around">
          <button
            className="p-1 self-center border-solid border-2 border-black rounded-md mt-4 w-20"
          >
            Start
          </button>
          <button
            className="p-1 self-center border-solid border-2 border-black rounded-md mt-4 w-20"
          >
            Pause
          </button>
        </div>
      </div>
    </div>
  );
}

export default CurrentSession;
