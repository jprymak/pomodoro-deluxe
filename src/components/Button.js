export default function Button(props) {
    const { isRunning, onClick, role, isPaused } = props;
    const roleClassnames = {
        "Start": `button ${isRunning ? "button--disabled" : ""}`,
        "Stop": `button ${isRunning ? "" : "button--disabled"}`,
        "Pause/Resume": `button ${isRunning ? "" : "button--disabled"}`,
    }

    return <button
        disabled={role === 'Start' ? isRunning : !isRunning}
        onClick={onClick}
        className={roleClassnames[role]}>
        {role !== "Pause/Resume" ? role : isPaused ? "Resume" : "Pause"}
    </button>
}

