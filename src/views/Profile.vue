<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Profile</h1>

        <button @click.prevent="setGridLayout('')">Default</button>
        <button @click.prevent="setGridLayout('-loading')">Loading</button>
        <button @click.prevent="setGridLayout('-sidebarOpen')">Sidebar</button>
        <button @click.prevent="setGridLayout('-helpOpen')">Help</button>
        <button @click.prevent="setGridLayout('-sidebarHelpOpen')">Sidebar Help</button>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';

  // const fb = require('../services/firebaseConfig.js');

  export default {
    components: {},
    filters: {},
    data() {
      return {
        selected: []
      };
    },
    computed: {
      ...mapState([
        'userProfile',
        'currentUser',
        'skillGroups',
        'skills',
        'skillLevels',
        'roles'
      ])
    },
    created: function () {
      this.$emit('setLoadingState', true);
    },
    mounted: function () {
      this.$emit('setLoadingState', false);
      this.$emit('setNavPanelState', false);
    },
    methods: {
      setGridLayout: function (index) {
        this.$emit('setGridLayout', index);
      }
    }
  };
</script>


<style scoped lang="scss">
  @import "@/styles/main.scss";

  .-gridItem {

    height: 100vh;
  }
 .o-profile {
   &__container {
     display: grid;
     grid-template-columns: repeat(4, 1fr);
   }

   &__loadingContainer {
     background-color: red;
     grid-column-start: 1;
     grid-row-start: 1;
   }

   &__contentContainer {
     background-color: orange;
     grid-column-start: 2;
     grid-row-start: 1;
   }

   &__sidebarContainer {
     background-color: green;
     grid-column-start: 3;
     grid-row-start: 1;
   }

   &__helpContainer {
     background-color: blue;
     grid-column-start: 4;
     grid-row-start: 1;
   }
 }
</style>
