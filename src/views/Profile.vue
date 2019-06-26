<template>
  <div>
    <div class="o-profile__assessment"></div>
    <div class="o-profile__sidebar"></div>
    <div class="o-profile__help"></div>

  </div>
</template>
<script>

  import { mapState } from "vuex";
  import store from '../store';

  const currentUser = function () {
    return store.state.currentUser;
  };
  export default {
    components: {},
    data() {
      return {};
    },
    computed: {
      ...mapState([
        'currentUser',

      ]),
    },
    created: function () {
      this.$emit('setLoadingState', true);
    },
    mounted: function () {
      this.$emit('setLoadingState', false);
      this.$emit('setNavPanelState', false);
    },
    methods: {

    }
  };
</script>
<style scoped lang="scss">
  @import "@/styles/main.scss";

  .o-profile {
    &__assessment {
      background-color: colorViz(6);
      background-image: url('../assets/sand_texture.png');
      background-repeat: repeat;
      height: 200vh;
      width: 200vw;
    }

    &__sidebar {
      background-color: colorViz(6);
      background-image: url('../assets/sand_texture_light.png');
      background-repeat: repeat;
      height: 200vh;
      width: 200vw;
    }

    &__help {

    }
  }
</style>
