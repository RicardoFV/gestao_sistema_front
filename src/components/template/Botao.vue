<template>
    <Button :class="desing" :type="tipo">{{ acao }}</Button>
</template>

<script>
export default {
    props:['tipo', 'acao', 'desing']
}
</script>