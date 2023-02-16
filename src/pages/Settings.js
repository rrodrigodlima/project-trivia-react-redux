import React, { Component } from 'react';
import '../styles/settings.scss';

export default class Settings extends Component {
  render() {
    return (
      <div className="setting">
        <h1 data-testid="settings-title">
          Settings
        </h1>
      </div>
    );
  }
}
