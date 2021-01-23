

const hours = Math.floor(elapsedTimeInSeconds / 3600);
const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
const seconds = Math.floor(elapsedTimeInSeconds % 60);

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