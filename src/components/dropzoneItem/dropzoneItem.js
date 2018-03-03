import React from 'react';
import Type from 'prop-types';

import IconButton from 'arui-feather/icon-button';
import { default as IconClose } from 'arui-feather/icon/ui/close';

export default class DropzoneItem extends React.Component {
  static propTypes = {
    name:Type.string,
    size:Type.number,
    onClearClick: Type.func
  };

  static defaultProps = {
    name: 'please'
  };

  state = {
    name:this.props.name
  };

  handleClearClick = () => {
    if (this.props.onClearClick) {
      this.props.onClearClick(this.props.name);
    }
  };

  render() {
    return (
      <span>
        {`${this.props.name}-${this.props.size} байт`}
        <IconButton
          onClick={this.handleClearClick}
        >
          <IconClose size='m'/>
        </IconButton>
      </span>
    );
  }
}
