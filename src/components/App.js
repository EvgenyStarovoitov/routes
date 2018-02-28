import React from 'react';
import fetch from 'node-fetch';
import Type from 'prop-types';
import config from '../../config.json';

import './App.css';

import Modal from './modal/index';
import FeedbackForm from './feedbackForm/index';

export default class App extends React.Component {
  static propTypes = {
    renderFeebackForm: Type.func,
    renderModal: Type.func,
    handleModalClick: Type.func
  };

  state = {
    isNoSendingForm: true,
    selectOption: [],
    responseLink:''
  };

  componentWillMount() {
    fetch(`${config.UrlApi  }`)
      .then(res => res.json())
      .then(json => {
        const result = json.map((curr, i) => {
          const obj = {};

          obj.text = curr.name;
          obj.value = curr.id;
          obj.key = i;
          return obj;
        });

        this.setState({ selectOption:result });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleDataFromForm = (data) => {
    fetch(`${config.UrlApi  }${config.api.addMessage}`, {
      method: 'POST',
      body:    JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => {
        if (json !== undefined) {
          this.setState({ responseLink: json.link });
        }
      })
      .catch((e) => {
        console.log(e);
      });
    this.setState({ isNoSendingForm: !this.state.isNoSendingForm });
  };

  handleModalClick = () => {
    this.setState({ isNoSendingForm: !this.state.isNoSendingForm });
  };

  renderFeebackForm = () => {
    return (
      <FeedbackForm
        onSubmit = {this.handleDataFromForm}
        selectOption={this.state.selectOption.length > 0 ? this.state.selectOption : undefined}
      />
    );
  };

  renderModal = () => {
    return (
      <Modal
        textHeading = 'Ваше сообщение принято'
        textMessange = {'Результаты обращения вы можете узнать по ссылке или по QR-коду'}
        onClick = {this.handleModalClick}
        link={this.state.responseLink}
        linkText='Нажмите чтоб перейти по ссылке'
      />
    );
  };

  render() {
    return (
      <div className='App'>
        <div className='App_inner'>
          {this.state.isNoSendingForm ? this.renderFeebackForm() : this.renderModal()}
        </div>
      </div>
    );
  }
}
