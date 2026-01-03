import { useEffect, useMemo, useState } from "react";

const TEST_DURATION = 60;

const PARAGRAPHS = {
  easy: [
    "typing is a skill that improves with practice and patience focus on pressing the correct keys slowly and steadily without rushing your speed will naturally increase over time as accuracy improves and confidence builds",
    "learning to type efficiently requires calm focus and repetition mistakes are normal and correcting them helps your brain build muscle memory consistency matters more than speed",
    "typing without punctuation allows beginners to focus purely on rhythm and flow this helps build confidence and reduces frustration early on",
    "daily typing practice helps improve coordination between your hands and eyes regular sessions lead to noticeable improvement over time",
    "accuracy should always come before speed when learning to type rushing often leads to unnecessary mistakes"
  ],
  medium: [
    "Typing efficiently requires focus, rhythm, and patience. Small mistakes should not break your concentration, and steady progress comes with consistency.",
    "The goal of typing practice is accuracy first, speed later. Progress happens gradually through repetition and discipline.",
    "Good posture, proper hand placement, and mental focus improve typing performance significantly over time.",
    "Typing tests measure words per minute, accuracy, and consistency. Each metric helps track improvement.",
    "Practicing daily builds long-term typing confidence, reduces errors, and improves overall speed."
  ],
  hard: [
    "Typing fast isn't just about speed; it's about accuracy, discipline, and focus! Rushing leads to errors, frustration, and inconsistency.",
    "Professional typists maintain rhythm, avoid panic, and recover quickly from mistakes—this separates experts from beginners.",
    "Accuracy matters more than speed—without precision, higher speed becomes meaningless and unreliable.",
    "Advanced typing tests include punctuation, symbols, and complex sentence structures, challenging both speed and accuracy.",
    "Staying calm under pressure, maintaining posture, and typing consistently are keys to mastering advanced typing tests."
  ]
};

export default function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const pool = PARAGRAPHS[difficulty];
    setText(pool[Math.floor(Math.random() * pool.length)]);
    resetTest();
    // eslint-disable-next-line
  }, [difficulty]);

  useEffect(() => {
    if (!started || paused || finished) return;
    if (timeLeft === 0) {
      setFinished(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [started, paused, finished, timeLeft]);

  useEffect(() => {
    if (input.length === text.length && text.length > 0) {
      setFinished(true);
    }
  }, [input, text]);

  const handleChange = (e) => {
    if (finished) return;
    if (!started) setStarted(true);
    setInput(e.target.value);
  };

  const resetTest = () => {
    setInput("");
    setTimeLeft(TEST_DURATION);
    setStarted(false);
    setPaused(false);
    setFinished(false);
  };

  let correctChars = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === text[i]) correctChars++;
  }

  const timeSpent = TEST_DURATION - timeLeft;
  const timeInMinutes = timeSpent / 60;

  const wpm =
    timeInMinutes > 0
      ? Math.round((correctChars / 5) / timeInMinutes)
      : 0;

  const accuracy =
    input.length === 0
      ? 0
      : Math.round((correctChars / input.length) * 100);

  const renderedText = useMemo(
    () =>
      text.split("").map((char, i) => {
        let color = "#94a3b8";
        if (i < input.length) {
          color = input[i] === char ? "#22c55e" : "#ef4444";
        }
        return (
          <span key={i} style={{ color }}>
            {char}
          </span>
        );
      }),
    [text, input]
  );

  return (
    <div className="container-fluid min-vh-100 bg-dark text-light py-4 px-5">
      <h1 className="text-center mb-4">⌨️ Advanced Typing Speed Test</h1>

      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        <select
          className="form-select w-auto"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={started && !finished}
        >
          <option value="easy">Easy (No punctuation)</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard (Punctuation)</option>
        </select>

        <button
          className="btn btn-outline-light"
          onClick={() => setPaused(p => !p)}
          disabled={!started || finished}
        >
          {paused ? "Resume" : "Pause"}
        </button>

        <button className="btn btn-danger" onClick={resetTest}>
          Reset
        </button>
      </div>

      <div className="fs-5 text-center mb-4">{renderedText}</div>

      <textarea
        className="form-control mb-4"
        rows="4"
        value={input}
        onChange={handleChange}
        disabled={finished}
        placeholder="Start typing here..."
      />

      <div className="d-flex justify-content-center gap-4 fs-5">
        <span>⏳ Time: {timeLeft}s</span>
        <span>WPM: {wpm}</span>
        <span>Accuracy: {accuracy}%</span>
      </div>

      {finished && (
        <div className="alert alert-success text-center mt-4">
          <h4>Test Completed 🎉</h4>
          <p>
            WPM: <strong>{wpm}</strong> | Accuracy:{" "}
            <strong>{accuracy}%</strong>
          </p>
        </div>
      )}
    </div>
  );
}
