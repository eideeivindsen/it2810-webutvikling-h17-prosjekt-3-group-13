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
import DatePicker from 'react-native-datepicker';
import Event from './Event';

export default class Notes extends  React.Component {

  componentDidMount = () => AsyncStorage.getItem('events').then((value) => value === null ? this.setState({'events': []}) : this.setState({'events': JSON.parse(value)}));

  constructor(props){
    super(props);
    this.state = {
      events: [],
      eventTitle: '',
      eventDescription: '',
      eventStartDate: '',
      eventEndDate: '',
      displayNewEvent: false,
    }
  }

  render() {

    let events = this.state.events.map((val, key) => {
      return <Event key={key} keyval={key} val={val}
                   deleteEvent={ () => this.deleteEvent(key)} />
    });

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>- EVENTS -</Text>
        </View>
        <Button title={"+   Register an event"} onPress={() => this.showNewNote()}></Button>
        {this.state.displayNewEvent ?
          <View  style={styles.textInput}>
            <TextInput
              multiline = {false}
              numberOfLines = {1}
              style={styles.titleTextInput}
              onChangeText={(title) => this.setState({noteTitle: title})}
              value={this.state.noteTitle}
              placeholder={"Enter an event title..."}
              underlineColorAndroid="#00bcd4"
            >
            </TextInput>
            <TextInput
              multiline = {true}
              numberOfLines = {6}
              style={styles.noteTextInput}
              onChangeText={(text) => this.setState({noteText: text})}
              value={this.state.noteText}
              placeholder={"Description..."}
              underlineColorAndroid="transparent"
            >
            </TextInput>
            <View style={styles.datePickers}>
              <DatePicker
                style={styles.datePicker}
                date={this.state.eventStartDate}
                mode="datetime"
                placeholder="Select start date"
                format="YYYY-MM-DD hh:mm a"
                minDate="2016-06-01"
                maxDate="2018-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({eventStartDate: date})}}
              />
              <DatePicker
                style={styles.datePicker}
                date={this.state.eventEndDate}
                mode="datetime"
                placeholder="Select end date"
                format="YYYY-MM-DD hh:mm a"
                minDate="2016-05-01"
                maxDate="2018-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({eventEndDate: date})}}
              />
            </View>

            <Button title={"Add event"} onPress={this.addEvent.bind(this)} ></Button>
          </View >
          : null}
        <ScrollView style={styles.scrollContainer}>
          {events}
        </ScrollView>
      </ScrollView>
    );
  }

  async addEvent(){
    if(this.state.noteText){
      this.state.notes.push({
        'title': this.state.noteTitle,
        'note': this.state.noteText,
      })
      this.setState({notes: this.state.notes})
      await AsyncStorage.setItem('events', JSON.stringify(this.state.notes));

      this.setState({noteTitle: ''})
      this.setState({noteText: ''})
      this.showNewNote();
    }

  }

  async deleteEvent(key){
    this.state.events.splice(key, 1);
    this.setState({events: this.state.events});
    await AsyncStorage.setItem('events', JSON.stringify(this.state.events));
  }

  showNewNote(){
    this.setState({displayNewEvent: !this.state.displayNewEvent});
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
  datePickers: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  datePicker: {
    width: 300,
    margin: 5,
  },
  titleTextInput: {
    margin: 10,
  },
  noteTextInput: {
    height: 140,
    borderColor: '#00bcd4',
    borderWidth: 1,
    margin: 5}

})



