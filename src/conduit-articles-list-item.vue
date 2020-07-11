<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ConduitArticlesListItem",
  props: ["article"]
};
</script>