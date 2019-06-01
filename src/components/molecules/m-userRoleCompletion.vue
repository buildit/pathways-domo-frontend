<template>
  <ul class="m-userRoleCompletion__list m-0 p-0">
    <template v-for="item in listOfItems">
      <li v-if="item.progressCompleted > 0 || showEmpty === true" class="px-2 py-3 d-flex justify-content-between">
        <div class="m-userRoleCompletion__progressBar" v-bind:style="{width: (item.progressCompleted * 100) + '%'}"></div>
        <span>{{ item.title }}</span>
        <span>{{ item.role_name }}</span>
      </li>
    </template>
  </ul>
</template>

<script>
    import {mapState} from 'vuex';

    export default {

        name: "MUserRoleCompletion",
        components: {},
        filters: {},
        props: {
            listOfItems: Object,
            showEmpty: Boolean
        },
        data() {
            return {};
        },
        computed: {
            ...mapState([
                'userProfile'
            ]),
        },

        mounted: function () {

        },
        methods: {}
    };
</script>

<style scoped lang="scss">
    @import "@/styles/main.scss";

    .m-userRoleCompletion {
        &__list {
            list-style: none;

            li {
                display: block;
                overflow: hidden;
                position: relative;


                span {
                    font-size: 0.75rem;
                    z-index: $zindex-tooltip;
                }
            }

            @each $key, $color in $colorVisualization {
                li:nth-child(#{$key}n) {
                    @include deepShadow(8, $color, 20%);
                    border-radius: 0;

                    .m-userRoleCompletion__progressBar {
                        background-color: $color;
                        bottom: 0;
                        left: 0;
                        position: absolute;
                        top: 0;
                        z-index: 0;
                    }
                }
            }

            li:first-child {
                border-radius: $border-radius $border-radius 0 0;
            }

            li:last-child {
                border-radius: 0 0 $border-radius $border-radius;
            }
        }

    }


</style>
