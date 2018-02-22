import React from 'react';
import Type from 'prop-types';

import Button from 'arui-feather/button';
import Plate from 'arui-feather/plate';
import Heading from 'arui-feather/heading';
import Paragraph from 'arui-feather/paragraph';

export default class Modal extends React.Component {
  static propTypes = {
    textButton: Type.string,
    textHeading: Type.string,
    textMessange: Type.string,
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

  handleOkClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

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
          <Button
            size={this.props.sizeButton}
            text={this.props.textButton}
            onClick={this.handleOkClick}
          />
        </Plate>
      </div>
    );
  }
}
