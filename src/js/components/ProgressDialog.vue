<template>
    <v-dialog
        v-model="visible"
        persistent
        width="300">
        <v-card color="primary" dark>
            <v-card-text>
                Processing your request
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"/>
            </v-card-text>
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
                this.$emit('visChange', val)
            }
        },
        model: {
            prop: 'visible',
            event: 'visChange'
        },
        watch: {
            // Can't use () => or everything catches on fire
            visible: function(val) {
                if(!val) return
                setTimeout(function() {
                    this.updateVisibility(false)
                }.bind(this), 4000)
            }
        }
    }
</script>
