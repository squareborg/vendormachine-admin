<template>
    <section class="onboarding__container flex h-screen" v-if="!hasVendorAccount">
        <main class="onboarding__main w-full bg-white p-16">
        <form @submit.prevent="submit">
          <h1 class="text-2xl font-semibold">Complete your Vendor account</h1>
          <div class="mt-16">
            <div v-if="progress === 1">
              <h2 class="font-normal mb-4">It starts with a <b>name</b></h2>
              <div class="lg:w-1/2">
                <input class="onboarding__input" type="text" name="name" v-model="vendor.name" placeholder="Shop Name">
              </div>
            </div>
            <div v-if="progress === 2">
              <h2 class="font-normal mb-4">What does <b>{{ vendor.name }}</b> sell?</h2>
              <div class="lg:w-1/2 ">
                <input required class="onboarding__input" type="text" name="name" v-model="vendor.name" placeholder="Shop Name">
              </div>
            </div>
          </div>
          <div class="flex flex-row mt-8 justify-between ">
            <span v-if="progress > 1" @click="backClicked" class="cursor-pointer btn btn--secondary onboarding__back-button flex flex-row justify-center align-middle items-center"><span class="text-3xl mr-2 font-hairline"><</span>Back</span>
            <span value="Finish" type="submit" v-if="progress === 1" @click="submitClicked" class="ml-auto cursor-pointer btn btn--primary onboarding__progress-button flex flex-row justify-center align-middle items-center"><span class="text-3xl mr-2 font-hairline"></span>
            <span class="loader" v-if="busy">
            </span>
            <span v-else>
            Finish
            </span>
            </span>
            <span v-if="progress < lastProgress" @click="proceedClicked" :class="{'onboarding__proceed-button--click': clicked}" class="ml-auto cursor-pointer btn btn--secondary onboarding__proceed-button flex flex-row justify-center align-middle items-center"><span class="text-3xl mr-2 font-hairline">></span>Proceed</span>
          </div>
        </form>
      </main>
      <aside class="onboarding__aside hidden lg:block w-full p-4">
        
      </aside>
    </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
    data() {
      return {
        busy: false,
        progress: 1,
        lastProgress: 1,
        clicked: false,
        vendor: {
          name: "",
        }
      }
    },

    computed: {
      
      ...mapState({
        vendorState: 'vendor/account'
      }),
      
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
        .then(async() =>{
          await this.$auth.fetchUser()
          this.$toast.show('Saved')
        })
        .finally(()=>{
          this.busy = false
        })
      }
    },
}
</script>