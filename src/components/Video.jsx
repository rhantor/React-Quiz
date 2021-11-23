import Styles from "../styles/Video.module.css";
import img from "../assets/images/3.jpg"
export default function Video({title , noq , id}) {
  return (
      <div className={Styles.video}>
        <img src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title} />
        <p>{title}</p>
        <div className={Styles.qmeta}>
          <p>{noq} Questions</p>
          <p>Score : {noq * 10}</p>
        </div>
      </div>
  );
}
