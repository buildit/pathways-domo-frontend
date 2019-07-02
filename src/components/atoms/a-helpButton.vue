<template>
  <button class="__moreInfo" @click="setHelpPanelContent()">
    ?
  </button>
</template>

<script>
    export default {
        name: "AHelpButton",
        props: {
            id: Number,
            type: String
        },
        methods: {
            setHelpPanelContent() {
                this.$emit('setHelpPanelContent', {id: this.id, type: this.type});
            }
        }
    };
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";

  .__moreInfo {
    $size: 1.5rem;

    background-color: colorViz(0);
    border-radius: 1rem;
    color: $white;
    display: inline;
    flex-grow: 0;
    font-size: 0.875rem;
    font-weight: bold;
    height: $size;
    margin-left: space(2);
    min-height: $size;
    min-width: $size;
    text-align: center;
    width: $size;


    &:hover {
      background-color: lighten(colorViz(0), 10%);
      text-decoration: none;
    }

    &:active {

    }
  }
</style>
