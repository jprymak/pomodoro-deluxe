import {
    getHoursFromSeconds,
    getMinutesFromSeconds,
    getRemainingSecondsFromSeconds,
  } from "../lib/time";

function Timer({ timeLeftInSeconds }) {
 
  const hours = getHoursFromSeconds(timeLeftInSeconds);
  const minutes = getMinutesFromSeconds(timeLeftInSeconds);
  const seconds = getRemainingSecondsFromSeconds(timeLeftInSeconds);
  return (
    <div className="timer">
      {hours < 10 ? "0" + hours : hours} :{" "}
      {minutes < 10 ? "0" + minutes : minutes} :{" "}
      {seconds < 10 ? "0" + seconds : seconds}
    </div>
  );
}

export default Timer;
