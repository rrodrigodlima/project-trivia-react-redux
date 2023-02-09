import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { shape, func } from 'prop-types';
import { addUser } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    name: '',
    isDisable: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonValidation);
  };

  buttonValidation = () => {
    const { name, email } = this.state;
    const nameValidation = name.length > 0;
    const emailValidation = validator.isEmail(email);
    this.setState({
      isDisable: !(nameValidation && emailValidation),
    });
  };

  fetchApi = async (URL) => {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  };

  handleSubmit = async () => {
    const firstURL = 'https://opentdb.com/api_token.php?command=request';
    const { token } = await this.fetchApi(firstURL);
    localStorage.setItem('token', token);
    /* const secondURL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const questions = await this.fetchApi(secondURL); */
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    dispatch(addUser({ name, email }));
    history.push('/game');
  };

  render() {
    const {
      name,
      email,
      isDisable,
    } = this.state;
    const {
      history,
    } = this.props;

    return (
      <form>
        <label htmlFor="input-name">
          Nome:
          <input
            id="input-name"
            type="text"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-email">
          Email:
          <input
            id="input-email"
            type="text"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleSubmit }
          data-testid="btn-play"
          disabled={ isDisable }
        >
          Play
        </button>
        <button
          type="button"
          onClick={ () => history.push('/settings') }
          data-testid="btn-settings"
        >
          Settings
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: shape({
    push: func,
  }),
}.isRequired;

export default connect()(Login);
