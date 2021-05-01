<template>
    <div class="flex justify-center">
        <form class="w-full md:w-2/5 my-10" @submit.prevent="submit">
            <img src="/images/logo.png" width="240" class="mx-auto mb-10" />

            <div class="form__row">
                <input v-model="form.email" type="email" placeholder="Email address"  autofocus />
                <Validation :errors="errors" name="email"></Validation>
            </div>

            <div class="form__row">
                <input v-model="form.password" type="password" placeholder="Password"  />
                <Validation :errors="errors" name="password"></Validation>
            </div>

            <SubmitButton class="w-full" :busy="busy" label="Login"></SubmitButton>

            <div class="mt-2 mb-5 text-center">
                <nuxt-link to="/register" class="text-sm no-underline text-teal-500 block">Register</nuxt-link>
                <nuxt-link to="/password/email" class="text-sm no-underline text-teal-500">Forgotten password?</nuxt-link>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import Logo from '@/assets/svg/logo.svg';

    export default {
        auth: false,

        layout: 'auth',

        components: { Logo },

        data() {
            return {
                showPassword: false,
                errors: [],
                form: {
                    email: "",
                    password: "",
                },
                busy: false
            }
        },

        transition(to, from) {
            if (from && from.name === 'password-email') return 'slide-right';
            if (from && from.name === 'password-reset') return 'slide-right';
        },

        methods: {
            ...mapActions({
                login: 'authentication/login'
            }),

            submit() {
                if (this.busy) return;
                this.busy = true;

                this.login(this.form)
                    .catch(error => {
                        if (error.response.status === 401) {
                            this.$toast.error('Incorrect email/password, try again');
                            return;
                        }

                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors;
                            return;
                        }

                        if (error.response.data && ! error.response.data.is_verified) {
                            this.$router.push('/email-verify');
                        }
                    })
                    .finally(response => {
                        this.busy = false;
                    })
            }
        }
    }
</script>
