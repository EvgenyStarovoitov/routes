import React from 'react';
import fetch from 'node-fetch';
import Type from 'prop-types';
import config from '../../config.json';

import './App.css';

import Spin from 'arui-feather/spin';
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
    },
    loaded:false
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
    fetch(`${config.UrlApi  }${config.api.addMessage}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:     JSON.stringify({
        name: data.name,
        phone: data.phone,
        destination: data.destination,
        email:data.email,
        message: data.message
      })
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
          const form = new FormData();

          files.map((value) => {
            form.append('userFiles', value);
          });
          fetch(`${config.UrlApi  }${config.api.addFile}${json.msg}`, {
            method: 'POST',
            body:     form
          })
            .then(res => {
              this.setState({ loaded:!this.state.loaded });
              if (res.status !== 200) {
                console.log(`Oooops some problem.Status code:${res.status}`);
                return;
              }
              console.log(res);
            })
            .catch(e => {
              console.log(e);
            });
          this.setState({
            loaded:!this.state.loaded,
            isNoSendingForm: !this.state.isNoSendingForm,
            responseAPI: { msg: json.msg }
          });
          // this.setState({ isNoSendingForm: !this.state.isNoSendingForm });
          // this.setState({ responseAPI: { msg: json.msg } });
        } else {
          this.setState({ responseAPI: { errorMsg: json.error } });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleModalClick = () => {
    this.setState({ isNoSendingForm: !this.state.isNoSendingForm });
  };

  renderFeebackForm = () => {
    return (
      <FeedbackForm
        onSubmit = {this.handleDataFromForm}
        selectOption={this.state.selectOption.length > 0 ? this.state.selectOption : undefined}
        maxFiles={5}
        maxSizeFile={1e+10}
      />
    );
  };

  renderSpin = () => {
    return (
      <div className='spin__box'>
        <Spin
          visible={this.state.loaded}
          className='spin__inner'
        />
      </div>
    );
  }

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
          {this.state.loaded ? this.renderSpin() : ''}
          {this.state.isNoSendingForm ? this.renderFeebackForm() : this.renderModal()}
        </div>
      </div>
    );
  }
}
