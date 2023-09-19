<template>
  <div>
    <div class="container">
      <TopBar text="收货地址"></TopBar>
      <van-address-list
        v-model="chosenAddressId"
        :list="address"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @click-item="changeAddress"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { get } from "@/utils/request";
import TopBar from "@/components/topBar";
export default {
  name: "EditAddress",
  components: {
    TopBar,
  },
  data() {
    return {
      chosenAddressId: 0,
      address: [],
    };
  },
  methods: {
    onAdd() {
      this.$router.push({ name: "AddAddress" });
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    async getAddress() {
      const username = localStorage.username;
      const res = await get("/getAddress", {
        username,
      });
      //   console.log(res);
      if (res?.errno === 0) {
        res.data.forEach((element) => {
          const obj = {
            id: element._id,
            name: element.name,
            tel: element.phone_number,
            address: element.city + element.detail_address,
            isDefault: element.isDefault === 1 ? true : false,
          };
          if (element.isDefault) {
            this.chosenAddressId = element._id;
          }
          this.address.push(obj);
        });
        console.log(this.address);
      }
    },
    changeAddress(item, index) {
      this.chosenAddressId = index;
      console.log(this.chosenAddressId);
      this.$router.push({
        name: "OrderConfirm",
        params: { addressId: item.id },
      });
    },
  },
  created() {
    console.log(this.chosenAddressId);
    this.getAddress();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
}
</style>