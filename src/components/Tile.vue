<template>
  <img
      class="tile-image"
      :src="tile.image.path"
      :style="{ transform: 'rotate(' + tile.image.rotation*90 + 'deg)'}"
      alt=""
      width="50"
      height="50"
  />
</template>

<script>
export default {
  name: "Tile",
  props: {
    tile: { required: true }
  }
}
</script>

<style scoped>

</style>