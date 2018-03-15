import React from 'react';
import Type from 'prop-types';

import Button from 'arui-feather/button';
import Textarea from 'arui-feather/textarea';
import { default as IconClose  } from 'arui-feather/icon/ui/close';
import { Row, Col } from 'react-flexbox-grid';

export default class CommentForm extends React.Component {
  static propTypes = {
    onCloseClick:Type.func,
    onSubmit:Type.func
  };

  state = {
    comment: ''
  };

  handleNote = (value) => {
    this.setState({ comment: value });
  };

  handleHideClick = (event) => {
    if (this.props.onCloseClick) {
      this.props.onCloseClick(event);
    }
  };

  handleSend = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.comment);
    }
  };

  render() {
    return (
      <div className='commentForm'>
        <Row className='commentForm__formField'>
          <Col md={12} sm={12} xs={12}>
            <Textarea
              name='message'
              width='available'
              placeholder='Ваше сообщение....'
              onChange={this.handleNote}
              autosize
              minRows={5}
              maxLength={8192}
            />
          </Col>
        </Row>
        <Row className='commentForm__formField'>
          <Col md={12} sm={12} xs={12}>
            <Button
              text='Отправить'
              onClick={this.handleSend}
            />
          </Col>
          <button
            className='commentForm__closeButton'
            onClick={this.handleHideClick}
          >
            <IconClose />
          </button>
        </Row>
      </div>
    );
  }
}
