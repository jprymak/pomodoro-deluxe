import {getHoursFromSeconds, getMinutesFromSeconds, getRemainingSecondsFromSeconds} from "../lib/time";

function TaskCard(props) {

    const {task, onTaskPick, onTaskDelete, index} = props
    const {
        numberOfSessions,
        sessionLengthInMinutes,
        breakLengthInMinutes,
        elapsedTimeInSeconds,
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
    <li className="border border-solid rounded-md p-3 mb-4">
      <h4 className="pb-2 text-lg font-medium">{task.task}</h4>
      <div className="flex justify-between">
        <div>
          <p>
            Total time: {hoursLeft < 10 ? "0" + hoursLeft : hoursLeft}:
            {minutesLeft < 10 ? "0" + minutesLeft : minutesLeft}:
            {secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}
          </p>
          <p>Sessions: {numberOfSessions}</p>
          <p>Session length: {sessionLengthInMinutes} minutes</p>
          <p>Break length: {breakLengthInMinutes} minutes</p>
          <p>
            Progress: {elapsedHours < 10 ? "0" + elapsedHours : elapsedHours}:
            {elapsedMinutes < 10 ? "0" + elapsedMinutes : elapsedMinutes}:
            {elapsedSeconds < 10 ? "0" + elapsedSeconds : elapsedSeconds}
          </p>
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
}

export default TaskCard;