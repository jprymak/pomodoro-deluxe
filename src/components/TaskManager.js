import React from "react";

import TaskCard from "./TaskCard"

function TaskManager(props){
  
  const { tasks, onTaskPick, onTaskDelete } = props;
  
    return (
      <div className="task-manager">
        <h2 className="task-manager__heading">Task Manager</h2>
        <ul className="task-manager__list">
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
