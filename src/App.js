import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import TaskCreator from "./components/TaskCreator";
import TaskManager from "./components/TaskManager";
import NavBar from "./components/navbar/NavBar";
import CurrentSession from "./components/CurrentSession";

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
    this.deleteTask(task, indexToRemove)
    this.setState((prevState) => {
      console.log(previousTask);
      const tasks = [...prevState.tasks, previousTask];
      return { tasks };
    });
  };

  handleTaskDelete = (task, indexToRemove) =>{
    this.deleteTask(task, indexToRemove)
  }

  deleteTask(task, indexToRemove){
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
      <div className="App h-screen flex  items-center flex-col">
        <Router>
          <NavBar />
          <Switch>
            <Route path="/task-creator">
              <TaskCreator onTaskCreation={this.handleTaskCreation} />
            </Route>
            <Route path="/task-manager">
              <TaskManager
                onTaskPick={this.handleTaskPick}
                onTaskDelete = {this.handleTaskDelete}
                tasks={this.state.tasks}
              />
            </Route>
            <Route path="/">
              <CurrentSession
                saveState={this.handleSaveState}
                currentSession={this.state.currentSession}
                currentSessionState={this.state.currentSessionState}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
