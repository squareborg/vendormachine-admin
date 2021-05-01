<template>
  <div class="flex justify-center">
    <div class="w-full md:w-2/5 my-10">
      <h1 class="text-white text-center">Forgot password</h1>

      <IconLock class="mx-auto my-10" />

      <form @submit.prevent="submit" class="p-10 text-center">
        <h4 class="mb-5">Reset your password</h4>

        <input type="email" v-model="form.email" placeholder="Email address" required />

        <p>Enter the email address you registered with and we’ll send you instructions on how to reset your password</p>

        <div>
          <button :disabled="busy" class="btn btn--primary w-full my-5">
            <span v-if="!busy">Send reset link</span>
            <span v-if="busy" class="loader"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    auth: false,

    layout: 'auth',

    components: { IconLock },

    data() {
      return {
        busy: false,
        form: {
          email: '',
          domain: 'admin',
        },
      }
    },

    transition (to, from) {
      if (from && from.name === 'login') return 'slide-left';
    },

    methods: {
      ...mapActions({
        passwordEmail: 'authentication/passwordEmail'
      }),

      reset() {
        this.form.email = '';
      },

      submit() {
        if (this.busy) return;
        this.busy = true;

        this.passwordEmail(this.form)
          .then(() => {
            this.reset();
          })
          .finally(() => {
            this.busy = false
          });
      }
    }
  }
</script>
