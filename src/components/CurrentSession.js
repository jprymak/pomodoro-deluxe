import React from "react";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import Sound from "react-sound";
import breakEndsAlarmSfx from "../sounds/316837__lalks__alarm-02-short.wav";
import sessionEndsAlarmSfx from "../sounds/320492__lacezio__clock-chime.wav";

import {
  getHoursFromSeconds,
  getMinutesFromSeconds,
  getRemainingSecondsFromSeconds,
} from "../lib/time";

class CurrentSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentSession;
    this.intervalID = null;

    const {
      sessionLengthInMinutes,
      numberOfSessions,
      breakLengthInMinutes,
    } = this.props.currentSession;
    this.totalCycleLengthInSeconds =
      (numberOfSessions * sessionLengthInMinutes +
        breakLengthInMinutes * (numberOfSessions - 1)) *
      60;
    this.audioRef = React.createRef();
  }

  startTimer = () => {
    if (this.intervalID === null) {
      this.intervalID = window.setInterval(() => {
        this.setState(
          (prevState) => {
            const elapsedTimeInSeconds = prevState.elapsedTimeInSeconds + 1;

            return { elapsedTimeInSeconds };
          },
          () => {
            this.checkIfAlarmIsToBeSetOff();
          }
        );
      }, 1000);
    }
  };
  componentDidMount() {
    this.setState({
      nextTimeStamp: this.state.alarmTimeStamps[this.state.nextTimeStampIndex],
    });
    if (this.state.isRunning === true && !this.state.isPaused) {
      this.startTimer();
    }
  }

  componentDidUpdate() {
    if (this.state.elapsedTimeInSeconds >= this.totalCycleLengthInSeconds) {
      this.stopTimer();
    }
  }

  componentWillUnmount() {
    if (this.state.isRunning === true) {
      this.stopTimer();
    }
    this.props.saveState(this.state);
  }

  checkIfAlarmIsToBeSetOff() {
    const conditions = [
      this.state.elapsedTimeInSeconds >= this.state.nextTimeStamp.timeStamp,
      this.state.elapsedTimeInSeconds < this.state.nextTimeStamp.timeStamp + 5,
    ];
    if (conditions.every((condition) => condition === true)) {
      this.setState({ isPlaying: true });
    } else {
      this.setState({ isPlaying: false });
    }
    if (
      this.state.elapsedTimeInSeconds >=
      this.state.nextTimeStamp.timeStamp + 5
    ) {
      this.setNextTimeStampIndex();
    }
  }

  setNextTimeStampIndex = () => {
    this.setState(
      (prevState) => {
        const nextTimeStampIndex = prevState.nextTimeStampIndex + 1;
        return { nextTimeStampIndex };
      },
      () => {
        this.setNextTimeStamp();
      }
    );
  };

  setNextTimeStamp = () => {
    this.setState({
      nextTimeStamp: this.state.alarmTimeStamps[this.state.nextTimeStampIndex],
    });
  };

  resetTimeStamp = () => {
    this.setState({ nextTimeStamp: this.state.alarmTimeStamps[0] });
  };

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
    this.resetTimeStamp();
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

  playAlarm = (elapsedTimeInSeconds, totalCycleLengthInSeconds) => {
    if (this.state.isPlaying) {
      let audioSrc = null;
      if (this.state.nextTimeStamp.status === "sessionEnded") {
        audioSrc = sessionEndsAlarmSfx;
      } else {
        audioSrc = breakEndsAlarmSfx;
      }
      return (
        <audio
          ref={this.audioRef}
          src={audioSrc}
          autoPlay
          loop={
            elapsedTimeInSeconds < totalCycleLengthInSeconds ? true : false
          }
        ></audio>
      );
    }
  };

  render() {
    const { elapsedTimeInSeconds, isRunning, isPaused, isPlaying } = this.state;
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

    const hours = getHoursFromSeconds(timeLeftInSeconds);
    const minutes = getMinutesFromSeconds(timeLeftInSeconds);
    const seconds = getRemainingSecondsFromSeconds(timeLeftInSeconds);

    return (
      <div>
        <div>Current Session</div>
        {isPlaying ? this.playAlarm(elapsedTimeInSeconds, totalCycleLengthInSeconds ) : null}

        <Timer hours={hours} minutes={minutes} seconds={seconds} />
        <ProgressBar
          isPaused={isPaused}
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
