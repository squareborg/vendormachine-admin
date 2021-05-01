<template>
  <div class="flex justify-center">
    <div class="w-full md:w-2/5 my-10">
      <h1 class="text-white text-center">Reset password</h1>

      <IconLock class="mx-auto my-10" />

      <form v-if="! hasReset" @submit.prevent="submit" class="p-10 text-center">
        <h4 class="mb-5">Choose a new password</h4>

        <div class="form__row">
          <input type="password" v-model="form.password" placeholder="New password" required />
          <Validation :errors="errors" name="password"></Validation>
        </div>

        <div class="form__row">
          <input type="password" v-model="form.password_confirmation" placeholder="Confirm new password" required />
          <Validation :errors="errors" name="password_confirmation"></Validation>
        </div>

        <div>
          <button :disabled="busy" class="btn btn--primary w-full my-5">
            <span v-if="!busy">Reset password</span>
            <span v-if="busy" class="loader"></span>
          </button>
        </div>
      </form>

      <div v-if="hasReset" class="p-10 text-center">
        <h4 class="text-base font-bold">Password updated!</h4>

        <p class="text-xs text-grey-500 font-bold my-5">Your password has been updated, you can now sign in to your account.</p>

        <button class="btn btn--primary w-full my-5" @click="redirectWithAuthModal('/')">Continue</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    auth: false,

    layout: 'auth',

    components: { IconLock },

    asyncData({ query }) {
      return {
        errors: [],
        form: {
          email: query.email,
          token: query.token,
          password: '',
          password_confirmation: '',
        }
      }
    },

    data() {
      return {
        busy: false,
        hasReset: false,
      }
    },

    methods: {
      ...mapActions({
        passwordReset: 'authentication/passwordReset',
        redirectWithAuthModal: 'authentication/redirectWithAuthModal'
      }),

      reset() {
        this.form.password = '';
        this.form.password_confirmation = '';
      },

      submit() {
        if (this.busy) return;
        this.busy = true;

        this.passwordReset(this.form)
          .then(() => {
            this.$toast.show('Password reset successfully');
            this.hasReset = true;
            this.reset();
            this.$router.push('/login')
          })
          .catch(error => {
            if (error.response.data.message) {
              this.$toast.error(error.response.data.message);
            }

            if (error.response.data.errors) {
              this.errors = error.response.data.errors;
            }
          })
          .finally(() => {
            this.busy = false
          })
      }
    }
  }
</script>
