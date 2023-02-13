import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { correctChoices } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {
            correctChoices > 2
              ? 'Well Done!'
              : 'Could be better...'
          }
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  correctChoices: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  // score: state.player.score,
  correctChoices: state.player.correctChoices,
});

export default connect(mapStateToProps)(Feedback);
