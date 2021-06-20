export const getTotalCycleLengthInMinutes = (numberOfSessions, sessionLengthInMinutes, breakLengthInMinutes) => numberOfSessions * sessionLengthInMinutes + breakLengthInMinutes * (numberOfSessions - 1)

export const getBlockWidth = (blockLengthInMinutes, totalCycleLengthInMinutes) => blockLengthInMinutes / totalCycleLengthInMinutes * 100;

export const getTotalCycleLengthInSeconds = (numberOfSessions, sessionLengthInMinutes, breakLengthInMinutes) => (numberOfSessions * sessionLengthInMinutes + breakLengthInMinutes * (numberOfSessions - 1)) * 60;

export const getTimeLeftInSeconds = (totalCycleLengthInSeconds, elapsedTimeInSeconds) => totalCycleLengthInSeconds - elapsedTimeInSeconds;

export const getCurrentWidth = (totalCycleLengthInSeconds, timeLeftInSeconds) => ((totalCycleLengthInSeconds - timeLeftInSeconds) / totalCycleLengthInSeconds) * 100;