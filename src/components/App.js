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
    responseAPI:{
      msg:null,
      errorMsg:null
    }
  };

  componentWillMount() {
    fetch(`${config.UrlApi}${config.api.getListDestination}`)
      .then(res => {
        if (res.status !== 200) {
          console.log(`Oooops some problem.Status code:${res.status}`);
          return;
        }
        return res;
      })
      .then(data => data.json())
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

  handleDataFromForm = (data, files) => {
    const form = new FormData();
    // data.attachedFile.map((value) => {
    //   form.append('userFile', value);
    // });

    // data.map((key, value) => {
    //   // form.append(key, value);
    //   console.log(data.key, value);
    // });
    Object.keys(data).map((i) => {
      form.append(i, data[i]);
    });
    fetch(`${config.UrlApi  }${config.api.addMessage}`, {
      method: 'POST',
      body:    form
    })
      .then(res => {
        if (res.status !== 200) {
          console.log(`Oooops some problem.Status code:${res.status}`);
          return;
        }
        return res;
      })
      .then(data => data.json())
      .then(json => {
        if (json.msg !== undefined) {
          this.setState({ responseAPI: { msg: json.msg } });
        } else {
          this.setState({ responseAPI: { errorMsg: json.error } });
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
        textHeading = {this.state.responseAPI.msg !== null ? 'Ваше сообщение принято' : 'Ошибка'}
        textMessange = {this.state.responseAPI.msg !== null ?
          'Результаты обращения вы можете узнать по ссылке или по QR-коду'
          : 'Упппс ваше сообщение не принято'}
        onClick = {this.handleModalClick}
        link={this.state.responseAPI.msg !== null ?
          `${config.UrlApi}${config.api.getMessage}${this.state.responseAPI.msg}`
          : ''}
        linkText='Нажмите чтоб перейти по ссылке'
        // errorMsg={this.state.responseAPI.errorMsg !== undefined ? this.state.responseAPI.errorMsg : ''}
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
