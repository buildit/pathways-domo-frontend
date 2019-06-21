<template>
  <div class="container">

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
    },
    methods: {

    }
  };
</script>
<style scoped lang="scss">
  @import "@/styles/main.scss";


</style>
