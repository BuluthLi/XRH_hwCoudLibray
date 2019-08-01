<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}
.ivu-spin-fix {
  background-color: rgba(0, 0, 0, 0.2);
}
.ivu-spin {
  color: white;
}

</style>
