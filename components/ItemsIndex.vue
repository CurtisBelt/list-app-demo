<template>
  <div class="ItemsIndex">
    <div class="text-xl font-bold mb-4">Your List: {{ getOpenedList() }}</div>
    <ul class="text-sm mb-4 ml-8 list-disc">
      <li>If no list name is provided, a random one will be generated.</li>
      <li>
        You may also use ?list=your_list_name in the URL to open a list via
        direct link.
      </li>
    </ul>
    <form class="mb-4 text-sm" @submit.prevent="openList">
      <div class="flex items-center">
        <div class="whitespace-no-wrap font-bold mr-2">Open List:</div>
        <input
          id="listName"
          ref="listName"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Type list name"
        />

        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 py-2 px-3 rounded"
          @click.prevent="openList"
        >
          Open
        </button>
      </div>
    </form>

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
    },
    getOpenedList() {
      return this.$route.params?.list?.length > 0
        ? this.$route.params?.list
        : this.$cookies.get('list')
    },
    openList() {
      this.$cookies.set(
        'list',
        this.$refs.listName.value.length > 0
          ? this.$refs.listName.value
          : uuidv4()
      )
      this.$nuxt.refresh()
    }
  }
}
</script>
