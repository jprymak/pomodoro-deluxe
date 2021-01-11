import React from "react"
import TaskCreatorForm from "./TaskCreatorForm"
import TaskPreview from "./TaskPreview"

class TaskCreator extends React.Component{
render(){
    return(
        <div className="h-auto w-auto flex flex-col items-center justify-center">
        <TaskCreatorForm/>
        <TaskPreview/>
        </div>
    )
}
}

export default TaskCreator;