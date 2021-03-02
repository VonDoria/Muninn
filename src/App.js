import React, { Component } from 'react';
import Clock from './components/Clock';
import Links from './components/Links';
// import Settings from './components/Settings';
// import Pomodoro from './components/Pomodoro';
import Search from './components/Search';
import Todo from './components/Todo';
// import Wether from './components/Wether';
import Notes from './components/Notes';
// import Toggle from './components/Toggle';

export default class App extends Component 
{
  chargeBackground()
  {
    document.querySelector('body').style.background =  `url(https://picsum.photos/${window.innerWidth}/${window.innerHeight})`;
  }

  render()
  {
    this.chargeBackground();
    return (
      <div className="appContainer">
        <Clock></Clock>
        <Links></Links>
        {/* <Settings></Settings> */}
        {/* <Pomodoro></Pomodoro> */}
        <Search></Search>
        <Todo></Todo>
        {/* <Wether></Wether> */}
        <Notes></Notes>
        {/* <Toggle></Toggle> */}
      </div>
    );
  }
}

