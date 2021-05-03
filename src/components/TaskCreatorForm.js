function TaskCreatorForm({
  onSubmit,
  task,
  sessionLengthInMinutes,
  breakLengthInMinutes,
  numberOfSessions,
  onTaskNameChange,
  onSessionLengthInMinutesChange,
  onBreakLengthInMinutesChange,
  onNumberOfSessionsChange,
}) {
  return (
    <div className="form-container">
      <form
        onSubmit={onSubmit}
        className="form"
      >
        <label htmlFor="task-name" className="form__label">
          What are you doing?
        </label>
        <input
            id="task-name"
            value={task}
            onChange={onTaskNameChange}
            className="form__input"
            type="text"
            required="required"
          />
        <label htmlFor="session-length" className="form__label">
          Set session length in minutes
        </label>
        <input
            id="session-length"
            value={sessionLengthInMinutes}
            onChange={onSessionLengthInMinutesChange}
            className="form__input"
            type="number"
            min="1"
          />
        <label htmlFor="break-length" className="form__label">
          Set break length in minutes
        </label>
        <input
            id="break-length"
            value={breakLengthInMinutes}
            onChange={onBreakLengthInMinutesChange}
            className="form__input"
            type="number"
            min="1"
          />
        <label htmlFor="sessions-count" className="form__label">
          Number of sessions
        </label>
        <input
            id="sessions-count"
            value={numberOfSessions}
            onChange={onNumberOfSessionsChange}
            className="form__input"
            type="number"
            min="1"
          />
        <button className="button">
          Accept
        </button>
      </form>
    </div>
  );
}

export default TaskCreatorForm;
