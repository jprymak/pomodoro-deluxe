

const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;


function getHoursFromSeconds(seconds){
    return Math.floor(seconds / SECONDS_IN_HOUR);
}

function getMinutesFromSeconds(seconds){
    return Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
}

function getRemainingSecondsFromSeconds(seconds){
    return Math.floor(seconds % SECONDS_IN_MINUTE);
}

function concatenateTimeSegments(hours, minutes, seconds){

return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`
}

export {getHoursFromSeconds, getMinutesFromSeconds, getRemainingSecondsFromSeconds, concatenateTimeSegments }