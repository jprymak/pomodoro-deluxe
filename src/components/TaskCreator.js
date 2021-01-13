import React from "react";
import TaskCreatorForm from "./TaskCreatorForm";
import TaskPreview from "./TaskPreview";

class TaskCreator extends React.Component {
  state = {
    task: "",
    sessionLengthInMinutes: 25,
    breakLengthInMinutes: 5,
    numberOfSessions: 4
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  handleTaskNameChange = (event) => {
    this.setState({ task: event.target.value });
  };

  handleSessionLengthInMinutesChange = (event) => {
    this.setState({ sessionLengthInMinutes: event.target.value });
  };

  handleBreakLengthInMinutesChange = (event) => {
    this.setState({ breakLengthInMinutes: event.target.value });
  };

  handleNumberOfSessionsChange = (event) => {
    this.setState({ numberOfSessions: event.target.value });
  };

  render() {
    return (
      <div className="h-auto w-auto flex flex-col items-center justify-center">
        <TaskCreatorForm
          task={this.state.task}
          sessionLengthInMinutes={this.state.sessionLengthInMinutes}
          breakLengthInMinutes={this.state.breakLengthInMinutes}
          numberOfSessions={this.state.numberOfSessions}
          onTaskNameChange={this.handleTaskNameChange}
          onSessionLengthInMinutesChange={
            this.handleSessionLengthInMinutesChange
          }
          onBreakLengthInMinutesChange={this.handleBreakLengthInMinutesChange}
          onNumberOfSessionsChange={this.handleNumberOfSessionsChange}
          onSubmit={this.handleSubmit}
        />
        <TaskPreview formValue={this.state} />
      </div>
    );
  }
}

export default TaskCreator;
