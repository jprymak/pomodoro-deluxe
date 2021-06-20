import React from "react";

import ProgressBar from "./ProgressBar";

import {getTotalCycleLengthInMinutes, getBlockWidth} from "../lib/pureFunctions"

function TaskPreview({ formValue }) {
  const {
    task,
    previewBlocks,
    sessionLengthInMinutes,
    breakLengthInMinutes,
    numberOfSessions,
  } = formValue;
  const totalCycleLengthInMinutes = getTotalCycleLengthInMinutes(numberOfSessions, sessionLengthInMinutes, breakLengthInMinutes);
  const sessionBlockWidth = getBlockWidth(sessionLengthInMinutes, totalCycleLengthInMinutes);
  const breakBlockWidth = getBlockWidth(breakLengthInMinutes, totalCycleLengthInMinutes);
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
