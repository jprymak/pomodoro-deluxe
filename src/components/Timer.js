import {
  getHoursMinutesSecondsFromTotalSeconds,
  concatenateTimeSegments
  } from "../lib/time";

function Timer({ timeLeftInSeconds }) {
  const [hours, minutes, seconds]= getHoursMinutesSecondsFromTotalSeconds(timeLeftInSeconds);
  return (
    <div className="timer">
      {concatenateTimeSegments(hours, minutes, seconds)}
    </div>
  );
}

export default Timer;
