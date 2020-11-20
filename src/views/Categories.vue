<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @created="addNewCategory" />
        <CategoryModify />
      </div>
    </section>
  </div>
</template>
<script>
import CategoryCreate from "../components/CategoryCreate.vue";
import CategoryModify from "../components/CategoryModify.vue";

export default {
  name: "categories",
  data: () => ({
    categories: []
  }),
  methods: {
addNewCategory(category) {
  this.categories.push(category)
  console.log(this.categories)
  }
  },
  components: {
    CategoryCreate,
    CategoryModify
  }
};
</script>
