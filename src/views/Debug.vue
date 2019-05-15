<template>
  <pre>
    <ul>
      <li v-for="(user, user_key) in users">
        {{user.user_email}}
      </li>
    </ul>
  </pre>
</template>
<script>
    import {mapState} from "vuex";

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

        methods: {},

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
