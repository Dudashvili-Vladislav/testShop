<template>
  <div>
    <h1>Список покупок:</h1>
    <div class="input-group mb-3">
      <button type="submit" class="btn btn-success" @click="addProduct">
        Добавить
      </button>
      <form class="login" @submit.prevent="formProduct">
        <input
          type="text"
          class="form-control"
          placeholder="Название товара: "
          aria-label="Example text with two button addons"
          v-model="nameProduct"
        />
        <input
          type="text"
          class="form-control"
          placeholder="Цена: "
          aria-label="Example text with two button addons"
          v-model="priceProduct"
        />
      </form>
      <hr />
    </div>

    <div class="product-item">
      <img />
      <div
        class="product-list"
        v-for="(product, index) in produscList"
        :key="product"
      >
        <h3>{{ product.title }}</h3>
        <button class="btn btn-danger" @click="removeProduct(index)">
          Удалить товар
        </button>
        <span class="price">{{ product.price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
