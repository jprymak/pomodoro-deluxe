import { v4 as uuidv4 } from "uuid";

function ProgressBar(props) {
  const {
    task,
    sessionLengthInMinutes,
    breakLengthInMinutes,
    previewBlocks,
    sessionBlockWidth,
    breakBlockWidth,
    isPaused,
    totalCycleLengthInSeconds,
    timeLeftInSeconds,
  } = props;

  const maxWidth = 372;
  const currentWidth =
    (totalCycleLengthInSeconds - timeLeftInSeconds) /
      totalCycleLengthInSeconds * maxWidth

  return (
    <div className={`h-40 w-full ${isPaused ? "opacity-40" : ""}`}>
      <h2 className="mx-auto w-full text-center mb-2">{task}</h2>
      <div className="relative w-96 border-2 border-solid border-black rounded-md h-3/6 p-1 flex">
        <div
          style={{ height: "44px", width: `${currentWidth}px` }}
          className="bg-yellow-400 absolute top-7"
        ></div>
        {previewBlocks.map((block) => {
          return block === "session" ? (
            <div
              key={uuidv4()}
              style={{ width: `${sessionBlockWidth}%` }}
              className="flex flex-col"
            >
              <p className="w-full text-center">{sessionLengthInMinutes}</p>
              <div className="h-full bg-red-400"></div>
            </div>
          ) : (
            <div
              key={uuidv4()}
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
