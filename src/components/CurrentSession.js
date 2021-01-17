import React from "react";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";

class CurrentSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsedTimeInSeconds: 0,
    };
  }
  render() {
    const { elapsedTimeInSeconds } = this.state;
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

    return (
      <div>
        <div>Current Session</div>
        <Timer elapsedTimeInSeconds={elapsedTimeInSeconds} />
        <ProgressBar
          sessionLengthInMinutes={sessionLengthInMinutes}
          breakLengthInMinutes={breakLengthInMinutes}
          sessionBlockWidth={sessionBlockWidth}
          breakBlockWidth={breakBlockWidth}
          previewBlocks={previewBlocks}
          task={task}
        />
      </div>
    );
  }
}

export default CurrentSession;
