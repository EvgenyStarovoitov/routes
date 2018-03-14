import React from 'react';
import Type from 'prop-types';

export default class Col extends React.Component {
  static propTypes = {
    className:Type.string,
    md:Type.number,
    s:Type.number,
    children:Type.node,
    align:Type.string
  }

  render() {
    return (
      <div className={`col ${this.props.md !== undefined ? `col-md-${this.props.md}` : ''}
       ${this.props.s !== undefined ? `col-s-${this.props.s}` : ''} 
       ${this.props.align !== undefined ? this.props.align : ''}`}
      >
        {this.props.children}
      </div>
    );
  }
}
