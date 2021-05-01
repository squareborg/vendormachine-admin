<template>
  <div class="">
      <VendorOnboarding v-if="!hasVendorAccount" />
      <section class="page" v-else>
        <h1>{{vendor.name}}</h1>
      </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import VendorOnboarding from '@/components/Onboarding/VendorOnboarding'

  export default {
    components: {
      VendorOnboarding
    },

    data() {
      return {
      }
    },

    created() {
      if(this.$auth.$state.user.is_admin) {
        this.$router.push('/admin')
      }
    },

    async fetch() {
      await this.me()
    },

    computed: {
      
      ...mapState({
        vendorState: 'vendor/account'
      }),

      vendor() {
        return this.$store.state.vendor.account
      },
      
      hasVendorAccount() {
        return this.$auth.user.is_vendor
      }

    },

    methods: {
      ...mapActions({
        me: 'vendor/get',
        storeVendor: 'vendor/store'
      }),

      backClicked() {
        this.progress--
      },
      
      proceedClicked() {
        this.progress++
        this.clicked = true;
        setTimeout(()=>{
          this.clicked = false;
        }, 300)
      },

      submitClicked() {        
        if (this.busy) {return false}
        this.busy = true
        this.storeVendor(this.vendor)
        .then(() =>{
          this.$toast('Saved')
        })
        .finally(()=>{
          this.busy = false
        })
      }
    },
  }
</script>