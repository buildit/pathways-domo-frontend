<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>Expertise Lookup</h1>
                <div class="m-skillsBreakdown__searchWrapper">
                    <input
                            id="name"
                            v-model="searchTerm"
                            class="m-skillsBreakdown__searchBox"
                            v-bind:class="{'isAutoCompleteOpen': isAutoCompleteOpen}"
                            type="text"
                            name="name"
                            placeholder="Search for…"
                            @click="setAutoCompleteState(true)"
                            @keyup="setAutoCompleteState(true)"
                    >
                    <button
                            class="m-skillsBreakdown__clearSearch"
                            @click.prevent="clearSearch"
                    >
                        X
                    </button>
                    <div
                            v-if="isAutoCompleteOpen"
                            class="m-skillsBreakdown__autoCompleteResults"
                    >
                        <h4>
                            {{ autoCompleteResults.label }}
                        </h4>
                        <ul>
                            <li v-for="item in autoCompleteResults.results">
                                <a @click.stop="setSearchTerm(item)">{{ item.label }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div
                    v-if="searchResults"
                    class="m-skillsBreakdown__results col-12"
            >
                <div class="m-skillsBreakdown__filters">
                    <h4>Filter</h4>
                    <template v-for="level in searchResults">
                        <input
                                v-bind:id="level.label"
                                v-model="filter[level.label]"
                                type="checkbox"
                        >
                        <label v-bind:for="level.label">{{ level.label }} ({{ Object.keys(level.results).length }})</label>
                    </template>
                </div>

                <h3>Results</h3>

                <div class="row">
                    <template v-for="level in searchResults">
                        <div
                                v-if="(filter[level.label] === true && showAllLevels === false) || showAllLevels === true"
                                class=" m-skillsBreakdown__resultGroupWrapper  col-12"
                        >
                            <div
                                    class="m-skillsBreakdown__resultGroup container"
                            >
                                <div class="row">
                                    <div class="m-skillsBreakdown__resultGroupHeader d-flex justify-content-between col-12">
                                        <h3>{{ level.label }}</h3>
                                        <span>{{ Object.keys(level.results).length }}</span>
                                    </div>


                                    <div
                                            v-for="user in level.results"
                                            class=" col-12 col-md-3"
                                    >
                                        <div class="m-skillsBreakdown__resultGroupBodyCell">
                      <span>
                        {{ user.user_first_name }} {{ user.user_last_name }}


                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import AHelpButton from "../components/atoms/a-helpButton";

    export default {
        name: "SkillsBreakdown",
        components: {AHelpButton},
        data() {
            return {
                isAutoCompleteOpen: false,
                searchTerm: '',
                searchObject: '',
                filter: {}
            };
        },
        computed: {
            ...mapState([
                'skillGroups',
                'skills',
                'users'
            ]),
            ...mapGetters([
                'qualifiedUsersBySkillGroup',
                'qualifiedUsersBySkill'
            ]),
            showAllLevels: function () {

                if (this.searchResults !== false) {
                    let state = true;

                    for (let item in this.searchResults) {
                        if (typeof this.filter[this.searchResults[item]['label']] !== "undefined") {
                            if (this.filter[this.searchResults[item]['label']] === true) {
                                state = false;
                            }
                        }
                    }

                    return state;
                }

                return true;
            },
            autoCompleteResults: function () {
                let results = {
                    label: 'Matches',
                    results: []
                };

                if (this.searchTerm === '') {
                    results.label = 'Random Suggestions';

                    const sg_keys = Object.keys(this.skillGroups);
                    const s_keys = Object.keys(this.skills);

                    let index = 0;
                    let tracker = [];
                    let count = 0;

                    while (count < 4) {
                        index = Math.floor(Math.random() * sg_keys.length);

                        let state = true;

                        for (let i = 0; i < tracker.length; i++) {
                            if (tracker[i] === index) {
                                state = false;
                            }
                        }

                        if (state === true) {
                            tracker.push(index);
                            count++;

                            results.results.push({
                                id: sg_keys[index],
                                label: this.skillGroups[sg_keys[index]].name,
                                type: 'sg'
                            });
                        }
                    }

                    count = 0;
                    tracker = [];

                    while (count < 4) {
                        index = Math.floor(Math.random() * s_keys.length);

                        let state = true;

                        for (let i = 0; i < tracker.length; i++) {
                            if (tracker[i] === index) {
                                state = false;
                            }
                        }

                        if (state === true) {
                            tracker.push(index);
                            count++;

                            results.results.push({
                                id: s_keys[index],
                                label: this.skills[s_keys[index]].name,
                                type: 's'
                            });
                        }
                    }


                    return results;
                }

                for (let item in this.skillGroups) {
                    const thisName = this.skillGroups[item]['name'].toLowerCase().trim();
                    const normalizedSearchTerm = this.searchTerm.toLowerCase().trim();


                    if (thisName === normalizedSearchTerm || thisName.indexOf(normalizedSearchTerm) > -1) {
                        results.results.push({
                            id: item,
                            label: this.skillGroups[item].name,
                            type: 'sg'
                        });
                    }
                }

                for (let item in this.skills) {
                    const thisName = this.skills[item]['name'].toLowerCase().trim();
                    const normalizedSearchTerm = this.searchTerm.toLowerCase().trim();


                    if (thisName === normalizedSearchTerm || thisName.indexOf(normalizedSearchTerm) > -1) {
                        results.results.push({
                            id: item,
                            label: this.skills[item]['name'],
                            type: 's'
                        });
                    }
                }


                return results;
            },
            searchResults: function () {
                if (this.searchObject === '') {
                    return false;
                }

                let resultsSet = {};

                for (let user in this.users) {
                    if (this.searchObject.type === 'sg') {
                        const level = this.users[user]['roles'][this.searchObject.id]['level'];

                        if (level > 0) {

                            if (typeof resultsSet[level] === "undefined") {
                                resultsSet[level] = {
                                    label: this.users[user]['roles'][this.searchObject.id]['level_name'],
                                    results: []
                                };
                            }

                            resultsSet[level]['results'].push(this.users[user]);
                        }
                    }

                    if (this.searchObject.type === 's') {
                        if (typeof this.users[user]['skills'][this.searchObject.id] !== "undefined") {
                            const level = this.users[user]['skills'][this.searchObject.id]['level'];

                            if (level > 0) {
                                if (typeof resultsSet[level] === "undefined") {
                                    resultsSet[level] = {
                                        label: this.users[user]['skills'][this.searchObject.id]['level_name'],
                                        results: []
                                    };
                                }

                                resultsSet[level]['results'].push(this.users[user]);
                            }
                        }

                    }

                }

                this.$emit('setLoadingState', false);

                return resultsSet;

            }
        },
        methods: {
            clearSearch: function () {
                this.setAutoCompleteState(false);
                this.searchTerm = '';
                this.searchObject = '';
                this.filter = {};
            },
            setAutoCompleteState: function (e) {
                this.isAutoCompleteOpen = e;
            },
            setSearchTerm: function (e) {
                this.$emit('setLoadingState', true);
                this.clearSearch();

                this.searchTerm = e.label;
                this.searchObject = e;
            },

        }
    };
</script>

<style scoped lang="scss">
    @import "@/styles/main.scss";

    h1 {
        margin-bottom: space(4);
    }

    .m-skillsBreakdown {
        &__searchWrapper {
            position: relative;
        }

        &__searchBox {
            @include deepShadow(8, colorViz(2), 30%);
            border-radius: $border-radius;
            color: $black;
            border: 0;
            display: block;
            padding: space(4);
            width: 100%;

            &.isAutoCompleteOpen {
                border-radius: $border-radius $border-radius 0 0;
            }
        }

        &__clearSearch {
            @include deepShadow(4, colorViz(7), 10%);
            border-radius: $border-radius * 2;
            color: $white;
            font-weight: bold;
            height: 2rem;
            position: absolute;
            right: space(4);
            top: space(3);
            width: 2rem;

            &:active {
                @include buttonshadowActive(colorViz(7), 15%);
            }
        }

        &__autoCompleteResults {
            @include deepShadow(8, colorViz(2), 30%);
            border-radius: 0 0 $border-radius $border-radius;
            padding: space(4);
            position: absolute;
            width: 100%;
            z-index: $zindex-popover;

            ul, ol {

                list-style: none;
                margin: 0;
                padding: 0;

                a,
                a:not([href]),
                a:not([href]):not([tabindex]) {
                    font-weight: normal;
                }
            }
        }

        &__results {
            margin-top: space(4);
        }

        &__filters {
            @include deepShadow(8, colorViz(3), 30%);
            margin: 0 0 space(7);
            padding: space(4) space(4) space(3);

            h4 {
                display: inline-block;
                margin-right: space(5);
            }

            input {
                margin-right: space(1);
            }

            label {
                margin-right: space(4);
            }
        }

        &__resultGroupWrapper {
            @each $key, $color in $colorVisualization {
                &:nth-child(#{$key}n) {
                    .m-skillsBreakdown__resultGroup {
                        @include deepShadow(16, $color, 10%);
                        margin-bottom: space(4);
                        padding: space(4);
                    }

                }


            }
        }

        &__resultGroupHeader {
            margin-bottom: space(4);

            span {
                @include deepShadow(4, colorViz(6), 100%);
                border-radius: $border-radius * 2;
                font-weight: bold;
                height: 2rem;
                padding-top: space(1);
                text-align: center;
                width: 2rem;
            }

        }

        &__resultGroupBodyCell {
            margin-bottom: space(4);
        }
    }
</style>
