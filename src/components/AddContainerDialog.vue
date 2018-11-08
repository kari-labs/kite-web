<template>
    <div>
        <v-dialog v-model="showDialog" persistent lazy max-width="500px">
            <v-btn class="mb-2" slot="activator" color="primary" dark>New Container</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">New Container</span>
                </v-card-title>
                <v-divider/>
                <error-alert :alert="implementVisible && formValid" text="Not implemented"/>
                <error-alert :alert="!formValid" text="Please correct the errors and try again"/>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-form ref="form" v-model="formValid" lazy-validation>
                                    <v-text-field 
                                        v-model="studentID"
                                        :rules="idRules"
                                        :disabled="loading"
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
                    <v-btn color="primary" flat :disabled="loading" @click.native="closeDialog">Cancel</v-btn>
                    <v-btn color="primary" flat :disabled="!formValid || loading" @click.native="createContainer">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <progress-dialog v-model="loading" @visChange="onProgressChange"/>
    </div>
</template>

<script>
    export default {
        methods: {
            // Sends a POST request to create a container with
            // the given student ID
            createContainer() {
                // If the form is valid
                if(this.$refs.form.validate()) {
                    this.loading = true
                    this.implementVisible = true
                }
            },
            // Closes the dialog and resets the form
            closeDialog() {
                this.showDialog = false
                this.$refs.form.reset()
            },
            onProgressChange(val) {
                this.loading = val
            }
        },
        data: () => ({
            studentID: '',
            showDialog: false,
            loading: false,
            implementVisible: false,
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
            'progress-dialog': () => import(/* webpackChunkName: "dialogHelpers", webpackPrefetch: true */ '@/components/ProgressDialog.vue')
        }
    }
</script>