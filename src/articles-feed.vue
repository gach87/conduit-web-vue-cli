<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li v-for="feed in feeds" :key="feed.id" class="nav-item">
        <a
          class="nav-link"
          v-bind:class="{'active': feed.selected}"
          v-on:click="select(feed)"
        >{{feed.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ArticlesFeed",
  props: ["feeds"],
  methods: {
    select(feed) {
      return this.$emit("select", feed);
    }
  }
};
</script>