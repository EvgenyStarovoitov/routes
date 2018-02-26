import React from 'react';
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
      { value:1, text: 'Служба безопасности' },
      { value:2, text: 'Закупки' }
    ]
  };

  state = {
    formData:{
      destination: '',
      name: '',
      phone: '',
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
    this.setState({ formData: { ...this.state.formData, destination: value[0] } });
  };

  handleAttachedFile = (value) => {
    this.setState({ formData: { ...this.state.formData, attachedFile: value } });
    console.log(value);
  };

  handleSendButton = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.formData);
    }
  };

  renderFullForm = () => {
    return (
      <span>
        <FormField>
          <Input
            name='name'
            width='available'
            placeholder='ФИО'
            clear
            onClearClick={this.handleClearClick}
            onChange={this.handleChange}
          />
        </FormField>
        <FormField>
          <PhoneInput
            name='phone'
            width='available'
            placeholder='Ваше телефон'
            clear
            onClearClick={this.handleClearClick}
            onChange={this.handleChange}
            mask='+111 11 111 11 11'
          />
        </FormField>
        <FormField>
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
    const { messange, destination } = this.state.formData;
    const isEnabled =
    messange.length > 7 &&
    destination > 0;

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
        <FormField>
          <Select
            name='destination'
            width='available'
            placeholder='К кому ваше обращение'
            mode='radio'
            options={this.props.selectOption}
            onChange={this.handleSelectValue}
            mobileMenuMode='popup'
            mobileTitle='К кому ваше обращение'
          />
        </FormField>
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
            // error={messange.length < 1 ? 'Сообщение слишком короткое' :  ''}
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
