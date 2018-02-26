import React from 'react';
import fetch from 'node-fetch';
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
    isNoSendingForm: true,
    qrCode: 'test qr code from parent state',
    link: 'test link from parent state',
    selectOption: []
  };

  componentWillMount() {
    const getSelectData = this.getSelectOptionData('http://127.0.0.1:3010');

    console.log(getSelectData);
    Promise.all([ getSelectData ])
      .then((data) => {
        if (data[0] !== undefined) {
          this.setState({ selectOption:data[0] });
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleResponseFromForm = (res) => {
    Promise.all([ res ])
      .then((data) => {
        if (data[0] !== undefined) {
          this.setState({
            link:data[0].link,
            qrCode:data[0].qrCode
          });
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ isNoSendingForm: !this.state.isNoSendingForm });
  };

  handleSending = () => {
    this.setState({ isNoSendingForm: !this.state.isNoSendingForm });
  };

  getSelectOptionData = (url) => {
    return fetch(url, { mode: 'cors' })
      .then(res => {
        return res.json();
      })
      .catch(e => {
        console.log(e);
      });
  };

  renderFeebackForm = () => {
    return (
      <FeedbackForm
        onSubmit = {this.handleResponseFromForm}
      />
    );
  };

  renderModal = () => {
    return (
      <Modal
        textHeading = 'Ваше сообщение принято'
        textMessange = {'Результаты вашего обращения можете узнать по ссылке или по QR-коду'}
        onClick = {this.handleSending}
        qrCode={this.state.qrCode}
        link={this.state.link}
        selectOption={this.state.selectOption}
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
