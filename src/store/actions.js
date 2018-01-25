import API from '@/api';

export default {
  async createNote({ commit }, data) {
    const response = await API.createNote({ data });
    commit('ADD_NOTE', response.data[0]);
  },
  async fetchNotes({ commit }) {
    const response = await API.fetchNotes();
    commit('SET_NOTES', response.data[0]);
  },
  // deleteNote({ commit }) {},
};
