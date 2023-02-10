import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { randomizeAnswers } from '../services/gameFunctions';
import styles from './Game.module.css';

class Game extends Component {
  state = {
    questions: [],
    count: 0,
    isFetched: false,
    shuffledAnswers: [],
    display: false,
    timeIsUp: false,
    counter: 30,
  };

  componentDidMount() {
    this.handleApi();
    this.setState({
      display: false,
    });
    this.counter();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  counter = () => {
    const interval = 1000;
    this.intervalId = setInterval(() => {
      this.setState((state) => {
        if (state.counter === 1) {
          this.setState({
            timeIsUp: true,
          });
          clearInterval(this.intervalId);
        }
        return {
          counter: state.counter - 1,
        };
      });
    }, interval);
  };

  handleApi = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questionsJson = await questions.json();
    const responseCode = questionsJson.response_code;

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

  handleClick = () => {
    this.setState({
      display: true,
    });
  };

  render() {
    const {
      questions,
      count,
      isFetched,
      shuffledAnswers,
      display,
      timeIsUp,
      counter,
    } = this.state;

    return (
      <div>
        <Header />
        {counter}
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
                      disabled={ timeIsUp }
                      key={ index }
                      data-testid={ shuffledAnswers.correct === index
                        ? ('correct-answer') : (`wrong-answer-${index}`) }
                      onClick={ this.handleClick }
                      className={ display && (shuffledAnswers.correct === index
                        ? styles.correctButton : styles.wrongButton) }
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
