import React from "react";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";

import {getHoursFromSeconds, getMinutesFromSeconds, getRemainingSecondsFromSeconds} from "../lib/time";

class CurrentSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentSession
    this.intervalID = null;
  }

  startTimer = () => {
    if (this.intervalID === null) {
      this.intervalID = window.setInterval(() => {
        this.setState((prevState) => {
          const elapsedTimeInSeconds = prevState.elapsedTimeInSeconds + 1;
          return { elapsedTimeInSeconds };
        });
      }, 1000);
    }
  };
  componentDidMount() {
        if (this.state.isRunning === true && !this.state.isPaused) {
          this.startTimer();
        }
  }

  componentWillUnmount() {
    if (this.state.isRunning === true) {
      this.stopTimer();
    }
    this.props.saveState(this.state);
  }

  handleStart = () => {
    this.setState({ isRunning: true });
    this.startTimer();
  };

  stopTimer = () => {
    window.clearInterval(this.intervalID);
    this.intervalID = null;
  };

  handleStop = () => {
    this.stopTimer();
    this.setState({ elapsedTimeInSeconds: 0, isRunning: false });
  };

  togglePause = () => {
    this.setState((prevState) => {
      const isPaused = !prevState.isPaused;
      if (this.state.isPaused) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
      return { isPaused };
    });
  };

  render() {
    const { elapsedTimeInSeconds, isRunning, isPaused } = this.state;
    const {
      sessionLengthInMinutes,
      numberOfSessions,
      previewBlocks,
      task,
      breakLengthInMinutes,
    } = this.props.currentSession;

    const totalCycleLengthInMinutes =
      numberOfSessions * sessionLengthInMinutes +
      breakLengthInMinutes * (numberOfSessions - 1);
    const sessionBlockWidth =
      (sessionLengthInMinutes / totalCycleLengthInMinutes) * 100;
    const breakBlockWidth =
      (breakLengthInMinutes / totalCycleLengthInMinutes) * 100;
    const totalCycleLengthInSeconds = totalCycleLengthInMinutes * 60;
    const timeLeftInSeconds = totalCycleLengthInSeconds - elapsedTimeInSeconds;
    
            const hours = getHoursFromSeconds(timeLeftInSeconds)
            const minutes = getMinutesFromSeconds(timeLeftInSeconds)
            const seconds = getRemainingSecondsFromSeconds(timeLeftInSeconds)

    return (
      <div>
        <div>Current Session</div>
        <Timer hours={hours} minutes={minutes} seconds={seconds} />
        <ProgressBar
        isPaused = {isPaused}
          sessionLengthInMinutes={sessionLengthInMinutes}
          breakLengthInMinutes={breakLengthInMinutes}
          sessionBlockWidth={sessionBlockWidth}
          breakBlockWidth={breakBlockWidth}
          previewBlocks={previewBlocks}
          task={task}
          totalCycleLengthInSeconds={totalCycleLengthInSeconds}
          timeLeftInSeconds={timeLeftInSeconds}
        />
        <div className="flex justify-around">
          <button
            disabled={isRunning}
            onClick={this.handleStart}
            className={`p-1 self-center border-solid border-2 border-black rounded-md mt-4 w-20 ${
              isRunning ? "opacity-40 cursor-default" : ""
            }`}
          >
            Start
          </button>
          <button
            disabled={!isRunning}
            onClick={this.handleStop}
            className={`p-1 self-center border-solid border-2 border-black rounded-md mt-4 w-20 ${
              isRunning ? "" : "opacity-40 cursor-default"
            }`}
          >
            Stop
          </button>
          <button
            disabled={!isRunning}
            onClick={this.togglePause}
            className={`p-1 self-center border-solid border-2 border-black rounded-md mt-4 w-20 ${
              isRunning ? "" : "opacity-40 cursor-default"
            }`}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>
    );
  }
}

export default CurrentSession;
