import React from 'react';
import { Divider, MenuItem } from 'material-ui';
import HomeIcon from 'material-ui/svg-icons/action/home';
import EventIcon from 'material-ui/svg-icons/action/event';
import NoteIcon from 'material-ui/svg-icons/av/note';
import ChecklistIcon from 'material-ui/svg-icons/av/playlist-add-check';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <div className="navbar">
    <div className="navHeader">

    </div>
    <Divider />
    <NavLink exact to="/"><MenuItem className="menuButton" primaryText="Home" leftIcon={<HomeIcon />} /></NavLink>
    <NavLink to="/events"><MenuItem className="menuButton" primaryText="Events" leftIcon={<EventIcon />} /></NavLink>
    <NavLink to="/notes"><MenuItem className="menuButton" primaryText="Notes" leftIcon={<NoteIcon />} /></NavLink>
    <NavLink to="/todo"><MenuItem className="menuButton" primaryText="To do" leftIcon={<ChecklistIcon />} /></NavLink>
  </div>
);

export default Navbar;
