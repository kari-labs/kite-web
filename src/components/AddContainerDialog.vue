<template>
    <div>
        <v-dialog v-model="showDialog" persistent lazy max-width="500px">
            <v-btn class="mb-2" slot="activator" color="primary" dark>New Container</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">New Container</span>
                </v-card-title>
                <v-divider/>
                <error-alert :alert="!formValid" text="Please correct the errors and try again"/>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-form ref="form" v-model="formValid" lazy-validation>
                                    <v-text-field 
                                        v-model="newContainerID"
                                        :rules="idRules"
                                        :disabled="loading || errorVisibility"
                                        label="Student ID"
                                        required/>
                                </v-form>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary" flat :disabled="loading || errorVisibility" @click.native="closeDialog">Cancel</v-btn>
                    <v-btn color="primary" flat :disabled="!formValid || loading || errorVisibility" @click.native="createContainer">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <progress-dialog v-model="loading" @visChange="onProgressChange"/>
        <success-dialog v-model="responseOkay" @closeDialog="onResponse"/>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
    export default {
        model: {
            event: 'triggerRefresh'
        },
        computed: {
            errorVisibility: {
                get() {
                    return this.getErrorVisibility()
                },
                set(value) {
                    this.setErrorVisibility(value)
                }
            }
        },
        methods: {
            ...mapActions(['addNewContainerAsync']),
            ...mapGetters(['getErrorVisibility']),
            ...mapMutations([
                'setErrorVisibility',
                'setErrorText',
                'setErrorTitle'
            ]),
            // Sends a POST request to create a container with
            // the given student ID
            createContainer() {
                if(this.$refs.form.validate()) {
                    this.loading = true
                    this.addNewContainerAsync(this.newContainerID).then(() => {
                        this.responseOkay = true
                        this.closeDialog()
                        this.loading = false
                    }).catch(error => {
                        this.showIncompleteError()
                        this.loading = false
                    })
                }
            },
            // Closes the dialog and resets the form
            closeDialog() {
                this.showDialog = false
                this.$refs.form.reset()
            },
            onProgressChange(val) {
                this.loading = val
            },
            showIncompleteError() {
                this.setErrorTitle('Request Incomplete')
                this.setErrorText('The action you just tried to perform did not complete. The KITE service may be unavailable. Please try your request again in a few minutes.')
                this.errorVisibility = true
            },
            onResponse() {}
        },
        data: () => ({
            newContainerID: '',
            showDialog: false,
            loading: false,
            responseOkay: false,
            formValid: true,
            idRules: [
                // If the input is empty, null or false
                v => !!v || 'Student ID is required',
                // Matches anything that is a digit
                // because student ids only have digits
                v => /\d/.test(v) || 'Student IDs may only contain numbers'
            ]
        }),
        components: {
            'error-alert': () => import(/* webpackChunkName: "alertHelpers", webpackPrefetch: true */ '@/components/ErrorAlert.vue'),
            'success-dialog': () => import(/* webpackChunkName: "dialogHelpers" */ '@/components/SuccessDialog.vue'),
            'progress-dialog': () => import(/* webpackChunkName: "dialogHelpers", webpackPrefetch: true */ '@/components/ProgressDialog.vue')
        }
    }
</script>