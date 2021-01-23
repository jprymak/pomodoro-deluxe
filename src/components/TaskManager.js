import React from "react";
import { v4 as uuidv4 } from "uuid";


import TaskCard from "./TaskCard"

function TaskManager(props){
  
  const { tasks, onTaskPick, onTaskDelete } = props;
  
    return (
      <div>
        <h2 className="mb-10 text-center">Task Manager</h2>
        <ul>
          {tasks.map((task, index) => {
            
            return (
              <TaskCard key={task.id} task={task} onTaskPick={onTaskPick} onTaskDelete={onTaskDelete} index={index} />
            );
          })}
        </ul>
      </div>
    );
  }

export default TaskManager;
