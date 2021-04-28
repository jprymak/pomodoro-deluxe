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
    <React.Fragment>
    <h2 className="progress-bar__task-name">Preview</h2>
    <div className="progress-bar">
      <h2 className="progress-bar__task-name">{task}</h2>
      <div className="progress-bar__bar">
      <div className="session-blocks">
        {previewBlocks.map((block) => {
          return block === "session" ? (
            <div key={uuidv4()} style={{width: `${sessionBlockWidth}%` }} className="session-block session-block--session" >
              <p className="session-block__length session-block__length--black">{sessionLengthInMinutes}</p>
                
            </div>
            
          ) : (
            <div key={uuidv4()} style={{width: `${breakBlockWidth}%` }} className="session-block session-block--break" >
              <p className="session-block__length session-block__length--white">{breakLengthInMinutes}</p>
              
            </div>
            
          );
        })}
      </div>
      </div>
    </div>
    </React.Fragment>
  );
}

export default TaskPreview;
