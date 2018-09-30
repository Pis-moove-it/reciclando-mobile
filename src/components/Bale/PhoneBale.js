import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import FardoIcon from '../../assets/images/FardoIcon.png';
import Button from '../common/Button';
import strings from '../../localization';
import styles from './styles';

const PhoneBale = ({ id }) => (
  <ListItem
    containerStyle={styles.baleContainer}
    key={id}
    title={`${strings.bale} #${id}`}
    leftIcon={<Image source={FardoIcon} style={styles.baleImageStyle} />}
    rightIcon={
      <Button
        title={strings.baleButtonText}
        style={styles.editBaleButton}
        textStyle={styles.textButton}
      />
    }
  />
);

PhoneBale.propTypes = {
  id: PropTypes.string,
};

PhoneBale.defaultProps = {
  id: '',
};

export default PhoneBale;