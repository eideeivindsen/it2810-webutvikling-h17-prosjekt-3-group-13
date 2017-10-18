import React, { Component } from 'react';
import Topbar from './Topbar';
import { Col, Container, Row, Visible } from 'react-grid-system';
import { Card, Dialog, Divider, FlatButton, ListItem, RaisedButton, Subheader, TextField } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
          notes: localStorage.notes.length !== 0 ? JSON.parse(localStorage.notes) : [],
          notesCounter: parseInt(localStorage.notesCounter, 10),
          subject: '',
          note: '',
          date: new Date(),
          currentId: parseInt(localStorage.notesCounter, 10),
          newNote: true,
          showSavedMessage: false,
          showWarningMessage: false,
          showRemovedMessage: false,
          dialogOpen: false,
          activeNoteId: -1,
            }
        };


    handleSubjectChange(event) {
        this.setState({subject: event.target.value});
      }

      handleNoteChange(event) {
          this.setState({note: event.target.value});
        }

    createNewNote() {
        this.setState({
            subject: 'New Note',
            note: '',
            date: new Date(),
            currentId: this.state.notesCounter,
            newNote: true,
            activeNoteId: -1,
        })
    }

    handleEditNote(note) {
        this.setState({
            subject: note.subject,
            note: note.note,
            date: note.date,
            currentId: note.id,
            newNote: false,
            activeNoteId: note.id,
        })
    }

    openDialog() {
        this.setState({dialogOpen: true});
    }

    handleRemove(remove) {
        this.setState({dialogOpen: false});
        if(remove) {
            var updatedList = this.state.notes.filter((note) => {
                  return note.id !== this.state.currentId;
              });
              this.setState({
                  notes: updatedList,
                  showRemovedMessage: true,
                  subject: '',
                  note: '',
                  date: new Date(),
                  currentId: this.state.notesCounter,
                  newNote: true,
              }, function() {
                  this.updateLocalStorage();
              })
        }
    }


    hideMessages() {
        this.setState({
            showWarningMessage: false,
            showSavedMessage: false,
            showRemovedMessage: false,
        })
    }

    handleOnSave(event) {
        this.setState({activeNoteId: this.state.currentId})
        if(this.state.subject.length === 0) {
            this.setState({showWarningMessage: true});
            return;
        }
        var todayDate = new Date();
        todayDate.setHours(todayDate.getHours() - todayDate.getTimezoneOffset() / 60);
        var newObject = {
            subject: this.state.subject,
            note: this.state.note,
            date: todayDate.toJSON(),
            id: this.state.currentId,
        };
        if (this.state.newNote) {
            var updatedList = this.state.notes.slice()
            updatedList.push(newObject);
            this.setState({notes: updatedList, notesCounter: this.state.notesCounter + 1, showSavedMessage: true, newNote: false}, function() {
                this.updateLocalStorage();
            })
        } else {
            var newList = [];
            this.state.notes.slice().forEach((note) => {
                  if(note.id === this.state.currentId) {
                      newList.push(newObject);
                  } else {
                      newList.push(note);
                  }
              });
              this.setState({notes: newList, showSavedMessage: true}, function() {
                  this.updateLocalStorage();
              })
        }
        }


    updateLocalStorage() {
        localStorage.setItem("notes", JSON.stringify(this.state.notes));
        localStorage.setItem("notesCounter", this.state.notesCounter);
    }

  render() {
    const sortedNotes = this.state.notes.slice();
    sortedNotes.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });
    return (
        <div className="notes">
            <Topbar title="Notes" handleDrawerToggle={this.props.handleDrawerToggle.bind(this)} />
            <div className="container">
                <Container fluid={true} onFocus={this.hideMessages.bind(this)} >
                    <Row>
                        <Col xs={12} md={4}>
                            <Card className="notesList">
                                <Subheader>Your Notes:</Subheader>

                                <ListItem onClick={this.createNewNote.bind(this)} leftIcon={<AddIcon />} primaryText="Create New Note" />
                                <Divider />
                                {
                                    sortedNotes.map((note) =>
                                    <ListItem className={"noteEntry " + (this.state.activeNoteId === note.id ? 'activeNote' : '')} key={note.id} primaryText={note.subject.slice(0,36).trim()} onClick={() => this.handleEditNote(note)} secondaryText={note.note.slice(0,30).trim() + '...'} rightIcon={<DeleteIcon onClick={() => this.openDialog()}/>} />
                                )}
                                <Dialog modal={false} open={this.state.dialogOpen}  onRequestClose={() => this.handleRemove(false)} actions={[
                                          <FlatButton
                                            label="Cancel"
                                            primary={true}
                                            onClick={() => this.handleRemove(false)}
                                          />,
                                          <FlatButton
                                            label="Discard"
                                            primary={true}
                                            onClick={() => this.handleRemove(true)}
                                          />,
                                        ]}>
                                  Are you sure you want do discard the note {'"' + this.state.subject + '"'}?
                                </Dialog>
                            </Card>
                            <Visible md lg xl>
                                <RaisedButton label="Save Note" primary={true} onClick={this.handleOnSave.bind(this)}className="saveNotesButton"/>
                            </Visible>
                        </Col>
                        <Col xs={12} md={8}>
                            <Card className="notesEditor">
                                <Subheader>Note:</Subheader>
                                <TextField floatingLabelText="Subject:" fullWidth={true} value={this.state.subject} onChange={this.handleSubjectChange.bind(this)} /><br />
                                <TextField
                                          floatingLabelText="Note:"
                                          fullWidth={true}
                                          multiLine={true}
                                          rows={11}
                                          rowsMax={11}
                                          value={this.state.note}
                                          onChange={this.handleNoteChange.bind(this)}
                                        /><br />
                                    {this.state.showSavedMessage ? <Subheader>Note saved!</Subheader> : null}
                                    {this.state.showWarningMessage ? <Subheader>The subject field is required.</Subheader> : null}
                                    {this.state.showRemovedMessage ? <Subheader>The note has been successfully removed!</Subheader> : null}
                            </Card>
                        </Col>
                        <Visible xs sm>
                            <Col xs={12} md={4}>
                                <RaisedButton label="Save Note" primary={true} onClick={this.handleOnSave.bind(this)}className="saveNotesButton"/>
                            </Col>
                        </Visible>
                    </Row>
                </Container>
            </div>
        </div>
    );
  }
}

export default Notes;
