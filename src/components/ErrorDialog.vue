<template>
    <v-dialog
        v-model="visibility"
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
                <v-btn color="white" flat @click.native="visibility = false">Okay</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
    export default {
        computed: {
            visibility: {
                get() {
                    return this.getErrorVisibility()
                },
                set(value) {
                    this.setErrorVisibility(value)
                }
            }
        },
        methods: {
            ...mapGetters(['getErrorVisibility']),
            ...mapMutations(['setErrorVisibility'])
        }
    }
</script>
