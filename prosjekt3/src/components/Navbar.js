import React from 'react';
import { Divider, MenuItem } from 'material-ui';
import HomeIcon from 'material-ui/svg-icons/action/home';
import EventIcon from 'material-ui/svg-icons/action/event';
import NoteIcon from 'material-ui/svg-icons/av/note';
import ChecklistIcon from 'material-ui/svg-icons/av/playlist-add-check';

const Navbar = () => (
  <div className="navbar">
    <div className="navHeader">

    </div>
    <Divider />
    <MenuItem className="menuButton" primaryText="Home" leftIcon={<HomeIcon />} />
    <MenuItem className="menuButton" primaryText="Events" leftIcon={<EventIcon />} />
    <MenuItem className="menuButton" primaryText="Notes" leftIcon={<NoteIcon />} />
    <MenuItem className="menuButton" primaryText="To do" leftIcon={<ChecklistIcon />} />
  </div>
);

export default Navbar;
