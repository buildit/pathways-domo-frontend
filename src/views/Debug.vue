<template>
    <div>
        <accordion :action="updateRoles" :details="roleMappings" title="role levels"></accordion>
        <accordion :action="updateRoleTypes" :details="roleTypeMappings" title="role types"></accordion>
        <accordion :action="updateUsers" :details="userMappings" title="users"></accordion>
        <accordion :action="updateSkills" :details="skillMappings" title="skills"></accordion>
        <accordion :action="updateSkillLevels" :details="skillLevelMappings" title="skill levels"></accordion>
        <accordion :action="updateSkillLevelTypes" :details="skillTypeLevelMappings" title="skill Type levels"></accordion>
        <accordion :action="updateRoleLevelRules" :details="roleLevelRuleMappings" title="Role level rules"></accordion>
        <accordion :action="updateUserSkills" :details="userSkillMappings" title="User Skills"></accordion>
    </div>
</template>
<script>
    import {mapState} from "vuex";
    import accordion from '../components/atoms/a-Accordion';
    import api from '../services/apiConfig';

    const fb = require('../services/firebaseDebug');

    export default {
        components: {accordion},
        data() {
            return {};
        },
        computed: {
            ...mapState([
                'users',
                'skillGroups',
                'skills',
                'skillLevels',
                'roles',
                'fbusers',
                'fbroles',
                'fbskillGroups',
                'fbskillLevels',
                'fbskills'
            ]),

        },

        methods: {
            roleTypeMappings: function () {
                let result = [];
                for (let u in this.fbskillGroups) {
                    result.push({
                        "name": this.fbskillGroups[u].name,
                        "title": this.fbskillGroups[u].title
                    });
                }

                return result;
            },
            roleMappings: function () {
                let result = [];
                for (let u in this.fbroles) {
                    result.push({
                        "name": this.fbroles[u].name,
                        "level": this.fbroles[u].level.toString(),
                        "description": this.fbroles[u].description
                    });
                }

                return result;
            },
            userMappings: function () {
                let result = [];
                for (let u in this.fbusers) {
                    result.push({
                        "username": this.fbusers[u].user_email,
                        "domoIdentifier": this.fbusers[u].forecast_user_id.toString()
                    });
                }
                return result;
            },
            skillMappings: function () {
                let result = [];
                for (let u in this.fbskills) {
                    result.push({
                        "name": this.fbskills[u].name,
                        "description": this.fbskills[u].description
                    });
                }
                return result;
            },
            skillLevelMappings: function () {
                let result = [];
                for (let u in this.fbskillLevels) {
                    result.push({
                        "skillTypeId": null,
                        "name": this.fbskillLevels[u].name,
                        "description": this.fbskillLevels[u].description,
                        "level": this.fbskillLevels[u].level.toString(),
                    });
                }

                return result;
            },
            skillTypeLevelMappings: function () {
                let result = [];

                for (let u in this.fbskills) {
                    let tempSkill = this.fbskills[u];
                    let dbSkill = this.skills.find(p => p.name === tempSkill.name);

                    for (let i in tempSkill.levels) {
                        let dbLevel = this.skillLevels.find(s => s.name === tempSkill.levels[i].sl_name);

                        result.push({
                            "skillTypeId": dbSkill.id,
                            "description": tempSkill.levels[i].description,
                            "skillLevelId": dbLevel.id,
                        });
                    }
                }
                return result;
            },
            roleLevelRuleMappings: function () {
                let result = [];
                for (let u in this.fbskillGroups) {
                    let roleTypeId = this.skillGroups.find(sg => sg.name === this.fbskillGroups[u].name).id;
                    for (let r in this.fbskillGroups[u].roles) {
                        let roleLevelId = this.roles.find(rl => rl.name === this.fbskillGroups[u].roles[r].role_name).id;
                        for (let s in this.fbskillGroups[u].roles[r].skills) {
                            let skillLevelId = this.skillLevels.find(sl => sl.level === this.fbskillGroups[u].roles[r].skills[s].level).id;
                            let skillTypeId = this.skills.find(st => st.name === this.fbskillGroups[u].roles[r].skills[s].skill_name).id;
                            if (result.find(r => r.roleTypeId === roleTypeId && r.roleLevelId === roleLevelId && r.skillLevelId === skillLevelId && r.skillTypeId === skillTypeId) == null) {
                                result.push({
                                    "roleTypeId": roleTypeId,
                                    "roleLevelId": roleLevelId,
                                    "skillLevelId": skillLevelId,
                                    "skillTypeId": skillTypeId
                                });
                            }
                        }
                    }
                }

                return result;
            },
            userSkillMappings: function () {
                let result = [];
                for (let u in this.fbusers) {
                    let user = this.users.find(user => user.username === this.fbusers[u].user_email);
                    if (!user) {
                        console.log('no user in database with username ' + this.fbusers[u].user_email);
                        continue;
                    }

                    let userId = user.id;
                    for (let s in this.fbusers[u].skills) {
                        let skillTypeId = this.skills.find(st => st.name === this.fbusers[u].skills[s].skill_name).id;
                        let skillLevelId = this.skillLevels.find(st => st.level === this.fbusers[u].skills[s].level).id;
                        if (result.find(r => r.userId === userId && r.skillLevelId === skillLevelId && r.skillTypeId === skillTypeId) == null) {
                            result.push({
                                "userId": userId,
                                "skillLevelId": skillLevelId,
                                "skillTypeId": skillTypeId
                            });
                        }
                    }
                }

                return result;
            },
            updateSkillLevelTypes: function (results) {
                api.Skill.updateTypeLevelRange(results).then(r => console.log(r));
            },
            updateSkillLevels: function (results) {
                api.Skill.updateLevelRange(results).then(r => console.log(r));
            },
            updateSkills: function (results) {
                api.Skill.updateRange(results).then(r => console.log(r));
            },
            updateUsers: function (results) {
                api.User.updateRange(results).then(r => console.log(r));
            },
            updateRoles: function (results) {
                api.Role.updateRange(results).then(r => console.log(r));
            },
            updateRoleTypes: function (results) {
                api.Role.updateTypeRange(results).then(r => console.log(r));
            },
            updateRoleLevelRules: function (results) {
                api.RoleLevelRule.updateRange(results).then(r => console.log(r));
            },
            updateUserSkills: function (results) {
                api.UserSkill.updateRange(results).then(r => console.log(r));
            }
        },

    };
</script>
<style scoped lang="scss">
    @import "@/styles/main.scss";

    button {
        border: 1px solid black;
        padding: .5em 1em;
    }

    li {
        &.done {
            text-decoration: line-through;
        }
    }
</style>
