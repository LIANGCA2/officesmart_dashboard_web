<template>
  <standard-card :label="$t('DatabaseInformationLocale.stats.label')">
    <div v-for="(collection, index) in collections" :key="collection" :class="{ 'mt-2': index > 0 }">
      <p class="text-13 primary-text mb-2">
        <i class="el-icon-s-data mr-2"></i>
        <span>{{ collection }}</span>
      </p>
      <div class="flex flex-vertical">
        <p v-for="infoKey in infoKeys" :key="infoKey.key" class="flex flex-horizontal justify-space-between text-12 standard-text">
          <span class="inline-text mr-2">{{ $t(`DatabaseInformationLocale.stats.${infoKey.key}`) }}</span>
          <span v-if="infoKey.format" class="inline-text">{{ numbro(get(getCollectionStats[collection], infoKey.key, 0)).format(byteFormat) }}</span>
          <span v-else class="inline-text">{{ get(getCollectionStats[collection], infoKey.key, 0) }}</span>
        </p>
      </div>
    </div>
  </standard-card>
</template>

<script>
import StandardCard from './standard-card'
import { mapGetters, mapActions } from 'vuex'
import get from 'lodash/get'
const numbro = require('numbro')

export default {
  name: 'database-collection-stats-card',
  components: { StandardCard },
  props: {
    collections: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      numbro,
      byteFormat: {
        output: 'byte',
        base: 'binary',
        spaceSeparated: true
      },
      infoKeys: [
        { key: 'size', format: true },
        { key: 'storageSize', format: true },
        { key: 'totalIndexSize', format: true },
        { key: 'avgObjSize', format: true },
        { key: 'count', format: false }
      ]
    }
  },
  computed: {
    ...mapGetters('databaseInformation', [
      'getCollectionStats'
    ])
  },
  methods: {
    ...mapActions('databaseInformation', [
      'retrieveCollectionStats'
    ]),
    get,
    async refresh () {
      await this.retrieveCollectionStats(this.collections)
    }
  },
  async mounted () {
    await this.refresh()
  }
}
</script>

<style scoped lang="scss">

</style>
