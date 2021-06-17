
import initialTasks from "../lib/initialTasks";

const initialState = {
    tasks: initialTasks,
  }
  
  export function stateReducer(state = initialState, action = {}) {
  
    if (action.type === "TASK_CREATE") {
      
      const { newTask } = action;
      const newTasks = [...state.tasks, newTask];
      return {
        tasks: newTasks
      };
    }
  
    if (action.type === "TASK_DELETE") {
      const { indexToRemove } = action;
      console.log(indexToRemove)
      const newTasks = state.tasks.filter(
        (task, index) => index !== indexToRemove
      );
      return {
        tasks: newTasks,
      };
    }
  
    if (action.type === "TASK_PICK") {
      const { indexToRemove, task } = action;
      let updatedTasks = state.tasks.map(obj => {
        obj.isCurrent = false
        return obj
      });
     
      const pickedTask = task;
      pickedTask.isCurrent = true;
      
      updatedTasks.splice(indexToRemove, 1, pickedTask)
     
      return {
        tasks: updatedTasks
      };
  
    }
    if (action.type === "TASK_UPDATE") {
      
      const { currentState, id } = action;
      let updatedTasks = state.tasks;
      const findIndex = updatedTasks.indexOf(state.tasks.find(task => task.id===id))
      const sessionToUpdate = updatedTasks.filter(obj => obj.isCurrent === true)[0]
      const updatedCurrentSession = { ...sessionToUpdate, ...currentState.current }
      updatedTasks.splice(findIndex, 1, updatedCurrentSession)
      return {
        tasks: updatedTasks
      };
  
    }
    else return state
  }


  ///SELECTORS

  export const getState =(state) =>state