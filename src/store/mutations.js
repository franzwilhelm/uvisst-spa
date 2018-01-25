export default {
  SET_NOTES(state, data) {
    state.notes = data;
  },
  ADD_NOTE(state, data) {
    state.notes = [...state.notes, data];
  },
};
