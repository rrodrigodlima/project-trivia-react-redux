import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { randomizeAnswers } from '../services/gameFunctions';

class Game extends Component {
  state = {
    questions: [],
    count: 0,
    isFetched: false,
    shuffledAnswers: [],
  };

  componentDidMount() {
    this.handleApi();
  }

  handleApi = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questionsJson = await questions.json();
    const responseCode = questionsJson.response_code;
    console.log(questionsJson);

    if (responseCode !== 0) {
      localStorage.clear();
      history.push('/');
    } else {
      this.setState({
        questions: questionsJson.results,
        isFetched: true,
        shuffledAnswers: randomizeAnswers(questionsJson.results[0]),
      });
    }
  };

  render() {
    const { questions, count, isFetched, shuffledAnswers } = this.state;
    console.log(shuffledAnswers);
    return (
      <div>
        <Header />
        {isFetched
          && (
            <div>
              <span
                data-testid="question-category"
              >
                {questions[count].category}
              </span>
              <span
                data-testid="question-text"
              >
                {questions[count].question}
              </span>
              <div
                data-testid="answer-options"
              >
                {
                  shuffledAnswers.answers.map((element, index) => (
                    <button
                      key={ index }
                      data-testid={ shuffledAnswers.correct === index
                        ? ('correct-answer') : (`wrong-answer-${index}`) }
                      /* onClick={ () => console.log(shuffledAnswers.correct === index) } */
                    >
                      {element}
                    </button>
                  ))
                }
              </div>
            </div>)}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Game;
