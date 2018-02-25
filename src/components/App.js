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
    isNoSendingForm: true,
    qrCode: 'test qr code from parent state',
    link: 'test link from parent state'
  };

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
  // для формы передлеать функцию которая будет принимать в качестве cb ссылку
  // на ответ и qr код и соответственно менять состояние,
  // состояние родителя передавать уже в модальное окно как props
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
