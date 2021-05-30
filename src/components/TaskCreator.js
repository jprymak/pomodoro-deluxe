import React, {useEffect, useState} from "react";

import TaskCreatorForm from "./TaskCreatorForm";
import TaskPreview from "./TaskPreview";

import { v4 as uuidv4 } from "uuid";

import defaultTask from "../lib/defaultTask"

function TaskCreator({onTaskCreation}){
  
  const [taskData, setTaskData] = useState(defaultTask)
  const [hasError, setHasError] = useState(false)
  
useEffect(()=>{
  function createPreviewBlocks(){
    setTaskData(
      (prev) => {
        const previewBlocks = [];
        for (let i = 1; i <= taskData.numberOfSessions; i++) {
          if (i < taskData.numberOfSessions) {
            previewBlocks.push("session", "break");
          } else {
            previewBlocks.push("session");
          }
        }
        return {...prev, previewBlocks };
      },
    );
  };
  createPreviewBlocks();
},[taskData.numberOfSessions])

  const handleSubmit = (event)=>{
    event.preventDefault()
    if(validate()){
      onTaskCreation({id: uuidv4(), alarmTimeStamps: createAlarmTimeStamps(),...taskData })
      setTaskData({...defaultTask})
    } 
    else setHasError(true)
  }

  const handleTaskNameChange = (event) => {
    checkIfValueIsAboveLimit("sessionName", event.target.value) && setTaskData(prev=>{
      const task = event.target.value
      return {...prev, task}
    });
    
  };

  const handleSessionLengthInMinutesChange = (event) => {
    checkIfValueIsAboveLimit("sessionLength", event.target.value) && setTaskData(prev=>{
      const sessionLengthInMinutes = event.target.value;
      return {...prev, sessionLengthInMinutes}
    });
  };

  const handleBreakLengthInMinutesChange = (event) => {
    checkIfValueIsAboveLimit("breakLength", event.target.value) && setTaskData(prev=>{
      const breakLengthInMinutes = event.target.value;
      return {...prev, breakLengthInMinutes}
    });
  };

  const handleNumberOfSessionsChange = (event) => {
    checkIfValueIsAboveLimit("numberOfSessions", event.target.value) && setTaskData(prev=>{
      const numberOfSessions = +event.target.value;
      return {...prev, numberOfSessions}
    })
  };

  const checkIfValueIsAboveLimit = (inputName, value) => {
    const inputsUpperLimits = {
      "sessionName": value.length <= 40,
      "sessionLength": value <= 60,
      "breakLength": value <= 60,
      "numberOfSessions": value <= 10,
    }
    return inputsUpperLimits[inputName]
  }

  const validate = () =>{
    const conditions = [
      (taskData.task.length > 0 && taskData.task.length <= 40),
      taskData.sessionLengthInMinutes >= 10 && taskData.sessionLengthInMinutes <= 60,
      taskData.breakLengthInMinutes >= 5 && taskData.breakLengthInMinutes <= 60,
      taskData.numberOfSessions > 0 && taskData.numberOfSessions <= 10,
    ]

    return conditions.every(condition=>condition===true);
  }

  const createAlarmTimeStamps = () =>{

    const alarmTimeStamps = [];
    let lastTimeStamp = 0;
    for (let i = 1; i <= taskData.numberOfSessions; i++) {
      
      if (i < taskData.numberOfSessions) {
        lastTimeStamp = lastTimeStamp + taskData.sessionLengthInMinutes*60
        alarmTimeStamps.push({timeStamp: lastTimeStamp, status: "sessionEnded"});
        lastTimeStamp = lastTimeStamp + taskData.breakLengthInMinutes*60
        alarmTimeStamps.push({timeStamp: lastTimeStamp, status: "breakEnded"});
      } else{
        lastTimeStamp = lastTimeStamp + taskData.sessionLengthInMinutes*60
        alarmTimeStamps.push({timeStamp: lastTimeStamp, status: "sessionEnded"});
      }
    }
    return alarmTimeStamps
  }

  

    return (
      <div className="task-creator">
        <h1 className="task-creator__heading">TASK CREATOR</h1>
        <TaskCreatorForm
          hasError ={hasError}
          task={taskData.task}
          sessionLengthInMinutes={taskData.sessionLengthInMinutes}
          breakLengthInMinutes={taskData.breakLengthInMinutes}
          numberOfSessions={taskData.numberOfSessions}
          onTaskNameChange={handleTaskNameChange}
          onSessionLengthInMinutesChange={
            handleSessionLengthInMinutesChange
          }
          onBreakLengthInMinutesChange={handleBreakLengthInMinutesChange}
          onNumberOfSessionsChange={handleNumberOfSessionsChange}
          onSubmit={handleSubmit}
        />
        <TaskPreview formValue={taskData} />
      </div>
    );
}

export default TaskCreator;
