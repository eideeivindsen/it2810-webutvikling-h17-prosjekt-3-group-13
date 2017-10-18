import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';


export default class Note extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      displayNoteText: false,
    }
  }
  render() {
    return (
      <TouchableHighlight onPress={() => {this.showWholeNote()}}>
        <View key={this.props.keyval}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Event: {this.props.val.title}</Text>
            <Text style={styles.titleText}>Start date: {this.props.val.startDate.slice(0, -9).replace('T', ' ')}</Text>
            <Text style={styles.titleText}>End date: {this.props.val.endDate.slice(0, -9).replace('T', ' ')}</Text>
            <TouchableOpacity onPress={this.props.deleteEvent} style={styles.deleteButton}>
              {/* 'Entypo' is just an Icon component */}
              <Entypo name='trash' style={styles.icon}></Entypo>
            </TouchableOpacity>
          </View>

          {this.state.displayNoteText ?
            <View style={styles.eventContainer}>
              <Text style={styles.eventText}>Description: {this.props.val.event}</Text>
            </View>
            : null}
        </View>
      </TouchableHighlight>
    )
  }
  showWholeNote() {
    this.setState({displayNoteText: !this.state.displayNoteText});
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    backgroundColor: '#00bcd4',
  },
  eventContainer: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    backgroundColor: 'white',
  },
  titleText: {
    paddingLeft: 20,
    borderLeftWidth: 3,
    borderLeftColor: 'white',
    color: 'white',
  },
  eventText: {
    paddingLeft: 20,
    color: '#222',
  },
  deleteButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    top: 10,
    bottom: 10,
    right: 10,
    borderRadius: 100,
    paddingRight: 5,
  },
  deleteText: {
    color: '#fff'
  },
  icon: {
    color: 'white',
    fontSize: 18,
  }
})
