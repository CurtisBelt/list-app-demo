<template>
  <table class="ItemsTable w-full border-collapse">
    <thead class="text-base font-bold bg-gray-300">
      <tr>
        <td class="px-2 py-1">ID</td>
        <td class="px-2 py-1">Created</td>
        <td class="px-2 py-1">Data</td>
        <td class="px-2 py-1">Actions</td>
      </tr>
    </thead>
    <tbody class="text-sm">
      <tr
        v-for="(item, index) in items"
        :key="item.ref['@ref'].id"
        :class="{ 'bg-gray-100': index % 2 === 0 }"
      >
        <td class="px-2 py-1 text-xs w-1">
          {{ item.ref['@ref'].id }}
        </td>

        <td class="px-2 py-1 text-xs w-1 whitespace-no-wrap">
          {{
            new Date(item.ts / 1000).toLocaleDateString('en-US', {
              dateStyle: 'short',
              timeStyle: 'long'
            })
          }}
        </td>
        <td class="px-2 py-1">
          {{ item.data.text }}
        </td>
        <td class="px-2 py-1 w-1">
          <button
            class=" bg-red-600 p-1 text-xs text-white rounded"
            @click.prevent="deleteItem(item)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ItemsTable',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async deleteItem(item) {
      try {
        await this.$axios.$post('.netlify/functions/items-delete', {
          id: item.ref['@ref'].id
        })
        this.$delete(this.items, this.items.indexOf(item))
      } catch (error) {
        // console.warn(error)
      }
    }
  }
}
</script>
