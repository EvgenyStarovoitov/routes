import React from 'react';
import Type from 'prop-types';
import config from '../../../config.json';
import { Row, Col } from '../grid/index';

export default class AttachedFiles extends React.Component {
  static propTypes = {
    textButton: Type.string,
    files:Type.array
  };

  static defaultProps = {
    textButton: 'Прикрепленные файлы',
    files: ['some files', 'asdasdadssdasdasd', 'asdasdads', 'asdasdadsasdasdasdasd', 'asdasdadsasd']
  };

  state = {
    isExpanded: false
  };

  handleShowListFiles = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render() {
    return (
      <Row>
        <Col md={12}>
          <div className='attachedFiles'>
            <button
              className='attachedFiles__button'
              onClick={this.handleShowListFiles}
            >
              {this.props.textButton}
            </button>
            {
              <ul className={`attachedFiles__list ${!this.state.isExpanded ? 'hide' : 'show'}`}>
                {this.props.files.map((e, i) => {
                  return (
                    <li
                      className='attachedFiles__link'
                      key={i}
                    >
                      <a href={`${config.UrlApi}${config.api.getDownloadFile}${e.path}`}>{e.name}</a>
                    </li>
                  );
                })}
              </ul>
            }
          </div>
        </Col>
      </Row>
    );
  }
}
