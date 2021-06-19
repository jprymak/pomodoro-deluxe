import React from "react";
import {
  getHoursMinutesSecondsFromTotalSeconds,
  concatenateTimeSegments,
} from "../lib/time";

import { CSVLink } from "react-csv";
import { v4 as uuidv4 } from "uuid";

function History({ tasks }) {
  
  const csvData = createCSVData();

  function createCSVData() {
    let csvData = [];
    tasks.forEach((task) => {
      csvData.push([task.task, task.elapsedTimeInSeconds]);
    });
    return csvData;
  }

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
            const [hours, minutes, seconds] = getHoursMinutesSecondsFromTotalSeconds(task.elapsedTimeInSeconds)
            return (
              <tr key={uuidv4()} className="history__tr">
                <td className="history__td">{task.task}</td>
                <td className="history__td">
                  {concatenateTimeSegments(
                    hours,
                    minutes,
                    seconds
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CSVLink
        data={csvData}
        filename={"my-file.csv"}
        headers={["task name", "total time spent"]}
        className={`button history__button`}
      >
        Generate CSV report
      </CSVLink>
    </div>
  );
}

export default History;
