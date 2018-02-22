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
    size: Type.string,
    className: Type.string,
    handleClose: Type.func,
    onCloserClick: Type.func
  }

  static defaultProps = {
    textButton: 'Ok',
    textHeading: 'Заголовок',
    textMessange: 'Основной текст модального окна'
  }

  state = {
  }

  handleClose = () => {
    if (this.props.onCloserClick) {
      this.props.onCloserClick();
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <Plate
          hasCloser
          onCloserClick={this.handleClose}
        >
          <Heading
            size='s'
          >
            {this.props.textHeading}
          </Heading>
          <Paragraph>
            {this.props.textMessange}
          </Paragraph>
          <Button
            text={this.props.textButton}
          />
        </Plate>
      </div>
    );
  }
}
