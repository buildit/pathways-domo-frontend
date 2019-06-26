<template>
  <div class="o-mainWrapper__container" v-bind:class="gridLayoutClassBinding">

    <div class="o-mainWrapper__loadingContainer -gridItem">
       <span v-if="isLoadingContainerOpen">
            <LoadingPopover></LoadingPopover>
       </span>

    </div>
    <div class="o-mainWrapper__contentContainer -gridItem" @setGridLayout="setGridLayout">
      <button v-if="!isContainContainerOpen" @click="setGridLayout('')">O</button>
      <router-view v-if="isContainContainerOpen" @setGridLayout="setGridLayout"></router-view>
    </div>
    <div class="o-mainWrapper__sidebarContainer -gridItem">
      <button v-if="!isSidebarContainerOpen" @click="setGridLayout('-sidebarOpen')">O</button>
      <button class="a-closePanel" @click="setGridLayout('')">Close Panel</button>

      <span v-if="isSidebarContainerOpen">
              <button @click="setGridLayout('-sidebarHelpOpen')">Sidebar Help</button>
      </span>

    </div>
    <div class="o-mainWrapper__helpContainer -gridItem">
      <button v-if="!isHelpContainerOpen" @click="setGridLayout('-helpOpen')">O</button>
      <button class="a-closePanel" @click="setGridLayout('')">Close Panel</button>
      
      <span v-if="isHelpContainerOpen">
 <button @click="setGridLayout('-sidebarHelpOpen')">Sidebar Help</button>
      </span>
    </div>

  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import MNavbar from "./components/molecules/m-navbar";
  import OHelpPanel__content from "./components/organisms/o-helpPanel__content";
  import LoadingPopover from "./components/atoms/a-loadingPopover";

  export default {
    components: {LoadingPopover, OHelpPanel__content, MNavbar},
    props: {},
    data() {
      return {
        isLoading: false,
        isNavOpen: true,
        isHelperPanelOpen: false,
        helpPanel_object: {},
        gridLayoutClass: '-loading'
      };
    },
    computed: {
      ...mapState(['currentUser']),
      gridLayoutClassBinding: function () {
        switch (this.gridLayoutClass) {
          case '-loading':
            return {
              '-loading': true
            };
          case '-sidebarOpen':
            return {
              '-sidebarOpen': true
            };
          case '-helpOpen':
            return {
              '-helpOpen': true
            };
          case '-sidebarHelpOpen':
            return {
              '-sidebarHelpOpen': true
            };
          default:
            return {};
        }
      },
      isLoadingContainerOpen: function () {

        return (this.gridLayoutClass === '-loading');
      },
      isContainContainerOpen: function () {
        return !(this.gridLayoutClass === '-loading' || this.gridLayoutClass === '-sidebarHelpOpen');


      },
      isSidebarContainerOpen: function () {
        return this.gridLayoutClass === '-sidebarOpen' || this.gridLayoutClass === '-sidebarHelpOpen';


      },
      isHelpContainerOpen: function () {
        return this.gridLayoutClass === '-helpOpen' || this.gridLayoutClass === '-sidebarHelpOpen';
      }
    },
    created() {

    },
    mounted() {
      this.gridLayoutClass = '';
    },
    methods: {
      setLoadingState(e) {
        this.isLoading = e;
      },
      setNavPanelState(e) {
        this.isNavOpen = e;
        if (this.isNavOpen === true) {
          this.setHelpPanelState(false);
        }
      },
      setHelpPanelState(e) {
        this.isHelperPanelOpen = e;
      },
      setHelpPanelContent(e) {
        this.setHelpPanelState(true);
        this.setNavPanelState(false);
        this.helpPanel_object = e;
      },
      setGridLayout: function (e) {
        this.gridLayoutClass = e;
      }
    }
  };
</script>
<style scoped lang="scss">
  @import "@/styles/main.scss";

  .-gridItem {
    min-height: 100vh;
  }

  .a-closePanel {
    display: none;
  }

  .o-mainWrapper {
    &__container {
      $skinnyColumn: 3rem;

      display: grid;
      grid-template-columns: $skinnyColumn 1fr repeat(2, $skinnyColumn);

      &.-loading {

        grid-template-columns: 1fr repeat(3, $skinnyColumn);
      }

      &.-sidebarOpen {
        grid-template-columns: $skinnyColumn 3fr 2fr $skinnyColumn;
      }

      &.-helpOpen {
        grid-template-columns: $skinnyColumn 3fr $skinnyColumn 2fr;
      }

      &.-sidebarHelpOpen {
        grid-template-columns: repeat(2, $skinnyColumn) 1fr 1fr;
      }
    }

    &__loadingContainer {
      background-attachment: fixed;
      background-image: url('./assets/banter-snaps-wOj5odhDOZ0-unsplash.jpg');
      background-position: center;
      background-size: cover;
      display: grid;
      grid-template-columns: 1fr;
      grid-column-start: 1;
      grid-row-start: 1;

      LoadingPopover {
        align-self: center;
        justify-self: center;
      }
    }

    &__contentContainer {
      background-color: $white;
      grid-column-start: 2;
      grid-row-start: 1;
      height: 300vh;
      padding-top: space(4);
    }

    &__sidebarContainer {
      background-color: colorViz(7);
      grid-column-start: 3;
      grid-row-start: 1;
    }

    &__helpContainer {
      background-color: $black;
      grid-column-start: 4;
      grid-row-start: 1;
    }
  }

  @media (max-width: 576px) {
    .a-closePanel {
      display: block;
    }

    .o-mainWrapper {
      &__container {
        display: block;

        &.-loading {
          .o-mainWrapper {
            &__loadingContainer {
              display: block;
            }

            &__contentContainer,
            &__sidebarContainer,
            &__helpContainer {
              display: none;
            }
          }
        }

        &.-sidebarOpen {
          .o-mainWrapper {
            &__sidebarContainer  {
              display: block;
            }

            &__contentContainer,
            &__helpContainer ,
            &__loadingContainer {
              display: none;
            }
          }
        }

        &.-helpOpen {
          .o-mainWrapper {
            &__helpContainer  {
              display: block;
            }

            &__contentContainer,
            &__sidebarContainer,
            &__loadingContainer {
              display: none;
            }
          }
        }

        &.-sidebarHelpOpen {
          .o-mainWrapper {
            &__helpContainer  {
              display: block;
            }

            &__contentContainer,
            &__sidebarContainer,
            &__loadingContainer {
              display: none;
            }
          }
        }
      }

      &__loadingContainer {
        display: none;
      }

      &__contentContainer {
        display: block;
        position: relative;
      }

      &__sidebarContainer {
        display: none;
        position: relative;
      }

      &__helpContainer {
        display: none;
        position: relative;
      }
    }
  }


</style>
