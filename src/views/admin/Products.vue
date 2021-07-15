<template>
  <div>
    <div class="container-fluid">
      <h1>Список товаров</h1>
      <div class="row">
        <div class="col-sm-3">
          <h2 class="text-left">Cоздать товар:</h2>
          <div class="input-group mb-3">
            <form class="login p-4">
              <div class="input-group mb-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Название товара: "
                  aria-label="Example text with two button addons"
                  v-model="nameProduct"
                />
                <div
                  v-if="$v.nameProduct.$dirty && !$v.nameProduct.required"
                  class="invalid-feedback d-block"
                >
                  Введите название товара
                </div>

                <div
                  v-if="$v.nameProduct.$dirty && !$v.nameProduct.minLength"
                  class="invalid-feedback d-block"
                >
                  Минимальное количество символов 4
                </div>
              </div>

              <div class="input-group mb-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Введите бренд..."
                  aria-label="Example text with two button addons"
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

              <div class="form-check text-left">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  В наличии
                </label>
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
        </div>
        <div class="col-sm-9">
          <div class="product-list">
            <div
              class="card"
              v-for="(product, index) in produscList"
              :key="index"
              style="width: 18rem"
            >
              <img src="https://placeimg.com/288/200/tech" class="card-img" />
              <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="card-text">Product description...</p>
                <button class="btn btn-warning" @click="editProduct(product)">
                  Редактировать
                </button>
                <button
                  class="btn btn-danger d-inline-block ms-2"
                  @click="removeProduct(index)"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>

          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#">Previous</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <Modal v-model="editProductModal" :title="'Редактирование товара'">
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
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Products",

  mixins: [validationMixin],

  validations: {
    nameProduct: {
      required,
      minLength: minLength(4),
    },
  },

  components: {
    Modal,
  },

  data() {
    return {
      editProductModal: false,
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
        this.produscList.push(item);
        console.log("item", item);
      });
    },

    async addProduct() {
      this.$v.nameProduct.$touch();

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
      this.editProductModal = !this.editProductModal;
      console.log("EDIT product:", product);
      this.selectedProduct = product;
    },
  },
};
</script>

<style lang="sass" scoped>

.card
  margin: 5px 5px 10px

.card-img
  max-width: 288px

.product-list
  display: flex
  flex-wrap: wrap
  padding: 0 15px
</style>
