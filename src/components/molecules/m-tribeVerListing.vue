<template>
  <div>
    <div class="-error">
      None of this is in the data store. All randomly generated per load.
    </div>

    <div class="m-weightDisplay__description col-12">
      <h1>Experimental Weighting System</h1>
      <p>This is a thought experiment to blend colleague input with self-assessment. This scenario assumes input from the relevant tribe, people who worked on projects with you in that capacity, and your self-assessment. The sidebar alludes to possible input by the direct manager, and connection of this to the Wipro banding system. </p>
    </div>

    <div class="m-weightDisplay d-flex justify-content-end">
      <div class="m-weightDisplay__tableWrapper">
        <table class="">
          <tr class="">
            <td><label for="m-verifyWeight__tribe">Tribe</label></td>
            <td><label for="m-verifyWeight__peers">Peers</label></td>
            <td><label for="m-verifyWeight__self">Self</label></td>
          </tr>

          <tr class="">
            <td>
              <input
                id="m-verifyWeight__tribe"
                v-model="weight.tribe"
                type="text"
              >
            </td>
            <td>
              <input
                id="m-verifyWeight__peers"
                v-model="weight.peers"
                type="text"
              >
            </td>
            <td>
              <input
                id="m-verifyWeight__self"
                v-model="weight.self"
                type="text"
              >
            </td>
          </tr>
        </table>
      </div>
    </div>


    <template v-for="(role,key) in userProfile.roles">
      <table
        v-if="role.level > 0"
        class="m-verifyTable col-12"
      >
        <tr class="m-verifyTable__rowSkillGroup m-verifyTable__row">
          <td>
            <h2> {{ role.group_name }}</h2>
          </td>

          <td v-for="score in generateDummyNumbers(role.level).baseValues">
            <div class="styleWrapper">
              {{ score }}
            </div>
          </td>
        </tr>


        <tr class="m-verifyTable__row -rowlabel">
          <td></td>
          <td>Tribe</td>
          <td>Peers</td>
          <td>Self</td>
          <td>Calculated</td>
        </tr>


        <template v-for="skill in skillsByGroup[key]">
          <tr
            v-if="skill.level > 0"
            class="m-verifyTable__rowSkill m-verifyTable__row"
          >
            <td>
              <h4> {{ skill.skill_name }}</h4>
            </td>

            <td v-for="score in generateDummyNumbers(skill.level).baseValues">
              <div class="styleWrapper">
                {{ score }}
              </div>
            </td>
          </tr>
        </template>

        <tr class="m-verifyTable__row -rowlabel">
          <td></td>
          <td>Tribe</td>
          <td>Peers</td>
          <td>Self</td>
          <td>Calculated</td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {

    name: "TribeVerListing",
    components: {},
    filters: {},
    props: {},
    data() {
      return {
        weight: {
          tribe: 60,
          peers: 10,
          self: 30
        }
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
      ]),
      skillsByGroup: function () {
        let obj = {};
        for (let item in this.userProfile.skills) {

          if (typeof obj[this.userProfile.skills[item]['sg_id']] === "undefined") {
            obj[this.userProfile.skills[item]['sg_id']] = {};
          }

          obj[this.userProfile.skills[item]['sg_id']][item] = this.userProfile.skills[item];
        }


        return obj;
      }
    },

    created: function () {
      this.$emit('setLoadingState', true);
    },
    mounted: function () {
      this.$emit('setLoadingState', false);
    },
    methods: {
      generateDummyNumbers: function (val = 0) {
        const judges = Object.keys(this.weight);
        const judgeCount = judges.length;

        let outcome = {
          baseValues: {
            tribe: Math.floor(Math.random() * 6),
            peers: Math.floor(Math.random() * 6),
            self: val,
            computed: 0
          },
          raw: 0,
          weighted: 0,
          rounded: {
            raw: 0,
            weighted: 0,
          }
        };


        let counter = 0;
        let weightedScore = 0;

        for (let judge in judges) {
          const key = judges[judge];


          counter += outcome.baseValues[key];

          weightedScore += outcome.baseValues[key] * this.weight[key] / 100;
        }

        outcome.raw = counter / judgeCount;

        outcome.weighted = weightedScore;

        outcome.rounded.raw = Math.round(outcome.raw);
        outcome.rounded.weighted = Math.round(outcome.weighted);
        outcome.baseValues.computed = Math.round(outcome.weighted);

        return outcome;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";


  .-error {
    @include deepShadow(16, colorViz(3), 20%);
    padding: space(4);
    margin-bottom: space(6);
  }

  .m-weightDisplay {

    border-radius: $border-radius;
    margin-bottom: space(4);
    position: sticky;
    position: -webkit-sticky;
    top: 2rem;
    width: 100%;
    z-index: $zindex-tooltip;

    &__description {

      margin-bottom: space(3);
      padding: space(3) space(4);
    }

    &__tableWrapper {
      text-align: center;

      margin: 0 2.5rem 0 0;
      width: 20rem;
    }


    table {
      @include deepShadow(8, colorViz(7), 20%);
      margin: 0 auto;


      tr {
        td {
          label {
            margin: space(2) 0 space(1);
          }

          input {
            border-radius: $border-radius ;
            box-shadow: none;
            height: space(3) * 2;
            margin: space(1) auto space(2);
            width: space(3) * 2;

          }

          &:first-child {
            padding: space(1) space(4);
          }
        }

        td:nth-child(1),
        td:nth-child(2),
        td:nth-child(3) {
          width: 3.5rem;
        }




      }
    }
  }

  .m-verifyTable {
    @each $key, $color in $colorVisualization {
      &:nth-child(#{$key}n) {
        @include deepShadow(16, $color, 20%);
        margin-bottom: space(4);

        .m-verifyTable__rowSkillGroup {
          background-color: lighten($color, 20%);
        }

        .m-verifyTable__rowSkillGroup {
          td {
            background-color: lighten($color, 10%);
          }

          td:first-child {
            border-radius: $border-radius * 2 0 0 0;
          }

          td:last-child {
            border-radius: 0 $border-radius * 2 0 0;
          }

        }

      }
    }

    &__row {

      th:first-child,
      td:first-child {
        padding: space(1) space(4);
      }

      th:nth-child(n+2),
      td:nth-child(n+2) {
        text-align: center;
      }
    }

    &__rowSkillGroup,
    &__rowSkill {
      td:nth-child(n+2) {
        text-align: center;

        .styleWrapper {
          background-color: rgba($white, 0.75);
          border-radius: $border-radius ;
          height: space(3) * 2;
          margin: space(2) auto;
          padding-top: space(1);
          width: space(3) * 2;
        }

      }

      td:nth-child(5) {
        .styleWrapper {
          background-color: $white;
          border-radius: $border-radius * 2;

        }

      }

    }

    &__rowSkillGroup {
      td {
        padding: space(3) 0;

      }
    }




  }

  .-rowlabel * {
    padding: space(3) 0 ;
  }


</style>
