<template>
  <div class="index">
    <div class="container-fluid" v-if="load">
      <div class="table table-borderless">
        <tr>
          <td>
            <h3>Filters</h3>
          </td>
          <td>
            <button class="btn btn-outline-dark" @click.prevent="resetFilters">
              Reset
            </button>
          </td>
        </tr>
        <tr>
          <th>City</th>
          <td>
            <select class="custom-select" id="citySelect" v-model="city">
              <option selected>All</option>
              <option
                v-for="(City, index) in cities"
                :key="index"
                :value="City"
              >
                {{ City }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <th>Cluster</th>
          <td>
            <select class="custom-select" v-model="cluster">
              <option selected>All</option>
              <option
                v-for="(Cluster, index) in clusters"
                :key="index"
                :value="Cluster"
              >
                {{ Cluster }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <th>Storage Space Available</th>
          <td>
            <select class="custom-select" v-model="space">
              <option selected>All</option>
              <option value="100">Greater Than 100</option>
              <option value="1000">Greater Than 1,000</option>
              <option value="10000">Greater Than 10,000</option>
              <option value="100000">Greater Than 100,000</option>
            </select>
          </td>
        </tr>
      </div>
      <div class="row" v-if="warehouses.length">
        <div
          v-for="warehouse in warehouses"
          :key="warehouse.id"
          class="col-lg-3 col-md-4 col-sm-6"
        >
          <router-link :to="'/' + warehouse.id">
            <img src="https://source.unsplash.com/user/erondu/300x200" />
            <p
              v-text="
                warehouse.city +
                ' ' +
                warehouse.cluster +
                ' ' +
                warehouse.space_available
              "
            ></p>
          </router-link>
        </div>
      </div>
      <div v-else>We are not Available Here</div>
    </div>
    <div class="text-center" v-else>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Index",
  data() {
    return {
      warehouses: [],
      cities: [],
      clusters: [],
      city: "All",
      cluster: "All",
      space: "All",
    };
  },
  watch: {
    city() {
      this.setWarehouses();
    },
    cluster() {
      this.setWarehouses();
    },
    space() {
      console.log(this.space, typeof this.space);
      this.setWarehouses();
    },
    load() {
      this.setWarehouses();
    },
  },
  mounted() {
    this.setWarehouses();
  },
  computed: {
    ...mapGetters({
      load: "warehouse/isLoaded",
      allWarehouses: "warehouse/getWarehouses",
    }),
  },
  methods: {
    setWarehouses() {
      let warehouses = [];
      let cities = [];
      let clusters = [];
      for (let warehouse of this.allWarehouses) {
        if (
          (this.city == "All" || warehouse.city == this.city) &&
          (this.cluster == "All" || warehouse.cluster == this.cluster) &&
          (this.space == "All" || warehouse.space_available >= this.space)
        ) {
          warehouses.push(warehouse);
        }
        if (cities.indexOf(warehouse.city) == -1) {
          cities.push(warehouse.city);
        }
        if (clusters.indexOf(warehouse.cluster) == -1) {
          clusters.push(warehouse.cluster);
        }
      }
      this.warehouses = warehouses;
      this.cities = cities;
      this.clusters = clusters;
    },
    resetFilters() {
      this.city = "All";
      this.cluster = "All";
      this.space = "All";
    },
  },
};
</script>
