import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import PocketIcon from '../../assets/images/PocketIcon.png';
import Button from '../common/Button';
import PocketInfo from '../Pocket/PocketInfo';
import CustomButton from '../common/CustomButton';
import strings from '../../localization';
import PencilIcon from '../../assets/ic_common/ic_edit.png';
import styles from './styles';

const Pocket = ({
  id, pocketState, onPressAction, openIdEditModal, openWeightEditModal,
}) => (
  <View style={styles.containerPhonePocket}>
    <TouchableOpacity onPress={onPressAction} style={styles.touchableStyle}>
      <Image source={PocketIcon} style={styles.pocketImageStylePhone} />
      <Text style={styles.textBlackPhone}>
        {strings.pocket} #{id}
      </Text>
    </TouchableOpacity>
    <View style={styles.wrapperButtonPhone}>
      <View style={styles.containerButtonPhone}>
        <Button
          style={pocketState === 'Unweighed' ? styles.phoneButton : styles.phoneBlueButton}
          title={
            pocketState === 'Unweighed'
              ? strings.pocketButtonWeightText
              : strings.pocketButtonEditWeightText
          }
          textStyle={styles.tabletButtonText}
          onPress={openWeightEditModal}
        />
      </View>
      <CustomButton icon={PencilIcon} onPress={openIdEditModal} />
    </View>
  </View>
);

Pocket.propTypes = {
  id: PropTypes.string.isRequired,
  pocketState: PropTypes.string.isRequired,
  onPressAction: PropTypes.func.isRequired,
  openIdEditModal: PropTypes.func.isRequired,
  openWeightEditModal: PropTypes.func.isRequired,
};

class PhonePocket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      time: props.time,
      weight: props.weight,
      pocketState: props.pocketState,
      showingInfo: false,
    };
  }

  toggleInfo = () => this.setState({ showingInfo: !this.state.showingInfo });

  render() {
    if (this.state.showingInfo) {
      return (
        <View>
          <Pocket
            id={this.state.id}
            pocketState={this.state.pocketState}
            onPressAction={this.toggleInfo}
            openIdEditModal={this.props.openEditIdPocketModal}
            openWeightEditModal={this.props.openEditWeightPocketModal}
          />
          <PocketInfo
            time={this.state.time}
            weight={this.state.pocketState === 'Unweighed' ? strings.unweighted : this.state.weight}
          />
        </View>
      );
    }
    return (
      <View>
        <Pocket
          id={this.state.id}
          pocketState={this.state.pocketState}
          onPressAction={this.toggleInfo}
          openIdEditModal={this.props.openEditIdPocketModal}
          openWeightEditModal={this.props.openEditWeightPocketModal}
        />
      </View>
    );
  }
}

PhonePocket.propTypes = {
  id: PropTypes.string.isRequired,
  time: PropTypes.string,
  weight: PropTypes.string,
  pocketState: PropTypes.string.isRequired,
  openEditIdPocketModal: PropTypes.func.isRequired,
  openEditWeightPocketModal: PropTypes.func.isRequired,
};

PhonePocket.defaultProps = {
  time: false,
  weight: false,
};

export default PhonePocket;
