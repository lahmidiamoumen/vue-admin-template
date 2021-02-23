<template>
  <div id="app">
    <keep-alive :include="cachedViews">
      <router-view />
    </keep-alive>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
