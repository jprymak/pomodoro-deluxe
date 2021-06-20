import {useSelector} from "react-redux";

import {isTaskCurrent, getCurrentTask} from "../reducers/reducers"


import {getHoursMinutesSecondsFromTotalSeconds, concatenateTimeSegments} from "../lib/time";
import {getTotalCycleLengthInSeconds} from "../lib/pureFunctions"

function TaskCard(props) {

    const {task, onTaskPick, onTaskDelete, index} = props
    const {
        numberOfSessions,
        sessionLengthInMinutes,
        breakLengthInMinutes,
        elapsedTimeInSeconds,
      } = task;

      const isCurrent = useSelector(getCurrentTask)===task;
      
      const totalCycleLengthInSeconds = getTotalCycleLengthInSeconds(numberOfSessions, sessionLengthInMinutes, breakLengthInMinutes);
      
      const [hoursLeft, minutesLeft, secondsLeft] = getHoursMinutesSecondsFromTotalSeconds(totalCycleLengthInSeconds);
      const [elapsedHours, elapsedMinutes, elapsedSeconds] = getHoursMinutesSecondsFromTotalSeconds(elapsedTimeInSeconds);
      
  return (
    <li className={`task-card ${isCurrent ? 'task-card--active' : ""}`}>
      <h4 className="task-card__heading">{task.task} {isCurrent ? '(Active)' : ""}</h4>
        <div className="task-card__info-container">
          <div className="task-card__info">
            Total time <span>{concatenateTimeSegments(hoursLeft, minutesLeft, secondsLeft)}</span>
          </div>
          <div className="task-card__info">Sessions <span>{numberOfSessions}</span></div>
          <div className="task-card__info">Session length <span>{sessionLengthInMinutes} minutes</span> </div>
          <div className="task-card__info">Break length <span>{breakLengthInMinutes} minutes</span> </div>
          <div className="task-card__info">
            Progress <span>{concatenateTimeSegments(elapsedHours, elapsedMinutes, elapsedSeconds)}</span>
          </div>
        </div>
        <div className="task-card__buttons">
        <button
          onClick={() => {
            onTaskPick(task, index);
          }}
          className="button button--small"
        >
          Pick
        </button>
        <button
          onClick={() => {
            onTaskDelete(task, index);
          }}
          className="button button--small"
        >
          Delete
        </button>
        </div>
        
      
    </li>
  );
}

export default TaskCard;