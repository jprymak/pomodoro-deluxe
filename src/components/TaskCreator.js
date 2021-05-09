import React from "react";

import TaskCreatorForm from "./TaskCreatorForm";
import TaskPreview from "./TaskPreview";

import { v4 as uuidv4 } from "uuid";

import defaultTask from "../lib/defaultTask"

class TaskCreator extends React.Component {
  constructor(props){
    super(props);
    this.state = defaultTask;
  }
  
  handleSubmit = (event)=>{
    event.preventDefault()
    if(this.validate()){
      this.props.onTaskCreation({...this.state, id: uuidv4(), alarmTimeStamps: this.createAlarmTimeStamps()})
      this.setState({...defaultTask})
    } 
    else this.setState({hasError:true})
  }

  handleTaskNameChange = (event) => {
    this.checkIfValueIsAboveLimit("sessionName", event.target.value) && this.setState({ task: event.target.value }, () => {
      //  this.createPreviewBlocks();
    });
    
  };

  handleSessionLengthInMinutesChange = (event) => {
    this.checkIfValueIsAboveLimit("sessionLength", event.target.value) && this.setState({ sessionLengthInMinutes: event.target.value }, () => {
      //  this.createPreviewBlocks();
    });
  };

  handleBreakLengthInMinutesChange = (event) => {
    this.checkIfValueIsAboveLimit("breakLength", event.target.value) && this.setState({ breakLengthInMinutes: event.target.value }, () => {
      // this.createPreviewBlocks();
    });
  };

  handleNumberOfSessionsChange = (event) => {
    this.checkIfValueIsAboveLimit("numberOfSessions", event.target.value) && this.setState({ numberOfSessions: event.target.value }, () => {
      this.createPreviewBlocks();
    });
  };

  checkIfValueIsAboveLimit = (inputName, value) => {
    const inputsUpperLimits = {
      "sessionName": value.length <= 40,
      "sessionLength": value <= 60,
      "breakLength": value <= 60,
      "numberOfSessions": value <= 10,
    }
    return inputsUpperLimits[inputName]
  }

  validate = () =>{
    const conditions = [
      (this.state.task.length > 0 && this.state.task.length <= 40),
      this.state.sessionLengthInMinutes >= 10 && this.state.sessionLengthInMinutes <= 60,
      this.state.breakLengthInMinutes >= 5 && this.state.breakLengthInMinutes <= 60,
      this.state.numberOfSessions > 0 && this.state.numberOfSessions <= 10,
    ]

    return conditions.every(condition=>condition===true);
  }

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
    );
  };

  render() {
    
    return (
      <div className="task-creator">
        <h1 className="task-creator__heading">TASK CREATOR</h1>
        <TaskCreatorForm
          hasError ={this.state.hasError}
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
