import React from 'react';

import './App.css';
import { Switch, Route } from 'react-router-dom';

import Feedback from './feedback/feedback';
import CheckList from './checkList/checkList';

export default class App extends React.Component {
  render() {
    return (
      <div className='App' >
        <Switch>
          <Route exact path='/' component={Feedback}/>
          <Route path='/msg/:id' component={CheckList}/>
        </Switch>
      </div>
    );
  }
}
