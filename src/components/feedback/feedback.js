import React from 'react';
import fetch from 'node-fetch';
import Type from 'prop-types';
import config from '../../../config.json';

import './feedback.css';

import Spin from 'arui-feather/spin';
import Modal from '../modal/index';
import FeedbackForm from '../feedbackForm/index';

export default class Feedback extends React.Component {
  static propTypes = {
    renderFeebackForm: Type.func,
    renderModal: Type.func,
    checkingWindow: Type.func,
    handleModalClick: Type.func
  };

  state = {
    selectOption: [],
    responseAPI: {
      msg: null,
      errorMsg: null
    },
    showForm: true,
    showModal: false,
    loaded: false
  };

  componentWillMount() {
    fetch(`${config.UrlApi}${config.api.getListDestination}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.status);
        }
        return res.json();
      })
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
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(json => {
        if (json.msg !== undefined) {
          this.setState({
            responseAPI: { msg: json.msg }
          });
        } else {
          return;
        }
        this.setState({
          showForm: !this.state.showForm
        });
        return json;
      })
      .then(loadFiles => {
        if (loadFiles.msg !== undefined && files.length > 0) {
          const form = new FormData();

          files.map((value) => {
            form.append('userFiles', value);
          });
          this.setState({
            loaded:!this.state.loaded });
          fetch(`${config.UrlApi  }${config.api.addFile}${loadFiles.msg}`, {
            method: 'POST',
            body:     form
          })
            .then(res => {
              this.setState({
                loaded:!this.state.loaded,
                showModal: !this.state.showModal
              });
              return res;
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          this.setState({
            showModal: !this.state.showModal
          });
          return loadFiles;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleModalClick = () => {
    this.setState({
      showModal: !this.state.showModal,
      showForm: !this.state.showForm
    });
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
      <div>
        <Spin
          size='xl'
          visible={this.state.loaded}
        />
      </div>
    );
  };

  renderModal = () => {
    return (
      <Modal
        textHeading = {this.state.responseAPI.msg !== null ? `Ваше сообщение ${this.state.responseAPI.msg} принято` : 'Ошибка'}
        textMessange = {this.state.responseAPI.msg !== null ?
          'Результаты обращения вы можете узнать по ссылке или по QR-коду'
          : 'Упппс ваше сообщение не принято'}
        link={this.state.responseAPI.msg !== null ?
          `${this.state.responseAPI.msg}`
          : 'qweqweqe'}
        linkText='Нажмите чтоб перейти по ссылке'
        onClick = {this.handleModalClick}
      />
    );
  };

  render() {
    return (
      <div className='feedback'>
        {this.state.loaded ? this.renderSpin() : ''}
        {this.state.showForm ? this.renderFeebackForm() : ''}
        {this.state.showModal ? this.renderModal() : ''}
      </div>
    );
  }
}
