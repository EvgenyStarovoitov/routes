import React from 'react';
// import fetch from 'node-fetch';
import Type from 'prop-types';

import './App.css';

import Modal from './modal/index';
import FeedbackForm from './feedbackForm/index';

export default class App extends React.Component {
  static propTypes = {
    renderFeebackForm: Type.func,
    renderModal: Type.func,
    handleSending: Type.func
  };

  state = {
    someCondition: true
  };

  handleSending = () => {
    this.setState({ someCondition: !this.state.someCondition });
  };

  renderFeebackForm = () => {
    return (
      <FeedbackForm
        onSubmit = {this.handleSending}
      />
    );
  };

  renderModal = () => {
    return (
      <Modal
        textHeading = 'Ваше сообщение принято'
        textMessange = {'Результаты вашего обращения можете узнать по ссылке или по QR-коду'}
        onClick = {this.handleSending}
      />
    );
  };

  render() {
    return (
      <div className='App'>
        {this.state.someCondition ? this.renderFeebackForm() : this.renderModal()}
      </div>
    );
  }
}
