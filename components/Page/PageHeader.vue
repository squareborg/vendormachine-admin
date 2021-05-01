<template>
  <div class="page-header">
    <div class="w-1/2">
      <span class="text-sm mb-5 block cursor-pointer" @click="back">
        <i class="fas fa-chevron-left"></i>
        {{ label }}
      </span>
      <h1 class="text-white">{{ title }}</h1>
    </div>
    <div class="w-1/2 text-right">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['link', 'title', 'label'],

    methods: {
      back() {
        if (this.link) {
          this.$router.push(this.link)
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>
