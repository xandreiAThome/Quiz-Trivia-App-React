import React from "react";
import Questions from "./components/Questions";
import Start from "./components/Start";
import { nanoid } from "nanoid";

export default function App() {
  const [gameLoopState, setGameLoopState] = React.useState("start");
  const [questions, setQuestions] = React.useState([]);
  const [requestAPI, setRequestAPI] = React.useState(false);
  const [tally, setTally] = React.useState(0);

  // custom hook that makes a react.useeffect not run on initial render
  const useDidMountEffect = (func, deps) => {
    const didMount = React.useRef(false);

    React.useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
    }, deps);
  };

  useDidMountEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&encode=base64")
      .then((res) => res.json())
      .then((data) =>
        setQuestions(
          //decoding the 64bit reply of the API
          data.results.map((data) => {
            return {
              category: atob(data.category),
              correct_answer: atob(data.correct_answer),
              difficulty: atob(data.difficulty),
              incorrect_answer: data.incorrect_answers.map((incorrect) =>
                atob(incorrect)
              ),
              questions: atob(data.question),
              type: atob(data.type),
              id: nanoid(),
            };
          })
        )
      );
  }, [requestAPI]);

  function Tally(x) {
    setTally((prev) => prev + x);
  }

  function Reset() {
    setGameLoopState("game");
    setRequestAPI((prev) => !prev);
    setTally(0);
  }

  function Proceed() {
    setGameLoopState("game");
    setRequestAPI((prev) => !prev);
  }
  const allQuestions = questions.map((question) => (
    <Questions
      question={question}
      key={question.id}
      gameLoopState={gameLoopState}
      Tally={Tally}
    />
  ));

  return (
    <div className="app--container">
      {console.log(tally)}
      {gameLoopState === "start" && <Start Proceed={() => Proceed()} />}
      <div className="questions--container">
        {(gameLoopState === "game" || gameLoopState === "check") &&
          allQuestions}
      </div>
      {gameLoopState === "game" && (
        <button
          className="check--button"
          onClick={() => setGameLoopState("check")}
        >
          Check Answers
        </button>
      )}
      {gameLoopState === "check" && (
        <div className="tally--container">
          <h3 className="tally">Correct Answers: {tally}</h3>{" "}
          <button className="reset--button" onClick={Reset}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
