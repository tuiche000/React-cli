import React from "react";
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Test</h1>
        <Link to="/app/test/threePage">3级分类</Link>
        <hr></hr>
        <Link to="/app/test/threePage/fourPage">4级分类</Link>
      </div>
    )
  }
}