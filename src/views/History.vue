<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!records.length" class="center">
      Еще нет записей
      <router-link to="categories"> Добавить первую</router-link>
    </p>
    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
       v-model="page"
       :page-count="pageCount"
       :click-handler="pageChangeHandler"
       :prev-text="'Назад'"
       :next-text="'Вперед'"
       :container-class="'pagination center'"
       :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>
<script>
import HistoryTable from "../components/HistoryTables";
import paginationMixin from "../mixins/pagination.mixin"
export default {
  name: "history",
  mixins: [paginationMixin],
  data: () => ({
    records: [],
    loading: true,
  }),
  async mounted() {

    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    
    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId)
          .title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход"
      };
    }));

    this.loading = false;
  },
  components: {
    HistoryTable
  }
};
</script>
