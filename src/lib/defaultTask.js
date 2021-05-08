const defaultTask ={
        task: "",
        sessionLengthInMinutes: 25,
        breakLengthInMinutes: 5,
        numberOfSessions: 4,
        previewBlocks: ["session", "break", "session", "break","session", "break","session"],
        elapsedTimeInSeconds: 0,
        isPaused: false,
        isRunning: false,
        nextTimeStampIndex: 0,
        nextTimeStamp: "",
        isPlaying: false,
        totalTimeSpentInSeconds: 0,
}

export default defaultTask;