<template>
    <v-dialog
        v-model="visible"
        persistent
        width="380">
        <v-card color="red" dark>
            <v-card-title>
                <span class="headline">Error</span>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                There was a server error while processing your request.
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
            updateVisibility(val) {
                this.$emit('responseError', val)
            },
            closeDialog() {
                this.$emit('responseError', false)
            }
        },
        model: {
            prop: 'visible',
            event: 'responseError'
        }
    }
</script>
