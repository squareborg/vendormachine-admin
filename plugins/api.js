import auth from '~/api/auth'
import products from '~/api/products'
import vendors from '~/api/vendors'
import users from '~/api/users'

export default (ctx, inject) => {
  const api = {
    auth: auth(ctx.$axios),
    products: products(ctx.$axios),
    vendors: vendors(ctx.$axios),
    users: users(ctx.$axios),
  };

  inject('api', api);
}
