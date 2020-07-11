<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ConduitArticlesList",
  props: ["articles"]
};
</script>