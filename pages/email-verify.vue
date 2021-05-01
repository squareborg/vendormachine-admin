<template>
    <div class="container">

        <IconEmail class="mx-auto mt-10" />

        <div v-if="isVerifying">
            <div class="p-10 text-center">
                <h4 class="text-base font-bold">Verifying...</h4>

                <p class="text-xs text-grey-500 font-bold my-5">Please wait while we verify your account.</p>
                <span class="loader"></span>
            </div>
        </div>

        <div v-else>
 
            <div v-if="! hasVerified" class="p-10 text-center">
                <h4 class="text-base font-bold">Registration successful!</h4>

                <p class="text-xs text-grey-500 font-bold my-5">Thank you for creating an account and joining us at VendorMachine. We’ve sent a verification email to the account you registered with, please click the link within the email to verify your address.</p>
                <p class="text-xs text-grey-500 font-bold my-5 mb-10">It could take up to 10 minutes to appear in your inbox, if you can’t find the email check your spam folder or use the resend button.</p>
                <h2>Didn't recieve the email?</h2>
                <form @submit.prevent="resend">
                  <input required v-if="!email" placeholder="Please enter registered email" type="email" class="input text-center" v-model="userSuppliedEmail">
                  <button type="submit" class="btn btn--primary my-5">
                      <span v-if="!busy">Resend</span>
                      <span v-if="busy" class="loader"></span>
                  </button>
                </form>
                <div class="text-red-400 font-bold" v-if="check === false">Email is not verified check your email or resend</div>
                <button v-if="$auth.loggedIn" @click="checkVerified()" class="btn">I Verified my email</button>
            </div>

            <div v-if="hasVerified" class="p-10 text-center">
                <h4 class="text-base font-bold">Email verified!</h4>

                <p class="text-xs text-grey-500 font-bold my-5">Thank you for verifying your email address, you can now sign in to your account.</p>
            </div>

            <div v-if="hasVerificationToken && ! hasVerified" class="p-10 text-center">
                <h4 class="text-base font-bold">Verification link expired!</h4>

                <p class="text-xs text-grey-500 font-bold my-5">Looks like the link is invalid or has expired. Use the button below to resend.</p>

                <button class="btn btn--primary my-5" @click="resend">
                    <span v-if="!busy">Resend</span>
                    <span v-if="busy" class="loader"></span>
                </button>
            </div>
            <div class="flex">
            <button class="btn" v-if="$auth.loggedIn" @click="$auth.logout(); $router.push('login')">Logout</button>
            <nuxt-link to="/" v-if="$auth.loggedIn && $auth.$state.user.is_verified" class="ml-auto btn btn--secondary flex flex-row justify-center align-middle items-center"><span class="text-3xl mr-2">></span>Proceed</nuxt-link>
            <nuxt-link v-if="!$auth.loggedIn"  to="/login" class="ml-auto btn btn--secondary flex flex-row justify-center align-middle items-center"><span class="text-3xl mr-2">></span>Login</nuxt-link>
            </div>
            </div>
        </div>

    </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import IconEmail from '@/assets/svg/icon-email.svg'

  export default {
    components: {IconEmail},
    auth: false,
    layout: 'auth',
    asyncData({query}) {
      return {...query}
    },

    data() {
      return {
        busy: false,
        isVerifying: false,
        isVerified: false,
        isResending: false,
        showHomeScreenModal: false,
        check: null,
        email: null,
        userSuppliedEmail: null,
      }
    },

    created() {
      this.email = this.$route.query.email
      if (this.$auth.state.user && this.$auth.state.user.is_verified) {
        this.$router.replace('/')
      }
      if (this.$auth.state.user && this.$auth.state.user.email) {
        this.email = this.$auth.state.user.email
      }

      if (this.email && this.token) {
        this.verify();
      }
    },

    computed: {
      hasVerificationToken() {
        return this.token;
      },

      hasVerified() {
        return this.busy === false && this.isVerified;
      }
    },

    methods: {
      ...mapActions({
        verifyEmail: 'authentication/verifyEmail',
        resendVerifyEmail: 'authentication/resendVerifyEmail',
        redirectWithAuthModal: 'authentication/redirectWithAuthModal'
      }),

      resend() {
        this.busy = true;

        this.resendVerifyEmail({email: this.userSuppliedEmail ? this.userSuppliedEmail : this.email})
          .finally(() => {
            this.busy = false;
          })
      },
      
      verify() {
        this.busy = true;
        this.isVerifying = true;

        this.verifyEmail({email: this.email, token: this.token})
          .then(response => {
            this.$auth.fetchUser()
            .then(() => {
              this.isVerified = true;
            })
          })
          .catch(error => {
            this.isVerified = false;
          })
          .finally(() => {
            this.busy = false;
            this.isVerifying = false;
          })
      },

      async checkVerified() {
        console.log('checking')
        await this.$auth.fetchUser()
        if (this.$auth.state.user.is_verified) {
          this.isVerified = true;
          this.check = true;
        } else {
          this.check = false 
        }
      }
    }
  }
</script>
