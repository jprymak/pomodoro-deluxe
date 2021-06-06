import React, { useState, useReducer, useRef, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import TaskCreator from "./components/TaskCreator";
import TaskManager from "./components/TaskManager";
import NavBar from "./components/navbar/NavBar";
import { CurrentSession, CurrentSessionEmpty } from "./components/CurrentSession";
import History from "./components/History";

import breakEndsAlarmSfx from "./sounds/316837__lalks__alarm-02-short.wav";
import sessionEndsAlarmSfx from "./sounds/320492__lacezio__clock-chime.wav";

import initialTasks from "./lib/initialTasks";

const initialState = {
  tasks: initialTasks,
}




function stateReducer(prevState, action) {

  if (action.type === "CREATE") {
    
    const { newTask } = action;
    const newTasks = [...prevState.tasks, newTask];
    return {
      tasks: newTasks
    };
  }

  if (action.type === "DELETE") {
    
    const { indexToRemove } = action;
    const newTasks = prevState.tasks.filter(
      (task, index) => index !== indexToRemove
    );
    return {
      tasks: newTasks,
    };
  }

  if (action.type === "PICK") {
    
    const { indexToRemove, task } = action;
    let updatedTasks = prevState.tasks.map(obj => {
      obj.isCurrent = false
      return obj
    });
   
    const pickedTask = task;
    pickedTask.isCurrent = true;
    
    updatedTasks.splice(indexToRemove, 1, pickedTask)
   
    return {
      tasks: updatedTasks
    };

  }
  if (action.type === "UPDATE") {
    
    const { currentState, id } = action;
    let updatedTasks = prevState.tasks;
    const findIndex = updatedTasks.indexOf(prevState.tasks.find(task => task.id===id))
    const sessionToUpdate = updatedTasks.filter(obj => obj.isCurrent === true)[0]
    const updatedCurrentSession = { ...sessionToUpdate, ...currentState.current }
    updatedTasks.splice(findIndex, 1, updatedCurrentSession)
    return {
      tasks: updatedTasks
    };

  }
  else return prevState
}

function App() {
  const [state, stateDispatch] = useReducer(stateReducer, initialState);

  const currentSession = state.tasks.filter(obj => obj.isCurrent === true)[0]

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


  /// MOUNTING
  useEffect(() => {
    if (isRunning === true && !isPaused) {
      startTimer();
    }
  }, [isRunning, isPaused]);

  useEffect(() => {

    window.clearInterval(intervalID.current);
    intervalID.current = null;

    setElapsedTimeInSeconds(currentSession.elapsedTimeInSeconds)
    setIsRunning(currentSession.isRunning)
    setIsPaused(currentSession.isPaused)
    setIsPlaying(currentSession.isPlaying)
    setNextTimeStampIndex(1)
    setNextTimeStamp(currentSession.alarmTimeStamps[0])

    stateDispatch({ type: 'UPDATE', currentState, id })

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

    stateDispatch({ type: 'UPDATE', currentState, id })
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
  },[]);


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
    stateDispatch({ type: 'CREATE', newTask })
  };

  const handleTaskPick = (task, indexToRemove) => {
    stateDispatch({ type: 'PICK', task, indexToRemove })
  };

  const handleTaskDelete = (task, indexToRemove) => {
    stateDispatch({ type: 'DELETE', task, indexToRemove })
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
                  !state.tasks.filter(obj => obj.isCurrent === true).length ?
                    <CurrentSessionEmpty />
                    :
                    <CurrentSession
                      onStart={handleStart}
                      onStop={handleStop}
                      onTogglePause={togglePause}
                      currentSession={state.tasks.filter(obj => obj.isCurrent === true)[0]}
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
