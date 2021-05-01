const TEXT_NETWORK_ERROR = 'An network error occurred, try again.';
const TEXT_GENERAL_ERROR = 'An error occurred, try again.';

const networkErrors = [500];
const generalErrors = [400];
const authenticationErrors = [401,403];

export default (ctx) => {
  ctx.$axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log(error.response.status);
      let message;
      let status = error.response.status;

      if (generalErrors.includes(status)) {
        message = TEXT_GENERAL_ERROR;
      } else if (networkErrors.includes(status)) {
        message = TEXT_NETWORK_ERROR;
      } else if (authenticationErrors.includes(status)) {
        ctx.app.router.push('/login')
      }

      ctx.app.$toast.error(message);
      return Promise.reject(error);
    }
  );
}
