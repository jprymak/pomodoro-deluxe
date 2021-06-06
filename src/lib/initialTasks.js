import { v4 as uuidv4 } from "uuid";

const initialTasks = [
    {
        id: uuidv4(),
        task: "Learning React",
        sessionLengthInMinutes: 25,
        breakLengthInMinutes: 5,
        numberOfSessions: 4,
        previewBlocks: [
          "session",
          "break",
          "session",
          "break",
          "session",
          "break",
          "session",
        ],
        elapsedTimeInSeconds: 0,
        isPaused: false,
        isRunning: false,
        alarmTimeStamps: [{timeStamp: 1500, status: "sessionEnded"},
       {timeStamp: 1800, status: "breakEnded"},
       {timeStamp: 3300, status: "sessionEnded"},
       {timeStamp: 3600, status: "breakEnded"},
       {timeStamp: 5100, status: "sessionEnded"},
       {timeStamp: 5400, status: "breakEnded"},
       {timeStamp: 6900, status: "sessionEnded"}
    
    ],
      nextTimeStampIndex: 0,
      nextTimeStamp: "",
      isPlaying: false,
      isCurrent: false
      },
      {
        id: uuidv4(),
        task: "Learning Agular",
        sessionLengthInMinutes: 25,
        breakLengthInMinutes: 5,
        numberOfSessions: 4,
        previewBlocks: [
          "session",
          "break",
          "session",
          "break",
          "session",
          "break",
          "session",
        ],
        elapsedTimeInSeconds: 0,
        isPaused: false,
        isRunning: false,
        alarmTimeStamps: [{timeStamp: 1500, status: "sessionEnded"},
       {timeStamp: 1800, status: "breakEnded"},
       {timeStamp: 3300, status: "sessionEnded"},
       {timeStamp: 3600, status: "breakEnded"},
       {timeStamp: 5100, status: "sessionEnded"},
       {timeStamp: 5400, status: "breakEnded"},
       {timeStamp: 6900, status: "sessionEnded"}
    
    ],
      nextTimeStampIndex: 0,
      nextTimeStamp: "",
      isPlaying: false,
      isCurrent: false
      },
      {
        id: uuidv4(),
        task: "Learning Vue",
        sessionLengthInMinutes: 25,
        breakLengthInMinutes: 5,
        numberOfSessions: 4,
        previewBlocks: [
          "session",
          "break",
          "session",
          "break",
          "session",
          "break",
          "session",
        ],
        elapsedTimeInSeconds: 0,
        isPaused: false,
        isRunning: false,
        alarmTimeStamps: [{timeStamp: 1500, status: "sessionEnded"},
         {timeStamp: 1800, status: "breakEnded"},
         {timeStamp: 3300, status: "sessionEnded"},
         {timeStamp: 3600, status: "breakEnded"},
         {timeStamp: 5100, status: "sessionEnded"},
         {timeStamp: 5400, status: "breakEnded"},
         {timeStamp: 6900, status: "sessionEnded"}
      
      ],
        nextTimeStampIndex: 0,
        nextTimeStamp: "",
        isPlaying: false,
        isCurrent: true,
    }
    ]

    export default initialTasks;