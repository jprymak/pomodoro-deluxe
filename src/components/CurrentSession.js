import Task from "./Task";

function CurrentSession({ currentSession }) {
  return (
    <div>
      <div>Current Session</div>
      <Task currentSession={currentSession} />
    </div>
  );
}

export default CurrentSession;
