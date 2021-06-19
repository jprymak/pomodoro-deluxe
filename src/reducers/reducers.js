
import initialTasks from "../lib/initialTasks";

const initialState = {
    tasks: initialTasks,
    currentSessionId: null
  }
  
  export function stateReducer(state = initialState, action = {}) {

    if (action.type === "TASK_CREATE") {
      
      const { newTask } = action;
      const newTasks = [...state.tasks, newTask];
      return {
        ...state,
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
        ...state,
        tasks: newTasks,
      };
    }
  
    if (action.type === "TASK_PICK") {
      const {task} = action;
      return {
        ...state,
        currentSessionId: task.id
      };
    }
    if (action.type === "TASK_UPDATE") {
      
      const { currentState, id } = action;
      const tasks = state.tasks.map(task=>task.id === id ? {...task, ...currentState.current} : task)
      return {
        ...state,
        tasks
      };
  
    }
    else return state
  }


  ///SELECTORS

  export const getState =(state) =>state;
  export const getCurrentSessionId =(state) =>state.currentSessionId;
  export const getCurrentTask = (state) => state.tasks.find(task => task.id === getCurrentSessionId(state)) || state.tasks[0];
  export const isTaskCurrent = (state, task) => getCurrentSessionId(state) === task.id