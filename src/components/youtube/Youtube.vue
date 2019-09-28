<template>
  <iframe  :width="width" :height="height" :src="src" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</template>

<script>
export default {
  name: 'Youtube',
  props: {
    src: {
      type: String
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  }
}
</script>

<style>
</style>
