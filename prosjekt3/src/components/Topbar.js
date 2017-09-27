import React from 'react';
import { AppBar } from 'material-ui';

export default class Topbar extends React.Component {

handleTouchTap() {
    if (window.innerWidth < 992) {
        this.props.handleDrawerToggle();
        }
    }

  render() {
    return (
            <AppBar onLeftIconButtonTouchTap={this.handleTouchTap.bind(this)} className="appBar" title={this.props.title} />
    );
  }
}
