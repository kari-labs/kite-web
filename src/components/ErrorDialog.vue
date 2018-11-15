<template>
    <v-dialog
        v-model="visibility"
        persistent
        width="380">
        <v-card color="red" dark>
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                {{ message }}
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
            },
            message: {
                get() {
                    return this.getErrorText()
                },
                set(message) {
                    this.setErrorText(message)
                }
            },
            title: {
                get() {
                    return this.getErrorTitle()
                },
                set(value) {
                    this.setErrorTitle()
                }
            }
        },
        methods: {
            ...mapGetters([
                'getErrorVisibility',
                'getErrorText',
                'getErrorTitle'
            ]),
            ...mapMutations([
                'setErrorVisibility',
                'setErrorText',
                'setErrorTitle'
            ])
        }
    }
</script>
