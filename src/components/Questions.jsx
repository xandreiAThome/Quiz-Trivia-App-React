import React from "react";
import Choices from "./Choices";
import { nanoid } from "nanoid";

export default function Questions(props) {
  const [hold, setHold] = React.useState(false);

  const choicesArray = props.question.incorrect_answer.map((incorrect) => {
    return {
      choice: incorrect,
      isCorrect: false,
      id: nanoid(),
      isClicked: false,
    };
  });

  choicesArray.push({
    choice: props.question.correct_answer,
    isCorrect: true,
    id: nanoid(),
    isClicked: false,
  });

  // the questions are shuffled because the correct answers always comes first when the api is called
  function shuffle(array) {
    let i = array.length;
    while (i--) {
      const ri = Math.floor(Math.random() * i);
      [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
  }

  function Clicked(id) {
    setChoice((prevChoice) =>
      prevChoice.map((choice) => {
        return id === choice.id
          ? { ...choice, isClicked: !choice.isClicked }
          : choice;
      })
    );
  }

  const [choiceState, setChoice] = React.useState(shuffle(choicesArray));

  React.useEffect(() => {
    let tally = 0;
    if (props.gameLoopState === "check") {
      for (let i = 0; i < choiceState.length; i++) {
        if (choiceState[i].isClicked && choiceState[i].isCorrect) {
          tally += 1;
        }
      }
      props.Tally(tally);
    }
  }, [props.gameLoopState]);

  const choices = choiceState.map((choice) => (
    <Choices
      choice={choice}
      Clicked={() => Clicked(choice.id)}
      key={choice.id}
      gameLoopState={props.gameLoopState}
    />
  ));

  return (
    <div>
      <h3 className="questions">{props.question.questions}</h3>
      <div className="choice--container">{choices}</div>
      <hr className="break--line" />
    </div>
  );
}
