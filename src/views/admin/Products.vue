<template>
  <div>
    <h1>Список покупок:</h1>
    <div class="input-group mb-3">
      <form class="login p-4" @submit.prevent="formProduct">
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
          @click="addProduct" 
          
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
        :key="product"
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

    <Modal :title="'Редактирование товара'">
      <form class="login p-4" @submit.prevent="formProduct">
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
            v-model="priceProduct"
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

    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Launch demo modal
    </button>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "Products",

  components: {
    Modal,
  },

  data() {
    return {
      deleteProductModal: false,

      selectedCategory: null,
      nameProduct: "",
      priceProduct: "",

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

      produscList: [
        {
          title: "Смартфон DEXP",
          description: "Смартфон DEXP BL350 собран в корпусе",
          price: "3 799",
          image: null,
          availability: true,
          category: {
            name: "Смартфоны",
            value: "phones",
          },
        },
        {
          title: "Смартфон Xiaomi Mi",
          description: "Смартфон Xiaomi Mi 11 Lite выполнен в розовом корпусе",
          price: "27 999",
          image: null,
          availability: true,
          category: {
            name: "Смартфоны",
            value: "phones",
          },
        },
        {
          title: "Смартфон Blackview",
          description:
            "Смартфон Blackview BV9900E – классическая «защищенная» модель.",
          price: "25 999",
          image: null,
          availability: true,
          category: {
            name: "Смартфоны",
            value: "phones",
          },
        },
      ],
    };
  },

  methods: {
    async createProducts() {
     const responce = await fetch(
        "https://vue2-first-project-default-rtdb.firebaseio.com/products.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: this.nameProduct,
            price: this.priceProduct,
            category: this.selectedCategory,
          }),
        }
      );
      const firebaseData = await responce.json()
      console.log("firebaseData",firebaseData);
    },

   async addProduct() {
     await this.createProduct()
      this.produscList.push({
        title: this.nameProduct,
        price: this.priceProduct,
        category: this.selectedCategory,
      })
    },
    removeProduct(index) {
      this.produscList.splice(index, 1);
    },

    editProduct(product) {
      console.log("EDIT product:", product);
    },
  },
};
</script>

<style lang="scss" scoped></style>
