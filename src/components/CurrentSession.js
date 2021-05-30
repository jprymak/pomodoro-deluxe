import React, { useState, useRef, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import breakEndsAlarmSfx from "../sounds/316837__lalks__alarm-02-short.wav";
import sessionEndsAlarmSfx from "../sounds/320492__lacezio__clock-chime.wav";
import Button from "./Button";

function CurrentSession({ saveState, currentSession }) {
  const {
    sessionLengthInMinutes,
    numberOfSessions,
    previewBlocks,
    task,
    breakLengthInMinutes,
    alarmTimeStamps,
  } = currentSession;

  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(
    currentSession.elapsedTimeInSeconds
  );
  const [isRunning, setIsRunning] = useState(currentSession.isRunning);
  const [isPaused, setIsPaused] = useState(currentSession.isPaused);
  const [isPlaying, setIsPlaying] = useState(currentSession.isPlaying);
  const [nextTimeStampIndex, setNextTimeStampIndex] = useState(
    currentSession.nextTimeStampIndex
  );
  const [nextTimeStamp, setNextTimeStamp] = useState(
    alarmTimeStamps[nextTimeStampIndex]
  );

  const intervalID = useRef();
  const audioRef = useRef();
  const stateRef = useRef();

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

  /// MOUNTING
  useEffect(() => {
    if (isRunning === true && !isPaused) {
      startTimer();
    }
  }, [isRunning, isPaused]);

  /// UPDATE
  useEffect(() => {
    function checkIfAlarmIsToBeSetOff() {
      const conditions = [
        elapsedTimeInSeconds >= nextTimeStamp.timeStamp,
        elapsedTimeInSeconds < nextTimeStamp.timeStamp + 5,
      ];

      if (conditions.every((condition) => condition === true)) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
      if (elapsedTimeInSeconds >= nextTimeStamp.timeStamp + 5) {
        setNextTimeStampIndex((prev) => prev + 1);
      }
    }

    checkIfAlarmIsToBeSetOff();
    if (elapsedTimeInSeconds >= totalCycleLengthInSeconds) {
      stopTimer();
    }

    stateRef.current = {
      elapsedTimeInSeconds,
      isRunning,
      isPaused,
      isPlaying,
      nextTimeStampIndex,
      nextTimeStamp,
    };
  }, [
    elapsedTimeInSeconds,
    isRunning,
    isPaused,
    isPlaying,
    nextTimeStampIndex,
    nextTimeStamp,
    totalCycleLengthInSeconds,
  ]);

  /// UNMOUNTING
  useEffect(() => {
    return () => {
      saveState(stateRef.current);
      window.clearInterval(intervalID.current);
    };
  }, [saveState]);

  function startTimer() {
    if (!intervalID.current) {
      intervalID.current = window.setInterval(() => {
        setElapsedTimeInSeconds((prev) => prev + 1);
      }, 1000);
    }
  }

  function resetTimeStamp() {
    setNextTimeStamp(alarmTimeStamps[0]);
  }

  function handleStart() {
    setIsRunning(true);
    startTimer();
  }

  function stopTimer() {
    window.clearInterval(intervalID.current);
    intervalID.current = null;
  }

  function handleStop() {
    stopTimer();
    setElapsedTimeInSeconds(0);
    setIsRunning(false);
    setIsPaused(false);
    resetTimeStamp();
  }

  function togglePause() {
    setIsPaused((prev) => {
      if (isPaused) {
        startTimer();
      } else {
        stopTimer();
      }
      return !prev;
    });
  }

  function playAlarm() {
    if (isPlaying) {
      let audioSrc = null;
      if (nextTimeStamp.status === "sessionEnded") {
        audioSrc = sessionEndsAlarmSfx;
      } else {
        audioSrc = breakEndsAlarmSfx;
      }
      return (
        <audio
          ref={audioRef}
          src={audioSrc}
          autoPlay
          loop={elapsedTimeInSeconds < totalCycleLengthInSeconds ? true : false}
        ></audio>
      );
    }
  }

  const currentWidth =
    ((totalCycleLengthInSeconds - timeLeftInSeconds) /
      totalCycleLengthInSeconds) *
    100;

  return (
    <div className="current-session">
      <h1 className="current-session__heading">
        Current Session {isPaused ? "(Paused)" : ""}
      </h1>
      {isPlaying
        ? playAlarm(elapsedTimeInSeconds, totalCycleLengthInSeconds)
        : null}

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
        <Button role="Start" isRunning={isRunning} onClick={handleStart} />
        <Button role="Stop" isRunning={isRunning} onClick={handleStop} />
        <Button
          role="Pause/Resume"
          isRunning={isRunning}
          isPaused={isPaused}
          onClick={togglePause}
        />
      </div>
    </div>
  );
}

export default CurrentSession;
