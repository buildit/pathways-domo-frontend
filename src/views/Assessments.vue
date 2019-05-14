<template>
  <div class="container">
    <div class="row">
      assessments
    </div>
  </div>
</template>

<script>

  import { mapState } from "vuex";


  export default {
    components: {},
    data() {
      return {

      };
    },
    computed: {
      ...mapState([

        'currentUser'
      ]),
    },
    created: function () {
      this.$emit('setLoadingState', true);
    },
    mounted: function () {
      this.$emit('setLoadingState', false);
    },
    methods: {}
  };
</script>


<style scoped lang="scss">
  @import "@/styles/main.scss";


</style>
