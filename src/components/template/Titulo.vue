<template>
    <h1 :class="alinhamento">{{ titulo }}</h1>
</template>
<script>
export default {
    props :['titulo', 'alinhamento']
}
</script>
