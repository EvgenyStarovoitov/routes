import React from 'react';
import Type from 'prop-types';

export default class Row extends React.Component {
  static propTypes = {
    className:Type.string,
    children:Type.node,
    align:Type.oneOf(['center', 'left', 'right'])
  }

  render() {
    return (
      <div className={`row ${this.props.align !== undefined ? this.props.align : ''}`}>
        {this.props.children}
      </div>
    );
  }
}
