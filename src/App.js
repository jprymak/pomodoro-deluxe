import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import TaskCreator from "./components/TaskCreator";
import TaskManager from "./components/TaskManager";
import NavBar from "./components/navbar/NavBar";
import CurrentSession from "./components/CurrentSession";

class App extends React.Component {
  state = {
    tasks: [
      {
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
      },
      {
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
      },
    ],
    currentSession: {
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
    },
  };

  handleTaskCreation = (newTask) => {
    this.setState((prevState) => {
      const tasks = [...prevState.tasks, newTask];
      return { tasks };
    });
  };

  handleTaskPick = (task, indexToRemove) => {
    this.setState({ currentSession: task }, () => {
      console.log(this.state.currentSession);
    });
    this.setState(prevState=>{
      const tasks = prevState.tasks.filter((task, index)=>index!==indexToRemove)
      return {tasks}
    })
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
                tasks={this.state.tasks}
              />
            </Route>
            <Route path="/">
              <CurrentSession currentSession={this.state.currentSession} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
