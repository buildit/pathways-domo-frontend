<template>
  <div>
    <router-link
      to="/tribeverification"
      @click.native="checkToClosePanel"
    >
      Back to List
    </router-link>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {

    name: "TribeVerDetail",
    components: {},
    filters: {},
    props: {

    },
    data() {
      return {};
    },
    computed: {
      ...mapState([
        'userProfile',
        'currentUser',
        'skillGroups',
        'skills',
        'skillLevels',
        'roles'
      ]),
    },

    mounted: function () {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";



</style>
