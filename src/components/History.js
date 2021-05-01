import React from "react";
import {
  getHoursFromSeconds,
  getMinutesFromSeconds,
  getRemainingSecondsFromSeconds,
  concatenateTimeSegments
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
      <div className="history">
        <h1 className="history__header">History</h1>
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
                {concatenateTimeSegments(elapsedHours,elapsedMinutes,elapsedSeconds)}
              </li>
            );
          })}
        </ul>
        <CSVLink
          data={this.csvData}
          filename={"my-file.csv"}
          headers ={["task name", "total time spent"]}
          className={`button history__button`}
        >
          Generate CSV report
        </CSVLink>
      </div>
    );
  }
}

export default History;
