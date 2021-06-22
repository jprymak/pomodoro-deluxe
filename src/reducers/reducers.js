import defaultTask from "../lib/defaultTask";

  export function stateReducer(state = {}, action = {}) {

    if (action.type === "TASK_CREATE") {
      
      const { newTask } = action;
      const newTasks = [...state.tasks, newTask];
      
      return {
        ...state,
        tasks: newTasks
      };
    }
  
    if (action.type === "TASK_DELETE") {
      const { taskToRemove } = action;
      const tasks = state.tasks.filter(
        (task) => task.id !== taskToRemove.id 
      );
      const newCurrentSessionId = state.currentSessionId!==taskToRemove.id ? state.currentSessionId : "default"
      return {
        ...state,
        tasks,
        currentSessionId: newCurrentSessionId
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
  export const getCurrentTask = (state) => state.tasks.find(task => task.id === getCurrentSessionId(state)) || defaultTask;
  export const isTaskCurrent = (state, task) => getCurrentSessionId(state) === task.id;
  export const isSessionDefault = (state) => getCurrentSessionId(state) === "default";