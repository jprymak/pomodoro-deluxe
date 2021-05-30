import React from "react";
import {Switch, Route} from "react-router-dom";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import TaskCreator from "./components/TaskCreator";
import TaskManager from "./components/TaskManager";
import NavBar from "./components/navbar/NavBar";
import CurrentSession from "./components/CurrentSession";
import History from "./components/History";

import initialTasks from "./lib/initialTasks";
import initialSession from "./lib/initialSession";

class App extends React.Component {
  state = {
    tasks: [...initialTasks],
    currentSession: {...initialSession}
  }

  handleTaskCreation = (newTask) => {
    this.setState((prevState) => {
      const tasks = [...prevState.tasks, newTask];
      return { tasks };
    });
  };

  handleTaskPick = (task, indexToRemove) => {
    const previousTask = this.state.currentSession;
    this.setState({ currentSession: task }, () => {
    });
    this.removeTask(task, indexToRemove)
    this.setState((prevState) => {
      const tasks = [...prevState.tasks, previousTask];
      return { tasks };
    });
  };

  handleTaskDelete = (task, indexToRemove) =>{
    this.removeTask(task, indexToRemove)
  }

  removeTask(task, indexToRemove){
    this.setState((prevState) => {
      const tasks = prevState.tasks.filter(
        (task, index) => index !== indexToRemove
      );
      return { tasks };
    });
  }

  handleSaveState = (sentState) => {
    this.setState((prevState)=>{
    const updatedCurrentSession = {...prevState.currentSession, ...sentState}
    return {currentSession: updatedCurrentSession}
    });
  };

  render() {
    return (
      <div className="App">
          <NavBar />
         <Route render={({location})=>(
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={450} classNames="fade">
            <Switch location={location}>
            <Route path="/task-creator" >
              <TaskCreator onTaskCreation={this.handleTaskCreation}/>
            </Route>
            <Route path="/task-manager" >
              <TaskManager
                onTaskPick={this.handleTaskPick}
                onTaskDelete = {this.handleTaskDelete}
                tasks={this.state.tasks}
              />
            </Route>
            <Route path="/history">
              <History tasks={this.state.tasks}
              />
            </Route>
            <Route exact path="/">
              <CurrentSession
                saveState={this.handleSaveState}
                currentSession={this.state.currentSession}
                currentSessionState={this.state.currentSessionState}
              />
            </Route>
          </Switch>
          </CSSTransition>
          </TransitionGroup>
         )}/>
            
          
      </div>
    );
  }
}

export default App;
