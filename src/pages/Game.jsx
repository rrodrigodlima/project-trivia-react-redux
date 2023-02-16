import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { addPoints, addAssertions } from '../redux/actions';
import { randomizeAnswers } from '../services/gameFunctions';
import '../styles/game.scss';
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
    difficulty: '',
    assertions: 0,
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
        difficulty: questionsJson.results[0].difficulty,
      });
    }
  };

  handleClick = ({ target: { name } }) => {
    const { difficulty, counter, assertions } = this.state;
    const { dispatch } = this.props;
    const base = 10;
    const modifier = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    if (name) {
      const points = base + (counter * modifier[difficulty]);
      dispatch(addPoints(points));
      this.setState({
        assertions: assertions + 1,
      }, () => dispatch(addAssertions(assertions)));
    }
    this.setState({
      display: true,
      timeIsUp: true,
    });
    clearInterval(this.intervalId);
  };

  handleNext = () => {
    const four = 4;
    const { history } = this.props;
    const { count, questions } = this.state;
    if (count === four) {
      history.push('/feedback');
    } else {
      this.setState({
        shuffledAnswers: randomizeAnswers(questions[count + 1]),
        difficulty: questions[count + 1].difficulty,
        count: count + 1,
        counter: 30,
        display: false,
        timeIsUp: false,
      });
      this.counter();
    }
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
      <div className="game">
        <Header />
        {counter}
        {isFetched
          && (
            <div className="question">
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
                id="answer-options"
              >
                {
                  shuffledAnswers.answers.map((element, index) => (
                    <button
                      disabled={ timeIsUp || display }
                      key={ index }
                      name={ shuffledAnswers.correct === index
                        && ('correct') }
                      data-testid={ shuffledAnswers.correct === index
                        ? ('correct-answer') : (`wrong-answer-${index}`) }
                      onClick={ this.handleClick }
                      className={ display ? (
                        timeIsUp
                        && (shuffledAnswers.correct === index
                          ? styles.correctButton : styles.wrongButton)
                      ) : 'answer-button' }
                    >
                      {element}
                    </button>
                  ))
                }
              </div>
            </div>)}

        <button
          data-testid={ (timeIsUp || display) && 'btn-next' }
          className={ (timeIsUp || display) ? styles.nextButton : styles.hiddenButton }
          type="button"
          onClick={ this.handleNext }
        >
          Next

        </button>

      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Game);
