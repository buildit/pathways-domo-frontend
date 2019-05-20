<template>
  <pre v-if="userMappings">
    {{getAllOfType()}}

    <button @click="fireAway(userMappings())">Push</button>
    {{ userMappings() }}
      <!--<ul>
        <li v-for="(user, user_key) in users">
          {{user.user_email}}|{{user.forecast_user_id}}
        </li>
      </ul>-->
  </pre>
</template>
<script>
    import {mapState} from "vuex";

    const pathwaysApi = require('../services/apiConfig');
    const fb = require('../services/firebaseDebug');

    export default {
        components: {},
        data() {
            return {};
        },
        computed: {
            ...mapState([
                'users',
                // 'currentUser',
                'skillGroups',
                'skills',
                'skillLevels',
                'roles'
            ]),

        },

        methods: {
            getAllOfType: function () {
                let result = [];
                return this.skillGroups;
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
            fireAway: function (results) {
                pathwaysApi.default.updateUsers(results).then(r => console.log(r));
            }
        },

    };
</script>
<style scoped lang="scss">
    @import "@/styles/main.scss";


    li {
        &.done {
            text-decoration: line-through;
        }
    }
</style>
