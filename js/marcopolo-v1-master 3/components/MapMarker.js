import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const MapMarker = props => (

  <Image style={{height: props.color, width: props.color}}
          source={props.ballon}
        />
);

const SIZE = 50;

const styles = StyleSheet.create({
  marker: {
    width: SIZE,
    height: SIZE,
  },
});

export default MapMarker;
