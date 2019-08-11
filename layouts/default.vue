<template>
  <div class="m-6 max-w-2xl">
    <div
      class="flex flex-col min-h-screen h-full font-sans text-brand-blue-400"
    >
      <h1 class="text-3xl font-bold mb-4">List App Demo</h1>

      <h1 class="text-xl font-bold mb-4">
        Your List: {{ $cookies.get('list') }}
      </h1>

      <main class="flex-auto mx-auto w-full flex-grow">
        <Nuxt />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Default'
}
</script>
