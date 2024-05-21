
import { FaPlay, FaPause } from "react-icons/fa";
import "./home.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [runing, setRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;

    if (runing) {
      interval = setInterval(() => {
        setTime((preTime) => preTime + 1);
      }, 1);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [runing]);

  const startStopwatch = () => {
    if (!hasStarted) {
      setRunning(true);
      setHasStarted(true);
    }
  };

  const clearStopwatch = () => {
    setRunning(false);
    setTime(0);
    setHasStarted(false);
  };

  const playPauseStopwatch = () => {
    if (hasStarted) {
      setRunning(!runing);
    }
  };
  const formatTime = (time) => {
    const milliseconds = `0${Math.floor((time % 1000) / 10)}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / (1000 * 60)) % 60)}`.slice(-2);
    const hours = `0${Math.floor((time / (1000 * 60 * 60)) % 24)}`.slice(-2);

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <>
      <section className="container">
        <div className="glass-back">
          <div className="timer">
            <h3>{formatTime(time)}</h3>
          </div>
          <div className="btn-box">
            <span onClick={startStopwatch}>Start</span>
            <div className="play-pause" onClick={playPauseStopwatch}>
              {runing ? <FaPause /> : <FaPlay />}
            </div>
            <span onClick={clearStopwatch}>Clear</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
