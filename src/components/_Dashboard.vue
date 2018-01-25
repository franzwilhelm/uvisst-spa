<template>

  <div class="wrapper">
    <div class="content">
      <h1>Uvisst</h1>
      <h2>{{ now }}</h2>
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
      <div class="box" v-if="display"> {{display.data}} </div>
      <div v-for="day in days">
        <h2>{{ date(day.day) }}</h2>
        <transition-group name="jump">
          <button class="button button--small" v-for="note in day.notes" type="button" name="button" :key="note.createdAt" @click="show(day.notes)">{{ clock(note.createdAt) }}</button>
        </transition-group>
      </div>
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

<style media="screen" lang="scss">
$color-negative: #ff6d56;
$color-positive: #00d7d2;
$color-gray: #c8c8c8;
$color-white: #fff;
$color-background: rgb(235, 241, 247);
$color-dark: #231a3d;
$color-main: #1633ff;

* {
  font-family: 'Montserrat', sans-serif;
  color: $color-main;
}
body {
  background: linear-gradient(90deg, $color-main, #282e67);
}
textarea {
  height: 120px;
  padding: 5px;
  border: 1px solid $color-gray;
  background: $color-white;
  font-size: 16px;
  resize: none;
  margin-top: 12px;
  margin-bottom: 12px;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.wrapper {
  padding: 0% 35% 0% 35%;
}
::-webkit-scrollbar {
  width: 0px; /* remove scrollbar space */
  background: transparent; /* optional: just make scrollbar invisible */
}
.content {
  height: 50%;
  margin: auto;
  position: absolute;
  overflow-x: hidden;
  top: 0;
  bottom: 0;
  left: 25%;
  right: 25%;
  padding: 5%;
  border-radius: 10px;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1);
  background: $color-white;
}

.button {
  padding: 10px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 700;
  font-size: 15px;
  text-shadow: none;
  border: 1px solid $color-gray;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  }
  &--negative {
    color: $color-negative;
    border-color: $color-negative;
    background: none;
  }
  &--positive {
    color: $color-positive;
    border-color: $color-positive;
    background: none;
  }
  &--small {
    color: $color-dark;
    margin: 6px 6px 0px 0px;
    width: 60px;
    height: 35px;
    padding: 6px;
    background: none;
  }
  &--add {
    color: rgba(0, 0, 0, 0.5);
    &:hover {
      border-color: $color-positive;
      color: $color-positive;
    }
  }
  &--remove {
    color: rgba(0, 0, 0, 0.5);
    &:hover {
      border-color: $color-negative;
    }
  }
}
.box {
  background-color: $color-white;
  border: 1px solid $color-gray;
  border-radius: 5px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
}
</style>
