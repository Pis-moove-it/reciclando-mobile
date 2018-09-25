import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import styles from './styles';

class Gather extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    const { user } = this.props;
    const { role } = this.props;
    return (
      <View style={styles.container}>
        <Text style={TextStyles.lightTitle}>{strings.gatherTitle}</Text>
        <Text>{`${strings.homeMessage} ${user && user.name}`}</Text>
        <Text style={TextStyles.lightTitle}>{`${role}`}</Text>
      </View>
    );
  }
}

Gather.propTypes = {
  user: PropTypes.object,
  role: PropTypes.string,
};

Gather.defaultProps = {
  user: null,
  role: null,
};

const mapStateToProps = state => ({
  user: getUser(state),
  role: getRole(state),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gather);
