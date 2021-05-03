import React from "react";
import {
  getHoursFromSeconds,
  getMinutesFromSeconds,
  getRemainingSecondsFromSeconds,
  concatenateTimeSegments
} from "../lib/time";

import { CSVLink } from "react-csv";
import { v4 as uuidv4 } from "uuid";

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
        <table className="history__table">
          <thead className="history__thead">
            <tr className="history__tr">
              <th className="history__th">Task</th>
              <th className="history__th">Total time spent</th>
            </tr>
          </thead>
          <tbody className="history__tbody">
          {tasks.map((task) => {
            const elapsedHours = getHoursFromSeconds(task.elapsedTimeInSeconds);
            const elapsedMinutes = getMinutesFromSeconds(
              task.elapsedTimeInSeconds
            );
            const elapsedSeconds = getRemainingSecondsFromSeconds(
              task.elapsedTimeInSeconds
            );
            return (
              <tr key={uuidv4()} className="history__tr">
                <td className="history__td">{task.task}</td>
                <td className="history__td">{concatenateTimeSegments(elapsedHours, elapsedMinutes, elapsedSeconds)}</td>
              </tr>
            );
          })}
          </tbody>
          
        </table>
        <CSVLink
          data={this.csvData}
          filename={"my-file.csv"}
          headers={["task name", "total time spent"]}
          className={`button history__button`}
        >
          Generate CSV report
        </CSVLink>
      </div>
    );
  }
}

export default History;
