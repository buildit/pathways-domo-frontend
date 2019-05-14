<template>
  <div>
    <h1>Edit Groups</h1>

    <div class="row">
      <ul
        id=""
        class="o-editGroups__cardContainer col-12"
      >
        <li v-for="(group, group_key) in skillGroups">
          <h2>{{ group.name }}</h2>


          <table>
            <tr>
              <td></td>
              <td
                v-for="item in roles"
                class="py-3"
              >
                {{ item.name }}
              </td>
            </tr>

            <tr v-for="skill in group.skills">
              <td class="px-3">
                <h3>{{ skill.name }}</h3>
              </td>

              <td
                v-for="role in roles"
                class="pr-4 py-3"
              >
                <button
                  v-for="level in skillLevels"
                  :id.prop="'button_'+group.sg_id+'_'+skill.s_id+'_'+role.r_id+'_'+level.sl_id"
                  v-bind:class="{'-active': level.level===group['roles'][role.r_id]['skills'][skill.s_id]['level']}"
                  @click="setSkill(level, group_key, skill, role)"
                >
                  {{ level.level }}
                </button>
                <!--:className.prop="'button_'+group.sg_id+'_'+skill.s_id+'_'+role.r_id"-->
              </td>
            </tr>
          </table>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  const fb = require('../services/firebaseConfig.js');

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
    },
    methods: {
      setSkill(level, group_key, skill, role) {
        let targetSkill = {};

        targetSkill[role.r_id] = {
          role_name: role.name,
          r_id: role.r_id,
          skills: {}

        };

        targetSkill[role.r_id].skills[skill.s_id] = {
          s_id: skill.s_id,
          skill_name: skill.name,
          level: level.level,
          sl_id: level.sl_id,
          level_name: level.name
        };

        // console.log(group_key)


        fb.skillGroupsCollection.doc(group_key).set({
          roles: targetSkill
        }, {
          merge: true
        }).then(ref => {

        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>


<style scoped lang="scss">
  @import "@/styles/main.scss";

  h1 {
    margin-bottom: space(4);
  }

  button {
    @include deepShadow(8, colorViz(7), 30%);
    border: 0;
    border-radius: 0;
    cursor: pointer;
    flex-grow: 1;
    font-weight: bold;
    padding: space(1) space(2);
    position: relative;

    @for $i from 0 through 5 {
      &:nth-child(#{$i}) {
        z-index: #{$i};
      }
    }


    &.-targetLevel {
      @include deepShadow(8, colorViz(4), 10%);
      border-radius: 0;
    }

    &.-active {
      @include deepShadow(8, colorViz(5), 15%);
      border-radius: 0;
      transition: box-shadow 100ms;


      &:active {
        @include buttonshadowActive(colorViz(3), 15%);
      }

    }

    &:active {
      @include buttonshadowActive($light, 15%);
    }

    &:hover {
      @include deepShadow(8, $primary, 15%);
      border-radius: 0;
    }


    &:first-child {
    border-radius:    $border-radius 0 0  $border-radius;

      &:hover {
      border-radius:    $border-radius 0 0  $border-radius;
      }
    }

    &:last-child {
    border-radius:   0  $border-radius  $border-radius 0;

      &:hover {
      border-radius:   0  $border-radius  $border-radius 0;
      }
    }
  }

  .o-editGroups {
    &__cardContainer {
      list-style: none;
      overflow: auto;


      @each $key, $color in $colorVisualization {
        li:nth-child(#{$key}n) {
          @include deepShadow(16, $color, 10%);
          margin-bottom: space(4);
          padding: space(4);
        }


      }
    }
  }

  table {
    width: 100%;
    tr {
      td:nth-child(n+1){
        min-width: 10rem;
      }
    }
    tr:nth-child(even) {
      background-color: rgba($white, 50%);
    }
    tr:nth-child(odd) {
      background-color: rgba($dark, 20%);
    }
    tr:first-child {
      background-color: transparent;
    }

  }
</style>
