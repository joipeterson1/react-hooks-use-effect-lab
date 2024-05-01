import React, { useState, useEffect } from "react";

function Question({ setQuestions, question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code

  useEffect(()=> {
    //use setState to update time per second
    const timer = setTimeout(() => {
      setTimeRemaining(prevTime=> prevTime - 1)
    }, 1000)
//clear timer to reset to 10(timeremaining) first cleanup function
    return () => clearTimeout(timer);
    //set questions depend. will cause the effect to rerun when it is changed
  }, [timeRemaining, setQuestions]);

//conditional to restart at 0
  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10)
      onAnswered(false)
      // the dependencies will controll when to call the function
    }
  }, [timeRemaining, onAnswered])

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
