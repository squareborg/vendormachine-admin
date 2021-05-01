<template>
    <div>
        <label>{{ label }}</label>
        <label class="input w-full block cursor-pointer flex justify-between">
            <input ref="fileInput" type="file" id="media" class="hidden" @change="upload">

            <span>
              <span v-if="!form.file" class="text-grey-500">{{ placeholder }}</span>
              <span v-else>{{ form.file.name }}</span>
            </span>

            <span v-if="form.file">
              <button @click.prevent="clear">
                <i class="far fa-times-circle"></i>
              </button>
            </span>
        </label>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                required: false,
            },
            placeholder: {
                type: String,
                required: false,
            }
        },

        data() {
            return {
                file: null,
            }
        },

        methods: {
            clear() {
                this.form.file = null
                this.$refs.fileInput.value = '';
            },

            upload(e) {
                let files = e.target.files;
                if (! files.length) return;

                this.form.file = files[0];
            },
        }
    }
</script>