// import productModal from './ProductModal.js'

const baseURL = "https://vue3-course-api.hexschool.io";
const path = "gobobofu";

// console.log(VueLoading);
const { createApp } = Vue;
const userModal = {
  data() {
    return {
      productModal: null,
      modalQty:1,
      // product:{}
    };
  },
  template: `#userProductModal`,
  methods: {
    open() {
      this.productModal.show();
    },
    close() {
      this.productModal.hide();
    },
  },
  props: ["product","addToCart","getQty"],
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.modal);
  },
};
const app = createApp({
  data() {
    return {
      products: [],
      carts: {},
      tempProduct: {},
      productModal: null,
      isLoading: false,
      qty:1
    };
  },
  components: {
    userModal,
  },
  methods: {
    getQty(value){
      this.qty = value;
    },
    openModal(product) {
      this.tempProduct = product;
      this.$refs.userModal.open();
      // console.log(this.tempProduct.title);
    },
    getCart() {
      axios
        .get(`${baseURL}/v2/api/${path}/cart`)
        .then((res) => {
          console.log(res);
          this.carts = res.data.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    deleteCart(id) {
      // console.log(id);
      axios
        .delete(`${baseURL}/v2/api/${path}/cart/${id}`)
        .then((res) => {
          console.log(res);
          this.isLoading = true;
          this.getCart();
          // this.carts = res.data.data;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    deleteCarts() {
      axios
        .delete(`${baseURL}/v2/api/${path}/carts`)
        .then((res) => {
          console.log(res);
          this.isLoading = true;
          this.getCart();
          alert("購物車已清空");
          // this.carts = res.data.data;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    updateCart(cart, qty) {
      // console.log(id);
      const data = {
        data: {
          product_id: cart.product_id,
          qty: Number(qty),
        },
      };
      // console.log(data.data.product_id);
      this.isLoading = true;
      axios
        .put(`${baseURL}/v2/api/${path}/cart/${cart.id}`, data)
        .then((res) => {
          console.log(res);
          this.getCart();
          // this.carts = res.data.data;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    addToCart(id,value=1) {
      const data = {
        data: {
          product_id: id,
          qty: Number(value),
        },
      };
      console.log(data);
      axios
        .post(`${baseURL}/v2/api/${path}/cart`, data)
        .then((res) => {
          console.log(res);
          this.isLoading = true;
          this.getCart();
          // this.products = res.data.products;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    getAllProducts() {
      axios
        .get(`${baseURL}/v2/api/${path}/products/all`)
        .then((res) => {
          // console.log(res);
          this.isLoading = false;
          this.products = res.data.products;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
  },
  mounted() {
    this.getAllProducts();
    this.getCart();
  },
});
app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);
app.mount("#app");
