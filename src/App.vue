<template>
    <div v-bind:class="{ 'd-flex' : isNavOpen}">
        <loading-popover v-if="isLoading"></loading-popover>
        <div class="o-mainWrapper__nav" v-bind:class="{ 'col-md-3' : isNavOpen, 'col-xl-2' : isNavOpen, 'panelLook': isNavOpen }">
            <div v-if="isNavOpen" class="d-flex flex-row-reverse">
                <button class="-closeButton" @click="setNavPanelState(false)">
                    X
                </button>
            </div>
            <m-navbar v-if="currentUser" v-bind:isNavOpen="isNavOpen" @setNavPanelState="setNavPanelState"></m-navbar>
        </div>
        <div v-bind:class="{ 'col-md-9' : isNavOpen, 'col-xl-10' : isNavOpen}">
            <div class="d-flex">
                <div class="o-mainWrapper col-12" v-bind:class="{'col-xl-8': isHelperPanelOpen}">
                    <router-view @setHelpPanelContent="setHelpPanelContent" @setLoadingState="setLoadingState"></router-view>
                </div>
                <transition name="width-change">
                    <div v-if="isHelperPanelOpen" class="o-helpPanel__wrapper p-0">
                        <div class="o-helpPanel__content px-4 pt-3">
                            <div class="d-flex flex-row-reverse">
                                <button class="-closeButton" @click="setHelpPanelState(false)">
                                    X
                                </button>
                            </div>
                            <o-help-panel__content class="p-4" v-bind:helpPanel_object="helpPanel_object" @setHelpPanelState="setHelpPanelState"></o-help-panel__content>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import MNavbar from "./components/molecules/m-navbar";
    import OHelpPanel__content from "./components/organisms/o-helpPanel__content";
    import LoadingPopover from "./components/atoms/a-loadingPopover";

    export default {
        components: {LoadingPopover, OHelpPanel__content, MNavbar},
        props: {},
        data() {
            return {
                isLoading: false,
                isNavOpen: true,
                isHelperPanelOpen: false,
                helpPanel_object: {}
            };
        },
        computed: {
            ...mapState(['currentUser'])
        },
        methods: {
            setLoadingState(e) {
                this.isLoading = e;
            },
            setNavPanelState(e) {
                this.isNavOpen = e;
                if (this.isNavOpen === true) {
                    this.setHelpPanelState(false);
                }
            },
            setHelpPanelState(e) {
                this.isHelperPanelOpen = e;
            },
            setHelpPanelContent(e) {
                this.setHelpPanelState(true);
                this.setNavPanelState(false);
                this.helpPanel_object = e;
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "@/styles/main.scss";

    .o-mainWrapper {
        padding-top: space(7);
        transition: max-width $animation-medium;

        &.col-12 {
            transition-delay: $animation-medium;
        }

        &__nav {
            &.panelLook {
                background-color: colorViz(6);
                height: 100vh;
                max-width: 100vw;
                overflow: hidden;
                padding: space(4);
                position: fixed;
                right: 0;
                width: 100vw;
                z-index: $zindex-modal;
            }

        }
    }

    .o-helpPanel {
        &__wrapper {
            height: 100vh;
            max-width: 100vw;
            overflow: hidden;
            position: fixed;
            right: 0;
            width: 100vw;
            z-index: $zindex-sticky;
        }

        &__content {

            background-color: $dark;
            box-shadow: inset 1rem 0 #111;
            color: $white;
            height: 100vh;
            overflow-x: hidden;
            overflow-y: auto;
            width: 100vw;

        }

        &__closeButton {

        }
    }

    .-closeButton {
        @include deepShadow(8, $light, 15%);
        background-color: $white;
        border: 0;
        border-radius: 1rem;
        font-weight: bold;
        height: 2rem;
        width: 2.125rem;

        &:active {
            @include buttonshadowActive($light, 15%);
        }
    }

    .width-change-enter-active,
    .width-change-leave-active {
        transition: max-width $animation-slow;
    }

    .width-change-enter, .width-change-leave-to {
        max-width: 0;
    }

    @media (min-width: 1024px) {
        .o-mainWrapper {


            &__nav {
                &.panelLook {
                    background-color: colorViz(6);


                    overflow: auto;

                    position: sticky;
                    position: -webkit-sticky;
                    right: auto;
                    top: 0;
                    width: auto;

                }

            }
        }

    }

    @media (min-width: 1200px) {

        .o-helpPanel {
            &__wrapper,
            &__content {
                width: 33vw;
            }

        }
    }
</style>
