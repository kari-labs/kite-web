<template>
    <!-- If the dialog isn't persistent, we will get a Vue warning
        This can be fixed by adding a watcher, or we can leave it
        as is. -->
    <v-dialog
        v-model="visible"
        persistent
        width="380">
        <v-card color="green darken-3" dark>
            <v-card-title>
                <span class="headline">Container Added</span>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                The container was added successfully.
            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="white" flat @click.native="closeDialog">Okay</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: [
            'visible'
        ],
        methods: {
            closeDialog() {
                this.$emit('closeDialog', false)
            }
        },
        model: {
            prop: 'visible',
            event: 'closeDialog'
        }
    }
</script>
