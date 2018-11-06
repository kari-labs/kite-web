<template>
    <v-dialog v-model="showDialog" lazy max-width="500px">
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
                <v-btn color="primary" flat @click.native="showDialog = false">Cancel</v-btn>
                <v-btn color="primary" flat :disabled="!formValid" @click.native="createContainer">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        methods: {
            createContainer() {
                if(this.$refs.form.validate()) {
                    this.implementVisible = true
                }
            }
        },
        data: () => ({
            studentID: '',
            showDialog: false,
            implementVisible: false,
            formValid: true,
            idRules: [
                v => !!v || 'Student ID is required',
                // Matches anything that is a digit
                // because student ids only have digits
                v => /\d/.test(v) || 'Student IDs may only contain numbers'
            ]
        }),
        components: {
            'error-alert': () => import(/* webpackChunkName: "alertHelpers", webpackPrefetch: true */ './ErrorAlert.vue')
        }
    }
</script>