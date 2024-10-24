<template>
  <div class="container h-100">
    <div class="d-flex justify-content-center align-items-center w-100 h-100">
        <div class="info p-5 bg_green rounded text-center">
            <h2 class="m-0">{{title}}</h2>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: "Не хватает данных для платежа"
  })
}
</script>

<style scoped>
  h2 {
    max-width: 320px;
  }
</style>