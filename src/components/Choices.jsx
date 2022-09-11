import React from "react";

export default function Choices(props) {
  let clickedStyles = {};

  // highlihgts the clicked choice
  if (props.gameLoopState === "game") {
    clickedStyles = {
      background: props.choice.isClicked ? "#D6DBF5" : "",
      outline: props.choice.isClicked ? "unset" : "solid 1px",
    };
    // shows if the chosen option is correct or not
  } else if (props.gameLoopState === "check" && props.choice.isClicked) {
    clickedStyles = {
      background: props.choice.isCorrect ? "#94D7A2" : "#F8BCBC",
      opacity: !props.choice.isCorrect && "0.5",
    };
    // if the chosen option is wrong, highlights the correct one
  } else if (
    props.gameLoopState === "check" &&
    !props.choice.isClicked &&
    props.choice.isCorrect
  ) {
    clickedStyles = {
      background: "#94D7A2",
    };
  }

  return (
    <div className="choice" onClick={props.Clicked} style={clickedStyles}>
      {props.choice.choice}
    </div>
  );
}
