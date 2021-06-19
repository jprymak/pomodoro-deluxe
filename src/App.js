import React, { useState, useReducer, useRef, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useDispatch, useSelector } from "react-redux";

import TaskCreator from "./components/TaskCreator";
import TaskManager from "./components/TaskManager";
import NavBar from "./components/navbar/NavBar";
import { CurrentSession, CurrentSessionEmpty } from "./components/CurrentSession";
import History from "./components/History";

import breakEndsAlarmSfx from "./sounds/316837__lalks__alarm-02-short.wav";
import sessionEndsAlarmSfx from "./sounds/320492__lacezio__clock-chime.wav";

import { getState, getCurrentTask} from "./reducers/reducers"

import {
  updateTask,
  createTask,
  deleteTask,
  pickTask,
} from "./actions";

function App() {

  const dispatch = useDispatch();

  const state = useSelector(getState)

  const currentSession = useSelector(getCurrentTask)
  
  const {
    sessionLengthInMinutes,
    numberOfSessions,
    breakLengthInMinutes,
    alarmTimeStamps,
    id,
  } = currentSession;

  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(
    currentSession.elapsedTimeInSeconds
  );
  const [isRunning, setIsRunning] = useState(currentSession.isRunning);
  const [isPaused, setIsPaused] = useState(currentSession.isPaused);
  const [isPlaying, setIsPlaying] = useState(currentSession.isPlaying);
  const [nextTimeStampIndex, setNextTimeStampIndex] = useState(1);
  const [nextTimeStamp, setNextTimeStamp] = useState(currentSession.alarmTimeStamps[0]);

  const intervalID = useRef();
  const audioRef = useRef();
  const currentState = useRef();

  const totalCycleLengthInSeconds =
    (numberOfSessions * sessionLengthInMinutes +
      breakLengthInMinutes * (numberOfSessions - 1)) *
    60;

  useEffect(() => {
    
    setElapsedTimeInSeconds(currentSession.elapsedTimeInSeconds)
    setIsRunning(currentSession.isRunning)
    setIsPaused(currentSession.isPaused)
    setIsPlaying(currentSession.isPlaying)
    setNextTimeStampIndex(1)
    setNextTimeStamp(currentSession.alarmTimeStamps[0])

    window.clearInterval(intervalID.current);
      intervalID.current = null;
   
    if (currentSession.isRunning === true && !currentSession.isPaused) {
      startTimer();
    }

  }, [id]);

  /// TICK
  useEffect(() => {
    function checkIfAlarmIsToBeSetOff() {
      const conditions = [
        elapsedTimeInSeconds >= nextTimeStamp.timeStamp,
        elapsedTimeInSeconds < nextTimeStamp.timeStamp + 5,
      ];

      if (conditions.every(condition => condition)) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }

    if (elapsedTimeInSeconds >= nextTimeStamp.timeStamp + 5) {
      setNextTimeStampIndex((prev) => prev + 1);
      setNextTimeStamp(alarmTimeStamps[nextTimeStampIndex]);
    }

    elapsedTimeInSeconds >= totalCycleLengthInSeconds && stopTimer();

    checkIfAlarmIsToBeSetOff();

    currentState.current = {
      elapsedTimeInSeconds,
      isRunning,
      isPaused,
      isPlaying,
      nextTimeStampIndex,
      nextTimeStamp,
    };

    dispatch(updateTask(currentState, id))
  }, [
    elapsedTimeInSeconds,
    isRunning,
    isPaused,
    isPlaying,
    nextTimeStampIndex,
    nextTimeStamp,
    totalCycleLengthInSeconds,
    alarmTimeStamps,
    id
  ]);

  /// UNMOUNTING
  useEffect(() => {
    return () => {
      
      window.clearInterval(intervalID.current);
    };
  }, []);


  //////////////////////////////////////////////////////////////////////////////
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

  ////////////////////////////////////

  const handleTaskCreation = (newTask) => {
    dispatch(createTask(newTask))
  };

  const handleTaskPick = (task, indexToRemove) => {
    dispatch(pickTask(task, indexToRemove))
  };

  const handleTaskDelete = (task, indexToRemove) => {
    dispatch(deleteTask(task, indexToRemove))
  }

  return (
    <div className="App">
      {isPlaying
        ? playAlarm()
        : null}
      <NavBar />
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={450} classNames="fade">
            <Switch location={location}>
              <Route path="/task-creator" >
                <TaskCreator
                  onTaskCreation={handleTaskCreation}
                />
              </Route>
              <Route path="/task-manager" >
                <TaskManager
                  onTaskPick={handleTaskPick}
                  onTaskDelete={handleTaskDelete}
                  tasks={state.tasks}
                />
              </Route>
              <Route path="/history">
                <History tasks={state.tasks}
                />
              </Route>
              <Route exact path="/">
                {
                  !currentSession ?
                    <CurrentSessionEmpty />
                    :
                    <CurrentSession
                      onStart={handleStart}
                      onStop={handleStop}
                      onTogglePause={togglePause}
                      currentSession={currentSession}
                      elapsedTimeInSeconds={elapsedTimeInSeconds}
                      isPaused={isPaused}
                      isRunning={isRunning}
                    />
                }

              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />


    </div>
  );
}

export default App;
