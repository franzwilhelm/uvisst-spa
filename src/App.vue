<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
.slide-left-enter-active {
  animation: slideLeft 0.2s;
}
.slide-left-leave-active {
  animation: slideLeft 0.2s reverse;
}
@keyframes slideLeft {
  0% {
    transform: translate3d(30px, 0, 0);
  }
  70% {
    transform: translate3d(-5px, 0, 0);
  }
  100% {
    transform: translate3d(0px, 0, 0);
  }
}

.slide-right-enter-active {
  animation: slideRight 0.2s;
}
.slide-right-leave-active {
  animation: slideRight 0.2s reverse;
}
@keyframes slideRight {
  0% {
    transform: translate3d(-30px, 0, 0);
  }
  70% {
    transform: translate3d(5px, 0, 0);
  }
  100% {
    transform: translate3d(0px, 0, 0);
  }
}

.scale-up-enter-active {
  animation: scaleUp 0.2s;
}
.scale-up-leave-active {
  animation: scaleUp 0.2s reverse;
}
@keyframes scaleUp {
  0% {
    transform: scale3D(1, 1, 1);
  }
  50% {
    transform: scale3D(1.2, 1.2, 1.2);
  }
  100% {
    transform: scale3D(1, 1, 1);
  }
}
.scale-down-enter-active {
  animation: scaleDown 0.2s;
}
.scale-down-leave-active {
  animation: scaleDown 0.2s reverse;
}
@keyframes scaleDown {
  0% {
    transform: scale3D(0.9, 0.9, 0.9);
  }
  100% {
    transform: scale3D(1, 1, 1);
  }
}
.jump-enter-active {
  animation: jump 0.2s;
}
.jump-leave-active {
  animation: jump 0.1s reverse;
}
@keyframes jump {
  0% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
