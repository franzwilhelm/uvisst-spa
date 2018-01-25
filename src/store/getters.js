import moment from 'moment';

export default {
  notes(state) {
    return state.notes;
  },
  days(state) {
    const days = [];
    const n = JSON.parse(JSON.stringify(state.notes));
    if (!n.length) return days;

    let idx = -1;
    let cMoment = moment('2000-01-01');

    for (let i = 0; i < n.length; i += 1) {
      const c = n[i];
      const createdAt = moment(c.createdAt);

      // eslint-disable-next-line
      if (createdAt.isSame(moment(), 'day')) continue;
      if (createdAt.isSame(cMoment, 'day')) {
        days[idx].notes.push(c);
      } else {
        cMoment = createdAt;
        idx += 1;
        days.push({ day: cMoment, notes: [c] });
      }
    }
    days.forEach(({ notes }) => notes.sort((a, b) => a.id - b.id));
    return days;
  },
  today(state) {
    return state.notes
      .filter(n => moment(n.createdAt).isSame(moment(), 'day'))
      .sort((a, b) => a.id - b.id);
  },
};
