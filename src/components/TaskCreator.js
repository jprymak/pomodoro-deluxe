import React from "react";
import TaskCreatorForm from "./TaskCreatorForm";
import TaskPreview from "./TaskPreview";

class TaskCreator extends React.Component {
  state = {
    task: "",
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
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleTaskNameChange = (event) => {
    this.setState({ task: event.target.value }, () => {
      this.createPreviewBlocks();
    });
  };

  handleSessionLengthInMinutesChange = (event) => {
    this.setState({ sessionLengthInMinutes: event.target.value }, () => {
      this.createPreviewBlocks();
    });
  };

  handleBreakLengthInMinutesChange = (event) => {
    this.setState({ breakLengthInMinutes: event.target.value }, () => {
      this.createPreviewBlocks();
    });
  };

  handleNumberOfSessionsChange = (event) => {
    this.setState({ numberOfSessions: event.target.value }, () => {
      this.createPreviewBlocks();
    });
  };

  createPreviewBlocks = () => {
    this.setState(
      (prevState) => {
        const previewBlocks = [];
        for (let i = 1; i <= this.state.numberOfSessions; i++) {
          if (i < this.state.numberOfSessions) {
            previewBlocks.push("session", "break");
          } else {
            previewBlocks.push("session");
          }
        }
        return { previewBlocks };
      },
      () => {
        console.log(this.state.previewBlocks);
      }
    );
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
