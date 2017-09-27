import React from 'react';
import { Avatar, Divider, ListItem, MenuItem } from 'material-ui';
import { red500 } from 'material-ui/styles/colors';
import { Hidden } from 'react-grid-system';
import {cyan500 } from 'material-ui/styles/colors';
import HomeIcon from 'material-ui/svg-icons/action/home';
import EventIcon from 'material-ui/svg-icons/action/event';
import NoteIcon from 'material-ui/svg-icons/av/note';
import ChecklistIcon from 'material-ui/svg-icons/av/playlist-add-check';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { NavLink } from 'react-router-dom';


export default class Navbar extends React.Component {

    handleTouchTap() {
        if (window.innerWidth < 992) {
            this.props.handleDrawerToggle();
            }
        }

  render() {
    return (
        <div className="navbar">
          <div className="navHeader">
              <ListItem disabled={true} leftAvatar={<Avatar backgroundColor={cyan500}>{this.props.username[0]}</Avatar>}>
              {this.props.username}</ListItem>
          </div>
          <Divider />
          <NavLink onClick={this.handleTouchTap.bind(this)} exact to="/"><MenuItem className="menuButton" primaryText="Home" leftIcon={<HomeIcon />} /></NavLink>
          <NavLink onClick={this.handleTouchTap.bind(this)} to="/events"><MenuItem className="menuButton" primaryText="Events" leftIcon={<EventIcon />} /></NavLink>
          <NavLink onClick={this.handleTouchTap.bind(this)} to="/notes"><MenuItem className="menuButton" primaryText="Notes" leftIcon={<NoteIcon />} /></NavLink>
          <NavLink onClick={this.handleTouchTap.bind(this)} to="/todo"><MenuItem className="menuButton" primaryText="To do" leftIcon={<ChecklistIcon />} /></NavLink>
          <Hidden xl lg >
              <div className="hideMenuButton">
                  <Divider />
                  <MenuItem onClick={this.props.handleDrawerToggle ? this.props.handleDrawerToggle.bind(this) : null} className="menuButton" primaryText="Hide Menu" leftIcon={<CloseIcon color={red500} />} />
                  <Divider />
              </div>
          </Hidden>
        </div>
    );
  }
}
