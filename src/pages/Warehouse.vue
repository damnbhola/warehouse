<template>
  <div class="warehouse" v-if="warehouse.city">
    <h2>{{ warehouse.city }}</h2>
    <h3>Cluster: {{ warehouse.cluster }}</h3>
    <h3>Space Available: {{ warehouse.space_available }}</h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Warehouse",
  data() {
    return {
      warehouse: {},
    };
  },
  computed: {
    ...mapGetters({
      load: "warehouse/isLoaded",
      getWarehouseById: "warehouse/getWarehouseById",
    }),
  },
  mounted() {
    this.setWarehouse();
  },
  watch: {
    load() {
      this.setWarehouse();
    },
    $route: "setWarehouse",
  },
  methods: {
    setWarehouse() {
      this.warehouse = this.getWarehouseById(this.$route.params.id);
    },
  },
};
</script>
