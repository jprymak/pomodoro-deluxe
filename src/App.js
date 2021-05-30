import React, {useState} from "react";
import {Switch, Route} from "react-router-dom";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import TaskCreator from "./components/TaskCreator";
import TaskManager from "./components/TaskManager";
import NavBar from "./components/navbar/NavBar";
import CurrentSession from "./components/CurrentSession";
import History from "./components/History";

import initialTasks from "./lib/initialTasks";
import initialSession from "./lib/initialSession";

function App(){
  
  const [tasks, setTasks] = useState(initialTasks);
  const [currentSession, setCurrentSession] = useState(initialSession);
  
  const handleTaskCreation = (newTask) => {
    setTasks((prev) => {
      const tasks = [...prev, newTask];
      return tasks;
    });
  };

  const handleTaskPick = (task, indexToRemove) => {
    
    const previousTask = currentSession;
    setCurrentSession(task);
    removeTask(task, indexToRemove)
    
    setTasks((prev) => {
      const tasks = [...prev, previousTask];
      return tasks;
    });
  };

  const handleTaskDelete = (task, indexToRemove) =>{
    removeTask(task, indexToRemove)
  }

  const removeTask = (task, indexToRemove)=>{
    setTasks((prev) => {
      const tasks = prev.filter(
        (task, index) => index !== indexToRemove
      );
      return tasks;
    });
  }

  const handleSaveState = (sentState) => {
    setCurrentSession((prev)=>{
    const updatedCurrentSession = {...prev, ...sentState}
    return {...updatedCurrentSession}
    });
  };

    return (
      <div className="App">
          <NavBar />
         <Route render={({location})=>(
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={450} classNames="fade">
            <Switch location={location}>
            <Route path="/task-creator" >
              <TaskCreator onTaskCreation={handleTaskCreation}/>
            </Route>
            <Route path="/task-manager" >
              <TaskManager
                onTaskPick={handleTaskPick}
                onTaskDelete = {handleTaskDelete}
                tasks={tasks}
              />
            </Route>
            <Route path="/history">
              <History tasks={tasks}
              />
            </Route>
            <Route exact path="/">
              <CurrentSession
                saveState={handleSaveState}
                currentSession={currentSession}
              />
            </Route>
          </Switch>
          </CSSTransition>
          </TransitionGroup>
         )}/>
            
          
      </div>
    );
}

export default App;
