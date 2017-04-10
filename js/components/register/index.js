
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Item, Input, Button, Icon, View, Text } from 'native-base';

import { setUser, registerUser } from '../../actions/user';
import styles from './styles';

const {
  replaceAt,
} = actions;

const background = require('../../../images/shadow.png');

class Register extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rePassword: ''
    };

    this.register = this.register.bind(this);
  }

  setUser(name) {
    this.props.setUser(name);
  }

  replaceRoute(route) {
    this.setUser(this.state.name);
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }

  register() {
    this.props.registerUser(this.state)
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Item style={styles.input}>
                  <Icon active name="person" />
                  <Input
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                  />
                </Item>
                <Item style={styles.input}>
                  <Icon name="unlock" />
                  <Input
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    secureTextEntry
                  />
                </Item>
                <Item style={styles.input}>
                  <Icon name="unlock" />
                  <Input
                    placeholder="Reenter Password"
                    onChangeText={rePassword => this.setState({ rePassword })}
                    secureTextEntry
                  />
                </Item>
                <Button style={styles.btn} onPress={() => {this.register()}}>
                  <Text>Register</Text>
                </Button>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setUser: name => dispatch(setUser(name)),
    registerUser: user => dispatch(registerUser(user))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Register);
