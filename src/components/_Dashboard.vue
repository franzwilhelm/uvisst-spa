<template>
  <div class="content">
    <h1>Uvisst</h1>

    <div>
      <h2>{{ now }}</h2>
      <p v-if="display">{{display.data}}</p>
      <transition-group name="jump">
        <button v-for="note in today" @click="show(note)" class="button button--small" type="button" name="button" :key="note.createdAt">{{ clock(note.createdAt) }}</button>
        <button class="button button--small" :class="addClass" type="button" name="button" @click="toggleEdit()" key="+">{{ newInProgress ? (now.substring(0,5)) : '+' }}</button>
      </transition-group>
      <transition name="scale-down" mode="out-in">
        <div v-if="newInProgress">
          <textarea v-model="data" name="name" placeholder="Skriv noe du ikke vil skal være uvisst i fremtiden"></textarea>
          <div>
            <button class="button button--positive" type="button" name="button" @click="createNote(data);clear()">Lagre</button>
            <button class="button button--negative" type="button" name="button" @click="clear()">Forkast</button>
          </div>
        </div>
      </transition>
    </div>
    <div v-for="day in days">
      <h2>{{ date(day.day) }}</h2>
      <transition-group name="jump">
        <button class="button button--small" v-for="note in day.notes" type="button" name="button" :key="note.createdAt" @click="show(day.notes)">{{ clock(note.createdAt) }}</button>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import UNote from './UNote';

export default {
  name: 'HelloWorld',
  components: { UNote },
  data() {
    return {
      newInProgress: false,
      display: null,
      data: '',
      now: 'uvisst',
    };
  },
  mounted() {
    this.fetchNotes();
    this.now = moment().format('HH:mm:ss');
    setInterval(() => {
      this.now = moment().format('HH:mm:ss');
    }, 1000);
  },
  computed: {
    ...mapGetters(['notes', 'today', 'days']),
    addClass() {
      return this.newInProgress ? 'button--remove' : 'button--add';
    },
  },
  methods: {
    ...mapActions(['createNote', 'deleteNote', 'fetchNotes']),
    clear() {
      this.newInProgress = false;
      this.data = '';
    },
    show(note) {
      this.display = note;
    },
    toggleEdit() {
      if (this.newInProgress) {
        this.clear();
      } else {
        this.newInProgress = true;
      }
    },
    clock(time) {
      return moment(time).format('HH:mm');
    },
    date(day) {
      return moment(day)
        .calendar()
        .split(' ')
        .slice(0, 2)
        .reduce((a, b) => `${a} ${b}`);
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
  background: #4d6af9;
  color: white;
  border: 1px solid rgb(166, 194, 204);
  cursor: pointer;
  border-radius: 3px;
}
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
}
.button--negative {
  background-color: #ff6d56;
}
.button--positive {
  background-color: #00d672;
}
.button--small {
  color: black;
  margin: 6px 6px 0px 0px;
  width: 60px;
  padding: 6px;
  background: none;
}
.button--add {
  color: rgba(0, 0, 0, 0.5);
}
.button--add:hover {
  border-color: #00d672;
  color: #00d672;
}
.button--remove {
  color: rgba(0, 0, 0, 0.5);
}
.button--remove:hover {
  border-color: #ff6d56;
}

textarea {
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  padding: 5px;
  margin-top: 12px;
  margin-bottom: 12px;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  margin: auto;
  background-color: rgb(235, 241, 247);
}
</style>
