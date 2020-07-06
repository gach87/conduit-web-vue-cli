<template>
  <div id="app">
    <ConduitHeader/>
    <router-view />
    <ConduitFooter/>
  </div>
</template>

<style>

</style>

<script>
import ConduitHeader from "@/header";
import ConduitFooter from "@/footer";
export default {
  name: "App",
  components: {
    ConduitHeader,
    ConduitFooter
  }
};
</script>