import {getHoursFromSeconds, getMinutesFromSeconds, getRemainingSecondsFromSeconds, concatenateTimeSegments} from "../lib/time";

function TaskCard(props) {

    const {task, onTaskPick, onTaskDelete, index} = props
    const {
        numberOfSessions,
        sessionLengthInMinutes,
        breakLengthInMinutes,
        elapsedTimeInSeconds,
        isCurrent,
      } = task;
      
      const totalCycleLengthInSeconds =
        (numberOfSessions * sessionLengthInMinutes +
        breakLengthInMinutes * (numberOfSessions - 1))*60;
        const hoursLeft = getHoursFromSeconds(totalCycleLengthInSeconds)
        const minutesLeft = getMinutesFromSeconds(totalCycleLengthInSeconds)
        const secondsLeft = getRemainingSecondsFromSeconds(totalCycleLengthInSeconds)

      const elapsedHours = getHoursFromSeconds(elapsedTimeInSeconds)
      const elapsedMinutes = getMinutesFromSeconds(elapsedTimeInSeconds)
      const elapsedSeconds = getRemainingSecondsFromSeconds(elapsedTimeInSeconds)
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
          Start
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