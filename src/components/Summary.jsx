import style from "../styles/Summary.module.css";
import image from "../assets/images/success.png"
export default function Summary({score , naq}) {
  return (
    <div className={style.summary}>
      <div className={style.point}>
        {/* <!-- progress bar will be placed here --> */}
        <p className={style.score}>
          Your score is <br />{score} of {naq * 10}
        </p>
      </div>

      <div className={style.badge}>
        <img src={image} alt="Success" />
      </div>
    </div>
  );
}
