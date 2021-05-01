<template>
  <div class="tabs">
    <a v-for="item in items" class="tabs__item" :class="isActiveTab(item)" @click="setTab(item)">{{ item }}</a>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      },

      initActive: {
        type: String,
        required: false
      }
    },

    data() {
      return {
        activeTab: null,
      }
    },

    created() {
      this.activeTab = this.initActive ? this.initActive : this.items[0];
    },

    methods: {
      isActiveTab(tab) {
        return this.activeTab === tab ? 'tabs__item--is-active' : null;
      },

      setTab(tab) {
        this.activeTab = tab;
        this.$emit('setActiveTab', this.activeTab);
      }
    }
  }
</script>
