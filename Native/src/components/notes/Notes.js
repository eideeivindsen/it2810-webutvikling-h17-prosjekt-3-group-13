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
import Accordion from 'react-native-collapsible/Accordion';
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
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>- NOTES -</Text>
        </View>
        <Button title={"+   Create New Note"} onPress={() => this.showNewNote()}></Button>
        {this.state.displayNewNote ?
          <KeyboardAvoidingView  style={styles.textInput}>
            <TextInput
              multiline = {false}
              numberOfLines = {1}
              style={styles.titleTextInput}
              onChangeText={(title) => this.setState({noteTitle: title})}
              value={this.state.noteTitle}
              placeholder={"Enter a title..."}
              underlineColorAndroid="#00bcd4"
            >
            </TextInput>
            <TextInput
              multiline = {true}
              numberOfLines = {6}
              style={styles.noteTextInput}
              onChangeText={(text) => this.setState({noteText: text})}
              value={this.state.noteText}
              placeholder={"Fills in your notes..."}
              underlineColorAndroid="transparent"
            >
            </TextInput>
            <Button title={"Add note"} onPress={this.addNote.bind(this)} ></Button>
          </KeyboardAvoidingView >
        : null}
        <ScrollView style={styles.scrollContainer}>
            {notes}
        </ScrollView>
      </ScrollView>
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
  headerText: {
    fontSize: 30,
    fontFamily: 'Verdana',
  },
  scrollContainer: {

  },
  titleTextInput: {
    margin: 40,
  },
  noteTextInput: {
    height: 140,
    borderColor: '#00bcd4',
    borderWidth: 1,
    margin: 5}

})



