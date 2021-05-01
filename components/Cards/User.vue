<template>
    <div class="card flex justify-between items-center">
        <div>
            <nuxt-link :to="`/users/${user.id}/edit`" class="p-3 font-medium text-white">{{ user.name }}</nuxt-link>
        </div>
        <div class="p-3">
            <nuxt-link :to="`/users/${user.id}/edit`"><i class="fas fa-edit"></i></nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            user: {
                type: Object,
                required: true,
            }
        }
    }
</script>