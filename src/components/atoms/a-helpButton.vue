<template>
    <button @click="setHelpPanelContent()" class="__moreInfo">
        ?
    </button>
</template>

<script>
    export default {
        name: "AHelpButton",
        props: {
            id: String,
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
        @include deepShadow(6, $primary, 15%);
        border-radius: 1rem;
        color: $white;
        display: inline;
        flex-grow: 0;
        font-weight: bold;
        height: 2rem;
        margin-left: space(2);
        min-height: 2rem;
        min-width: 2rem;
        text-align: center;
        width: 2rem;


        &:hover {
            background-color: $white;
            color: $primary;
            text-decoration: none;
        }

        &:active {
            @include buttonshadowActive($white, 50%);
        }
    }
</style>
