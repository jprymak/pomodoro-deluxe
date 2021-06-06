import React from "react";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";

import Button from "./Button";

function CurrentSession({ onStart, onStop, onTogglePause, currentSession, elapsedTimeInSeconds, isPaused}) {
  const {
    sessionLengthInMinutes,
    numberOfSessions,
    previewBlocks,
    task,
    breakLengthInMinutes,
    isRunning
  } = currentSession;


  const totalCycleLengthInSeconds =
    (numberOfSessions * sessionLengthInMinutes +
      breakLengthInMinutes * (numberOfSessions - 1)) *
    60;

  const totalCycleLengthInMinutes =
    numberOfSessions * sessionLengthInMinutes +
    breakLengthInMinutes * (numberOfSessions - 1);
    
  const sessionBlockWidth =
    (sessionLengthInMinutes / totalCycleLengthInMinutes) * 100;

  const breakBlockWidth =
    (breakLengthInMinutes / totalCycleLengthInMinutes) * 100;

  const timeLeftInSeconds = totalCycleLengthInSeconds - elapsedTimeInSeconds;

  const currentWidth =
    ((totalCycleLengthInSeconds - timeLeftInSeconds) /
      totalCycleLengthInSeconds) *
    100;

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
