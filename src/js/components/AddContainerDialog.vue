<template>
    <v-dialog v-model="createContainer" lazy max-width="500px">
        <v-btn class="mb-2" slot="activator" color="primary" dark>New Container</v-btn>
        <v-card>
            <v-card-title>
                <span class="headline">New Container</span>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field v-model="blank" label="Student ID"/>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="primary" flat @click.native="close">Cancel</v-btn>
                <v-btn color="primary" flat @click.native="create">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {

    }
</script>

<style>

</style>