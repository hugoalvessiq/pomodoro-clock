import { useEffect, useState } from "react";
import buzzer from "/sounds/airhorn-sound.mp3";

import "./App.css";


function App() {
  const [timeLabel, setTimerLabel] = useState("Session");

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(1500);
  const [timeBreak, setTimeBreak] = useState(300);
  const [session, setSession] = useState(1500);

  const [timerId, setTimerId] = useState(false);

  let audio = (
    <audio
      src={buzzer}
      ref={(ref) => (audio = ref)}
      id="beep"
      preload="none"
    ></audio>
  );

  /* ################# Function Audio Play Reset##################### */
  function audioSound() {
    let playPromise = document.getElementById("beep");
    playPromise.play();
  }

  function audioSoundReset() {
    let playPromise = document.getElementById("beep");
    playPromise.pause();
    playPromise.currentTime = 0;
  }

  /* ################# End Function Audio Play Reset##################### */

  /* ################# Function Counter Decrease ##################### */

  if (time >= 0) {
    useEffect(() => {
      let interval = null;
      if (isActive && isPaused === false) {
        interval = setInterval(() => {
          setTime((time) => time - 1);
        }, 100);
      } else {
        clearInterval(interval);
      }
      return () => {
        clearInterval(interval);
      };
    }, [isActive, isPaused]);
  } else {
    setTime(timeBreak);
    setTimerId(true);

    useEffect(() => {
      let interval = null;
      if (isActive && isPaused === false) {
        interval = setInterval(() => {
          setTime((time) => time - 1);
        }, 100);
      } else {
        clearInterval(interval);
      }
      return () => {
        clearInterval(interval);
      };
    }, [isActive, isPaused]);

    if (timerId === true) {
      setTime(session);
      setTimerId(false);
    } else {
      setTime(timeBreak);
    }
  }

  /* ################# End Function Counter Decrease ##################### */

  /* ################# Audio Start ##################### */
  if (time === 0) {
    audioSound();
  }
  /* ################# Audio Start ##################### */

  /* ################# Functions Count Control ##################### */

  const handleStart = () => {
    setIsActive(true);
    handlePauseResume();
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    audioSoundReset();
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(1500);
    setTimeBreak(300);
    setSession(1500);
    setTimerId(false);
    setIsPaused(true);
    audioSoundReset();
  };

  const handleSessionUp = () => {
    if (session < 3600 && isPaused === true) {
      setSession(session + 60);
      setTime(session + 60);
    }
    if (timeBreak < session) {
      setTimerLabel("Session");
    }
  };

  const handleSessionDown = () => {
    if (session > 60 && isPaused === true) {
      setSession(session - 60);
      setTime(session - 60);
    }
  };

  const handleBreakUp = () => {
    if (timeBreak < 3600 && isPaused === true) {
      setTimeBreak(timeBreak + 60);
    }
  };

  const handleBreakDown = () => {
    if (timeBreak > 60 && isPaused === true) {
      setTimeBreak(timeBreak - 60);
    }
  };

  /* ################# End Functions Count Control ##################### */

  /* ################# Function Format Counter ##################### */

  function formatTimer() {
    if (time < 0) return "00:00";
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }

  /* ################# End Function Format Counter ##################### */

  /* ################# DOM  ##################### */

  return (
    <div className="App">
      <div id="container">
        <h1 id="main--title">Pomodoro Clock</h1>
        <header>
          <div></div>
          <h1 id="timer-label">{timerId === true ? "Break" : "Session"}</h1>
          <h4 id="time-left">{formatTimer()}</h4>
        </header>
        <div className="container--btn">
          <section id="break-label">
            <p>Break Length</p>
            <div className="buttons">
              <button
                id="break-increment"
                className="btn"
                onClick={handleBreakUp}
              >
                <i className="bi bi-arrow-up-circle-fill"></i>
              </button>
              <p id="break-length">{Math.floor(timeBreak / 60)}</p>
              <button
                id="break-decrement"
                className="btn"
                onClick={handleBreakDown}
              >
                <i className="bi bi-arrow-down-circle-fill"></i>
              </button>
            </div>
          </section>

          <section id="session-label">
            <p>Session Length</p>
            <div className="buttons">
              <button
                id="session-increment"
                className="btn"
                onClick={handleSessionUp}
              >
                <i className="bi bi-arrow-up-circle-fill"></i>
              </button>
              <p id="session-length">{Math.floor(session / 60)}</p>
              <button
                id="session-decrement"
                className="btn"
                onClick={handleSessionDown}
              >
                <i className="bi bi-arrow-down-circle-fill"></i>
              </button>
            </div>
          </section>
        </div>

        <section id="play--pause">
          <button className="btn" id="start_stop" onClick={handleStart}>
            {isActive && isPaused === false ? (
              <span>
                <i className="bi bi-pause-circle-fill"></i>
              </span>
            ) : (
              <span>
                <i className="bi bi-play-circle-fill"></i>
              </span>
            )}
          </button>
          <button id="reset" className="btn" onClick={handleReset}>
            <i className="bi bi-arrow-counterclockwise"></i>
          </button>
        </section>
        <button className="btn"></button>

        <audio
          src={buzzer}
          ref={(ref) => (audio = ref)}
          id="beep"
          preload="none"
          autoPlay
        ></audio>
      </div>
    </div>
  );
  /* ################# End DOM  ##################### */
}

export default App;
