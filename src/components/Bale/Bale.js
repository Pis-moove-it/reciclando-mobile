import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isTablet } from 'react-native-device-detection';
import PropTypes from 'prop-types';
import BaleList from '../Bale/BaleList';
import { changeRole } from '../../actions/RoleActions';
import { openCreateBaleModal } from '../../actions/CreateBaleModalActions';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import Colors from '../../helpers/Colors';
import Logo01 from '../../assets/images/Logo01.png';
import user128 from '../../assets/ic_user/ic_user128.png';
import baleIcon from '../../assets/images/BaleIcon.png';
import sideMenuIcon from '../../assets/ic_common/ic_hamburger.png';
import { Screens } from '../Navigation';
import strings from '../../localization';
import styles from './styles';

class Bale extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    navBarBackgroundColor: Colors.primary,
  };

  static navigatorButtons = {
    leftButtons: [
      {
        icon: Logo01,
        id: 'logo',
        buttonColor: Colors.white,
      },
    ],
    rightButtons: [],
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    if (isTablet) {
      this.setButtonsTablet(this.props.user);
    } else {
      this.setButtonsPhone();
    }
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'sideMenuIcon':
        this.props.navigator.toggleDrawer({
          side: 'right',
          animated: true,
          to: 'open',
        });
        break;
      case 'logo':
        this.changeRole();
        break;
      default:
        break;
    }
  }

  setButtonsTablet = (name) => {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          id: 'profile',
          component: 'CustomButton',
          passProps: {
            title: name,
            icon: user128,
            style: styles.tabletHeaderButton,
            textStyle: styles.tabletHeaderText,
            onPress: () =>
              this.props.navigator.push({
                screen: Screens.Profile,
                animationType: 'fade',
                title: strings.profile,
              }),
          },
        },
        {
          id: 'addBale',
          component: 'CustomButton',
          passProps: {
            title: strings.createBale,
            icon: baleIcon,
            style: styles.tabletHeaderButton,
            textStyle: styles.tabletHeaderText,
            onPress: () => this.props.openCreateBaleModal(),
          },
        },
      ],
      animated: false,
    });
  };

  setButtonsPhone = () => {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          icon: sideMenuIcon,
          id: 'sideMenuIcon',
          buttonColor: Colors.white,
        },
      ],
      animated: false,
    });
  };

  changeRole = () => {
    this.props.changeRole();
    this.props.navigator.pop();
  };

  render() {
    return <BaleList />;
  }
}

Bale.propTypes = {
  user: PropTypes.string.isRequired,
  changeRole: PropTypes.func.isRequired,
  openCreateBaleModal: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: getUser(state),
  role: getRole(state),
});

const mapDispatchToProps = dispatch => ({
  changeRole: () => dispatch(changeRole()),
  openCreateBaleModal: () => dispatch(openCreateBaleModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bale);
