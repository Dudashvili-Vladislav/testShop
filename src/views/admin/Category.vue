<template>
  <div>
    <h2>Category</h2>
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <form>
            <input
              type="text"
              placeholder="Напишите имя категории"
              class="form-control"
            />
            <button class="btn btn-success" type="submit">Добавить</button>
          </form>
        </div>
        <div class="col-sm-6">Category list</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
};
</script>

<style lang="scss" scoped></style>
