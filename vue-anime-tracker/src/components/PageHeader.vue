<template>
    <h1><img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />{{ title }}</h1>
</template>

<script>

export default {
    name: 'PageHeader',
    props: {
        title: String,
    }
}
</script>

<style scoped></style>