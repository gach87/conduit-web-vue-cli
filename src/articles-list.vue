<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ArticlesList",
  props: ["articles"]
};
</script>