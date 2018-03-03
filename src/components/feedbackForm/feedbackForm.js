import React from 'react';
import Type from 'prop-types';

import Heading from 'arui-feather/heading';
import Checkbox from 'arui-feather/checkbox';
import Select from 'arui-feather/select';
import Input from 'arui-feather/input';
import PhoneInput from 'arui-feather/phone-input';
import EmailInput from 'arui-feather/email-input';
import Textarea from 'arui-feather/textarea';
import Button from 'arui-feather/button';
import FormField from 'arui-feather/form-field';
import Dropzone from 'react-dropzone';
import DropzoneItem from '../dropzoneItem/dropzoneItem';

export default class FeedbackForm extends React.Component {
  static propTypes = {
    selectOption: Type.array,
    maxFiles:Type.number,
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
      message: ''
    },
    attachedFile: [],
    checked: false
  };

  handleCheck = (value) => {
    this.setState({ checked:value });
  };

  handleClearClick = (value) => {
    this.setState({
      ...this.state.attachedFile, attachedFile:     this.state.attachedFile.filter((e) => {
        return (
          e.name !== value
        );
      })
    });
  };

  handleChange = (event) => {
    this.setState({ formData: { ...this.state.formData, [event.target.name]: event.target.value } });
  };

  handleMessageValue = (value) => {
    this.setState({ formData: { ...this.state.formData, message:value } });
  };

  handleSelectValue = (value) => {
    this.setState({ formData: { ...this.state.formData, destination: value[0] } });
  };

  handleNameValue = (value) => {
    this.setState({ formData: { ...this.state.formData, name:value } });
  };

  handlePhoneValue = (value) => {
    this.setState({ formData: { ...this.state.formData, phone:value } });
  };

  handleEmailValue = (value) => {
    this.setState({ formData: { ...this.state.formData, email:value } });
  };

  handleAttachFiles = (files) => {
    if (files.length <= this.props.maxFiles) {
      this.setState({ attachedFile: files });
    } else {
      console.log('the file is too large');
    }
  };

  handleSendButton = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.formData, this.state.attachedFile);
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
            maxLength={128}
            clear
            onChange={this.handleNameValue}
          />
        </FormField>
        <FormField>
          <PhoneInput
            name='phone'
            width='available'
            placeholder='Ваше телефон'
            maxLength={128}
            clear
            onChange={this.handlePhoneValue}
            mask='+111 11 111 11 11'
          />
        </FormField>
        <FormField>
          <EmailInput
            name='email'
            width='available'
            placeholder='Ваш email'
            clear
            onChange={this.handleEmailValue}
          />
        </FormField>
      </span>
    );
  };

  render() {
    const { message, destination } = this.state.formData;
    const isEnabled =
    message.length > 7 &&
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
            name='message'
            width='available'
            placeholder='Ваше сообщение....'
            autosize
            minRows={4}
            maxLength={8192}
            onChange={this.handleMessageValue}
          />
        </FormField>
        <FormField>
          <Dropzone
            onDrop={this.handleAttachFiles}
            className='dropzone'
            maxSize={1e+7}
          >
            <p>Перетяните файл для загрузки или нажмите для выбора файлов</p>
          </Dropzone>
        </FormField>
        <FormField>
          <ul className='dropzone__listItem'>
            {this.state.attachedFile.map((f) => {
              return (
                <li key={f.name}>
                  <DropzoneItem
                    name={f.name}
                    size={f.size}
                    onClearClick={this.handleClearClick}
                  />
                </li>
              );
            })}
          </ul>
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
