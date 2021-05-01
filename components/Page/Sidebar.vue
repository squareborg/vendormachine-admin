<template>
  <aside class="page__sidebar sidebar">
    <div class="sidebar__brand px-10 py-12 text-center">
      <Logo width="120" height="30" class="ml-1" />
    </div>

    <nav class="nav">
      <div class="nav__link flex">
        <i class="nav__icon fas fa-store mr-1"></i>
        <select v-model="selectedVendor">
          <option :value="vendor.id" :key="vendor.id" v-for="vendor in vendors">
            {{vendor.name}}
          </option>
        </select>
      </div>
      <nuxt-link class="nav__link" to="/dashboard/products">
        <i class="nav__icon fas fa-box mr-1"></i>
        Products
      </nuxt-link>

      <nuxt-link class="nav__link" to="/users">
        <i class="nav__icon fas fa-users mr-1"></i>
        Users
      </nuxt-link>
    </nav>

    <div class="sidebar__user mt-auto">
      <span class="avatar avatar--small mr-2">{{ user.initials }}</span>
      {{ user.name }}

      <button class="mt-5" @click="logout">
        <i class="nav__icon mr-2 fas fa-power-off"></i> Log out
      </button>
    </div>
  </aside>
</template>

<script>
  import Logo from '@/assets/svg/logo-text.svg';
import { mapActions, mapGetters } from 'vuex';


  export default {
    components: { Logo },

    computed: {
      ...mapGetters({ activeVendor: 'vendors/activeVendor'}),
      vendors() {
        return this.$store.state.vendors.list
      },
      
      selectedVendor: {
        get() {
          if (this.activeVendor) {
            return this.activeVendor.id
          }
        },
        set(newValue) {
          return this.$store.dispatch('vendors/setActive', newValue)
        }
      }
    },
    data() {
      return {
        user: {
          name: 'Phill Clarence',
          initials: 'PC',
        }
      }
    },
    
    created() {           
      if (this.activeVendor) {

        this.selectedVendor = this.activeVendor.id;
      }
    },

    methods: {
      logout() {
        this.$auth.logout()
          .then(() => {
            this.$toast.show('You have logged out');
            this.$nuxt.$emit('logout');
            this.$router.push('/login');
          })
      },

      isActive(name) {
        return this.$route.name === name;
      }
    }
  }
</script>
