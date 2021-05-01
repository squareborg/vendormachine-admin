export default function ({ app, redirect }) {        
    if (app.$auth.state.loggedIn && ! app.$auth.state.user.is_verified) {        
        if (app.context.route.name !== 'email-verify' && app.context.route.name !== 'login') {
            redirect('/email-verify')
        }
    }
  }