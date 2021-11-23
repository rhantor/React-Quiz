import { getDatabase, ref, set } from "@firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import useQuiz from "../../hooks/useQuiz";
import Answer from "../Answer";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;
    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, quiz } = useQuiz(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({
      type: "questions",
      value: quiz,
    });
  }, [quiz]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }
  // when user click next button for more question

  const nextButton = () => {
    if (currentQuestion + 1 < quiz.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };
  // when user click next button for more question
  const prevButton = () => {
    if (currentQuestion >= 1 && currentQuestion <= quiz.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };
  // progress bar parcentage
  const progressParcentage =
    quiz.length > 0 ? ((currentQuestion + 1) / quiz.length) * 100 : 0;

  //OnSubmit to result
  async function onSubmit() {
    const { uid } = currentUser;
    const database = getDatabase();
    const resultRef = ref(database, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });
    navigate(`/result/${id}`, {
      state: qna,
    });
  }

  return (
    <>
      {loading && <div>loading....</div>}
      {error && <div>There was an error!!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>

          <Answer
            input={true}
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextButton}
            prev={prevButton}
            progress={progressParcentage}
            submit={onSubmit}
          />
          <MiniPlayer  url={id} title={qna[currentQuestion].title}/>
        </>
      )}
    </>
  );
}
