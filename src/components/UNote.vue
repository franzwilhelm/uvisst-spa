<template lang="html">
  <div class="left">
    <h2>{{ date }}</h2>
    <p>{{ text }}</p>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'u-note',
  props: {
    note: {
      required: true,
      type: Object,
    },
  },
  computed: {
    date() {
      return moment(this.note.createdAt).format('lll');
    },
    text() {
      return this.note.data;
    },
  },
};
</script>

<style scoped>
* {
  text-align: left;
}
</style>
