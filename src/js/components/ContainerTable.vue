<template>
    <div>
        <v-toolbar class="elevation-2" flat color="white">
            <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp">Available Containers</v-toolbar-title>
            <v-toolbar-title v-else>Containers</v-toolbar-title>
            <v-divider class="mx-2" inset vertical/>
            <v-spacer/>
            <add-dialog/>
        </v-toolbar>
        <v-data-table 
            :headers="headers"
            :items="fetchReturn"
            :loading="tableLoading"
            hide-actions
            class="elevation-1">
            <v-progress-linear slot="progress" color="primary" indeterminate/>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.owner }}</td>
                <td class="text-xs-right">{{ props.item.status }}</td>
                <td class="text-xs-right">{{ props.item.timeStarted }}</td>
                <td class="text-xs-right">{{ props.item.action }}</td>
            </template>
            <template slot="no-data">
                <error-alert :alert="true" text="There are no active containers."/>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    export default {
        components: {
            'add-dialog': () => import(/* webpackChunkName: "createContainer", webpackPrefetch: true */ './AddContainerDialog.vue'),
            'error-alert': () => import(/* webpackChunkName: "alertHelpers" */ './ErrorAlert.vue')
        },
        mounted() {
            // Only runs when the template is fully rendered
            this.$nextTick(() => {
                console.log('Component Loaded!')
                this.listContainers()
            })
        },
        data: () => ({
            tableLoading: true,
            headers: [
                {
                    text: 'Owner',
                    align: 'left',
                    sortable: true,
                    value: 'owner'
                },
                {
                    text: 'Status',
                    sortable: true,
                    value: 'status'
                },
                {
                    text: 'Time Started',
                    sortable: false,
                    value: 'timeStart'
                },
                {
                    text: 'Action',
                    sortable: false
                }
            ],
            fetchReturn: []
        }),
        methods: {
            listContainers() {
                return import(/* webpackChunkName: "mixins" */ '../mixins/api.js').then(({ default: Kite }) => {
                    const headers = new Headers()
                    const init = {
                        method: 'GET',
                        headers,
                        mode: 'cors',
                        cache: 'no-store'
                    }
                    let request = new Request(`${Kite}api/docker`, init)

                    fetch(request).then(async(response) => {
                        // Request has loaded successfully, disable loader bar
                        this.tableLoading = false
                        console.log(await response.json())
                    })
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .v-divider.v-divider--inset
        margin-left 16px !important
    .v-alert.error
        margin-bottom 0px !important
</style>
