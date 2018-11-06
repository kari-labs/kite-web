<template>
    <v-alert :value="alert" type="error" icon="warning" transition="slide-y-transition">
        Not Implemented
    </v-alert>
</template>

<script>
    export default {
        props: {
            alert: false
        }
    }
</script>

<style lang="stylus" scoped>
    .v-alert.error
        margin-top 0px
</style>
