import React from "react";

export default function Choices(props) {
  let clickedStyles = {};

  // highlihgts the clicked choice
  if (!props.check) {
    clickedStyles = {
      background: props.choices.clicked ? "#D6DBF5" : "",
      outline: props.choices.clicked ? "unset" : "solid 1px",
    };
    // shows if the chosen option is correct or not
  } else if (props.check && props.choices.clicked) {
    clickedStyles = {
      background: props.choices.correct ? "#94D7A2" : "#F8BCBC",
    };
    // if the chosen option is wrong, highlights the correct one
  } else if (props.check && !props.choices.clicked && props.choices.correct) {
    clickedStyles = {
      background: "#94D7A2",
    };
  }

  React.useEffect(() => {
    if (props.choices.clicked && props.choices.correct) {
      props.correct();
    }
  }, [props.check]);

  return (
    <div className="choice" onClick={props.Clicked} style={clickedStyles}>
      {props.choices.choice}
    </div>
  );
}
