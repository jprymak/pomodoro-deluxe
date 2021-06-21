import { v4 as uuidv4 } from "uuid";

function ProgressBar(props) {
  const {
    task,
    sessionLengthInMinutes,
    breakLengthInMinutes,
    previewBlocks,
    sessionBlockWidth,
    breakBlockWidth,
    isPaused,
    currentWidth,
    sessionIsDefault
  } = props;

  return (
    <div className={`progress-bar ${isPaused || sessionIsDefault ? "progress-bar--disabled" : ""}`}>
      <h2 className="progress-bar__task-name">{task}</h2>
      <div className="progress-bar__bar">
        <div
          style={{width: `${currentWidth || 0}%` }}
          className="progress-bar__progress"
        ></div>
        <div className="session-blocks">
        {previewBlocks.map((block) => {
          return block === "session" ? (
            <div
              key={uuidv4()}
              style={{ width: `${sessionBlockWidth}%` }}
              className="session-block session-block--session"
            >
              <p className="session-block__length session-block__length--black">{sessionLengthInMinutes}</p>
            </div>
          ) : (
            <div
              key={uuidv4()}
              style={{ width: `${breakBlockWidth}%` }}
              className="session-block session-block--break"
            >
              <p className="session-block__length session-block__length--white">{breakLengthInMinutes}</p>
            </div>
          );
        })}
        </div>
        
      </div>
    </div>
  );
}

export default ProgressBar;
