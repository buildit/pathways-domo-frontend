<template>
  <div class="">
    <span class=""></span>
    <span class=""></span>
    <span class=""></span>
    <span class=""></span>
  </div>
</template>

<script>
  export default {
    name: "LoadingPopover",
    props: {
      id: String,
      type: String
    },
    methods: {
      setHelpPanelContent() {
        this.$emit('setHelpPanelContent', {id: this.id, type: this.type});
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";

  div {
    background-color: rgba($black, 0.5);
    height: 100vh;
    left: 0;
    position: fixed;
    width: 100vw;
    top: 0;
    text-align: center;
    z-index: $zindex-popover;

    span {

      animation: LinearGradientAnimate 1s linear infinite;
      background: linear-gradient(180deg, colorViz(2), colorViz(5), colorViz(4), colorViz(1));
      background-size: 400% 400%;
      border-radius: 4rem;
      display: block;
      height: 15vh;
      margin: 0 auto;
      opacity: 0.25;
      position: absolute;
      left: 42.5vw;
      top: 42.5vh;
      width: 15vw;

      &:first-child {
        animation: LinearGradientAnimate 2s linear infinite;
      }

      &:nth-child(2) {
        animation: LinearGradientAnimate 1.5s linear  infinite;
      }
      &:nth-child(3) {
        animation: LinearGradientAnimate 2.15s linear  infinite;
      }
    }
  }


  @-webkit-keyframes LinearGradientAnimate {
    0% {
      background-position: 0% 50%;
      transform: rotate(0deg);
    }
    50% {
      background-position: 100% 50%;
      transform: rotate(180deg);
    }
    100% {
      background-position: 0% 50%;
      transform: rotate(360deg);
    }
  }

  @-moz-keyframes LinearGradientAnimate {
    0% {
      background-position: 0% 50%;
      transform: rotate(0deg);
    }
    50% {
      background-position: 100% 50%;
      transform: rotate(180deg);
    }
    100% {
      background-position: 0% 50%;
      transform: rotate(360deg);
    }
  }

  @keyframes LinearGradientAnimate {
    0% {
      background-position: 0% 50%;
      transform: rotate(0deg);
    }
    50% {
      background-position: 100% 50%;
      transform: rotate(180deg);
    }
    100% {
      background-position: 0% 50%;
      transform: rotate(360deg);
    }
  }

</style>
