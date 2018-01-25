import axios from 'axios';

const base = 'http://localhost:8081';

export default {
  createNote: data => axios.post(`${base}/notes`, data),
  fetchNotes: () => axios.get(`${base}/notes`),
};
