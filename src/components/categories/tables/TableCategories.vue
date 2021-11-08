<template>
  <div>
    <h1>Category Manager</h1>
    <search-form class="mb-10"/>
    <categories-list/>
  </div>
</template>

<script>
import SearchForm from "../tables/SearchForm";
import CategoriesList from "../tables/CategoriesList";
export default {
  name: "table-categories",
  components: {
    SearchForm,
    CategoriesList
  },
};
</script>

<style>
</style>