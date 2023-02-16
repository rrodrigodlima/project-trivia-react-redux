import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../styles/feedback.scss';

class Feedback extends Component {
  componentDidMount() {
    if (!localStorage.ranking) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
    const { name, gravatarEmail, score, assertions } = this.props;
    const players = JSON.parse(localStorage.getItem('ranking'));
    localStorage.setItem('ranking', JSON.stringify([...players, {
      name, gravatarEmail, score, assertions,
    }]));
  }

  render() {
    const { score, assertions, history } = this.props;
    return (
      <div className="feedback">
        <Header />
        <p data-testid="feedback-text">
          {
            assertions > 2
              ? 'Well Done!'
              : 'Could be better...'
          }
        </p>
        <div>
          <p>Final Score: </p>
          <p data-testid="feedback-total-score">{score}</p>
        </div>
        <div>
          <p>Correct Answers: </p>
          <p data-testid="feedback-total-question">{assertions}</p>
        </div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
