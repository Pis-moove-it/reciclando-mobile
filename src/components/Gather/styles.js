import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';
import icon from '../../assets/images/MapPointIcon.png';

const stylesGather = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
  },
  overlayTimeText: {
    color: Colors.white,
    fontSize: 70,
  },
  overlayDayText: {
    color: Colors.white,
    fontSize: 20,
  },
  button: {
    justifyContent: 'center',
    height: 50,
  },
  textButton: {
    paddingLeft: 5,
    fontSize: 22,
    fontWeight: '700',
  },
  activityIndicator: {
    margin: '2%',
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
  trashIcon: {
    width: 70,
    height: 70,
  },
  optionMenu: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    height: 300,
    width: 400,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitleContainer: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  modalTitle: {
    fontSize: 30,
    color: Colors.primary,
  },
  buttonModal: {
    height: 50,
    width: 200,
    backgroundColor: Colors.primary,
    alignSelf: 'stretch',
    borderColor: Colors.primary,
    borderWidth: 1,
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
  },
});

export default stylesGather;
