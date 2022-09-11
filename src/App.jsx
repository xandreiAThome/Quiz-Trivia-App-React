import React from "react";
import Questions from "./components/Questions";
import Start from "./components/Start";
import { nanoid } from "nanoid";

export default function App() {
  const [proceed, setProceed] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [correct, setCorrect] = React.useState(0);
  const [check, setCheck] = React.useState(false);

  function Proceed() {
    setProceed((prevState) => !prevState);
  }

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&encode=base64")
      .then((res) => res.json())
      .then((data) => setQuestions(data.results));
  }, []);

  function countCorrect() {
    setCorrect((prevCorrect) => prevCorrect + 1);
  }

  const allQuestions = questions.map((question) => (
    <Questions
      questions={question}
      key={question.question}
      check={check}
      correct={() => countCorrect()}
    />
  ));

  function Reset() {
    location.reload();
    return false;
  }

  return (
    <div className="app--container">
      {!proceed && <Start Proceed={() => Proceed()} />}
      <div className="questions--container">{proceed && allQuestions}</div>
      {!check && proceed && (
        <button
          className="check--button"
          onClick={() => setCheck((prevCheck) => !prevCheck)}
        >
          Check Answers
        </button>
      )}
      {check && (
        <div className="tally--container">
          <h3 className="tally">Correct Answers: {correct}</h3>{" "}
          <button className="reset--button" onClick={Reset}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
