<template>
    <v-dialog
        v-model="visible"
        persistent
        width="380">
        <v-card :color="color" dark>
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                {{ text }}
            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="white" flat @click.native="visible = false">Okay</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
    export default {
        // We want to explicitly deny setters since we will never
        // directly set variables from within the context of this
        // component SAVE FOR visibility
        computed: {
            visible: {
                get() {
                    return this.getDialogVisibility()
                },
                set(value) {
                    this.setDialogVisibility(value)
                }
            },
            color: {
                get() {
                    return this.getDialogColor()
                }
            },
            title: {
                get() {
                    return this.getDialogTitle()
                }
            },
            text: {
                get() {
                    return this.getDialogText()
                }
            }
        },
        methods: {
            ...mapGetters([
                'getDialogVisibility',
                'getDialogColor',
                'getDialogTitle',
                'getDialogText'
            ]),
            ...mapMutations(['setDialogVisibility'])
        }
    }
</script>
