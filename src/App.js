import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import TaskCreator from "./components/TaskCreator";
import TaskManager from "./components/TaskManager";
import NavBar from "./components/navbar/NavBar";
import CurrentSession from "./components/CurrentSession";

class App extends React.Component {
  state = {
    tasks: [],
  };

  handleTaskCreation = (newTask) => {
    this.setState((prevState) => {
      const tasks = [...prevState.tasks, newTask];
      return { tasks };
    });
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
              <TaskManager tasks={this.state.tasks}/>
            </Route>
            <Route path="/">
              <CurrentSession />
            </Route>
          </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
