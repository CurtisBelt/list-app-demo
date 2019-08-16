<template>
  <form class="ItemsCreate mt-4 text-sm" @submit.prevent="createItem">
    <div class="flex items-end">
      <input
        id="itemText"
        ref="itemText"
        v-model="item.text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Create Item"
      />

      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 py-2 px-3 rounded"
        @click.prevent="createItem"
      >
        Create
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ItemsCreate',
  data() {
    return {
      item: {
        text: ''
      }
    }
  },
  mounted() {
    this.$refs.itemText.focus()
  },
  methods: {
    async createItem() {
      if (this.item && this.item.text) {
        const createdItem = await this.$axios.$post(
          '.netlify/functions/items-create',
          {
            ...this.item,
            ...{ list: this.getOpenedList().toString() }
          }
        )
        this.$emit('createItem', createdItem)
        this.item.text = ''
        this.$refs.itemText.focus()
      }
    },
    getOpenedList() {
      return this.$route.params?.list?.length > 0
        ? this.$route.params?.list
        : this.$cookies.get('list')
    }
  }
}
</script>
