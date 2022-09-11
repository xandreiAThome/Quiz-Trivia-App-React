export default function Start(props) {
  return (
    <div className="start--wrapper">
      <h1 className="start--text">Quizzical</h1>
      <h3 className="start-description">
        Answer 5 random questions. Have fun!
      </h3>
      <button className="start--button" onClick={props.Proceed}>
        Start Quiz
      </button>
    </div>
  );
}
