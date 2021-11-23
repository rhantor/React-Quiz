import Answer from "./Answer"
import style from "../styles/Question.module.css";
export default function Question({answers}) {
  return answers.map((answer , index)=>(
    <div className={style.question} key={index}>
      <div className={style.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {answer.title}
      </div>
      <Answer input={false} options={answer.options} />
    </div>
  ))
}
