import React, { Component, Fragment } from 'react';
import '../styles/Clock.css'

export default class Clock extends Component 
{
    constructor(props) {
      super(props);
      this.state = {
        minuts: new Date().getMinutes().toString().length !== 2 ? "0" + new Date().getMinutes().toString() : new Date().getMinutes().toString(),
        hour: new Date().getHours().toString().length !== 2 ? "0" + new Date().getHours().toString() : new Date().getHours().toString(),
        };
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        minuts: new Date().getMinutes().toString().length !== 2 ? "0" + new Date().getMinutes().toString() : new Date().getMinutes().toString(),
        hour: new Date().getHours().toString().length !== 2 ? "0" + new Date().getHours().toString() : new Date().getHours().toString(),
      });
    }
  
    render() {
      return (
        <Fragment>
            <div className="clock">{this.state.hour}:{this.state.minuts}</div>
        </Fragment>
      );
    }
}