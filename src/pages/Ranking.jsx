import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import React, { Component } from 'react';
import '../styles/ranking.scss';

export default class Ranking extends Component {
  getProfilePicture = (gravatarEmail) => {
    const emailHash = md5(gravatarEmail.toLowerCase().trim()).toString();
    const stringGravatar = `https://www.gravatar.com/avatar/${emailHash}`;
    console.log(stringGravatar);
    return stringGravatar;
  };

  render() {
    const { history } = this.props;
    const playerRanking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="ranking">
        <h2 data-testid="ranking-title">Ranking</h2>
        {
          playerRanking.sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <div key={ player.name }>
                <img
                  src={ this.getProfilePicture(player.gravatarEmail) }
                  alt={ player.name }
                />
                <p
                  data-testid={ `player-name-${index}` }
                >
                  {player.name}
                </p>
                <p
                  data-testid={ `player-score-${index}` }
                >
                  {player.score}
                </p>
              </div>
            ))
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Voltar para o início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
