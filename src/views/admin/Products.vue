<template>
  <div>
    <h1>Список покупок:</h1>
    <div class="input-group mb-3">
      <form class="login p-4">
        <div class="mb-2">
          <input
            type="text"
            class="form-control"
            placeholder="Название товара: "
            aria-label="Example text with two button addons"
            v-model="nameProduct"
          />
        </div>

        <div class="mb-2">
          <select
            v-model="selectedCategory"
            class="form-select"
            placeholder="Выберите категорию"
          >
            <option
              v-for="(option, index) in categoryOptions"
              :key="index"
              :value="option.value"
            >
              {{ option.name }}
            </option>
          </select>
        </div>

        <div class="mb-2">
          <input
            type="text"
            class="form-control"
            placeholder="Цена: "
            aria-label="Example text with two button addons"
            v-model="priceProduct"
          />
        </div>

        <div class="mt-3">
          <button
            type="submit"
            class="btn btn-success"
            @click.prevent="addProduct"
          >
            Добавить
          </button>
        </div>
      </form>
      <hr />
    </div>

    <div class="product-item">
      <img />
      <div
        class="product-list"
        v-for="(product, index) in produscList"
        :key="index"
      >
        <h3>{{ product.title }}</h3>
        <button class="btn btn-warning" @click="editProduct(product)">
          Редактировать товар
        </button>
        <button class="btn btn-danger" @click="removeProduct(index)">
          Удалить товар
        </button>
        <span class="price">{{ product.price }}</span>
      </div>
    </div>

    <Modal v-model="addProductModal" :title="'Редактирование товара'">
      <form v-if="selectedProduct" class="login p-4">
        <div class="mb-2">
          <input
            type="text"
            class="form-control"
            placeholder="Название товара: "
            aria-label="Example text with two button addons"
            v-model="nameProduct"
          />
        </div>

        <div class="mb-2">
          <select v-model="selectedCategory" class="form-select">
            <option
              v-for="(option, index) in categoryOptions"
              :key="index"
              :value="option.value"
            >
              {{ option.name }}
            </option>
          </select>
        </div>

        <div class="mb-2">
          <input
            type="text"
            class="form-control"
            placeholder="Цена: "
            aria-label="Example text with two button addons"
            v-model="selectedProduct.price"
          />
        </div>
      </form>

      <template v-slot:footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Отменить
        </button>
        <button type="button" class="btn btn-success">Редактировать</button>
      </template>
    </Modal>

    <Modal v-model="deleteProductModal" :title="'Удаление товара'">
      Вы уверены что хотите удалить товар X-X-X ?

      <template v-slot:footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Отменить
        </button>
        <button type="button" class="btn btn-danger">Удалить</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import firebase from "firebase";
import "firebase/database";

export default {
  name: "Products",

  components: {
    Modal,
  },

  data() {
    return {
      addProductModal: false,
      deleteProductModal: false,

      selectedCategory: null,
      nameProduct: "",
      priceProduct: "",
      selectedProduct: null,

      categoryOptions: [
        {
          name: "Смартфоны",
          value: "phones",
        },
        {
          name: "Холодильники",
          value: "fridges",
        },
        {
          name: "Телевизоры",
          value: "tv",
        },
      ],
      produscList: [],
    };
  },

  mounted() {
    this.fetchProducts();
  },

  methods: {
    async createProducts() {
      await firebase.database().ref(`/products`).push({
        title: this.nameProduct,
        price: this.priceProduct,
        category: this.selectedCategory,
      });
    },

    async fetchProducts() {
      const snapshot = await firebase.database().ref(`/products`).once("value");

      snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        this.produscList.push(item)
        console.log("item", item);
      });
    },

    async addProduct() {
      await this.createProducts();

      this.produscList.push({
        title: this.nameProduct,
        price: this.priceProduct,
        category: this.selectedCategory,
      });
    },

    removeProduct(index) {
      this.produscList.splice(index, 1);
    },

    editProduct(product) {
      this.addProductModal = !this.addProductModal;
      console.log("EDIT product:", product);
      this.selectedProduct = product;
    },
  },
};
</script>

<style lang="scss" scoped></style>
