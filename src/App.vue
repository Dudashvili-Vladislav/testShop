<template>
    <div id="app">
      <router-view></router-view>
     </div>
</template>
<script>

export default {
  data() {
    return {
      nameProduct: '',
      priceProduct: '',

      produscList: [
        {
          title: "Смартфон DEXP",
          description: "Смартфон DEXP BL350 собран в корпусе",
          price: "3 799",
          image: null,
          availability: true,
          category: "Смартфоны",
        },
        {
          title: "Смартфон Xiaomi Mi",
          description: "Смартфон Xiaomi Mi 11 Lite выполнен в розовом корпусе",
          price: "27 999",
          image: null,
          availability: true,
          category: "Смартфоны",
        },
        {
          title: "Смартфон Blackview",
          description:
            "Смартфон Blackview BV9900E – классическая «защищенная» модель.",
          price: "25 999",
          image: null,
          availability: true,
          category: "Смартфоны",
        },

      ],

    };
  },

  methods: {
    async createProducts() {
      await fetch(
        "https://vue2-first-project-default-rtdb.firebaseio.com/products.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: this.title,
            text: this.text,
          }),
        }
      );
    },
    addProduct() {
          this.produscList.push({
            title:this.nameProduct,
            price:this.priceProduct
          })
        },
        removeProduct(index) {
          this.produscList.splice(index,1)
        },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  * {
    box-sizing: border-box;
  }
  .product-item {
    width: 300px;
    text-align: center;
    margin: 0 auto;
    border-bottom: 2px solid #f5f5f5;
    background: white;
    font-family: "Open Sans";
    transition: 0.3s ease-in;
  }
  .product-item:hover {
    border-bottom: 2px solid #fc5a5a;
  }
  .product-item img {
    display: block;
    width: 100%;
  }
  .product-list {
    background: #fafafa;
    padding: 15px 0;
  }
  .product-list h3 {
    font-size: 18px;
    font-weight: 400;
    color: #444444;
    margin: 0 0 10px 0;
  }
  .price {
    font-size: 16px;
    color: #fc5a5a;
    display: block;
    margin-bottom: 12px;
  }
  .button {
    text-decoration: none;
    display: inline-block;
    padding: 0 12px;
    background: #cccccc;
    color: white;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 28px;
    transition: 0.3s ease-in;
  }
  .product-item:hover .button {
    background: #fc5a5a;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
