<template>
    <div>
        <PageHeader link="/users" :title="user.name" label="Back to users"></PageHeader>
        <TabList :items="tabs" @setActiveTab="setActiveTab"></TabList>
        <div class="card rounded-t-none">
            <div class="card__body">
                <div v-show="isActiveTab('Details')" class="tabs__content">
                    <form @submit.prevent="submit">
                        <div class="w-full md:w-1/2 px-4">
                            <div class="form__row">
                                <label>Name</label>
                                <input type="text" v-model="user.name">
                                <Validation :errors="errors" name="name"></Validation>
                            </div>
                            <div class="form__row">
                                <label>Email</label>
                                <input required type="email" v-model="user.email">
                                <Validation :errors="errors" name="email"></Validation>
                            </div>
                        <button class="btn btn--primary" type="submit">
                        <span v-if="busy" class="loader"></span>
                        <span v-else>Save</span>
                        </button>

                        </div>
                    </form>
                </div>
                <div v-show="isActiveTab('Manage')" class="tabs__content">
                    <h2 class="text-white">Suspend user</h2>
                    <div class="" v-if="! user.is_suspended">
                        <p class="my-4">If you suspend this user they will no longer be able to login.</p>
                        <button @click="confirmSuspend" class="btn btn--danger text-white" :busy="busy" label="Delete">
                            <span v-if="suspendBusy" class="loader"></span>
                            <span v-else>Suspend</span>
                        </button>
                    </div>
                    <div v-else>
                        <p class="my-4">Enable this user to login.</p>
                        <button @click="confirmUnsuspend" class="btn btn--primary text-white" :busy="busy" label="Delete">
                            <span v-if="suspendBusy" class="loader"></span>
                            <span v-else>Unsuspend</span>
                        </button>
                    </div>     
                    <form class="w-full mt-4" method="POST" @submit.prevent="confirmDeletion">
                        <h2 class="text-white">Delete user</h2>
                        <p class="my-4">Deleting a user will remove them permanently.</p>
                        <SubmitButton class="btn--danger" :busy="busy" label="Delete"></SubmitButton>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import {mapActions} from 'vuex';
import Swal from 'sweetalert2'


export default {
    data() {
        return {
            activeTab: 'Details',
            tabs: [
                'Details',
                'Manage'
            ],
            busy: false,
            suspendBusy: false,
            errors: [],
            orginalEmail: null
        }
    },
    asyncData({ store, params }) {
        return store.dispatch('users/show', params.id)
            .then(response => {
                return { user: response }
            })
    },

    created() {
        this.orginalEmail = this.user.email;
    },

    methods: {
        ...mapActions({
                userUpdate: 'users/update',
                userDelete: 'users/delete',
                userSuspend: 'users/suspend',
                userUnsuspend: 'users/unsuspend',
            }),
        setActiveTab(tab) {
                this.activeTab = tab;
            },

            isActiveTab(tab) {
                return this.activeTab === tab;
        },

        submit(){
            if (this.busy) return false;
            this.busy = true;
            let payload = {};
            if (this.orginalEmail === this.user.email){
                payload = {
                    name: this.user.name
                }
            } else {
                payload = {
                    ...this.user
                }
            }
            this.userUpdate({id: this.user.id, user: payload})
                .catch( error => {
                    console.log('error')
                    console.log(error.response)
                    if (error.response.data.errors) {
                        this.errors = error.response.data.errors;
                    }
                })
                .finally(() => {
                    this.busy = false
                });
        },

        destroy() {
            if (this.busy) return false;
            this.busy = true;
            this.userDelete(this.user.id)
                .then(() => this.$router.push('/users'))
                .finally(()=>{
                    this.busy = false;
                })
        },

        confirmDeletion() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete them!'
            }).then((result) => {
                if (result.value) {
                    this.destroy();
                }
            })
        },


        confirmSuspend() {
            Swal.fire({
                title: 'Are you sure?',
                text: "This user will no longer be able to login to the system!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, suspend them!'
            }).then((result) => {
                if (result.value) {
                    if (this.suspendBusy) return false;
                    this.suspendBusy = true;
                    this.userSuspend({ id: this.user.id})
                        .then(()=>{
                        this.user.is_suspended = true;
                        })
                        .finally(() => {
                            this.suspendBusy = false
                        });
                    }
            })
        },

        confirmUnsuspend() {
            Swal.fire({
                title: 'Are you sure?',
                text: "This user will be able to login to the system!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, unsuspend them!'
            }).then((result) => {
                if (result.value) {
                    if (this.suspendBusy) return false;
                    this.suspendBusy = true;
                    this.userUnsuspend({ id: this.user.id})
                        .then(()=>{
                            this.user.is_suspended = false;
                        })
                        .finally(() => {
                            this.suspendBusy = false
                        });
                }
            })
        },
    },
}
</script>