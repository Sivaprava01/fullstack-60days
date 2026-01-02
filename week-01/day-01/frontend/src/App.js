import { useEffect, useState } from "react";
import Confetti from "react-confetti";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState("");

  const [activeTask, setActiveTask] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);

  const [completed, setCompleted] = useState(false);
  const [completedToday, setCompletedToday] = useState([]);

  /* ---------------- LOAD / SAVE ---------------- */
  useEffect(() => {
    const t = JSON.parse(localStorage.getItem("tasks")) || [];
    const c = JSON.parse(localStorage.getItem("completedToday")) || [];
    setTasks(t);
    setCompletedToday(c);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completedToday", JSON.stringify(completedToday));
  }, [completedToday]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (!running) return;

    if (secondsLeft === 0) {
      setRunning(false);
      setCompleted(true);

      setCompletedToday(prev => [...prev, activeTask]);
      setTasks(prev => prev.filter(t => t.id !== activeTask.id));
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft(s => s - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running, secondsLeft, activeTask]);

  /* ---------------- HELPERS ---------------- */
  const addTask = () => {
    if (!text || !minutes) return;

    const newTask = {
      id: Date.now(),
      text,
      minutes: Number(minutes),
    };

    setTasks(prev => [newTask, ...prev]);
    setText("");
    setMinutes("");
  };

  const startTask = (task) => {
    setActiveTask(task);
    setSecondsLeft(task.minutes * 60);
    setRunning(true);
    setCompleted(false);
  };

  const exitSession = () => {
    setRunning(false);
    setActiveTask(null);
    setSecondsLeft(0);
  };

  const formatTime = () => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    if (!activeTask) return 0;
    const total = activeTask.minutes * 60;
    return ((total - secondsLeft) / total) * 100;
  };

  /* ---------------- SUCCESS SCREEN ---------------- */
  if (completed) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center flex-column text-light"
        style={{
          background: "linear-gradient(135deg, #0f172a, #1e1b4b, #020617)",
        }}
      >
        <Confetti numberOfPieces={700} gravity={0.6} recycle={false} />
        <h1 className="mb-3">🎉 Focus Session Complete</h1>
        <button
          className="btn btn-light"
          onClick={() => {
            setCompleted(false);
            exitSession();
          }}
        >
          Back to board
        </button>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <div
      className="vh-100 d-flex text-light"
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e1b4b, #020617)",
      }}
    >
      {/* SIDEBAR */}
      <div
        className="p-4"
        style={{
          width: "320px",
          background: "#020617",
          borderRight: "1px solid #1e293b",
        }}
      >
        <h5 className="mb-3">Focus Tasks</h5>

        <input
          className="form-control mb-2"
          placeholder="Task name"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={e => setMinutes(e.target.value)}
        />

        <button className="btn btn-success w-100 mb-4" onClick={addTask}>
          Add Task
        </button>

        {tasks.map(task => (
          <div
            key={task.id}
            className={`p-2 mb-2 rounded ${
              activeTask?.id === task.id
                ? "bg-success text-dark"
                : "bg-secondary"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => startTask(task)}
          >
            {task.text} · {task.minutes}m
          </div>
        ))}

        <div className="mt-4">
          <h6 className="text-muted">Completed Today</h6>
          {completedToday.length === 0 && (
            <p className="text-muted small">No sessions yet</p>
          )}
          {completedToday.map((t, i) => (
            <div key={i} className="small text-success">
              ✓ {t.text}
            </div>
          ))}
        </div>
      </div>

      {/* FOCUS PANEL */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center position-relative">
        {!activeTask && (
          <p className="text-muted">Select a task to start focusing</p>
        )}

        {activeTask && (
          <div
            className="text-center p-5 rounded position-relative"
            style={{
              background: "radial-gradient(circle at top, #1e293b, #020617)",
              width: "460px",
              boxShadow: "0 0 60px rgba(168,85,247,0.35)",
            }}
          >
            <button
              className="btn btn-sm btn-outline-light position-absolute top-0 end-0 m-3"
              onClick={exitSession}
            >
              ✕
            </button>

            <h4 className="mb-4">{activeTask.text}</h4>

            {/* ANALOGUE + DIGITAL TIMER */}
            <div className="d-flex justify-content-center mb-4">
              <svg width="220" height="220">
                <circle
                  cx="110"
                  cy="110"
                  r="90"
                  stroke="#1e293b"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="110"
                  cy="110"
                  r="90"
                  stroke="#a855f7"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 90}
                  strokeDashoffset={
                    2 * Math.PI * 90 * (1 - getProgress() / 100)
                  }
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  fill="#e5e7eb"
                  fontSize="32"
                  fontWeight="600"
                >
                  {formatTime()}
                </text>
              </svg>
            </div>

            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-light"
                onClick={() => setRunning(!running)}
              >
                {running ? "Pause" : "Resume"}
              </button>

              <button
                className="btn btn-danger"
                onClick={() =>
                  setSecondsLeft(activeTask.minutes * 60)
                }
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
