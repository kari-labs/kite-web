<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field class="product-sans" prepend-icon="person" name="login" label="Login" type="text" v-model="usrName" :rules="usrNameRules" required></v-text-field>
        <v-text-field id="password" class="product-sans" prepend-icon="lock" name="password" label="Password" type="password" v-model="pass" :rules="passRules" required></v-text-field>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="product-sans" :disabled="!valid" @click="submit" color="primary">Login</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
    export default {
        data() {
            return {
                valid: true,
                usrName: '',
                usrNameRules: [
                    v => !!v || 'Username is required'
                ],
                pass: '',
                passRules: [
                    v => !!v || 'Password is required'
                ]
            }
        },
        methods: {
            submit() {
                
            }
        }
    }
</script>