export default function ({ app }) {
  if (app.$auth.loggedIn && app.context.route.name === 'login') {
      // return app.router.push('/dashboard')
  }
}
