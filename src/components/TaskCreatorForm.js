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
  hasError
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
          />
          {hasError && <p className="form__error">Make sure that task name is no more than 40 characters long</p>}
        <label htmlFor="session-length" className="form__label">
          Set session length in minutes
        </label>
        <input
            id="session-length"
            value={sessionLengthInMinutes}
            onChange={onSessionLengthInMinutesChange}
            className="form__input"
            type="number"
            // min="1"
          />
          {hasError && <p className="form__error">Make sure that session length is in 10 to 60 minute range</p>}
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
          {hasError && <p className="form__error">Make sure that break length is in 5 to 60 minute range</p>}
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
            max="10"
          />
          {hasError && <p className="form__error">Make sure that number of sessions is 1 to 10</p>}
        <button className="button">
          Accept
        </button>
      </form>
    </div>
  );
}

export default TaskCreatorForm;
