export default {
  notes(state) {
    return state.notes.sort((a, b) => a.id < b.id);
  },
};
