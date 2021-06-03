import React, { useState, useReducer } from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import TaskCreator from "./components/TaskCreator";
import TaskManager from "./components/TaskManager";
import NavBar from "./components/navbar/NavBar";
import {CurrentSession, CurrentSessionEmpty} from "./components/CurrentSession";
import History from "./components/History";

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
      tasks: newTasks
    };
  }

  if (action.type === "PICK") {
    const { indexToRemove, task } = action;
    const tasks = prevState.tasks.filter(
      (task, index) => index !== indexToRemove
    );
    tasks.forEach(obj=>obj.isCurrent=false);
    const pickedTask = task;
    pickedTask.isCurrent = true;
    const updatedTasks = [...tasks, pickedTask]
    
    return {
      tasks: updatedTasks
    };

  }
  if (action.type === "SAVE") {
    const { sentState, id } = action;
    const sessionToSave = prevState.tasks.filter(task => task.id===id)[0];
    const filteredTasks = prevState.tasks.filter(task => task.id!==id);
    const updatedCurrentSession = { ...sessionToSave, ...sentState }
    console.log(updatedCurrentSession)
    return {
      tasks: [...filteredTasks, updatedCurrentSession]
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

  const handleSaveState = (sentState, id) => {
    stateDispatch({ type: 'SAVE', sentState, id })
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
                {
                  !state.tasks.filter(obj=>obj.isCurrent===true).length ? 
                  <CurrentSessionEmpty/>
                  :
                  <CurrentSession
                  saveState={handleSaveState}
                  currentSession={state.tasks.filter(obj=>obj.isCurrent===true)[0]}
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
