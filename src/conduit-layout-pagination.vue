<template>
  <nav v-if="pages">
    <ul class="pagination" v-if="pages.length>0">
      <li
        v-bind:class="{'active':selected==page}"
        class="page-item"
        v-for="page in pages"
        :key="page"
      >
        <a class="page-link" v-on:click="onSelect(page)">{{page}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "ConduitLayoutPagination",
  props: ["pages", "selected", "onSelect"]
};
</script>