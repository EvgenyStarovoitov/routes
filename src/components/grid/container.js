import React from 'react';
import Type from 'prop-types';

export default class Container extends React.Component {
  static propTypes = {
    className:Type.string,
    children:Type.node
  }

  render() {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    );
  }
}
