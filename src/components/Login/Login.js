import React, { Component } from 'react';
import { View, Image, Picker, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Application from '../../Application';
import Button from '../common/Button';
import ErrorView from '../common/ErrorView';
import Colors from '../../helpers/Colors';
import ShadowStyles from '../../helpers/ShadowStyles';
import strings from '../../localization';
import { login, actionTypes } from '../../actions/UserActions';
import getUser from '../../selectors/UserSelector';
import getUsers from '../../selectors/UsersAPISelector';
import loadingSelector from '../../selectors/LoadingSelector';
import { fetchUsers } from '../../actions/UsersAPIActions';
import { errorsSelector } from '../../selectors/ErrorSelector';
import styles from './styles';
import reciclandoLogo from './../../assets/images/Logo03.png';
import avatar from './../../assets/ic_user/ic_user128.png';

class Login extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.user !== null) {
      Application.selectRole();
    }
    return null;
  }

  constructor() {
    super();
    this.state = {
      identifier: null,
      username: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.props.fetchData();
  }

  getUsers() {
    console.log('fetchData');
    const usersData = [];

    this.props.dataFetch.map((user, identifier) => {
      usersData.push(<Picker.Item
        key={identifier}
        label={`${user.name} ${user.surname}`}
        value={`${user.name} ${user.surname}`}
      />);
    });

    return usersData;
  }

  fetchData = () => this.props.fetchData();

  login = () => {
    this.setState({ loading: true });
    this.props.login(this.state.identifier, this.state.username);
  };

  usernameChanged = (itemValue, itemIndex) => {
    this.setState({ identifier: itemIndex, username: itemValue });
  };

  render() {
    const { errors } = this.props;
    const { loading } = this.state.loading;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={reciclandoLogo} style={styles.logo} />
        </View>
        <View style={[styles.bottomContainer, ShadowStyles.shadow]}>
          <View style={styles.pickerContainer}>
            <Image source={avatar} style={styles.icon} />
            <Picker
              selectedValue={this.state.username}
              style={styles.picker}
              mode="dialog"
              onValueChange={this.usernameChanged}
            >
              {this.getUsers()}
            </Picker>
          </View>
          <ErrorView errors={errors} />
          {loading && errors.length < 1 ? (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <Button
              style={styles.button}
              textStyle={styles.textButton}
              onPress={this.state.username !== null ? this.login : null}
              title={strings.selectUser}
            />
          )}
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.array,
  fetchData: PropTypes.func.isRequired,
  dataFetch: PropTypes.object.isRequired,
};

Login.defaultProps = {
  errors: [],
};

const mapStateToProps = state => ({
  user: getUser(state),
  isLoading: loadingSelector([actionTypes.LOGIN])(state),
  errors: errorsSelector([actionTypes.LOGIN])(state),
  dataFetch: getUsers(state),
});

const mapDispatchToProps = dispatch => ({
  login: (identifier, username) => dispatch(login(identifier, username)),
  fetchData: () => dispatch(fetchUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
