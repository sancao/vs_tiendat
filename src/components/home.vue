<template>
    <div>
    </div>
</template>
<script>
export default {
    computed: {
        user () {
            return this.$store.state.authentication.user;
        },
        users () {
            return this.$store.state.users.all;
        }
    },
    created () {
        debugger
        this.$store.dispatch('users/getAll');
    }
};
</script>