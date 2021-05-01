<template>
  <modal :name="modal" width="600" height="auto" :click-to-close="true" :scrollable="true" :adaptive="true">
    <div class="modal">
      <h2 class="mt-6">Lets give it a name</h2>

      <form class="w-full" method="POST" @submit.prevent="submit">
        <div class="form__row">
          <label>Name</label>
          <input type="text" v-model="form.name" required />
          <Validation :errors="errors" name="name"></Validation>
        </div>

        <button class="btn btn--primary">
          <span class="loader" v-if="busy"></span>
          <span v-else>Save</span>
        </button>
      </form>
    </div>
  </modal>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        modal: 'add-vendor',
        busy: false,
        errors: [],
        form: {
          name: null,
          tagline: null,
        },
      }
    },

    methods: {
      ...mapActions({
        store: 'vendors/store'
      }),

      submit() {
        if (this.busy) return false;
        this.busy = true;
        this.store(this.form)
          .then((response) => {
            console.log(response);
            
            this.$modal.hide(this.modal);
            this.$router.push(`/vendors/${response.id}/edit`)
          })
          .catch(error => {
            if (error.response && error.response.data.errors) {
              this.errors = error.response.data.errors;
            }
          })
          .finally(()=> {
            this.busy = false;  
          })
      }
    }
  }
</script>
