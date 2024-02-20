export default {
  data(){
    return {
      productModal:null,
    }
  },
  props:[],
  methods:{
    openModal(){
      this.productModal.show();
    },
    closeModal(){
      this.productModal.hide();
    }
  },
  mounted(){
    this.productModal = new bootstrap.Modal(this.$refs.modal);
  },
  template:/*HTML*/`

  `,
}