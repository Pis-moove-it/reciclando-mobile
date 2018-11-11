import React, { Component } from 'react';
import { FlatList, View, RefreshControl, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PropTypes from 'prop-types';
import { openEditPocketModal } from '../../actions/EditPocketModalActions';
import { getPockets } from '../../actions/PocketActions';
import EditPocketModal from '../common/EditPocketModal';
import { pockets } from '../../selectors/PocketSelector';
import Colors from '../../helpers/Colors';
import TabletPocket from './TabletPocket';
import PhonePocket from './PhonePocket';
import styles from './styles';

class PocketList extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      nextPage: 2,
      pagination: false,
    };
  }

  componentDidMount = () => {
    this.setState({ refreshing: true });
    this.props.getPockets(this.props.token, [], 1).then(() => {
      this.setState({ refreshing: false, nextPage: 2 });
    });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getPockets(this.props.token, [], 1).then(() => {
      this.setState({ refreshing: false, nextPage: 2 });
    });
  };

  onEnd = () => {
    this.setState({ pagination: true });
    this.props.getPockets(this.props.token, this.props.pockets, this.state.nextPage).then(() => {
      this.setState({
        pagination: false,
        nextPage: this.state.nextPage + 1,
      });
    });
  };

  render() {
    return (
      <View style={styles.containerL}>
        <EditPocketModal />
        {this.state.refreshing && this.props.pockets.length ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <FlatList
            data={this.props.pockets}
            renderItem={({ item }) => {
              if (isPhone) {
                return (
                  <PhonePocket
                    id={item.serial_number}
                    time={item.check_in}
                    weight={item.weight}
                    pocketState={item.state}
                    openEditPocketModal={() =>
                      this.props.openEditPocketModal(
                        item.id,
                        item.serial_number,
                        item.weight,
                        item.state !== 'Unweighed',
                      )
                    }
                  />
                );
              }
              return (
                <TabletPocket
                  id={item.serial_number}
                  time={item.check_in}
                  weight={item.weight}
                  pocketState={item.state}
                  openEditPocketModal={() =>
                    this.props.openEditPocketModal(
                      item.id,
                      item.serial_number,
                      item.weight,
                      item.state !== 'Unweighed',
                    )
                  }
                />
              );
            }}
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
            }
            onEndReachedThreshold={0.05}
            onEndReached={this.onEnd}
          />
        )}
        {this.state.pagination ? <ActivityIndicator style={styles.activity} size="large" /> : null}
      </View>
    );
  }
}

PocketList.propTypes = {
  getPockets: PropTypes.func.isRequired,
  openEditPocketModal: PropTypes.func.isRequired,
  pockets: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  pockets: pockets(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  openEditPocketModal: (pocket, serialNumber, weight, hasWeight) =>
    dispatch(openEditPocketModal(pocket, serialNumber, weight, hasWeight)),
  getPockets: (token, pocketsArray, nextPage) =>
    dispatch(getPockets(token, pocketsArray, nextPage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PocketList);
