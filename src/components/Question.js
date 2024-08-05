import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    // Set up a timeout to decrease timeRemaining by 1 every second
    const timer = setTimeout(() => {
      // If there is time remaining, decrease it by 1
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        // If timeRemaining hits 0, reset it to 10 and trigger the onAnswered callback
        setTimeRemaining(10);
        onAnswered(false)
      }
    }, 1000); // Set timeout to execute the function after 1 second

    // Cleanup function to clear the timeout if the component unmounts or timeRemaining changes
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]); // Dependencies to rerun the effect when timeRemaining or onAnswered changes


  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
