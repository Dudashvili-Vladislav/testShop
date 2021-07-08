<template>
  <div class="admin-app">
    <ul>
      <li><router-link to="/admin/products">Товары</router-link></li>
      <li><router-link to="/admin/categories">Категории</router-link></li>
      <li><router-link to="/admin/users">Юзеры</router-link></li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AdminIndex",
};
</script>

<style lang="scss" scoped></style>
