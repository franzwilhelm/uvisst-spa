<template>
  <div class="content">
    <h1>Uvisst</h1>

    <button v-if="!newInProgress" class="button" type="button" name="button" @click="newInProgress=true">Nytt notat</button>
    <div v-else>
      <textarea v-model="data" name="name" rows="10" cols="80" placeholder="Skriv noe du ikke vil skal være uvisst i fremtiden"></textarea>
      <div>
        <button class="button button--positive" type="button" name="button" @click="createNote(data);clear()">Lagre</button>
        <button class="button button--negative" type="button" name="button" @click="clear()">Forkast</button>
      </div>
    </div>

    <div v-if="notes">
      <u-note v-for="note in notes" :note="note" :key="note.id"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UNote from './UNote';

export default {
  name: 'HelloWorld',
  components: { UNote },
  data() {
    return {
      newInProgress: false,
      data: '',
    };
  },
  mounted() {
    this.fetchNotes();
  },
  computed: {
    ...mapGetters(['notes']),
  },
  methods: {
    ...mapActions(['createNote', 'deleteNote', 'fetchNotes']),
    clear() {
      this.newInProgress = false;
      this.data = '';
    },
  },
};
</script>

<style media="screen">
* {
  font-family: 'Montserrat', sans-serif;
}
textarea {
  width: 600px;
  height: 120px;
  border: 3px solid #cccccc;
  padding: 5px;
  font-family: Tahoma, sans-serif;
  background: #fff;
  resize: none;
}

.content {
  padding: 10% 35% 0% 35%;
}

.button {
  padding: 10px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 700;
  font-size: 15px;
  text-shadow: none;
  background: none;
  border: 1px solid rgb(166, 194, 204);
  cursor: pointer;
  border-radius: 3px;
}

.button:hover {
  color: #315cfd;
  transform: translateY(-2px);
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
}

.button--negative:hover {
  color: red;
}

.button--positive:hover {
  color: #00d672;
}

.center {
  align-content: center;
  margin: 0;
  text-align: center;
}

textarea {
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
}

body {
  margin: auto;
  background-color: rgb(235, 241, 247);
}
</style>
