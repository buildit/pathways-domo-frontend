<template>
    <div class="m-userDetail__skillGroups container">
        <div class="row">
            <div class="col-12">
                <h1>Self-Assessment</h1>
            </div>
            <o-skill-groups @setHelpPanelContent="setHelpPanelContent" v-bind:nextRoleLevels="nextRoleLevels"></o-skill-groups>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import OSkillLevel__panel from "../organisms/o-skillLevel__panel";
    import OSkillGroups from "../organisms/o-skillGroups";
    import OUserRoleBreakdown from "../organisms/o-userRoleBreakdown";
    import OHelpPanel__content from "../organisms/o-helpPanel__content";
    import MUserRoleCompletion from "../molecules/m-userRoleCompletion";
    import OEditSkills from "../organisms/o-editSkills";

    const fb = require('../../services/firebaseConfig.js');

    export default {
        name: "o-editSkills",
        components: {
            OEditSkills,
            MUserRoleCompletion,
            OHelpPanel__content,
            OUserRoleBreakdown,
            OSkillGroups,
            OSkillLevel__panel
        },
        filters: {},
        props: {
            nextRoleLevels: Object
        },
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
                'roles',
                'userRoles'
            ])
        },
        created: function () {
            this.$emit('setLoadingState', true);
        },
        mounted: function () {
            this.$emit('setLoadingState', false);
        },
        methods: {
            setSkill(level, group_key, skill) {
                let currentUserProfile = this.userProfile;

                console.log(currentUserProfile['skills'][skill.s_id]);


                if (!currentUserProfile['skills'][skill.s_id]) {
                    currentUserProfile['skills'][skill.s_id] = {
                        group_name: this.skillGroups[group_key]['name'],
                        level: 0,
                        level_name: this.skillLevels[0]['name'],
                        s_id: skill.s_id,
                        skill_name: skill.name,
                        sl_id: this.skillLevels[0]['sl_id']
                    };
                }

                currentUserProfile['skills'][skill.s_id]['level_goal'] = level;


                // console.log(group_key)

                // user / user id / goals / skill id / level + level id + skill name

                console.log(currentUserProfile['skills'][skill.s_id]);

                fb.usersCollection.doc(this.currentUser.uid).update({
                    skills: currentUserProfile['skills']
                }).then(ref => {

                }).catch(err => {
                    console.log(err);
                });
            },
            getCurrentSkillLevel(s_id) {
                if (this.userProfile.skills[s_id]) {
                    return this.userProfile.skills[s_id]['level'];
                }
                return 0;
            },
            getCurrentGoalLevel(s_id) {
                if (this.userProfile.skills[s_id]) {
                    if (this.userProfile.skills[s_id]['level_goal']) {
                        return this.userProfile.skills[s_id]['level_goal']['level'];
                    }
                }
                return '—';
            },
            setHelpPanelContent(e) {
                this.$emit('setHelpPanelContent', e);
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

        @for $i from 0 through 6 {
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

        &.-current {

        }

        &:active {
            @include buttonshadowActive($light, 15%);
        }

        &:hover {
            @include deepShadow(8, $primary, 15%);
            border-radius: 0;
        }


        &:first-child {
            border-radius: $border-radius 0 0 $border-radius;

            &:hover {
                border-radius: $border-radius 0 0 $border-radius;
            }
        }

        &:last-child {
            border-radius: 0 $border-radius $border-radius 0;

            &:hover {
                border-radius: 0 $border-radius $border-radius 0;
            }
        }
    }

    .o-editGroups {
        &__cardContainer {
            list-style: none;
            overflow: auto;


            @each $key, $color in $colorVisualization {
                li:nth-child(#{$key}n) {
                    @include deepShadow(8, $color, 10%);
                    margin-bottom: space(4);
                    padding: space(4);
                }


            }
        }

        &__skillCard {
            @include deepShadow(6, colorViz(7), 30%);


            &.-isRequired {

                @include deepShadow(6, $primary, 30%);

                p {
                    font-weight: bold;
                }
            }

            p {
                min-height: 6rem;
            }
        }
    }


</style>
