import React from 'react';
import Type from 'prop-types';

import Paragraph from 'arui-feather/paragraph';

import { Row, Col } from 'react-flexbox-grid';

export default class TextMessage extends React.Component {
  static propTypes = {
    message: Type.string
  };

  render() {
    return (
      <div className='textMessage'>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <Paragraph>
              {this.props.message}
            </Paragraph>
          </Col>
        </Row>
      </div>
    );
  }
}
