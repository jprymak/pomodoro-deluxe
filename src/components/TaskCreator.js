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


const handleInputChange = (event) =>{
  const id=event.target.id;
  const value = event.target.value;
  const property = choosePropertyById(id)
 
  checkIfValueIsAboveLimit(id, value) && setTaskData(prev=>{
    console.log({...prev, [property]: value })
    return {...prev, [property]: value }
  });
  
}

  const checkIfValueIsAboveLimit = (inputName, value) => {
    const inputsUpperLimits = {
      "task-name": value.length <= 40,
      "session-length": value <= 60,
      "break-length": value <= 60,
      "sessions-count": value <= 10,
    }
    return inputsUpperLimits[inputName]
  }

  const choosePropertyById = (id) => {
    const properties = {
      "task-name": 'task',
      "session-length": 'sessionLengthInMinutes',
      "break-length": 'breakLengthInMinutes',
      "sessions-count": 'numberOfSessions',
    }
    return properties[id]
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
          onSubmit={handleSubmit}
          onInput = {handleInputChange}
        />
        <TaskPreview formValue={taskData} />
      </div>
    );
}

export default TaskCreator;
