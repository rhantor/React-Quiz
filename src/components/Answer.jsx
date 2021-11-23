import { Fragment } from "react/cjs/react.production.min";
import styles from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";
export default function Answer({ options = [], handleChange, input }) {
  return (
    <div className={styles.answers}>
      {options.map((option, index) => (
        <Fragment key={index}>
          {input ? (<Checkbox
          className={styles.answer}
          value={index}
          text={option.title}
          checked={option.checked}
          onChange={(e)=> handleChange(e , index)}
          key={index}
        />) : (
          <Checkbox
          className= {` ${styles.answer} ${option.correct ? styles.correct : option.checked ? styles.wrong : null}`}
          text={option.title}
          defaultChecked={option.checked}
          key={index}
          disabled
        />
        )}
        </Fragment>
      ))}
    </div>
  );
}
