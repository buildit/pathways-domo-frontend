<template>
    <div>
        <template v-for="item in generateContent.content">
            <h1 :className.prop="item.class" v-if="item.type === 'title'">
                {{ item.content }} </h1>
            <h2 :className.prop="item.class" v-else-if="item.type === 'subhead'">
                {{ item.content }} </h2>
            <template v-else-if="item.type === 'list'">
                <ul :className.prop="item.class">
                    <li :className.prop="listItem.class" v-for="listItem in item.content">
                        {{ listItem }}
                    </li>
                </ul>
            </template>

            <template v-else-if="item.type === 'table'">
                <table :className.prop="item.class">
                    <tr v-for="row of item.content">
                        <td :className.prop="column.class" v-for="column of row">
                            {{ column.content }}
                        </td>
                    </tr>
                </table>
            </template>

            <p :className.prop="item.class" v-else>
                {{ item.content }} </p>
        </template>
    </div>
</template>

<script>
    import {mapState} from 'vuex';


    export default {

        name: "OHelpPanel__content",
        components: {},
        filters: {},
        props: ['helpPanel_object'],
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
            generateContent: function () {
                if (this.helpPanel_object.type === 'skill') {
                    return this.createSkillsContent();
                }

                if (this.helpPanel_object.type === 'group') {
                    return this.createGroupContent();
                }

                let newContent = {};
                return newContent;
            }
        },
        created: function () {

        },
        methods: {
            setHelpPanelState(state) {
                this.$emit('setHelpPanelState', state);
            },
            createSkillsContent() {
                const skill = this.skills[this.helpPanel_object.id];

                let newContent = {};

                newContent.content = [
                    {
                        type: 'title',
                        content: skill['name']
                    },
                    {
                        type: 'p',
                        content: skill['description']
                    },
                    {
                        type: 'list',
                        content: []
                    },
                    {
                        type: 'subhead',
                        content: 'Role Skill Levels'
                    },
                    {
                        type: 'list',
                        content: []
                    }
                ];

                let listItem;

                for (let item in this.skillLevels) {
                    const sl_id = this.skillLevels[item]['sl_id'];

                    // console.log(sl_id);

                    if (skill['levels'][sl_id]) {
                        listItem = skill['levels'][sl_id]['sl_name'] + ': ' + skill['levels'][sl_id]['description'];
                        newContent.content[2]['content'].push(listItem);
                    }
                }


                for (let sg_id in this.skillGroups) {
                    const currentGroup = this.skillGroups[sg_id];

                    for (let arrayIndex = 1; arrayIndex < this.roles.length; arrayIndex++) {
                        const r_id = this.roles[arrayIndex]['r_id'];
                        const currentRole = currentGroup['roles'][r_id];

                        // console.log(r_id, currentRole)

                        for (let s_id in currentRole['skills']) {
                            if (this.helpPanel_object.id === s_id) {
                                const currentSkill = currentRole['skills'][s_id];

                                listItem = currentRole['role_name'] + ' ' + currentGroup['title'] + ': ' + currentSkill['level_name'] + ' (' + currentSkill['level'] + ')';
                                newContent.content[4]['content'].push(listItem);
                            }
                        }
                    }
                }

                return newContent;
            },
            createGroupContent() {
                const currentGroup = this.skillGroups[this.helpPanel_object.id];

                let newContent = {};
                newContent.content = [
                    {
                        type: 'title',
                        content: currentGroup['name']
                    },
                    {
                        type: 'subhead',
                        content: 'Essential Skills'
                    },
                    {
                        type: 'table',
                        content: []
                    }
                ];

                let newRow = [{
                    class: '',
                    content: ''
                }];

                for (let arrayIndex = 1; arrayIndex < this.roles.length; arrayIndex++) {
                    newRow.push({
                        class: '-tableHeader',
                        content: this.roles[arrayIndex]['name']
                    });
                }

                let required = [newRow];
                let optional = [newRow];


                let optionalCount = 0;

                for (let sg_s_id in currentGroup.skills) {
                    if (currentGroup.skills[sg_s_id]['required'] === true) {
                        required.push(this.createSkillRowFactory(currentGroup.skills[sg_s_id], currentGroup));
                    } else {
                        optional.push(this.createSkillRowFactory(currentGroup.skills[sg_s_id], currentGroup));
                        optionalCount++;
                    }
                }

                newContent.content[2]['content'] = required;


                if (optionalCount > 0) {
                    newContent.content.push({
                        type: 'subhead',
                        content: 'Desired Skills'
                    });
                    newContent.content.push({
                        type: 'table',
                        content: optional
                    });
                } // if there's optional skills

                let skillLevelLegend = [];

                for (let i = 1; i < this.skillLevels.length; i++) {
                    skillLevelLegend.push({
                        class: '-groupRoleLevel -groupRoleLevel' + i,
                        content: this.skillLevels[i]['name'] + ' (' + i + ')'
                    });
                }

                newContent.content.push({
                    type: 'subhead',
                    content: 'Legend'
                });

                newContent.content.push({
                    type: 'table',
                    content: [skillLevelLegend]
                });

                return newContent;
            },
            createSkillRowFactory(skillList, currentGroup) {

                let newRow = [{
                    class: '-rowLabel',
                    content: skillList['name']
                }];

                const s_id = skillList['s_id'];

                for (let roleIndex = 1; roleIndex < this.roles.length; roleIndex++) {
                    const r_id = this.roles[roleIndex]['r_id'];
                    const currentLevel = currentGroup['roles'][r_id]['skills'][s_id];

                    newRow.push({
                        class: '-groupRoleLevel -groupRoleLevel' + currentLevel['level'],
                        content: currentLevel['level']
                    });

                }

                // console.log(newRowFactory)
                return newRow;
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "@/styles/main.scss";

    ul {
        margin-bottom: space(5);
    }

    table {
        font-size: 1rem;
        width: auto;

        tr {
            td {

            }
        }
    }

    .-tableHeader {
        border-bottom: 1px solid rgba($white, 0.25);
        text-align: center;
    }

    .-rowLabel {
        border-bottom: 1px solid rgba($white, 0.25);
        padding: space(2);
        width: 30%;

        &:first-child {
            border-top: 1px solid rgba($white, 0.25);
        }

    }

    .-groupRoleLevel {
        background-color: rgba($primary, 0.25);
        font-size: 1rem;
        padding: space(1) space(2) space(1) 0;
        text-align: center;
        width: 14%;

        &1 {
            background-color: rgba($primary, 0.25);
        }

        &2 {
            background-color: rgba($primary, 0.5);
        }

        &3 {
            background-color: rgba($primary, 0.75);
        }

        &4 {
            background-color: rgba($primary, 1);
        }
    }

    @media (min-width: 1200px) {
        table {
            font-size: 0.75rem;
            padding: space(1) 0;
            width: 100%;
        }
        .-rowLabel {
            width: 16%;
        }

        .-groupRoleLevel {
            width: 16%;
        }
    }


</style>
