import React from 'react';
import Type from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

export default class CommentsList extends React.Component {
  static propTypes = {
    comments:Type.array,
    convertDate:Type.func
  };

  static defaultProps = {
  };

  state = {
  };

  convertDate = (date) => {
    const utcDate = new Date(date);

    return utcDate.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  render() {
    return (
      <Row>
        <Col md={12} sm={12} xs={12}>
          <div>
            {
              <ul className='commentsList'>
                {this.props.comments !== undefined ? this.props.comments.map((e, i) => {
                  return (
                    <li
                      key={i}
                    >
                      <p>{this.convertDate(e.date)}</p>
                      <p>{e.comment}</p>
                    </li>
                  );
                }) : ''}
              </ul>
            }
          </div>
        </Col>
      </Row>
    );
  }
}
