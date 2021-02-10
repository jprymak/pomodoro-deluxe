import React from "react";
import TaskCreatorForm from "./TaskCreatorForm";
import TaskPreview from "./TaskPreview";

import { v4 as uuidv4 } from "uuid";

class TaskCreator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      task: "",
      sessionLengthInMinutes: 25,
      breakLengthInMinutes: 5,
      numberOfSessions: 4,
      previewBlocks: ["session", "break", "session", "break","session", "break","session"],
      elapsedTimeInSeconds: 0,
      isPaused: false,
      isRunning: false,
      nextTimeStampIndex: 0,
      nextTimeStamp: "",
      isPlaying: false
    };
  }
  
  handleSubmit = (event)=>{
    event.preventDefault()
    this.props.onTaskCreation({...this.state, id: uuidv4(), alarmTimeStamps: this.createAlarmTimeStamps()})
    this.setState({
      task: "",
      sessionLengthInMinutes: 25,
      breakLengthInMinutes: 5,
      numberOfSessions: 4,
      previewBlocks: ["session", "break", "session", "break","session", "break","session"],
      elapsedTimeInSeconds: 0,
      isPaused: false,
      isRunning: false,
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

  createAlarmTimeStamps = () =>{

    const alarmTimeStamps = [];
    let lastTimeStamp = 0;
    for (let i = 1; i <= this.state.numberOfSessions; i++) {
      
      if (i < this.state.numberOfSessions) {
        lastTimeStamp = lastTimeStamp + this.state.sessionLengthInMinutes*60
        alarmTimeStamps.push({timeStamp: lastTimeStamp, status: "sessionEnded"});
        lastTimeStamp = lastTimeStamp + this.state.breakLengthInMinutes*60
        alarmTimeStamps.push({timeStamp: lastTimeStamp, status: "breakEnded"});
      } else{
        lastTimeStamp = lastTimeStamp + this.state.sessionLengthInMinutes*60
        alarmTimeStamps.push({timeStamp: lastTimeStamp, status: "sessionEnded"});
      }
    }
    return alarmTimeStamps
  }

  setFirstTimeStamp = () =>{
    
  }

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
