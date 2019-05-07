<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-img class="elevation-5" width="100%" src="./logo.jpg"></v-img>
      </v-flex>
      <v-flex xs12>
        <v-layout row>
          <v-flex xs12>
            <v-card>
              <v-card-title class="blue white--text">
                <v-menu right height="60px">
                  <template v-slot:activator="{ on }">
                    <v-btn dark icon v-on="on">
                      <v-icon>menu</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-tile v-for="(item, i) in items" :key="i">
                      <router-link :to="item.to">
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </router-link>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-spacer></v-spacer>
                <p class="headline text-xs-center mb-0">Home</p>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-flex xs12>
                <v-autocomplete
                  v-model="model"
                  :items2="items2"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="white"
                  hide-no-data
                  hide-selected
                  item-text="Description"
                  item-value="API"
                  label="Search a Flight"
                  placeholder="Start typing to search a flight"
                  prepend-icon="flight_takeoff"
                  return-object
                ></v-autocomplete>
                <!-- AS -->
                <v-expand-transition>
      <v-list v-if="model" class="red lighten-3">
        <v-list-tile
          v-for="(field, i) in fields"
          :key="i"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="field.value"></v-list-tile-title>
            <v-list-tile-sub-title v-text="field.key"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-expand-transition>
                <!-- AS -->
              </v-flex>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 class="separated100">
        <strong>LandAway By Oscar Urgelles Marsal</strong>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Flights", to: "/flights" },
        { title: "My Flights", to: "/myflights" },
        { title: "Profile", to: "/profile" }
      ],
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
    };
  },  
  computed: {
      fields () {
        if (!this.model) return []

        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a'
          }
        })
      },
      items2 () {
        return this.entries.map(entry => {
          const Description = entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description

          return Object.assign({}, entry, { Description })
        })
      }
    },
  components: {

  },
    watch: {
      search (val) {
        // Items have already been loaded
        if (this.items2.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        // Lazily load input items
        fetch('https://api.publicapis.org/entries')
          .then(res => res.json())
          .then(res => {
            const { count, entries } = res
            this.count = count
            this.entries = entries
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      }
    }
};
</script>

<style>
.v-card__title.blue.white--text {
  padding: 0;
}
</style>
