import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Card from './Card';
import {Button} from 'native-base';

import {
  Entypo,
  Ionicons,
  Feather,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome
} from '@expo/vector-icons';
import {upVote, downVote} from './helper';
const buttonProps = {
  size: 20,
  color: 'white',
  padding: 5
};

const FeaturedCard=props=>{
  let {image,description,name,interested,...rest}=props;

  return (
    <Card {...rest} backgroundImage={image}>
    <View style={{flexDirection:'row',justifyContent:'space-between',}}>
      <Text style={styles.cardTypeText}></Text>
      <Text style={styles.cardTypeText}>{interested+' Interested '}</Text>
       </View>
      <Text style={styles.cardNameText}>{name}</Text>
      <Text style={styles.cardDescriptionText}>{description}</Text>
      <View style={styles.cardContent}>
        <View style={{backgroundColor:'transparent', paddingLeft: 150, padding: 10, flexDirection:'row', justifyContent: 'space-between'}}>
        <Button rounded style={{padding:25, backgroundColor: 'white'}}onPress={()=>downVote(name)}><Feather name="thumbs-down"{...buttonProps} style={{color: 'red'}}/></Button>
        <Button rounded style={{padding:25, backgroundColor: 'white'}}onPress={()=>upVote(name)}><Feather name="thumbs-up"{...buttonProps} style={{color: 'blue'}}/></Button>
        </View>
      </View>
    </Card>
  );
};

const textShadow = {
  textShadowOffset: {
    height: 0.1,
  },
  textShadowColor:'rgba(0,0,0,0.3)',
  textShadowRadius:5,
};

const styles = StyleSheet.create({
  cardTypeText: {
    ...textShadow,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  cardNameText: {
    ...textShadow,
    marginTop: 7,
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
  },
  cardContent: {
     flex:1,
     flexDirection: 'column',
     justifyContent: 'flex-end',
  },
  cardDescriptionText: {
    fontSize: 16,
    paddingTop: 15,
    fontWeight: '700',
    color: 'white',
  },
  interestedStyle: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 1000,
  },
});


export default FeaturedCard;
