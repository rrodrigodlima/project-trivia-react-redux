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

  /*   componentDidUpdate() {
    const { count } = this.state;
    const newValue = count + 1;
    this.setState({
      count: newValue,
    });
  }
*/

  handleApi = async () => {
    const { history } = this.props;
    const token = JSON.parse(localStorage.getItem('tokenData'));
    if (token.response_code !== 0) {
      localStorage.clear();
      history.push('/');
    } else {
      const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
      const questionsJson = await questions.json();
      console.log(questionsJson);
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
