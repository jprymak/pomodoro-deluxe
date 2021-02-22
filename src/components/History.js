import React from "react";
import {
  getHoursFromSeconds,
  getMinutesFromSeconds,
  getRemainingSecondsFromSeconds,
} from "../lib/time";
import { CSVLink} from "react-csv";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.csvData = this.createCSVData();
  }

  createCSVData() {
    const { tasks } = this.props;
    let csvData = [];
    tasks.forEach((task) => {
      csvData.push([task.task, task.elapsedTimeInSeconds]);
    });
    console.log(csvData);
    return csvData;
  }

  render() {
    const { tasks } = this.props;

    console.log(tasks);

    return (
      <div>
        <h1>Total time spent on tasks</h1>
        <ul>
          {tasks.map((task) => {
            const elapsedHours = getHoursFromSeconds(task.elapsedTimeInSeconds);
            const elapsedMinutes = getMinutesFromSeconds(
              task.elapsedTimeInSeconds
            );
            const elapsedSeconds = getRemainingSecondsFromSeconds(
              task.elapsedTimeInSeconds
            );
            return (
              <li>
                {task.task} - Total time spent on this task:{" "}
                {elapsedHours < 10 ? "0" + elapsedHours : elapsedHours}:
                {elapsedMinutes < 10 ? "0" + elapsedMinutes : elapsedMinutes}:
                {elapsedSeconds < 10 ? "0" + elapsedSeconds : elapsedSeconds}
              </li>
            );
          })}
        </ul>
        <CSVLink
          data={this.csvData}
          filename={"my-file.csv"}
          headers ={["task name", "total time spent"]}
          className={`p-1 self-center border-solid border-2 border-black rounded-md mt-4 w-20`}
        >
          Generate CSV report
        </CSVLink>
      </div>
    );
  }
}

export default History;
