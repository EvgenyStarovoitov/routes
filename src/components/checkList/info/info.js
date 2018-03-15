import React from 'react';
import Type from 'prop-types';
import QRCode from 'qrcode';

import { Row, Col } from 'react-flexbox-grid';

export default class Info extends React.Component {
  static propTypes = {
    link:Type.string,
    idmsg:Type.string,
    date:Type.string,
    destination:Type.string,
    name:Type.string,
    email:Type.string,
    phone:Type.string
  };

  static defaultProps = {
    link:'http://127.0.0.1:3001/',
    idmsg:'Some Id',
    date:'Some date',
    status:'Some date',
    destination:'Masons',
    name:'какой то паренек',
    email: 'гугл',
    phone: ' phone number'
  };

  componentDidMount() {
    this.renderQrcode();
  }

  renderQrcode = () => {
    if (this.props.link.length > 0) {
      const canvas = document.querySelector('.canvas__box');

      QRCode.toCanvas(canvas, this.props.link, { width:170, margin:1 }, (error) => {
        if (error) {
          console.error(error);
        }
      });
    }
  };

  render() {
    return (
      <div className='info'>
        <Row start='md' center='xs'>
          <Col md={3} sm={12} xs={12}>
            <canvas className='canvas__box' />
          </Col>
          <Col md={9} sm={12} xs={12}>
            <Row start='md' center='xs' className='info__line'>
              <Col md={4} sm={12} xs={12}>
                <p>Обращение:</p>
              </Col>
              <Col md={8} sm={12} xs={12}>
                <p>{this.props.idmsg}</p>
              </Col>
            </Row>
            <Row start='md' center='xs' className='info__line'>
              <Col md={4} sm={12} xs={12}>
                <p>Дата/Время:</p>
              </Col>
              <Col md={8} sm={12} xs={12}>
                <p>{this.props.date}</p>
              </Col>
            </Row>
            <Row start='md' center='xs' className='info__line'>
              <Col md={4} sm={12} xs={12}>
                <p>Получатель:</p>
              </Col>
              <Col md={8} sm={12} xs={12}>
                <p>{this.props.destination}</p>
              </Col>
            </Row>
            <Row start='md' center='xs' className='info__line'>
              <Col md={4} sm={12} xs={12}>
                <p>ФИО:</p>
              </Col>
              <Col md={8} sm={12} xs={12}>
                <p>{this.props.name}</p>
              </Col>
            </Row >
            <Row start='md' center='xs' className='info__line'>
              <Col md={4} sm={12} xs={12}>
                <p>Email:</p>
              </Col>
              <Col md={8} sm={12} xs={12}>
                <p>{this.props.email}</p>
              </Col>
            </Row>
            <Row start='md' center='xs' className='info__line'>
              <Col md={4} sm={12} xs={12}>
                <p>Телефон:</p>
              </Col>
              <Col md={8} sm={12} xs={12}>
                <p>{this.props.phone}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
