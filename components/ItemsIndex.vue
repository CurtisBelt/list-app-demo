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
          list: context.app.$cookies.get('list')
        }
      }
    )
    return {
      items: allItems
    }
  },
  created() {
    // If URL query param `list` is set, save value to cookie
    if (typeof this.$route.query.list !== 'undefined') {
      this.$cookies.set('list', this.$route.query.list)

      // If the query param wasn't available, and there's also no cookie set - save a UUID.
    } else if (typeof this.$cookies.get('list') === 'undefined') {
      this.$cookies.set('list', uuidv4())
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
