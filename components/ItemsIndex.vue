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
import uuidv4 from 'uuid/v4'
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
          list:
            context.params?.list?.length > 0
              ? context.params?.list
              : context.app.$cookies.get('list')
        }
      }
    )
    return {
      items: allItems
    }
  },
  created() {
    if (this.$route.params?.list?.length > 0) {
      // Skip this block if were on a specific list route
      return
    }
    if (this.$route.query?.list?.length > 0) {
      // If URL query param `list` is set, save value to cookie
      this.$cookies.set('list', this.$route.query.list)
    } else if (
      this.$route.query?.list?.length === 0 || // allows resetting default list by requesting blank list name
      this.$cookies.get('list') === undefined ||
      this.$cookies.get('list')?.length === 0
    ) {
      // If the query param wasn't available, and there's also no cookie set - save a UUID.
      this.$cookies.set('list', uuidv4())
    } else {
      // No refresh needed
      return
    }

    /**
     * Clear the query param and refresh asyncData()
     */
    this.$router.push({
      path: '/',
      query: undefined
    })
    this.$nuxt.refresh()
  },
  methods: {
    onCreateItem(item) {
      this.items.push(item)
    }
  }
}
</script>
