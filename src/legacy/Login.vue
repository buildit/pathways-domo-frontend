<template>
  <div id="login">
    <transition name="fade">
      <div v-if="performingRequest" class="loading">
        <p>Loading...</p>
      </div>
    </transition>
    <section class="">
      <div class="content offset-md-7 col-12 col-md-4" :class="{ 'signup-form': !showLoginForm && !showForgotPassword }">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Pathways</h1>
          <label for="email1">Email</label>
          <input id="email1" v-model.trim="loginForm.email" type="text" placeholder="you@email.com"/>
          <label for="password1">Password</label>
          <input id="password1" v-model.trim="loginForm.password" type="password" placeholder="******"/>
          <button class="button" @click="login">
            Log In
          </button>
          <!--       <div class="extras">
                     <a @click="togglePasswordReset">Forgot Password</a>
                           <a @click="toggleForm">Create an Account</a>
                    </div>-->
        </form>
        <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
          <h1>Get Started</h1>
          <label for="user_first_name">First Name</label>
          <input id="user_first_name" v-model.trim="signupForm.user_first_name" type="text" placeholder="First Name"/>
          <label for="user_last_name">Last Name</label>
          <input id="user_last_name" v-model.trim="signupForm.user_last_name" type="text" placeholder="Last Name"/>
          <label for="forecast_user_id">Forecast User ID (Random Number for Now)</label>
          <input id="forecast_user_id" v-model.trim="signupForm.forecast_user_id" type="text" readonly value="1111111" placeholder="1111111"/>
          <label for="email2">Email</label>
          <input id="email2" v-model.trim="signupForm.email" type="text" placeholder="you@email.com"/>
          <label for="password2">Password</label>
          <input id="password2" v-model.trim="signupForm.password" type="password" placeholder="min 6 characters"/>
          <button class="button" @click="signup">
            Sign Up
          </button>
          <div class="extras">
            <a @click="toggleForm">Back to Log In</a>
          </div>
        </form>
        <form v-if="showForgotPassword" class="password-reset" @submit.prevent>
          <div v-if="!passwordResetSuccess">
            <h1>Reset Password</h1>
            <p>We will send you an email to reset your password</p>
            <label for="email3">Email</label>
            <input id="email3" v-model.trim="passwordForm.email" type="text" placeholder="you@email.com"/>
            <button class="button" @click="resetPassword">
              Submit
            </button>
            <div class="extras">
              <a @click="togglePasswordReset">Back to Log In</a>
            </div>
          </div>
          <div v-else>
            <h1>Email Sent</h1>
            <p>check your email for a link to reset your password</p>
            <button class="button" @click="togglePasswordReset">
              Back to login
            </button>
          </div>
        </form>
        <transition name="fade">
          <div v-if="errorMsg !== ''" class="error-msg">
            {{ errorMsg }}
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>
<script>
    import authentication from '../authentication';

    export default {
        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                signupForm: {
                    user_first_name: '',
                    user_last_name: '',
                    forecast_user_id: '',
                    email: '',
                    password: ''
                },
                passwordForm: {
                    email: ''
                },
                showLoginForm: true,
                showForgotPassword: false,
                passwordResetSuccess: false,
                performingRequest: false,
                errorMsg: ''
            };
        },
        methods: {
            toggleForm() {
                this.errorMsg = '';
                this.showLoginForm = !this.showLoginForm;
            },
            togglePasswordReset() {
                if (this.showForgotPassword) {
                    this.showLoginForm = true;
                    this.showForgotPassword = false;
                    this.passwordResetSuccess = false;
                } else {
                    this.showLoginForm = false;
                    this.showForgotPassword = true;
                }
            },
            login() {
                this.$emit('setLoadingState', true);

                fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
                    this.$store.commit('setCurrentUser', authentication.getUserProfile());
                    this.$store.dispatch('fetchUserProfile');
                    this.$emit('setLoadingState', false);
                    this.$router.push('/');
                }).catch(err => {
                    console.log(err);
                    this.$emit('setLoadingState', false);
                    this.errorMsg = err.message;
                });
            },
            signup() {
                this.$emit('setLoadingState', true);

                fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
                    this.$store.commit('setCurrentUser', user.user);

                    // create user obj
                    fb.usersCollection.doc(user.user.uid).set({
                        user_first_name: this.signupForm.user_first_name,
                        user_last_name: this.signupForm.user_last_name,
                        forecast_user_id: this.signupForm.forecast_user_id,
                        skills: {}
                    }).then(() => {
                        this.$store.dispatch('fetchUserProfile');
                        this.$emit('setLoadingState', false);
                        this.$router.push('/');
                    }).catch(err => {
                        console.log(err);
                        this.$emit('setLoadingState', false);
                        this.errorMsg = err.message;
                    });
                }).catch(err => {
                    console.log(err);
                    this.$emit('setLoadingState', false);
                    this.errorMsg = err.message;
                });
            },
            resetPassword() {
                this.$emit('setLoadingState', true);

                fb.auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
                    this.$emit('setLoadingState', false);
                    this.passwordResetSuccess = true;
                    this.passwordForm.email = '';
                }).catch(err => {
                    console.log(err);
                    this.$emit('setLoadingState', false);
                    this.errorMsg = err.message;
                });
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "@/styles/main.scss";


    .error-msg {
        @include deepShadow(8, colorViz(3), 20%);
        margin-top: space(3);
        padding: space(4);
    }

    form {
        button {
            @include deepShadow(4, colorViz(2), 20%);
            font-size: 1.25rem;
            font-weight: bold;
            padding: space(2) space(3);


            &:active {
                @include buttonshadowActive(colorViz(2), 20%);
            }
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
        }

        input {
            display: block;
            width: 100%;
            margin-bottom: 1rem;
            font-size: 16px;
            padding: 10px;
            outline: 0;
            border: 1px solid #e6ecf0;
            border-radius: 3px;

            &:focus {
                box-shadow: 0 0 5px 0 rgba($dark, 0.2);
            }
        }

        textarea {
            resize: none;
            border: 1px solid #e6ecf0;
            outline: 0;

            width: 100%;
            padding: 10px;
            font-size: 16px;
        }
    }

    #login {
        background: $white;


        .signup-form {
            padding-top: 20vh;

            @media screen and (max-width: 742px) {
                padding-top: 10vh;
            }
        }

        .content {
            @include deepShadow(32, colorViz(0), 20%);
            margin-top: space(6);
            margin-bottom: space(6);
            padding: space(5) space(5);


            h1 {
                margin-bottom: 2rem;
            }

            form {

            }

            .extras {
                font-size: 0.875rem;
                margin-top: space(6);

                a {
                    display: block;
                    margin-bottom: 0.5rem;
                }
            }

            .password-reset {
                h1 {
                    margin-bottom: 1rem;
                }

                p {
                    margin-bottom: 2rem;
                }
            }


        }
    }
</style>
