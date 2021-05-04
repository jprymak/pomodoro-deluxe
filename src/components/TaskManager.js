import { render } from "@testing-library/react";
import React from "react";
import ReactModal from 'react-modal';

import TaskCard from "./TaskCard"

ReactModal.setAppElement('#root');

class TaskManager extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showModal: false,
      taskToDelete: "",
      indexToDelete: ""
    }
  }

  handleTaskDelete = (task, index) =>{
this.setState({taskToDelete: task, indexToDelete: index}, ()=>this.handleOpenModal())
  }

  handleDeleteConfirm = () =>{
    this.props.onTaskDelete(this.state.taskToDelete, this.state.indexToDelete);
    this.handleCloseModal();
  }

  handleDeleteCancel = () =>{
    this.setState({taskToDelete: "", indexToDelete: ""})
    this.handleCloseModal();
  }

  handleOpenModal = () =>{
    this.setState({ showModal: true });
  }
  
  handleCloseModal =() =>{
    this.setState({ showModal: false });
  }
  
  render(){
    const { tasks, onTaskPick} = this.props;
    return (
    <div className="task-manager">
      <h2 className="task-manager__heading">Task Manager</h2>
      <ul className="task-manager__list">
        {tasks.map((task, index) => {
          
          return (
            <TaskCard key={task.id} task={task} onTaskPick={onTaskPick} onTaskDelete={this.handleTaskDelete} index={index} />
          );
        })}
      </ul>
      <ReactModal 
         isOpen={this.state.showModal}
         contentLabel="onRequestClose Example"
         onRequestClose={this.handleCloseModal}
         className="modal"
         overlayClassName="overlay"
         shouldCloseOnOverlayClick={false}
      >
        <p className="modal__text">Are you sure you want to delete task: <span>{this.state.taskToDelete.task}</span></p>
        <button className="button" onClick={this.handleDeleteConfirm}>Yes</button>
        <button className="button" onClick={this.handleDeleteCancel}>No</button>
      </ReactModal>
    </div>
  )
      }
  }

export default TaskManager;
