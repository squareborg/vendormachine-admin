<template>
<div class="dashboard__grid-container">
  <header class="dashboard__header border-b border-grey-200 flex flex-row  px-6 items-center">
    <i class="far fa-bell mr-4 text-xl  ml-auto"></i>
    <div>
      <span v-click-outside="hideUserMenu" @click="showUserMenu = !showUserMenu" class="font-semibold relative cursor-pointer select-none">{{ user.name || 'User' }}</span>
      <div v-if="showUserMenu" class="mt-2 py-2 w-48 bg-white border border-grey-300 rounded-lg shadow-xl absolute mt-2 right-0 mr-2">
        <span @click="logout()" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 cursor-pointer">Sign out</span>
      </div>
    </div>
  </header>
  <aside class="dashboard__sidenav border-r border-grey-200">
    <div class="dashboard__sidenav-logo">
      <i class="fa fa-store text-purple-500"></i> <span class="font-bold text-purple-500">vendor</span><span class="font-normal">machine</span>
    </div>
    <div class="dashboard__sidenav-content">
      <ul>
        <div v-if="$auth.user.is_admin">
          <nuxt-link to="/admin/vendors"><li :class="{'dashboard__sidenav-menu-item--active': isActive('admin-vendors')}" class="dashboard__sidenav-menu-item"><i :class="{'dashboard__sidenav-menu-item-icon--active': isActive('admin-vendors')}" class="fa fa-store dashboard__sidenav-menu-item-icon"></i>Vendors</li></nuxt-link>
          <nuxt-link to="/admin/settings"><li :class="{'dashboard__sidenav-menu-item--active': isActive('admin-settings')}" class="dashboard__sidenav-menu-item"><i :class="{'dashboard__sidenav-menu-item-icon--active': isActive('admin-settings')}" class="fa fa-tools dashboard__sidenav-menu-item-icon"></i>Settings</li></nuxt-link>
        </div>
        <span v-if="$auth.loggedIn && ! $auth.user.is_admin">
          <nuxt-link to="/">
            <li :class="{'dashboard__sidenav-menu-item--active': isActive('index')}" class="dashboard__sidenav-menu-item">
              <i :class="{'dashboard__sidenav-menu-item-icon--active': isActive('index')}" class="fa fa-chart-bar dashboard__sidenav-menu-item-icon"></i>Dashboard
            </li>
          </nuxt-link>
          <div v-if="$auth.user.is_vendor">
            <nuxt-link to="/vendor/edit"><li :class="{'dashboard__sidenav-menu-item--active': isActive('vendor-edit')}" class="dashboard__sidenav-menu-item"><i :class="{'dashboard__sidenav-menu-item-icon--active': isActive('vendor-edit')}" class="fa fa-store dashboard__sidenav-menu-item-icon"></i>Shop Details</li></nuxt-link>
            <nuxt-link to="/products">
            <li :class="{'dashboard__sidenav-menu-item--active': isActive('products')}" class="dashboard__sidenav-menu-item">
              <i :class="{'dashboard__sidenav-menu-item-icon--active': isActive('products')}" class="fa fa-box dashboard__sidenav-menu-item-icon"></i>Products
            </li>
          </nuxt-link>
          </div>
        </span>
      </ul>
    </div>
  </aside>
  <main class="dashboard__main">
    <div class="dashboard__main-content">
      <nuxt/>
    </div>
  </main>
</div>
</template>

<script>
  import Sidebar from '@/components/Page/Sidebar';
  import ClickOutside from 'vue-click-outside'
  import { mapActions, mapGetters } from 'vuex';

  export default {
    components: { Sidebar },

    data(){
      return {
        showUserMenu: false
      }
    },

    directives: {
      ClickOutside
    },

    created() {
      if (this.$auth.loggedIn) {        
        this.initVendor()
      }
    },

    computed: {
      user() {
        if (this.$auth.loggedIn) {
          return this.$auth.user;
        }
      }
    },

    methods: {
      ...mapActions({initVendor: 'vendor/init'}),
      
      hideUserMenu() {
        this.showUserMenu = false;
      },

      logout() {
        this.$auth.logout().then(() => {
          this.$toast.show('You have logged out')
          this.$nuxt.$emit('logout')
          this.$router.push('/login')
        })
      },

      isActive(name) {
        return this.$route.name === name
      }
    },
  }
</script>