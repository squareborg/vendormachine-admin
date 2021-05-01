export default {
    async login({commit}, payload) {
        return await this.$auth.loginWith('local', {data: payload})
            .then(() => {
                this.$toast.show('Welcome back');
                this.$router.push('/');
            });
    },

    async logout({commit}) {
        this.$auth.logout()
            .then(() => {
                this.$toast.show('You have logged out');
                this.$router.push('/');
            })
    },

    async register({commit}, payload) {
        return await this.$api.auth.register(payload)
            .then(async() => {
                return await this.$auth.loginWith('local', {data: payload})
                .then(() => {
                    this.$toast.show('Registration Successful');
                    this.$router.push({ path: '/email-verify', query:{ email: payload.email }});
                }); 
            });
    },

    async verifyEmail({ commit }, payload) {
        return await this.$api.auth.verify.post(payload);
    },

    async resendVerifyEmail({ commit }, payload) {
        return await this.$api.auth.verify.resend(payload)
            .then(response => {
                this.$toast.show('Verification email sent');
            })
    },

    async passwordEmail({ commit }, payload) {
        return await this.$api.auth.password.email(payload)
            .then(response => {
                this.$toast.show('Password reset email sent');
                return response;
            })
    },

    async passwordReset({ commit }, payload) {
        return await this.$api.auth.password.reset(payload)
    }
}
