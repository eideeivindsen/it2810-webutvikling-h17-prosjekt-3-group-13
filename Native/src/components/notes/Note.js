import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';


export default class Note extends Component {

  render() {
    return (
    <View key={this.props.keyval} style={styles.note}>
      <Text style={styles.noteText}>{this.props.val.title}</Text>
      <Text style={styles.noteText}>{this.props.val.note}</Text>
      <TouchableOpacity onPress={this.props.deleteNote} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#000000'
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#000000',
    color: '#ff0000',
  },
  deleteButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 5,
    top: 10,
    bottom: 10,
    right: 10,

  },
  deleteText: {
    color: '#ffffff'
  }
})
