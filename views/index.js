var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} = React;

var dummy_content = [
  {
    'title': 'First title',
    'type': 'text',
    'author': {
      'id': 1,
      'username': 'Username_1'
    }
  },
  {
    'title': 'Second title',
    'type': 'image',
    'author': {
      'id': 2,
      'username': 'Username_2'
    }
  },
  {
    'title': 'First title',
    'type': 'link',
    'author': {
      'id': 3,
      'username': 'Username_3'
    }
  }
]

var ReactdditIndex = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(dummy_content),
      loaded: true
    });
  },
  renderLoading() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Reactddit
        </Text>
        <Image source={require('image!Preloader')} />
        <Text style={styles.loading}>
          loading content
        </Text>
      </View>
    );
  },
  renderList: function() {
    return(
      <View style={styles.containerItems}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={styles.listView}
        />
      </View>
    );
  },
  renderRow: function(item) {
    return(
      <View style={styles.item}>
        <Text style={styles.title}>{item.type}: {item.title}</Text>
        <Text style={styles.username}>{item.author.username}</Text>
      </View>
    );
  },
  render: function() {
      if( !this.state.loaded ) {
        return this.renderLoading();
      }

      return this.renderList();
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerItems: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  loading: {
    fontSize: 10,
    textAlign: 'center',
    margin: 10,
  },
  item: {
    margin: 10,
    flex: 1,
  },
  title: {
    color: '#666',
    fontSize: 18
  },
  username: {
    color: '#DDD',
    fontSize: 12
  }
});

module.exports = ReactdditIndex;
