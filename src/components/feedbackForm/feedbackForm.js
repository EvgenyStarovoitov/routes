import React from 'react';
import fetch from 'node-fetch';
import Type from 'prop-types';

import Heading from 'arui-feather/heading';
import Checkbox from 'arui-feather/checkbox';
import Select from 'arui-feather/select';
import Input from 'arui-feather/input';
import PhoneInput from 'arui-feather/phone-input';
import EmailInput from 'arui-feather/email-input';
import Textarea from 'arui-feather/textarea';
import Attach from 'arui-feather/attach';
import Button from 'arui-feather/button';
import FormField from 'arui-feather/form-field';

export default class FeedbackForm extends React.Component {
  static propTypes = {
    selectOption: Type.array,
    onSubmit: Type.func
  };

  static defaultProps = {
    selectOption: [
      { value: '0', text: 'Том менеджмент' },
      { value: '1', text: 'Служба безопасности' },
      { value: '2', text: 'Юридический отдел' },
      { value: '3', text: 'Финансовый отдел' },
      { value: '4', text: 'Отдел качества' }
    ]
  };

  state = {
    formData:{
      contacts: '',
      fullName: '',
      phoneNumber: '',
      email: '',
      messange: '',
      attachedFile: ''
    },
    checked: false
  };

  handleCheck = (value) => {
    this.setState({ checked:value });
  };

  handleClearClick = (name) => {
    this.setState({ formData: { ...this.state.formData, [name]: '' } });
  };

  handleChange = (event) => {
    this.setState({ formData: { ...this.state.formData, [event.target.name]: event.target.value } });
  };

  handleSelectValue = (value) => {
    this.setState({ formData: { ...this.state.formData, contacts: this.props.selectOption[value].text } });
  };

  handleAttachedFile = (value) => {
    this.setState({ formData: { ...this.state.formData, attachedFile: value } });
    console.log(value);
  };

  handleSendButton = () => {
    fetch('http://127.0.0.1:3010/add', {
      method: 'POST',
      body:    JSON.stringify(this.state.formData),
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    })
      .then(res =>  {
        if (this.props.onSubmit) {
          this.props.onSubmit(res.json());
        }
      })
      .catch(err => console.log(err));
  };

  renderFullForm = () => {
    return (
      <span>
        <FormField>
          <Input
            name='fullName'
            width='available'
            placeholder='ФИО'
            clear
            onClearClick={this.handleClearClick}
            onChange={this.handleChange}
          />
          <PhoneInput
            name='phoneNumber'
            width='available'
            placeholder='Ваше телефон'
            clear
            onClearClick={this.handleClearClick}
            onChange={this.handleChange}
            mask='+111 11 111 11 11'
          />
          <EmailInput
            name='email'
            width='available'
            placeholder='Ваш email'
            clear
            onClearClick={this.handleClearClick}
            onChange={this.handleChange}
          />
        </FormField>
      </span>
    );
  };

  render() {
    const { messange, contacts } = this.state.formData;
    const isEnabled =
    messange.length > 1 &&
    contacts.length > 0;

    return (
      <div className='feedbackForm'>
        <FormField>
          <Heading
            size='m'
          >
            Ваше сообщение
          </Heading>
        </FormField>
        <FormField>
          <Checkbox
            text='Анонимное сообщение'
            onChange={this.handleCheck}
          />
        </FormField>
        <Select
          name='contacts'
          width='available'
          placeholder='К кому ваше обращение'
          mode='radio'
          options={this.props.selectOption}
          onChange={this.handleSelectValue}
          mobileMenuMode='popup'
          mobileTitle='К кому ваше обращение'
        />
        {!this.state.checked ? this.renderFullForm() : ''}
        <FormField>
          <Textarea
            name='messange'
            width='available'
            placeholder='Ваше сообщение....'
            autosize
            minRows={4}
            maxLength={17}
            onChange={this.handleChange}
            error={messange.length < 1 ? 'Сообщение слишком короткое' :  ''}
          />
        </FormField>
        <FormField>
          <Attach
            name='attachedFile'
            onChange={this.handleAttachedFile}
          />
        </FormField>
        <FormField>
          <Button
            width='available'
            text='Отправить'
            onClick={this.handleSendButton}
            disabled={!isEnabled}
          />
        </FormField>
      </div>
    );
  }
}
