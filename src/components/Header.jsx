import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    gravatar: '',
  };

  componentDidMount() {
    this.setState({
      gravatar: this.requestApi(),
    });
  }

  requestApi = () => {
    const { gravatarEmail } = this.props;
    const emailHash = md5(gravatarEmail.toLowerCase().trim()).toString();
    const stringGravatar = `https://www.gravatar.com/avatar/${emailHash}`;
    return stringGravatar;
  };

  render() {
    const { gravatar } = this.state;
    const { name, score } = this.props;
    return (
      <header>
        <img
          src={ gravatar }
          alt={ name }
          data-testid="header-profile-picture"
        />
        <span
          data-testid="header-player-name"
        >
          {name}
        </span>
        <span
          data-testid="header-score"
        >
          { score }
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  gravatarEmail: state.playerReducer.gravatarEmail,
  name: state.playerReducer.name,
  score: state.playerReducer.score,
});

export default connect(mapStateToProps)(Header);
