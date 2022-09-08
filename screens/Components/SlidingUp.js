import React from 'react';
import {ScrollView, TouchableOpacity, View, Button, Text} from 'react-native';

import SlidingUpPanel from 'rn-sliding-up-panel';
import AllProducts from '../Store/Product/AllProducts';


export default class SlidingUp extends React.Component {

  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={() => this._panel.show()}>
        <View>
          <Text>Show</Text>
        </View>
      </TouchableOpacity>
      <SlidingUpPanel ref={c => (this._panel = c)}>
        {dragHandler => (
          <View style={styles.container}>
            <View style={styles.dragHandler} {...dragHandler}>
              <Text>Drag handler</Text>
            </View>
            <ScrollView>
              <AllProducts/>
            </ScrollView>
          </View>
        )}
      </SlidingUpPanel>
    </View>
    )
  }
}

const styles = {
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }