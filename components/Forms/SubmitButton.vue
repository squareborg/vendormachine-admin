<template>
    <button :disabled="busy" class="btn btn--primary" @click="submit">
        <span v-if="busy" class="loader"></span>
        <span v-else>{{ label }}</span>
    </button>
</template>

<script>
    export default {
        props: {
            busy: {
                type: Boolean,
                required: true,
            },

            label: {
                type: String,
                required: true,
            }
        },

        methods: {
            submit() {
                this.$emit('click')
            }
        }
    }
</script>