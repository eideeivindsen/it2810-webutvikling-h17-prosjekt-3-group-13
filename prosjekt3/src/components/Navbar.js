import React from 'react';
import { Avatar, Divider, ListItem, MenuItem } from 'material-ui';
import {cyan500 } from 'material-ui/styles/colors';
import HomeIcon from 'material-ui/svg-icons/action/home';
import EventIcon from 'material-ui/svg-icons/action/event';
import NoteIcon from 'material-ui/svg-icons/av/note';
import ChecklistIcon from 'material-ui/svg-icons/av/playlist-add-check';
import { NavLink } from 'react-router-dom';


export default class Navbar extends React.Component {


  render() {
    return (
        <div className="navbar">
          <div className="navHeader">
              <ListItem disabled={true} leftAvatar={<Avatar backgroundColor={cyan500}>{this.props.username[0]}</Avatar>}>
              {this.props.username}</ListItem>
          </div>
          <Divider />
          <NavLink exact to="/"><MenuItem className="menuButton" primaryText="Home" leftIcon={<HomeIcon />} /></NavLink>
          <NavLink to="/events"><MenuItem className="menuButton" primaryText="Events" leftIcon={<EventIcon />} /></NavLink>
          <NavLink to="/notes"><MenuItem className="menuButton" primaryText="Notes" leftIcon={<NoteIcon />} /></NavLink>
          <NavLink to="/todo"><MenuItem className="menuButton" primaryText="To do" leftIcon={<ChecklistIcon />} /></NavLink>
        </div>
    );
  }
}
