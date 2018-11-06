<template>
    <div>
        <v-toolbar class="elevation-2" flat color="white">
            <v-toolbar-title>Available Containers</v-toolbar-title>
            <v-divider class="mx-2" inset vertical/>
            <v-spacer/>
            <add-dialog/>
        </v-toolbar>
        <v-data-table :headers="headers" :items="fetchReturn" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.owner }}</td>
                <td class="text-xs-right">{{ props.item.status }}</td>
                <td class="text-xs-right">{{ props.item.timeStarted }}</td>
                <td class="text-xs-right">{{ props.item.action }}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    export default {
        components: {
            'add-dialog': () => import(/* webpackChunkName: "createContainer", webpackPrefetch: true */ './AddContainerDialog.vue')
        },
        data: () => ({
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
            async listContainers() {
                let dataRequest = new Request('http://kite.yeet.pro:3000/api/docker/001416358');

                fetch(dataRequest).then((response) => {
                    console.log(response.json())
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .v-divider.v-divider--inset
        margin-left 16px !important
</style>
