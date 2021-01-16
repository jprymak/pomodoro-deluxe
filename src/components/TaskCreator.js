import React from "react";
import TaskCreatorForm from "./TaskCreatorForm";
import TaskPreview from "./TaskPreview";

class TaskCreator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      task: "",
      sessionLengthInMinutes: "",
      breakLengthInMinutes: "",
      numberOfSessions: "",
      previewBlocks: [],
    };
  }
  
  handleSubmit = (event)=>{
    event.preventDefault()
    this.props.onTaskCreation(this.state)
    this.setState({
      task: "",
      sessionLengthInMinutes: "",
      breakLengthInMinutes: "",
      numberOfSessions: "",
      previewBlocks: [],
    })
  }

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
    const {onSubmit} = this.props
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
