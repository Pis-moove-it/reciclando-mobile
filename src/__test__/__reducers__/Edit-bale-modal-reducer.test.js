import editBaleModalReducer, { initialState } from '../../reducers/EditBaleModalReducer';
import { actionTypes } from '../../actions/EditBaleModalActions';

describe('edit bale modal reducer', () => {
  it('should return the same state', () => {
    expect(editBaleModalReducer(initialState, { users: [], type: 'not_an_action' })).toEqual(initialState);
  });

  it('should a state with isVisible in false', () => {
    expect(editBaleModalReducer(initialState, {type: actionTypes.CLOSE_EDIT_BALE_MODAL, isVisible: false })).toEqual({
      editBaleModalIsOpen: false,
    });
  });

  it('should a state with isVisible in true', () => {
    expect(editBaleModalReducer(initialState, {type: actionTypes.OPEN_EDIT_BALE_MODAL, isVisible: true })).toEqual({
      editBaleModalIsOpen: true,
    });
  });
});