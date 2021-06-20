
export const updateTask = (currentState, id) => ({ type: 'TASK_UPDATE', currentState, id });
export const createTask = (task) => ({ type: 'TASK_CREATE', newTask: task });
export const deleteTask = (task, indexToRemove) => ({ type: 'TASK_DELETE', task, indexToRemove});
export const pickTask = (task, indexToRemove) => ({ type: 'TASK_PICK', indexToRemove, task });
