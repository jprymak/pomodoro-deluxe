import React from "react";
import { v4 as uuidv4 } from "uuid";
function TaskPreview({ formValue }) {
  const {
    task,
    previewBlocks,
    sessionLengthInMinutes,
    breakLengthInMinutes,
    numberOfSessions,
  } = formValue;
  const totalCycleLengthInMinutes = numberOfSessions*sessionLengthInMinutes + breakLengthInMinutes *(numberOfSessions-1)
  const sessionBlockWidth = sessionLengthInMinutes/totalCycleLengthInMinutes*100;
  const breakBlockWidth = breakLengthInMinutes/totalCycleLengthInMinutes*100;
  return (
    <div className="h-40 w-full">
      <h2 className="mx-auto w-full text-center mb-2">Preview</h2>
      <h2 className="mx-auto w-full text-center mb-2">{task}</h2>
      <div className="w-full border-2 border-solid border-black rounded-md h-3/6 p-1 flex">
        {previewBlocks.map((block) => {
          return block === "session" ? (
            <div key={uuidv4()} style={{width: `${sessionBlockWidth}%` }} className="flex flex-col" >
              <p className="w-full text-center">{sessionLengthInMinutes}</p>
                <div className="h-full bg-red-400" ></div>
            </div>
            
          ) : (
            <div key={uuidv4()} style={{width: `${breakBlockWidth}%` }} className="flex flex-col"  >
              <p className="w-full text-center">{breakLengthInMinutes}</p>
              <div  className="h-full bg-black" ></div>
            </div>
            
          );
        })}
      </div>
      <div className="flex justify-around">
        <button
          className="p-1 self-center border-solid border-2 border-black rounded-md mt-4 w-20 opacity-40"
          disabled
        >
          Start
        </button>
        <button
          className="p-1 self-center border-solid border-2 border-black rounded-md mt-4 w-20 opacity-40"
          disabled
        >
          Pause
        </button>
      </div>
    </div>
  );
}

export default TaskPreview;
