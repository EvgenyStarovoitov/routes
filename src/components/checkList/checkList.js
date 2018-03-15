import React from 'react';
import Type from 'prop-types';
import fetch from 'node-fetch';
import config from '../../../config.json';

import './checkList.css';

import Button from 'arui-feather/button';
import { Grid } from 'react-flexbox-grid';

import Info from './info/index';
import CommentForm from './commentForm/index';
import AttachedFiles from './attachedFiles/index';
import TextMessage from './textMessage/index';
import CommentList from './commentList/index';

export default class CheckList extends React.Component {
  static propTypes = {
    handleShowMessage: Type.func,
    match:Type.object
  };

  state = {
    idmsg: '',
    date:'',
    destination: '',
    name: '',
    email: '',
    phone: '',
    message:'',
    files: [],
    comments: [],
    link:'',
    showResponse: true,
    showCommentForm: false
  };

  componentWillMount() {
    this.getAllData();
  }

  handleShowMessage = () => {
    this.setState({
      showResponse: !this.state.showResponse,
      showCommentForm: !this.state.showCommentForm
    });
  };

  handleNewComment = (value) => {
    fetch(`${config.UrlApi}${config.api.addComment}${this.props.match.params.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment: value
      })
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.status);
        }
        this.setState({
          showResponse: !this.state.showResponse,
          showCommentForm: !this.state.showCommentForm
        });
        this.getAllData();
      })
      .catch(e => console.log(e));
  };

  getData = (apiUrl) => {
    return fetch(`${config.UrlApi}${apiUrl}${this.props.match.params.id}`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  getAllData = () => {
    const data = this.getData(config.api.getMessage);
    const files = this.getData(config.api.getFiles);
    const comments = this.getData(config.api.getComments);

    Promise.all([data, files, comments])
      .then(values => {
        this.setState({
          date: this.convertDate(values[0].date),
          destination: values[0].destination,
          name: values[0].name,
          email: values[0].email,
          phone:values[0].phone,
          message:values[0].message,
          files:values[1],
          comments: values[2]
        });
      })
      .catch(e => console.log(e));
  };

  convertDate = (date) => {
    const utcDate = new Date(date);

    return utcDate.toLocaleDateString('en-GB');
  };

  renderCheckList = () => {
    return (
      <Grid fluid>
        <Info
          link={`${config.UrlApi}${config.api.getMessage}${this.props.match.params.id}`}
          idmsg={this.props.match.params.id}
          date={this.state.date}
          destination={this.state.destination}
          name={this.state.name}
          email={this.state.email}
          phone={this.state.phone}
        />
        <TextMessage
          message = {this.state.message}
        />
        {this.state.files !== undefined ?
          <AttachedFiles
            files={this.state.files}
          /> : ''
        }
        <CommentList
          comments={this.state.comments}
        />
        <Button
          onClick={this.handleShowMessage}
          width='available'
        >
          {!this.state.showCommentForm ? 'Добавить комментарий' : 'Скрыть'}
        </Button>
      </Grid>
    );
  };

  renderCommentForm = () => {
    return (
      <CommentForm
        onCloseClick={this.handleShowMessage}
        onSubmit={this.handleNewComment}
      />
    );
  };

  render() {
    return (
      <div className='checkList'>
        {this.state.showResponse ? this.renderCheckList() : ''}
        {this.state.showCommentForm ? this.renderCommentForm() : ''}
      </div>
    );
  }
}
