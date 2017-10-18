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
            <Text style={styles.titleText}>Subject: {this.props.val.title}</Text>
            <TouchableOpacity onPress={this.props.deleteNote} style={styles.deleteButton}>
              {/* 'Entypo' is just an Icon component */}
              <Entypo name='trash' style={styles.icon}></Entypo>
            </TouchableOpacity>
          </View>

          {this.state.displayNoteText ?
            <View style={styles.noteContainer}>
              <Text style={styles.noteText}>Note: {this.props.val.note}</Text>
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
    borderBottomColor: '#000000',
    backgroundColor: '#00bcd4',
  },
  noteContainer: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    backgroundColor: 'black',
  },
  titleText: {
    paddingLeft: 20,
    borderLeftWidth: 3,
    borderLeftColor: 'white',
    color: 'white',

  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 3,
    borderLeftColor: 'black',
    backgroundColor: 'black',
    color: 'white',

  },
  deleteButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    top: 10,
    bottom: 10,
    right: 10,
    borderRadius: 100,
    padding: 15,
  },
  deleteText: {
    color: '#ffffff'
  },
  icon: {
    color: 'white',
    fontSize: 14,
  }
})
