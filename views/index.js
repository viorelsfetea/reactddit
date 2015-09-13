var React = require('react-native');
var TimeAgo = require('../helpers/TimeAgo');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} = React;

var HOST = 'https://www.reddit.com/';
var SUBREDDIT = '';
var EXTENSION = '.json';

var REQUEST_URL = "".concat(HOST, SUBREDDIT, EXTENSION);

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
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.data.children),
        loaded: true
      });
    })
    .done();
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
      <View style={styles.itemWrapper}>
        <View style={styles.ups}>
          <Text style={styles.upsText}>{item.data.ups}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>{item.data.title}</Text>
          <Text style={styles.meta}>Posted {this.getTimeSince(item.data.created_utc)} in /r/{item.data.subreddit}</Text>
          <Text style={styles.username}>{item.data.author} / {item.data.num_comments} Comments</Text>
        </View>
      </View>
    );
  },
  getTimeSince: function(timestamp) {
    var age = new TimeAgo(timestamp);

    return age.text;
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
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
  },
  item: {
    flex: 1,
  },
  title: {
    color: '#666',
    fontSize: 18,
    margin: 10,
  },
  username: {
    color: '#DDD',
    fontSize: 12,
    margin: 10,
    marginTop: 0,
  },
  meta: {
    color: '#DDD',
    fontSize: 12,
    marginLeft: 10,
    marginRight: 10,
  },
  ups: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 15
  },
  upsText: {
    color: '#CCC',
    fontSize: 20,
  }
});

module.exports = ReactdditIndex;
