<template>
  <div class="container">
    <a
      href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78yf616yi964ti&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Ftools&state=fooobar23231323123123&scope=r_liteprofile%20r_emailaddress%20w_member_social"
    >Trigger
      Auth code</a>

    <p>enable cross-domain on safari</p>


    <p>route</p>
    {{ $route.query }}

    <p>
      config
      <br>
      {{ configPost }}
    </p>


    <p>
      token:<br>
      {{ linkedinToken }}
    </p>

    <p>
      error <br>
      {{ errorState }}
    </p>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import axios from 'axios';

  export default {
    components: {

    },
    data() {
      return {
        hasUserAuth: false,
        linkedinToken: '',
        errorState: '',
        configPost: {}
      };
    },
    computed: {
      ...mapState([

        'currentUser'
      ]),
    },
    created: function () {

    },
    mounted: function () {




      this.tokenAuthLoop();

    },
    methods: {
      tokenAuthLoop: function(){
        const urlQuery = this.$route.query;

        if (typeof urlQuery.code !== "undefined" && typeof urlQuery.state !== "undefined") {
          if (urlQuery.state === 'fooobar23231323123123') {
            this.$emit('setLoadingState', true);
            this.hasUserAuth = true;
            this.getLIToken(urlQuery.code).then(resp => {
              this.linkedinToken = resp.access_token;
              this.$emit('setLoadingState', false);
            }).catch(e => {
              this.errorState = e;
              // this.tokenAuthLoop();
              console.log('linkedin get token error', e);
              this.$emit('setLoadingState', false);
            });
          }
        }
      },
      getLIToken: function (code) {
        return new Promise((resolve, reject) => {

          const config = {
            url: 'https://www.linkedin.com/oauth/v2/accessToken',
            method: 'post',
            headers: {
              'Content-Type': 'x-www-form-urlencoded'
            },
            params: {
              client_id: '78yf616yi964ti',
              client_secret: '1hHmVUvb7L5ALbp8',
              redirect_uri: 'http://localhost:8080/tools',
              code: code,
              grant_type: 'authorization_code'
            }
          };

          this.configPost = config;

          axios(config)
            .then(response => {

              if (response.status === 200) {
                resolve(response);
              }
            })
            .catch(e => {


              reject(e);

            });
        });
      }
    }
  };
</script>


<style scoped lang="scss">
  @import "@/styles/main.scss";


</style>
