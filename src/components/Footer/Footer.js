import React, { Component } from 'react';
import "./Footer.css"

export class Footer extends Component {
  render() {
    return (<div className="footer">
      <a className="footer_item" href="https://github.com/kirillvarn/grocerycomparator-web">GitHub</a>
      <p className="footer_item m-0">Kirill Varnatšov</p>
    </div>);
  }
}

export default Footer;
