<template>
  <div>
    <div class="page-title">
      <h3>{{ "ProfileTitle" | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
          v-model="name"
          type="text"
        />
        <label for="description ">{{ "Name" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{ "Message_enterName" | localize }}
        </small>
      </div>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ "Update" | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import localeFilter from "../filters/localize.filter"
export default {
  data: () => ({
    name: "",
    isRuLocale: true
  }),
   metaInfo() {
 return {
    title: this.$title('ProfileTitle')
 }  
    },
  validations: {
    name: { required }
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === "ru-Ru";
    setTimeout(() => {
      M.updateTextFields();
    });
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? "ru-RU" : "en-EN"
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    ...mapGetters(["info"])
  }
};
</script>
<style scoped>
.switch {
  margin-bottom: 1.5rem;
}
</style>
