'use strict';

var React = require('react-native');
var ReactdditIndex = require('./views/index');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} = React;

class Reactddit extends React.Component {
  render() {
    return (
      <NavigatorIOS style={styles.container}
        initialRoute={{
          component: ReactdditIndex,
          title: 'Reactddit',
          passProps: { myProp: 'foo' },
        }}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('Reactddit', () => Reactddit);
