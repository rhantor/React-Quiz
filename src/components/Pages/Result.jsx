import { useParams, useLocation } from "react-router";
import useAnswer from "../../hooks/useAnswer";
import Analysis from "../Analysis";
import Questions from "../Questions";
import Summary from "../Summary";
import _ from "lodash";
export default function Result() {
  const { id } = useParams();
  const { loading, error, answers } = useAnswer(id);
  const history = useLocation();
  const { state } = history;


  // Score calculating...

  function calculating() {
    let score = 0;
    answers.forEach((question, index1) => {
      let correctIndex = [],
        checkedIndex = [];
      question.options.forEach((option, index2) => {
        if (option.correct) correctIndex.push(index2);
        if (state[index1].options[index2].checked) {
          checkedIndex.push(index2);
          option.checked = true;
        }
      });

      if (_.isEqual(correctIndex, checkedIndex)) {
        score = score + 10;
      }
    });
    return score;
  }
  let score = calculating();

  return (
    <>
      {loading && (
        <div style={{ textAlign: "center", fontSize: "20px" }}>Loading...</div>
      )}
      {error && (
        <div style={{ textAlign: "center", fontSize: "20px" }}>
          There was an error!
        </div>
      )}
      {!loading && !error && answers.length > 0 && (
        <>
          <Summary score={score} naq={answers.length} />
          <Analysis />
          <Questions answers={answers} />
        </>
      )}
    </>
  );
}
