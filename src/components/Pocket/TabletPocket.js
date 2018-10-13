import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import PocketIcon from '../../assets/images/PocketIcon.png';
import Button from '../common/Button';
import strings from '../../localization';
import styles from './styles';

const TabletPocket = ({ id, time, weight }) => (
  <View style={styles.containerTabletPocket}>
    <Image source={PocketIcon} style={styles.pocketImageStyleTablet} />
    <View style={styles.containerItemTablet}>
      <Text style={styles.textBlackTablet}>Id:</Text>
      <Text style={styles.textGrayTablet}>{`#${id}`}</Text>
    </View>
    <View style={styles.containerItemTablet}>
      <Text style={styles.textBlackTablet}>{strings.arrivedAt}</Text>
      <Text style={styles.textGrayTablet}>{`${time}`}</Text>
    </View>
    <View style={styles.containerItemTablet}>
      <Text style={styles.textBlackTablet}>{strings.weight}</Text>
      <Text style={styles.textGrayTablet}>{`${weight} kg`}</Text>
    </View>
    <View style={styles.containerButtonTablet}>
      <Button
        style={weight === 'Unweighted' ? styles.tabletButton : styles.tabletGrayButton}
        title={
          weight === 'Unweighted'
            ? strings.pocketButtonWeightText
            : strings.pocketButtonEditWeightText
        }
        textStyle={styles.tabletButtonText}
      />
    </View>
  </View>
);

TabletPocket.propTypes = {
  id: PropTypes.string,
  time: PropTypes.string,
  weight: PropTypes.string,
};

TabletPocket.defaultProps = {
  id: '',
  time: '',
  weight: 0,
};

export default TabletPocket;