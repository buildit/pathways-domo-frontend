<template>
  <div class="container">
    <div class="row">
      <div class="col-12">

      </div>
      <div class="linkSection__wrapper col-12 col-md-6">
        <div class="linkSection">
          <h2>
            <router-link to="/user/skills">
              Profile
            </router-link>
          </h2>
          <p>
            You can modify your current skills levels, and see your tribe and level based on your skills </p>
        </div>
      </div>
      <div class="linkSection__wrapper col-12 col-md-6">
        <div class="linkSection">
          <h2>
            <router-link to="/user/goals">
              Set Goals
            </router-link>
          </h2>
          <p>
            Selecting certain skills to improve in. It's reflected in gold on your Profile page </p>
        </div>
      </div>
      <div class="linkSection__wrapper col-12 col-md-6">
        <div class="linkSection">
          <h2>
            <router-link to="/user/tribeverification">
              Tribe Verification
            </router-link>
          </h2>
          <h4>Doesn't touch the data store. All random numbers.</h4>
          <p>
            A look at a weighted system for enforcing skill and role levels. </p>
        </div>
      </div>
      <div class="linkSection__wrapper col-12 col-md-6">
        <div class="linkSection">
          <h2>
            <router-link to="skillsbreakdown">
              Expertise Lookup
            </router-link>
          </h2>
          <h4>All the Skill Levels and Roles are populated with dummy data</h4>
          <p>
            A company-wide search for skills and roles </p>
        </div>
      </div>
      <div class="linkSection__wrapper col-12 col-md-6">
        <div class="linkSection">
          <h2>
            <!-- <router-link v-if="currentUser.uid === 'pl1uHimMZ3YnSzqe5ExgCcLuo1J2'" to="editgroups">
              Edit Role Level Requirements
            </router-link>-->
            <span>Edit Role Level Requirements</span>
          </h2>
          <!--<h4 v-if="currentUser.uid !== 'pl1uHimMZ3YnSzqe5ExgCcLuo1J2'">
            Access Locked
          </h4>-->
          <p>
            Setting the required skill levels to achieve each role level per tribe. This is a company-wide
            configuations </p>
        </div>
      </div>
      <div class="linkSection__wrapper col-12 col-md-6">
        <div class="linkSection">
          <h2>
            <router-link to="bench">
              Bench Status
            </router-link>
          </h2>
          <p>
            Pulling from DOMO, looks for people with no booked hours. </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BenchWidget from "../components/molecules/m-benchWidget";
  import { mapState } from "vuex";
  import store from '../store';


  export default {
    components: {BenchWidget},
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

  .linkSection__wrapper {
    @each $key, $color in $colorVisualization {
      &:nth-child(#{$key}n) {
        .linkSection {
          @include deepShadow(16, $color, 20%);
          margin-bottom: space(4);
          padding: space(4);

        }


      }
    }
  }
</style>
