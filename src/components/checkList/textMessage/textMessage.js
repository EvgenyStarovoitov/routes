import React from 'react';
import Type from 'prop-types';

import Paragraph from 'arui-feather/paragraph';

import { Row, Col } from '../grid/index';

export default class TextMessage extends React.Component {
  static propTypes = {
    message: Type.string
  };

  render() {
    return (
      <Row>
        <Col md={12}>
          <div className='textMessage'>
            <Paragraph>
              {this.props.message}
            </Paragraph>
          </div>
        </Col>
      </Row>
    );
  }
}
