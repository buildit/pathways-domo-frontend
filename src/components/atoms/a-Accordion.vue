<template>
    <div class="accordion-container">
        <div class="tab__header"><a @click.prevent="active = !active" class="tab__link" href="#">{{ title }}</a></div>
        <div>
            <div class="tab__content p-2" v-show="active">
                <button @click="action(details())">
                    Push
                </button>
                <pre>
{{details()}}
                </pre>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "accordion",
        props: {
            title: String,
            details: null,
            action: null
        },
        methods: {},
        data() {
            return {
                active: false
            };
        }
    };
</script>

<style lang="scss" scoped>
    @import "@/styles/main.scss";

    a {
        text-decoration: none;
        text-transform: capitalize;
    }

    div .accordion-container {
        width: 50%;
    }

    div .tab__header {
        background-color: rgba(255, 134, 13, 0.5);
        padding: .25em .5em;

        margin: 1em 0 0 0;
    }

    div .tab__content {
        background-color: rgba(255, 134, 13, 0.25);
    }

    @-webkit-keyframes LinearGradientAnimate {
        0% {
            background-position: 0% 50%;
            transform: rotate(0deg);
        }
        50% {
            background-position: 100% 50%;
            transform: rotate(180deg);
        }
        100% {
            background-position: 0% 50%;
            transform: rotate(360deg);
        }
    }

    @-moz-keyframes LinearGradientAnimate {
        0% {
            background-position: 0% 50%;
            transform: rotate(0deg);
        }
        50% {
            background-position: 100% 50%;
            transform: rotate(180deg);
        }
        100% {
            background-position: 0% 50%;
            transform: rotate(360deg);
        }
    }

    @keyframes LinearGradientAnimate {
        0% {
            background-position: 0% 50%;
            transform: rotate(0deg);
        }
        50% {
            background-position: 100% 50%;
            transform: rotate(180deg);
        }
        100% {
            background-position: 0% 50%;
            transform: rotate(360deg);
        }
    }

</style>
