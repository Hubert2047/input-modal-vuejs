<template>
    <div id="app">
        <order-container />
    </div>
</template>

<script>
import OrderContainer from './components/OrderContainer.vue'
export default {
    name: 'App',
    components: {
        'order-container': OrderContainer,
    },
}
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.iom-btn > span {
    font-size: 0.65rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
