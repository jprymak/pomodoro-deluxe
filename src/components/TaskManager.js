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
    const { tasks } = this.props;
    return (
      <div>
        <h2 className="mb-10 text-center">Task Manager</h2>
        <ul>
          {tasks.map((task) => {
            const {
              numberOfSessions,
              sessionLengthInMinutes,
              breakLengthInMinutes,
            } = task;
            return (
              <li key={uuidv4()} className="border border-solid rounded-md p-2 mb-4">
                <h4 className="pb-2">{task.task}</h4>
                <p>
                  Total time:{" "}
                  {numberOfSessions * sessionLengthInMinutes +
                    breakLengthInMinutes * (numberOfSessions - 1)}{" "}
                  minutes
                </p>
                <button className="p-1 self-center border-solid border border-black rounded-md mt-4">Start</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TaskManager;
