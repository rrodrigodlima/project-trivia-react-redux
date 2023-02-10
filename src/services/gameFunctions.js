export const shuffle = (array) => {
  /* Função retirada do link:
    https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  */
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

export const randomizeAnswers = (question) => {
  const shuffleArray = shuffle(
    [question.correct_answer, ...question.incorrect_answers],
  );
  return {
    answers: shuffleArray,
    correct: shuffleArray.findIndex((element) => element === question.correct_answer),
  };
};
