<template lang="html">
  <div style="margin-bottom:10px">
    <h3>Hvordan føler du deg?</h3>
    <button v-for="(emoji, i) in emojis" class="button button--small" :class="active(i) ? 'button--positive' : ''" :value="emoji" @click="updateEmoji(i)"><i class="em" :class="emoji"/></button>
  </div>
</div>

</template>

<script>
export default {
  name: 'emoji-picker',
  props: {
    emoji: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      activeIndex: -1,
      emojis: [
        'em---1',
        'em--1',
        'em-anguished',
        'em-angry',
        'em-blush',
        'em-confused',
        'em-sunglasses',
        'em-sweat_smile',
      ],
    };
  },
  methods: {
    active(i) {
      return this.activeIndex === i;
    },
    updateEmoji(i) {
      this.activeIndex = i;
      this.$emit('emojiUpdate', this.emojis[i]);
    },
  },
};
</script>
