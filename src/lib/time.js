

const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

function getHoursMinutesSecondsFromTotalSeconds(totalSeconds){
    const hours = Math.floor(totalSeconds / SECONDS_IN_HOUR);
    const minutes = Math.floor((totalSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
    const seconds = Math.floor(totalSeconds % SECONDS_IN_MINUTE);

    return [hours, minutes, seconds]
}

function concatenateTimeSegments(hours, minutes, seconds){

return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`
}

export {getHoursMinutesSecondsFromTotalSeconds, concatenateTimeSegments }