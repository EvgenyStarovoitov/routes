import React from 'react';
import Type from 'prop-types';
// import fetch from 'node-fetch';

import Button from 'arui-feather/button';
import Textarea from 'arui-feather/textarea';
import { default as IconClose  } from 'arui-feather/icon/ui/close';
// import { Row, Col } from '../grid/index';
import { Row, Col } from 'react-flexbox-grid';

export default class CommentForm extends React.Component {
  static propTypes = {
    onClick:Type.func
  };

  static defaultProps = {
  };

  state = {
    comment: {
      name: '',
      note: ''
    }
  };

  handleName = (value) => {
    this.setState({ comment:{ ...this.state.comment, name: value } });
  };

  handleNote = (value) => {
    this.setState({ comment:{ ...this.state.comment, note: value } });
  };

  handleHideClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  handleSend = () => {

  };

  render() {
    return (
      <div className={'commentForm'}>
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
        </Row>
        <button
          className='commentForm__closeButton'
          onClick={this.handleHideClick}
        >
          <IconClose />
        </button>
      </div>
    );
  }
}
