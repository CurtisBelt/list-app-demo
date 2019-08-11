<template>
  <div class="ItemsIndex">
    <h1 class="text-xl font-bold mb-4">
      Your List: {{ $cookies.get('list') }}
    </h1>
    <ItemsTable :items="items" />
    <ItemsCreate @createItem="onCreateItem" />
  </div>
</template>

<script>
import ItemsTable from '~/components/ItemsTable'
import ItemsCreate from '~/components/ItemsCreate'

export default {
  name: 'ItemsIndex',
  components: {
    ItemsTable,
    ItemsCreate
  },
  async asyncData(context) {
    const allItems = await context.app.$axios.$get(
      '.netlify/functions/items-read-from-list',
      {
        params: {
          list: context.app.$cookies.get('list')
        }
      }
    )
    return {
      items: allItems
    }
  },
  created() {
    if (typeof this.$route.query.list !== 'undefined') {
      this.$cookies.set('list', this.$route.query.list)
      this.$router.push({
        path: '/',
        query: undefined
      })
      this.$nuxt.refresh()
    }
  },
  methods: {
    onCreateItem(item) {
      this.items.push(item)
    }
  }
}
</script>
