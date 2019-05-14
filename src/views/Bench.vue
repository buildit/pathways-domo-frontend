<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <bench-widget @setLoadingState="setLoadingState"></bench-widget>
      </div>
    </div>
  </div>
</template>

<script>

  import BenchWidget from "../components/molecules/m-benchWidget";


  export default {
    components: {BenchWidget},
    data() {
      return {

      };
    },
    computed: {

    },
    mounted: function(){

    },
    methods: {
      setLoadingState(e) {
        this.$emit('setLoadingState', e);
      },
    }
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
