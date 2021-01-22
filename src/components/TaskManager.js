import React from "react";
import { v4 as uuidv4 } from "uuid";

class TaskManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  render() {
    const { tasks, onTaskPick, onTaskDelete } = this.props;

    return (
      <div>
        <h2 className="mb-10 text-center">Task Manager</h2>
        <ul>
          {tasks.map((task, index) => {
            const {
              numberOfSessions,
              sessionLengthInMinutes,
              breakLengthInMinutes,
              elapsedTimeInSeconds,
            } = task;
            const hours = Math.floor(elapsedTimeInSeconds / 3600);
            const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
            const seconds = Math.floor(elapsedTimeInSeconds % 60);
            return (
              <li
                key={task.id}
                className="border border-solid rounded-md p-3 mb-4"
              >
                <h4 className="pb-2 text-lg font-medium">{task.task}</h4>
                <div className="flex justify-between">
                  <div>
                    <p>
                      Total time:{" "}
                      {numberOfSessions * sessionLengthInMinutes +
                        breakLengthInMinutes * (numberOfSessions - 1)}{" "}
                      minutes
                    </p>
                    <p>Sessions: {numberOfSessions}</p>
                    <p>Break length: {breakLengthInMinutes} minutes</p>
                    <p>Progress: {hours}:{minutes}:{seconds}</p>
                  </div>

                  <button
                    onClick={() => {
                      onTaskPick(task, index);
                    }}
                    className="p-1 self-center border-solid border border-black rounded-md my-2 ml-6"
                  >
                    Start
                  </button>
                  <button
                    onClick={() => {
                      onTaskDelete(task, index);
                    }}
                    className="p-1 self-center border-solid border border-black rounded-md my-2 ml-6"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TaskManager;
