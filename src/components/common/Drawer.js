import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/UserActions';
import { changeRole } from '../../actions/RoleActions';
import strings from '../../localization';
import TextStyles from '../../helpers/TextStyles';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import ChangeRoleIcon from '../../assets/ic_common/ic_refresh.png';
import HistoryIcon from '../../assets/images/HistoryIcon.png';
import BaleIcon from '../../assets/images/BaleIcon.png';
import PocketIcon from '../../assets/images/PocketIcon.png';
import UserIcon from '../../assets/ic_user/ic_user128_green.png';
import Colors from '../../helpers/Colors';
import Application from '../../Application';
import styles from './styles';
import CustomButton from './CustomButton';

class Drawer extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  logout = () => {
    this.props.logout();
    this.props.changeRole();
    Application.startLoggedInApp();
  };

  changeRole = () => {
    this.props.changeRole();
    this.props.navigator.toggleDrawer({
      side: 'right',
      animated: true,
      to: 'close',
    });
    this.props.navigator.pop();
  };

  render() {
    const { user } = this.props;
    const { role } = this.props;
    return (
      <View style={styles.containerWrapper}>
        <View style={styles.topHalf}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              color: Colors.primary,
              adjustsFontSizeToFit: true,
              textAlign: 'center',
            }}
          >
            {`${user.name}`}
          </Text>
          {
            {
              Gather: (
                <CustomButton
                  icon={HistoryIcon}
                  title={strings.history}
                  textStyle={TextStyles.drawerButtons}
                />
              ),
              Weigh: (
                <CustomButton
                  icon={PocketIcon}
                  title="weigh button"
                  textStyle={TextStyles.drawerButtons}
                  style={{ width: 140 }}
                />
              ),
              Bale: (
                <CustomButton
                  icon={BaleIcon}
                  title="bale button"
                  textStyle={TextStyles.drawerButtons}
                  style={{ width: 140 }}
                />
              ),
            }[role]
          }
        </View>
        <View style={styles.bottomHalf}>
          <CustomButton
            title={strings.changeRole}
            icon={ChangeRoleIcon}
            textStyle={TextStyles.drawerLowerButtons}
            style={{ width: 170 }}
            onPress={this.changeRole}
          />
          <CustomButton
            title={strings.changeUser}
            icon={UserIcon}
            textStyle={TextStyles.drawerLowerButtons}
            style={{ width: 170 }}
            onPress={this.logout}
          />
        </View>
      </View>
    );
  }
}

Drawer.propTypes = {
  user: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  changeRole: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: getUser(state),
  role: getRole(state),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  changeRole: () => dispatch(changeRole()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer);
