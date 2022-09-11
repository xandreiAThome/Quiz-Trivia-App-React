import React from "react";
import Choices from "./Choices";
import { nanoid } from "nanoid";

// a variable to lock the choices so that only one choice can be selected
export default function Questions({ questions, check, correct }) {
  const choicesArray = [
    {
      choice: atob(questions.correct_answer),
      correct: true,
      id: nanoid(),
      clicked: false,
    },
  ];

  // the questions are shuffled because the correct answers always comes first when the api is called
  function shuffle(array) {
    let i = array.length;
    while (i--) {
      const ri = Math.floor(Math.random() * i);
      [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
  }

  questions.incorrect_answers.map((incorrect) =>
    choicesArray.push({
      choice: atob(incorrect),
      correct: false,
      id: nanoid(),
      clicked: false,
    })
  );
  function Clicked(id) {
    setChoice((prev) =>
      prev.map((choice) => {
        if (!hold && id === choice.id) {
          setHold(true);
          return { ...choice, clicked: true };
        } else if (hold && id === choice.id && choice.clicked) {
          setHold(false);
          return { ...choice, clicked: false };
        } else {
          return choice;
        }
      })
    );
  }

  const [choiceState, setChoice] = React.useState(shuffle(choicesArray));
  // boolean state to lock choices so that only one can be chosen at a time
  const [hold, setHold] = React.useState(false);

  const choices = choiceState.map((choice) => (
    <Choices
      choices={choice}
      key={choice.id}
      id={choice.id}
      Clicked={() => Clicked(choice.id)}
      check={check}
      correct={correct}
    />
  ));

  return (
    <div>
      {/**Using atob because the api returns base 64 bits and atob
       * decodes that
       */}
      <h3 className="questions">{atob(questions.question)}</h3>
      <div className="choice--container">{choices}</div>
      <hr className="break--line" />
    </div>
  );
}
