<template>
  <div>
    <h3>Primary Tribes</h3>
    <ul class="m-0 p-0">
      <template v-for="role in userProfile.roles">
        <li v-if="role.level > 0">
          {{ role.level_name }} {{ role.title }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {

        name: "o-userRoleBreakdown",
        components: {},
        filters: {
            truncateString(val, maxLength) {
                if (val.length < 18) {
                    return val + '<br><br>';
                }
                if (val.length < maxLength) {
                    return val + '<br>';
                }
                return `${val.substring(0, maxLength).trim()}…`;
            },
            isRequired(val, required) {
                if (required === true) {
                    return val + '*';
                }

                return val;
            }

        },
        data() {
            return {};
        },
        computed: {
            ...mapState([
                'userProfile'
            ]),
        },
        created: function () {

        },
        mounted: function () {

        },
        methods: {}
    };
</script>

<style scoped lang="scss">
    @import "@/styles/main.scss";


    ul {
        list-style: none;

    }
</style>
