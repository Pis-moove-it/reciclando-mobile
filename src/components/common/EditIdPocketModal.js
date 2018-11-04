import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import strings from '../../localization';
import getIsModalVisible from '../../selectors/EditIdPocketModalSelector';
import { closeEditIdPocketModal } from '../../actions/EditIdPocketModalActions';
import ErrorView from './ErrorView';
import Button from './Button';
import TextField from './TextField';
import recyclabeleMaterials from './Constants';
import styles from './styles';

class EditPocketModal extends Component {
  constructor(props) {
    super(props);
    this.materials = recyclabeleMaterials;
  }

  state = {
    newIdentifier: 0,
    inputError: true,
    errors: [],
  };

  acceptEdit = () => {
    if (this.state.newIdentifier > 0) {
      this.closeModal();
    } else {
      this.setState({ inputError: true });
      this.setState({ errors: [strings.invalidInputNumber] });
    }
  };

  closeModal = () => {
    this.setState({ inputError: false });
    this.setState({ errors: [] });
    this.props.closeEditModal();
  };

  render() {
    return (
      <Modal
        isVisible={this.props.isModalVisible}
        onBackButtonPress={this.closeModal}
        onBackdropPress={this.closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{strings.editPocket}</Text>
          </View>
          <View>
            <TextField
              placeholder={strings.identifierPlaceholderModal}
              keyboardType="numeric"
              maxLength={8}
              onChangeText={value => this.setState({ newIdentifier: value })}
            />
            {this.state.inputError && <ErrorView errors={this.state.errors} />}
            <Button
              style={styles.buttonModal}
              textStyle={styles.text}
              title={strings.acceptModal}
              onPress={this.acceptEdit}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

EditPocketModal.propTypes = {
  closeEditModal: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isModalVisible: getIsModalVisible(state),
});

const mapDispatchToProps = dispatch => ({
  closeEditModal: () => dispatch(closeEditIdPocketModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPocketModal);