<template>
  <div id="app">
    <ConduitLayoutHeader />
    <router-view />
    <ConduitLayoutFooter />
  </div>
</template>

<style>
</style>

<script>
import ConduitLayoutHeader from "./conduit-layout-header";
import ConduitLayoutFooter from "./conduit-layout-footer";
export default {
  name: "App",
  components: {
    ConduitLayoutHeader,
    ConduitLayoutFooter
  }
};
</script>