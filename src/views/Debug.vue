<template>
    <div>
        <accordion :action="updateRoles" :details="roleMappings" title="role levels"></accordion>

        <accordion :action="updateRoleTypes" :details="roleTypeMappings" title="role types"></accordion>


        <accordion :action="updateUsers" :details="userMappings" title="users">

        </accordion>
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
                'roles'
            ]),

        },

        methods: {
            roleTypeMappings: function () {
                let result = [];
                for (let u in this.skillGroups) {
                    result.push({
                        "name": this.skillGroups[u].name,
                        "title": this.skillGroups[u].title
                    });
                }

                return result;
            },
            roleMappings: function () {
                let result = [];
                for (let u in this.roles) {
                    result.push({
                        "name": this.roles[u].name,
                        "level": this.roles[u].level.toString(),
                        "description": this.roles[u].description
                    });
                }

                return result;
            },
            userMappings: function () {
                let result = [];
                for (let u in this.users) {
                    result.push({
                        "username": this.users[u].user_email,
                        "domoIdentifier": this.users[u].forecast_user_id.toString()
                    });
                }
                return result;
            },
            updateUsers: function (results) {
                api.User.updateRange(results).then(r => console.log(r));
            },
            updateRoles: function (results) {
                api.Role.updateRange(results).then(r => console.log(r));
            },
            updateRoleTypes: function (results) {
                api.Role.updateTypeRange(results).then(r => console.log(r));
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
