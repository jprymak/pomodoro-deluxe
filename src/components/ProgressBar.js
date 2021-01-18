function ProgressBar(props) {
  const {
    task,
    sessionLengthInMinutes,
    breakLengthInMinutes,
    previewBlocks,
    sessionBlockWidth,
    breakBlockWidth
  } = props;
  
  return (
    <div className="h-40 w-full">
      <h2 className="mx-auto w-full text-center mb-2">{task}</h2>
      <div className="w-96 border-2 border-solid border-black rounded-md h-3/6 p-1 flex">
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
      
    </div>
  );
}

export default ProgressBar;