import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import style from "../styles/MiniPlayer.module.css";

export default function MiniPlayer({ url, title }) {
  const [status, setStatus] = useState();
  const togglePlayerBtn = useRef();
  const videUrl = `https://www.youtube.com/watch?v=${url}`;
  const toggleMiniPlayer = () => {
    if (status) {
      setStatus(false);
      togglePlayerBtn.current.classList.add(style.floatingBtn);
    } else {
      setStatus(true);
      togglePlayerBtn.current.classList.remove(style.floatingBtn);
    }
  };
  return (
    <div
      className={`${style.miniPlayer} ${style.floatingBtn}`}
      ref={togglePlayerBtn}
      onClick={toggleMiniPlayer}
    >
      <span className={`material-icons-outlined ${style.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span
        className={`material-icons-outlined ${style.close}`}
        onClick={toggleMiniPlayer}
      >
        {" "}
        close{" "}
      </span>
      <ReactPlayer
        className={style.player}
        width="300px"
        height="168"
        controls
        url={videUrl}
        playing={status}
        progressInterval
      />
      <p>{title}</p>
    </div>
  );
}
