import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  KeyboardAvoidingView } from 'react-native';

import Note from './Note';

export default class Notes extends  React.Component {

  componentDidMount = () => AsyncStorage.getItem('notes').then((value) => value === null ? this.setState({'notes': []}) : this.setState({'notes': JSON.parse(value)}));

  constructor(props){
    super(props);
    this.state = {
      notes: [],
      noteTitle: '',
      noteText: '',
    }
  }

  render() {

    let notes = this.state.notes.map((val, key) => {
      return <Note key={key} keyval={key} val={val}
      deleteNote={ () => this.deleteNote(key)} />
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>- NOTES -</Text>
        </View>
        <Button style={styles.addButton} title={"Create New Note +"} onPress={() => this.showNewNote()}></Button>
        {this.state.displayNewNote ?
          <KeyboardAvoidingView  style={styles.textInput}>
            <TextInput
              multiline = {false}
              numberOfLines = {1}
              style={{margin: 40}}
              onChangeText={(title) => this.setState({noteTitle: title})}
              value={this.state.noteTitle}
              placeholder={"Enter a title..."}
            >
            </TextInput>
            <TextInput
              multiline = {true}
              numberOfLines = {6}
              style={{height: 140, borderColor: 'gray', borderWidth: 1, margin: 5}}
              onChangeText={(text) => this.setState({noteText: text})}
              value={this.state.noteText}
              placeholder={"Fills in your notes..."}
            >
            </TextInput>
            <Button style={styles.addButton} title={"Add note"} onPress={this.addNote.bind(this)}></Button>
          </KeyboardAvoidingView >
        : null}
        <ScrollView style={styles.scrollContainer}>
          {notes}
        </ScrollView>
      </View>
    );
  }

  async addNote(){
    if(this.state.noteText){
      this.state.notes.push({
        'title': this.state.noteTitle,
        'note': this.state.noteText,
      })
      this.setState({notes: this.state.notes})
      await AsyncStorage.setItem('notes', JSON.stringify(this.state.notes));

      this.setState({noteTitle: ''})
      this.setState({noteText: ''})
      this.showNewNote();
    }

  }

  async deleteNote(key){
    this.state.notes.splice(key, 1);
    this.setState({notes: this.state.notes});
    await AsyncStorage.setItem('notes', JSON.stringify(this.state.notes));
  }

  showNewNote(){
    this.setState({displayNewNote: !this.state.displayNewNote});
  }

}
//END CLASS
const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },

  addButton: {
    backgroundColor: '#ffaa00',
    color: '#ffaa00',
  },

  scrollContainer: {

  }

})



