import React from 'react';
import { AppBar } from 'material-ui';
import { Hidden, Visible } from 'react-grid-system';

export default class Topbar extends React.Component {

handleTouchTap() {
    this.props.handleDrawerToggle();
}

render() {
    return (
        <div>
            <Hidden xl lg>
                <AppBar onLeftIconButtonTouchTap={this.handleTouchTap.bind(this)} className="appBar" title={this.props.title} />
            </Hidden>

            <Visible xl lg>
                <AppBar showMenuIconButton={false} className="appBar" title={this.props.title} />
            </Visible>
        </div>
    );
  }
}