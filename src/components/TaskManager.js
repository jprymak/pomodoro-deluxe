import React, {useState} from "react";
import ReactModal from 'react-modal';

import TaskCard from "./TaskCard"

ReactModal.setAppElement('#root');

function TaskManager({ tasks, onTaskPick, onTaskDelete}){
 

  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState("");
  const [indexToDelete, setIndexToDelete] = useState("");
      
 
  const handleTaskDelete = (task, index) =>{
    setTaskToDelete(task);
    setIndexToDelete(index);
    handleOpenModal();
  }

  const handleDeleteConfirm = () =>{
    onTaskDelete(taskToDelete, indexToDelete);
    handleCloseModal();
  }

  const handleDeleteCancel = () =>{
    setTaskToDelete("");
    setIndexToDelete("");
    handleCloseModal();
  }

  const handleOpenModal = () =>{
    setShowModal(true);
  }
  
  const handleCloseModal =() =>{
    setShowModal(false);
  }
  
    return (
    <div className="task-manager">
      <h2 className="task-manager__heading">Task Manager</h2>
      <ul className="task-manager__list">
        {tasks.map((task, index) => {
          
          return (
            <TaskCard key={task.id} task={task} onTaskPick={onTaskPick} onTaskDelete={handleTaskDelete} index={index} />
          );
        })}
      </ul>
      <ReactModal 
         isOpen={showModal}
         contentLabel="onRequestClose Example"
         onRequestClose={handleCloseModal}
         className="modal"
         overlayClassName="overlay"
         shouldCloseOnOverlayClick={false}
      >
        <p className="modal__text">Are you sure you want to delete task: <span>{taskToDelete.task}</span></p>
        <button className="button" onClick={handleDeleteConfirm}>Yes</button>
        <button className="button" onClick={handleDeleteCancel}>No</button>
      </ReactModal>
    </div>
  )
  }

export default TaskManager;
