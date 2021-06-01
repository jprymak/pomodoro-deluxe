import React, { useState, useReducer } from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import TaskCreator from "./components/TaskCreator";
import TaskManager from "./components/TaskManager";
import NavBar from "./components/navbar/NavBar";
import CurrentSession from "./components/CurrentSession";
import History from "./components/History";

import initialTasks from "./lib/initialTasks";
import initialSession from "./lib/initialSession";

const initialState = {
  tasks: initialTasks,
  currentSession: initialSession
}

function stateReducer(prevState, action) {

  if (action.type === "CREATE") {
    const { newTask } = action;
    const newTasks = [...prevState.tasks, newTask];
    return {
      ...prevState,
      tasks: newTasks
    };
  }

  if (action.type === "DELETE") {
    const { indexToRemove } = action;
    const newTasks = prevState.tasks.filter(
      (task, index) => index !== indexToRemove
    );
    return {
      ...prevState,
      tasks: newTasks
    };
  }

  if (action.type === "PICK") {
    const { indexToRemove, task } = action;
    const prevTask = prevState.currentSession
    const newTasks = prevState.tasks.filter(
      (task, index) => index !== indexToRemove
    );
    return {
      currentSession: task,
      tasks: [...newTasks, prevTask]
    };

  }
  if (action.type === "SAVE") {
    const { sentState } = action;
    const updatedCurrentSession = { ...prevState.currentSession, ...sentState }
    return {
      ...prevState,
      currentSession: updatedCurrentSession,
    };

  }
  else return prevState
}

function App() {
  const [state, stateDispatch] = useReducer(stateReducer, initialState);

  const handleTaskCreation = (newTask) => {
    stateDispatch({ type: 'CREATE', newTask })
  };

  const handleTaskPick = (task, indexToRemove) => {
    stateDispatch({ type: 'PICK', task, indexToRemove })
  };

  const handleTaskDelete = (task, indexToRemove) => {
    stateDispatch({ type: 'DELETE', task, indexToRemove })
  }

  const handleSaveState = (sentState) => {
    stateDispatch({ type: 'SAVE', sentState })
  };

  return (
    <div className="App">
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
                <CurrentSession
                  saveState={handleSaveState}
                  currentSession={state.currentSession}
                />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />


    </div>
  );
}

export default App;
