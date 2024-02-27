
const baseURL = "https://vue3-course-api.hexschool.io";
const path = "gobobofu";


const { createApp } = Vue;
const userModal = {
  data() {
    return {
      productModal: null,
      modalQty:1,
    };
  },
  template: `#userProductModal`,
  methods: {
    open() {
      this.modalQty = 1;  
      this.productModal.show();
    },
    close() {
      this.productModal.hide();
    },
    addToCart(productId,value){
      // console.log('modaladdToCart');
      // console.log(productId,value);
      this.$emit('emit-modalQty',productId,value);
    }
  },
  props: ["product"],
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
      isLoading: true,
      isUpdating: true,
      qty:1,
      orderData:{
        "data": {
          "user": {
            "name": "",
            "email": "",
            "tel": "",
            "address": ""
          },
          "message": ""
        }
      },
      // orderData:{
      //   "data": {
      //     "user": {
      //       "name": "test",
      //       "email": "test@gmail.com",
      //       "tel": "0912346768",
      //       "address": "kaohsiung"
      //     },
      //     "message": "這是留言"
      //   }
      // },
    };
  },
  components: {
    userModal,
  },
  methods: {
    postOrder(){
      const data=this.orderData;
      // console.log(data);
      axios
        .post(`${baseURL}/v2/api/${path}/order`,data)
        .then((res) => {
          // console.log(res);
          alert(res.data.message);
          // deleteCarts();
          window.location = '/'
          // getCart();
        })
        .catch((error) => {
          console.dir(error);
        });      
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
          // console.log(res);
          this.carts = res.data.data;
          this.isLoading = false;
          this.isUpdating = false;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    deleteCart(id) {
      // console.log(id);
      this.isUpdating = true;
      axios
        .delete(`${baseURL}/v2/api/${path}/cart/${id}`)
        .then((res) => {
          // console.log(res);
          this.getCart();
          // this.carts = res.data.data;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    deleteCarts() {
      this.isLoading = true;
      axios
        .delete(`${baseURL}/v2/api/${path}/carts`)
        .then((res) => {
          // console.log(res);
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
      this.isUpdating = true;
      axios
        .put(`${baseURL}/v2/api/${path}/cart/${cart.id}`, data)
        .then((res) => {
          // console.log(res);
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
      // console.log(data);
      this.isUpdating = true;
      axios
        .post(`${baseURL}/v2/api/${path}/cart`, data)
        .then((res) => {
          // console.log(res);
          
          this.$refs.userModal.close();
          this.getCart();
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
    // isPhone(value) {
    // const phoneNumber = /^(09)[0-9]{8}$/
    // return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    // },
    minLength8(value) {
    // 檢查字串長度是否大於等於8
      return value.length >= 8?true:'電話須超過8碼';
    },
    // isPhoneOrMinLength8(value) {
    //   // 使用 || 运算符组合两个条件
    //   if(value.length < 8)return '電話須超過8碼'
    //   return this.isPhone(value)==true || this.minLength8(value)==true?true:'需要正確的電話號碼';
    // },
  },
  mounted() {
    this.getAllProducts();
    this.getCart();
    // console.log(VueLoading);
  },
});
app.component("loading", VueLoading.Component);
app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);
app.mount("#app");
