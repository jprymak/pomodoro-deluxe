const defaultTask ={
        id: "default",
        task: "",
        sessionLengthInMinutes: 25,
        breakLengthInMinutes: 5,
        numberOfSessions: 4,
        previewBlocks: ["session", "break", "session", "break","session", "break","session"],
        alarmTimeStamps: [{timeStamp: 1500, status: "sessionEnded"}],
        elapsedTimeInSeconds: 0,
        isPaused: false,
        isRunning: false,
        nextTimeStampIndex: 0,
        nextTimeStamp: "",
        isPlaying: false,
        totalTimeSpentInSeconds: 0,
        hasError: false
}

export default defaultTask;