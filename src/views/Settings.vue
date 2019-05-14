<template>
  <section id="settings">
    <div class="col1">
      <h3>Settings</h3>
      <p>Update your profile</p>

      <transition name="fade">
        <p
          v-if="showSuccess"
          class="success"
        >
          profile updated
        </p>
      </transition>

      <form @submit.prevent>
        <label for="user_first_name">First Name</label>
        <input
          id="user_first_name"
          v-model.trim="user_first_name"
          type="text"
          :placeholder="userProfile.user_first_name"
        />

        <label for="user_last_name">Last Name</label>
        <input
          id="user_last_name"
          v-model.trim="user_last_name"
          type="text"
          :placeholder="userProfile.user_last_name"
        />

        <button
          class="button"
          @click="updateProfile"
        >
          Update Profile
        </button>
      </form>
    </div>
  </section>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                user_first_name: '',
                user_last_name: '',
                showSuccess: false
            };
        },
        computed: {
            ...mapState(['userProfile'])
        },
        methods: {
            updateProfile() {
                this.$store.dispatch('updateProfile', {
                    user_first_name: this.user_first_name !== '' ? this.user_first_name : this.userProfile.user_first_name,
                    user_last_name: this.user_last_name !== '' ? this.user_last_name : this.userProfile.user_last_name
                });

                this.user_first_name = '';
                this.user_last_name = '';

                this.showSuccess = true;

                setTimeout(() => { this.showSuccess = false; }, 2000);
            }
        }
    };
</script>


<style scoped lang="scss">
    @import "@/styles/main.scss";

    section {
        display: flex;
        max-width: 1200px;
        margin: 0 auto;

        @media screen and (max-width: 742px) {
            display: block;
        }
    }

    .col1,
    .col2 {
        flex-grow: 1;
        flex-basis: 0;
        padding: 1rem;

        @media screen and (max-width: 742px) {

        }
    }


    form {
        label {
            display: block;
            font-size: 16px;
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
            height: 100px;
            width: 100%;
            padding: 10px;
            font-size: 16px;
        }
    }

    #settings {
        padding: 2rem 0;

        .col1 {
            max-width: 600px;
            margin: 5vh auto 0;
            background: $white;
            padding: 2rem;
        }

        form {
            margin-top: 3rem;
        }

        .success {
            color: $success;
            margin: 0.5rem 0 -2rem;
        }

        .button {
            margin-top: 2rem;
        }
    }

</style>
