import React from "react";
import {Switch, Route} from "react-router-dom";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import TaskCreator from "./components/TaskCreator";
import TaskManager from "./components/TaskManager";
import NavBar from "./components/navbar/NavBar";
import CurrentSession from "./components/CurrentSession";
import History from "./components/History"

import { v4 as uuidv4 } from "uuid";

class App extends React.Component {
  state = {
    tasks: [
      {
        id: uuidv4(),
        task: "Learning React",
        sessionLengthInMinutes: 25,
        breakLengthInMinutes: 5,
        numberOfSessions: 4,
        previewBlocks: [
          "session",
          "break",
          "session",
          "break",
          "session",
          "break",
          "session",
        ],
        elapsedTimeInSeconds: 0,
        isPaused: false,
        isRunning: false,
        alarmTimeStamps: [{timeStamp: 1500, status: "sessionEnded"},
       {timeStamp: 1800, status: "breakEnded"},
       {timeStamp: 3300, status: "sessionEnded"},
       {timeStamp: 3600, status: "breakEnded"},
       {timeStamp: 5100, status: "sessionEnded"},
       {timeStamp: 5400, status: "breakEnded"},
       {timeStamp: 6900, status: "sessionEnded"}
    
    ],
      nextTimeStampIndex: 0,
      nextTimeStamp: "",
      isPlaying: false
      },
      {
        id: uuidv4(),
        task: "Learning Agular",
        sessionLengthInMinutes: 25,
        breakLengthInMinutes: 5,
        numberOfSessions: 4,
        previewBlocks: [
          "session",
          "break",
          "session",
          "break",
          "session",
          "break",
          "session",
        ],
        elapsedTimeInSeconds: 0,
        isPaused: false,
        isRunning: false,
        alarmTimeStamps: [{timeStamp: 1500, status: "sessionEnded"},
       {timeStamp: 1800, status: "breakEnded"},
       {timeStamp: 3300, status: "sessionEnded"},
       {timeStamp: 3600, status: "breakEnded"},
       {timeStamp: 5100, status: "sessionEnded"},
       {timeStamp: 5400, status: "breakEnded"},
       {timeStamp: 6900, status: "sessionEnded"}
    
    ],
      nextTimeStampIndex: 0,
      nextTimeStamp: "",
      isPlaying: false
      },
    ],
    currentSession: {
      id: uuidv4(),
      task: "Learning Vue",
      sessionLengthInMinutes: 25,
      breakLengthInMinutes: 5,
      numberOfSessions: 4,
      previewBlocks: [
        "session",
        "break",
        "session",
        "break",
        "session",
        "break",
        "session",
      ],
      elapsedTimeInSeconds: 0,
      isPaused: false,
      isRunning: false,
      alarmTimeStamps: [{timeStamp: 1500, status: "sessionEnded"},
       {timeStamp: 1800, status: "breakEnded"},
       {timeStamp: 3300, status: "sessionEnded"},
       {timeStamp: 3600, status: "breakEnded"},
       {timeStamp: 5100, status: "sessionEnded"},
       {timeStamp: 5400, status: "breakEnded"},
       {timeStamp: 6900, status: "sessionEnded"}
    
    ],
      nextTimeStampIndex: 0,
      nextTimeStamp: "",
      isPlaying: false
    },
    currentSessionState: {},
  };

  handleTaskCreation = (newTask) => {
    this.setState((prevState) => {
      const tasks = [...prevState.tasks, newTask];
      return { tasks };
    });
  };

  handleTaskPick = (task, indexToRemove) => {
    const previousTask = this.state.currentSession;
    this.setState({ currentSession: task }, () => {
      console.log(this.state.currentSession);
    });
    this.removeTask(task, indexToRemove)
    this.setState((prevState) => {
      console.log(previousTask);
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

  handleSaveState = (state) => {
    this.setState({ currentSession: state });
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
