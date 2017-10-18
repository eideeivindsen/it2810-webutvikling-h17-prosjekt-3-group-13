import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Entypo from 'react-native-vector-icons/Entypo';
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
      eventsIsSorted: false,
    }
  }

  render() {

    let events = this.state.events.map((val, key) => {
      return <Event key={key} keyval={key} val={val}
                   deleteEvent={ () => this.deleteEvent(key)} />
    });

    return (
      <ScrollView style={styles.container}>
        <View style={styles.sorterContainer}>
          <Text>Click the icon to sort your events by date: </Text>
          <TouchableOpacity style={styles.sortingArrows} onPress={this.sortEvents.bind(this)}>
            <Entypo name='select-arrows' style={styles.icon}></Entypo>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <Button title={"+   Register an event"} onPress={() => this.showNewEvent()}></Button>
        </View>

        {this.state.displayNewEvent ?
          <KeyboardAvoidingView style={styles.textInput}>
            <TextInput
              multiline = {false}
              numberOfLines = {1}
              style={styles.titleTextInput}
              onChangeText={(title) => this.setState({eventTitle: title})}
              value={this.state.eventTitle}
              placeholder={"Enter an event title..."}
              underlineColorAndroid="#00bcd4"
            >
            </TextInput>
            <TextInput
              multiline = {true}
              numberOfLines = {6}
              style={styles.noteTextInput}
              onChangeText={(text) => this.setState({eventDescription: text})}
              value={this.state.eventText}
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
                format="YYYY-MM-DDTHH:MM:SSZ"
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
                format="YYYY-MM-DDTHH:MM:SSZ"
                minDate="2016-05-01"
                maxDate="2018-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({eventEndDate: date})}}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title={"Add event"} onPress={this.addEvent.bind(this)} ></Button>
            </View>
          </KeyboardAvoidingView >
          : null}
        <ScrollView>
          {events}
        </ScrollView>
      </ScrollView>
    );
  }

  async addEvent(){
    if(this.state.eventTitle){
      this.state.events.push({
        'title': this.state.eventTitle,
        'event': this.state.eventDescription,
        'startDate': this.state.eventStartDate,
        'endDate': this.state.eventEndDate
      })
      this.setState({events: this.state.events})
      await AsyncStorage.setItem('events', JSON.stringify(this.state.events));
      this.setState({eventStartDate: ''})
      this.setState({eventEndDate: ''})
      this.setState({eventTitle: ''})
      this.setState({eventText: ''})
      this.showNewEvent();
    }

  }

  async deleteEvent(key){
    this.state.events.splice(key, 1);
    this.setState({events: this.state.events});
    await AsyncStorage.setItem('events', JSON.stringify(this.state.events));
  }

  showNewEvent(){
    this.setState({displayNewEvent: !this.state.displayNewEvent});
  }

  sortEvents(){
    if(!this.state.eventsIsSorted){
      let sortedEvents = this.state.events;
      sortedEvents.sort(function(a,b) {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      });
      this.setState({events: sortedEvents});
      this.setState({eventsIsSorted: true});
    }
    else {
      let sortedEvents = this.state.events.reverse();
      this.setState({events: sortedEvents});
      this.setState({eventsIsSorted: false});
    }
  }
}





//END CLASS
const styles = StyleSheet.create({
  container: {
    flex: 1
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
    margin: 5
  },
  buttonWrapper: {
    marginBottom: 20,
  },
  sorterContainer: {
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    backgroundColor: '#ddd',
  },
  sortingArrows: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 10,
      bottom: 10,
      right: 10,
  },
  icon: {
    fontSize: 20,
  }





})



