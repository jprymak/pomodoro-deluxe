import React from "react";
import { v4 as uuidv4 } from "uuid";

import ProgressBar from "./ProgressBar";

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
    <ProgressBar
    task={task}
    sessionLengthInMinutes={sessionLengthInMinutes}
    breakLengthInMinutes={breakLengthInMinutes}
    previewBlocks={previewBlocks}
    sessionBlockWidth={sessionBlockWidth}
    breakBlockWidth={breakBlockWidth}
    />
    </React.Fragment>
  );
}

export default TaskPreview;
