import './HP & Timer.css'
import React from "react";

export default function Timer({time, setTime, pairsCount, setIsWin, setIsEnded, isEnded}) {

  React.useEffect(() => {
    if (!isEnded) {
      setTime(pairsCount * 5);
    }
  }, [isEnded]);

  React.useEffect(() => {
    const id = setTimeout(() => {
      if (!isEnded) {setTime(t => t - 0.1)};
    }, 100);

    return () => clearTimeout(id);
  }, [time]);

  React.useEffect(() => {
    if (time <= 0) {
      setIsWin(false);
      setIsEnded(true);
    }
  }, [time]);

  const percent = (time / (pairsCount*5)) * 100;

  const interpolateColor = (percent) => {
    const START  = { r: 127, g: 255, b: 212 }; // #7fffd4
    const MIDDLE = { r: 255, g: 238, b: 127 }; // #f7e886ff
    const END    = { r: 240, g: 128, b: 128 }; // #f08080

    let from, to, t;

    if (percent >= 50) {
      from = START;
      to = MIDDLE;
      t = (100 - percent) / 50;
    } else {
      from = MIDDLE;
      to = END;
      t = (50 - percent) / 50;
    }

    const r = Math.round(from.r + (to.r - from.r) * t);
    const g = Math.round(from.g + (to.g - from.g) * t);
    const b = Math.round(from.b + (to.b - from.b) * t);

    return `rgb(${r}, ${g}, ${b})`;
  };


    return (
    <div className="timer gamestats">
      <div className="timer-bar">
        <div
          className="timer-bar-fill"
          style={{width:`${percent}%`, background: interpolateColor(percent)}}
        />
      </div>
      <span className="timer-text">{`${(time <= 0)? 0:Math.floor(time)}`}s</span>
    </div>
  );
}