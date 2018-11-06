<template>
    <v-navigation-drawer clipped app class="accent" v-model="drawer">
        <v-list dense class="pt-0">
            <v-list-tile v-for="item in items" :key="item.title" @click="handleRoute(item.route)">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        data: () => ({
            items: [
                {
                    title: 'Home',
                    icon: 'dashboard',
                    route: 'listContainers'
                },
                {
                    title: 'Report Bug',
                    icon: 'bug_report'
                }
            ],
            drawer: false
        }),
        methods: {
            handleRoute(routeName) {
                if(routeName) this.$router.push({ name: routeName})
            }
        }
    }
</script>