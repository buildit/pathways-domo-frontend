<template>
  <div class="m-userDetail__skillsContainer pb-4 col-12">
    <template v-for="(group, group_key) in skillGroups">
      <div
        :id.prop="'sg_'+group.name"
        class="m-userDetail__skillGroup mb-6 p-4"
      >
        <div class="d-flex justify-content-between">
          <h2>{{ group.name }}</h2>

          <a-help-button
            v-bind:id="group_key"
            v-bind:type="'group'"
            @setHelpPanelContent="setHelpPanelContent"
          >
          </a-help-button>
        </div>
        <ul class="m-userDetail__roleStrip my-0 mb-4 p-0">
          <li v-if="userProfile.roles[group_key]">
            <b>Current Level:</b> {{ userProfile.roles[group_key].level_name }}
          </li>
          <li v-if="nextRoleLevels[group_key]">
            <b>Up Next:</b> {{ nextRoleLevels[group_key]['role_name'] }} ({{
              Math.round(nextRoleLevels[group_key]['progressCompleted'] * 100) }}% Completed)
          </li>
        </ul>

        <ul class="m-userDetail__skillList m-0 p-0 d-flex flex-wrap">
          <template v-for="skill in group.skills">
            <li

              class="col-6  d-flex px-2 mb-2"
            >
              <div
                class="m-userDetail__skillListContent p-4 m-1 flex-grow-1 "
                :class="{'-isRequired': skill.required}"
              >
                <div class="d-flex justify-content-between flex-grow-0">
                  <p class="-requiredSkill">
                    {{ skill.name }}
                  </p>

                  <a-help-button
                    v-bind:id="skill.s_id"
                    v-bind:type="'skill'"
                    @setHelpPanelContent="setHelpPanelContent"
                  >
                  </a-help-button>
                </div>


                <o-skill-level__panel
                  v-bind:group="group"
                  v-bind:group_key="group_key"
                  v-bind:skill="skill"
                  v-bind:skill_key="skill.s_id"
                >
                </o-skill-level__panel>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import OSkillLevel__panel from "./o-skillLevel__panel";
  import AHelpButton from "../atoms/a-helpButton";

  export default {

    name: "o-skillGroups",
    components: {AHelpButton, OSkillLevel__panel},
    filters: {
      truncateString(val, truncateLength) {
        if (val.length < truncateLength) {
          return val;
        }
        return `${val.substring(0, truncateLength).trim()}…`;
      }

    },
    props: {
      nextRoleLevels: Object
    },
    data() {
      return {
        highlightStates: {}
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


    mounted: function () {

    },
    methods: {
      setHelpPanelContent(e) {
        this.$emit('setHelpPanelContent', e);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";


  @each $key, $color in $colorVisualization {
    .m-userDetail__skillGroup:nth-child(#{$key}) {
      @include deepShadow(16, $color, 20%);
    }
  }

  .m-userDetail {
    &__roleStrip {
      list-style: none;

      li {
        display: inline-block;
        padding-right: space(4);;
      }
    }

    &__skillList {
      list-style: none;

      li {

        display: block;

        .m-userDetail {
          &__skillListContent {
            border-radius: 0.25rem;
            width: 200px;
            @include deepShadow(6, colorViz(7), 30%);

            &.-isRequired {
              @include deepShadow(6, $primary, 30%);

              p {
                font-weight: bold;
              }
            }

            p {
              min-height: 5rem;
              margin-bottom: space(4);
            }
          }


          &__skillListMetadata {
            span {
              background-color: $success;
              border-radius: 1rem;
              color: $white;
              font-weight: bold;
              height: 2rem;
              line-height: 2rem;
              text-align: center;
              width: 2rem;

              &.-required {
                background-color: $medium;

                font-size: 3rem;
                line-height: 2.5rem;
                padding-top: space(1);
              }

              &.-level0 {
                background-color: rgba($dark, 0.25);
              }

              &.-level1 {
                background-color: rgba($dark, 0.5);
              }

              &.-level2 {
                background-color: rgba($dark, 0.75);
              }

              &.-level3 {
                background-color: rgba($dark, 1);
              }

              &.-level4 {
                background-color: $success;
              }


            }


          }
        }
      }
    }


  }
</style>
