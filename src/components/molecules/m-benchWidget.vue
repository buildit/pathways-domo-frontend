<template>
  <div class="container">
    <div class="row">
      <div
        v-if="apiCallStatus !== 200"
        class="col-12"
      >
        <div class="benchWidget__warning ">
          DOMO API Status: {{ apiCallStatus }}
          <p>Refresh the page. DOMO API is touchy.</p>
        </div>
      </div>
      <div
        v-if="apiCallStatus === 200"
        class="col-12"
      >
        <div class="benchWidget__warning">
          <p>Fragile API call. Should be made on the backend and cached.</p>
        </div>
        <div class="benchWidget__header d-flex justify-content-between align-items-end">
          <h1>On Bench </h1>
          <h4 class="benchWidget__headerCount">
            Total: {{ sortedList.bench.total }}
          </h4>
        </div>


        <div
          v-for="(group, key) in sortedList.bench.data"
          class="benchWidget__group"
        >
          <div class="container flex-wrap">
            <div class="row">
              <div class="benchWidget__groupHeader d-flex justify-content-between col-12">
                <h2>{{ key }}</h2>

                <span class="benchWidget__groupCount">
                  {{ Object.keys(group).length }}
                </span>
              </div>


              <div
                v-for="row in group"
                class="col-12 col-md-3"
              >
                <div class="benchWidget__cell">
                  <h4>
                    {{ row.user_first_name }} {{ row.user_last_name }}

                    <span
                      v-if="row.roles.location"
                      class="benchWidget__location"
                    >
                      <br>
                      {{ row.roles.location }}
                    </span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "BenchWidget",
    computed: {
      ...mapState([
        'accessToken',
        'accessTokenStatus',
        'apiCallStatus',
        'datasetList',
        'apiData'
      ]),
      columns: function () {
        return this.apiData.columns;
      },
      rows: function () {
        return this.apiData.rows;
      },
      sortedList: function () {
        const bookedHoursIndex = this.getIndexOfColumn('Booked Hours');
        const user_is_activeIndex = this.getIndexOfColumn('user_is_active');
        let benchPeople = {
          bench: {
            total: 0,
            data: {}
          },
          project: {
            total: 0,
            data: {}
          }


        };

        if (typeof this.rows === "object") {

          for (let i = 0; i < this.rows.length; i++) {
            if (this.rows[i][user_is_activeIndex] === 'true') {
              const roles = this.splitRoles(this.rows[i][this.getIndexOfColumn('user_roles')]);
              const user_id = this.rows[i][this.getIndexOfColumn('user_id')];

              if (roles !== false) {
                let isBench = 'bench';
                if (this.rows[i][bookedHoursIndex] !== '') {
                  isBench = 'project';
                }

                if (typeof benchPeople[isBench]['data'][roles.role] !== "object") {
                  benchPeople[isBench]['data'][roles.role] = {};
                }

                benchPeople[isBench]['data'][roles.role][user_id] = {
                  'roles': roles
                };

                for (let j = 0; j < this.columns.length; j++) {
                  benchPeople[isBench]['data'][roles.role][user_id][this.columns[j]] = this.rows[i][j];
                }

                benchPeople[isBench]['total'] += 1;

              }
            }
          }
        }

        return benchPeople;
      }
    },
    mounted: function () {
      this.$emit('setLoadingState', true);
      this.getData();

      setTimeout(() => {
        this.$emit('setLoadingState', false);
      }, 1000);
    },
    methods: {
      getData: function () {
        if (this.accessTokenStatus !== 200) {
          this.$store.dispatch('requestAccessToken').then(() => {
            this.$store.dispatch('makeDOMOCall', {
              method: 'post',
              call: 'datasets/query/execute',
              id: 'fd2a9bc6-4ed2-4e18-81c1-86a8ffcc06e7',
              data: {"sql": "SELECT * FROM table"}
            }).then(() => {
              this.$emit('setLoadingState', false);
            });
          }).catch(e => {
            console.log('bad token. retrying.');
            this.getData();
          });
        } else {
          this.$store.dispatch('makeDOMOCall', {
            method: 'post',
            call: 'datasets/query/execute',
            id: 'fd2a9bc6-4ed2-4e18-81c1-86a8ffcc06e7',
            data: {"sql": "SELECT * FROM table"}
          }).then(() => {
            this.$emit('setLoadingState', false);
          });
        }
      },
      getIndexOfColumn: function (target) {
        if (typeof this.columns === "undefined") {
          return false;
        }
        for (let i = 0; i < this.columns.length; i++) {
          if (this.columns[i] === target) {
            return i;
          }
        }

        return false;
      },
      splitRoles: function (val) {
        if (val.length === 0) {
          return false;
        }
        const asArray = val.split(',');
        let asObject = {};

        for (let i = 0; i < asArray.length; i++) {
          const keypair = asArray[i].split('=');

          asObject[keypair[0]] = keypair[1];
        }

        return asObject;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";

  .benchWidget {
    &__group {
      @each $key, $color in $colorVisualization {
        &:nth-child(#{$key}n) {
          @include deepShadow(16, $color, 10%);
          margin-bottom: space(4);
          padding: space(4);

          .benchWidget__groupCount {
            @include deepShadow(4, $color, 100%);
            border-radius: 2rem;
            font-weight: bold;
            height: 2rem;
            padding-top: space(1);
            text-align: center;
            width: 2rem;
          }
        }
      }
    }

    &__warning {
      @include deepShadow(16, colorViz(3), 20%);
      padding: space(4);
      margin-bottom: space(6);

      p {
        margin-bottom: 0;
      }
    }

    &__header {
      margin-bottom: space(4);
    }

    &__headerCount {
      @include deepShadow(4, colorViz(6), 5%);
      border-radius: 2rem;
      color: $white;
      padding: space(2) space(3);
      text-align: center;

    }

    &__groupHeader {
      margin: space(2) 0 space(4);
    }


    &__cell {
      margin-bottom: space(4);
    }

    &__location {
      font-weight: normal;
    }
  }


</style>
