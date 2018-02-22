import React from 'react';
// import fetch from 'node-fetch';
import Type from 'prop-types';

import './App.css';

import Modal from './modal/index';
import FeedbackForm from './feedbackForm/index';

// Как вариант сделать рендеринг потипу {this.state.some ? render Feedback : render Modal} и одну
// функцию написать которая при отправке меняет условие и ее же повесить когда закрываешь модальное
// плюс сделаю чтоб обнулялось state после отправки и не могло отправиться если не заполнены
// сообщение и к кому обращение

export default class App extends React.Component {
  static propTypes = {
    renderFeebackForm: Type.func,
    renderModal: Type.func,
    handleShow: Type.func
  };

  state = {
    isShowFeedbackForm:true,
    isShowModal:false
  };

  handleShowForm = () => {
    console.log('FeedbackForm show');
    this.setState({
      isShowFeedbackForm: true,
      isShowModal: false
    });
  }

  handleShowModal = () => {
    console.log('Modal window show');
    this.setState({
      isShowFeedbackForm: false,
      isShowModal: true
    });
  }

  renderFeebackForm = () => {
    return (
      <FeedbackForm
        onSend = {this.handleShowModal}
      />
    );
  }

  renderModal = () => {
    return (
      <Modal
        textHeading = 'Ваше сообщение принято'
        textMessange = {'Результаты вашего обращения можете узнать по ссылке или по QR-коду'}
        onCloserClick = {this.handleShowForm}
      />
    );
  }

  render() {
    return (
      <div className='App'>
        {this.state.isShowFeedbackForm ? this.renderFeebackForm() : ''}
        {this.state.isShowModal ? this.renderModal() : ''}
      </div>
    );
  }
}
