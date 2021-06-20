import React from "react";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";

import Button from "./Button";

import {getTotalCycleLengthInMinutes, getBlockWidth, getTotalCycleLengthInSeconds, getTimeLeftInSeconds, getCurrentWidth} from "../lib/pureFunctions"

function CurrentSession({ onStart, onStop, onTogglePause, currentSession, elapsedTimeInSeconds, isPaused}) {
  const {
    sessionLengthInMinutes,
    numberOfSessions,
    previewBlocks,
    task,
    breakLengthInMinutes,
    isRunning
  } = currentSession;


  const totalCycleLengthInSeconds = getTotalCycleLengthInSeconds(numberOfSessions, sessionLengthInMinutes, breakLengthInMinutes);
    
  const totalCycleLengthInMinutes = getTotalCycleLengthInMinutes(numberOfSessions, sessionLengthInMinutes, breakLengthInMinutes);
  
  const sessionBlockWidth = getBlockWidth(sessionLengthInMinutes, totalCycleLengthInMinutes);
   
  const breakBlockWidth = getBlockWidth(breakLengthInMinutes, totalCycleLengthInMinutes);

  const timeLeftInSeconds = getTimeLeftInSeconds(totalCycleLengthInSeconds, elapsedTimeInSeconds);

  const currentWidth = getCurrentWidth(totalCycleLengthInSeconds, timeLeftInSeconds);

  return (
    <div className="current-session">
      <h1 className="current-session__heading">
        Current Session {isPaused ? "(Paused)" : ""}
      </h1>
      <Timer timeLeftInSeconds={timeLeftInSeconds} />
      <ProgressBar
        isPaused={isPaused}
        sessionLengthInMinutes={sessionLengthInMinutes}
        breakLengthInMinutes={breakLengthInMinutes}
        sessionBlockWidth={sessionBlockWidth}
        breakBlockWidth={breakBlockWidth}
        previewBlocks={previewBlocks}
        task={task}
        currentWidth={currentWidth}
      />
      <div className="current-session__buttons">
        <Button role="Start" isRunning={isRunning} onClick={onStart} />
        <Button role="Stop" isRunning={isRunning} onClick={onStop} />
        <Button
          role="Pause/Resume"
          isRunning={isRunning}
          isPaused={isPaused}
          onClick={onTogglePause}
        />
      </div>
    </div>
  );
}

function CurrentSessionEmpty(){
  return (
    <div className="current-session">
      <h1 className="current-session__heading">
        No active tasks
      </h1>
    </div>
  );
}

export {CurrentSession, CurrentSessionEmpty};
