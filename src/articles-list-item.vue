<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ArticlesListItem",
  props: ["article"]
};
</script>