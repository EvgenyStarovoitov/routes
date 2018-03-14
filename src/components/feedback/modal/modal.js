import React from 'react';
import Type from 'prop-types';
import QRCode from 'qrcode';
import config from '../../../../config.json';

import Button from 'arui-feather/button';
import Plate from 'arui-feather/plate';
import Heading from 'arui-feather/heading';
import Paragraph from 'arui-feather/paragraph';

import { Link } from 'react-router-dom';

export default class Modal extends React.Component {
  static propTypes = {
    textButton: Type.string,
    textHeading: Type.string,
    textMessange: Type.string,
    link: Type.string,
    linkText: Type.string,
    name: Type.string,
    id: Type.string,
    sizeButton: Type.string,
    className: Type.string,
    handleOkClick: Type.func,
    onClick: Type.func
  }

  static defaultProps = {
    textButton: 'Ok',
    textHeading: 'Заголовок',
    textMessange: 'Основной текст модального окна',
    sizeButton: 'm',
    className: 'modal'
  }

  state = {
  }

  componentDidMount() {
    this.renderQrcode();
  }

  handleOkClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  renderQrcode = () => {
    if (this.props.link.length > 0) {
      const canvas = document.querySelector('.canvas__box');

      QRCode.toCanvas(canvas, `${config.UrlApi}${config.api.getMessage}${this.props.link}`, (error) => {
        if (error) {
          console.error(error);
        }
      });
    }
  };

  renderQrCanvas = () => {
    return (
      <div>
        <canvas className='canvas__box' />
      </div>
    );
  };

  render() {
    return (
      <div className={this.props.className}>
        <Plate >
          <Heading
            size='s'
          >
            {this.props.textHeading}
          </Heading>
          <Paragraph>
            {this.props.textMessange}
          </Paragraph>
          <Paragraph>
            {this.props.link.length > 0 ? <Link to={`msg/${this.props.link}`}>{this.props.linkText}</Link> : ''}
          </Paragraph>
          {this.renderQrCanvas()}
          <Button
            size={this.props.sizeButton}
            text={this.props.textButton}
            onClick={this.handleOkClick}
            width='available'
          />
        </Plate>
      </div>
    );
  }
}
