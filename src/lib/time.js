

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

export {getHoursFromSeconds, getMinutesFromSeconds, getRemainingSecondsFromSeconds }