<template>
    <div>

        <div class="flex items-center">
            <h1 class="w-1/2 text-2xl text-white">Users</h1>
            <div class="w-1/2 text-right">
                <button @click="$modal.show('add-user')" class="btn btn--primary">Add user</button>
            </div>
        </div>

        <div class="flex flex-wrap flex-col-reverse md:flex-row items-center justify-end -mx-2 my-4 md:my-6">
            <div class="w-full md:w-1/3 px-2 text-right">
                <SearchField @search="executeSearch" placeholder="Search users" />
            </div>
        </div>

        <div v-if="hasItems && ! busy" class="flex flex-wrap -mx-2">
            <div class="flex w-full px-2 my-1" v-for="user in users">
                <User :user="user" class="flex-1" />
            </div>
            <div class="w-full text-center">
                <Pagination class="w-full mt-6 mx-auto" v-if="pagination.total_pages > 1" :page="pagination.current_page" :per-page="pagination.per_page" :records="pagination.total" @paginate="setPage"></Pagination>
            </div>
        </div>

        <div v-if="! hasItems && ! busy" class="card my-4">
            <div class="card__body text-center">
                <p>No users found.</p>
            </div>
        </div>
    </div>
</template>

<script>
    import SearchField from "@/components/Forms/SearchField";
    import User from "@/components/Cards/User";
    import Pagination from 'vue-pagination-2';

    export default {
        components: { User, Pagination, SearchField },

        watchQuery: true,

        async asyncData({ store, query }) {
            let response = await store.dispatch('users/index', { ...query });
            return {
                ...query,
                users: response.data,
                pagination: response.meta.pagination,
            }
        },

        computed: {
            hasItems() {
                return this.users ? this.users.length > 0 : false;
            }
        },

        transition (to, from) {
            if (from && from.name === 'users-slug-edit') return 'slide-right';
        },

        data() {
            return {
                busy: false,
                users: [],
            }
        },

        methods: {
            executeSearch(term) {
                this.$router.push({ path: '/users', query: { s: term }});
            },

            setPage(page) {
                this.$router.push({ path: '/users', query: { s: this.s, page: page }});
            }
        }
    }
</script>