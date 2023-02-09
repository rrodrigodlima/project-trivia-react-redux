import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
/* import { actionOne } from '../redux/actions'; */

class Login extends Component {
  state = {
    email: '',
    name: '',
    isDisable: true,
  /*     token: '', */
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

  handleSubmit = async () => {

  };

  render() {
    const {
      name,
      email,
      isDisable,
    } = this.state;

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
      </form>
    );
  }
}

export default connect()(Login);
