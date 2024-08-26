<template>
  <div @click="closeMenu">
    <div class="w-full flex items-center justify-center mt-6 mb-3 px-2">
      <img
        id="ibwImgHeaderTitleComparison"
        :src="
          currency == 'btc'
            ? 'https://iranbroker.net/wp-content/uploads/ibw-coins-img/1.png'
            : 'https://iranbroker.net/wp-content/uploads/ibw-coins-img/825.png'
        "
        width="35px"
      />
      <p class="mx-1 md:text-3xl font-bold text-xl">
        مقایسه قیمت خریدوفروش {{ currency == "btc" ? "بیت کوین" : "تتر" }} در
        صرافی های ارز دیجیتال
      </p>
    </div>
    <div class="flex flex-row">
      <div class="md:basis-2/5"></div>

      <div
        class="relative inline-block text-left md:basis-2/5 lg:basis-1/5 basis-4/5"
      >
        <drop-down-menu
          :items="coins"
          @selectCurrency="selectCurrency"
          v-model:model="isOpen"
          @toggleMenu="toggleMenu"
          ref="menu"
        />
      </div>
      <div class="basis-1/5 flex items-center px-1">
        <div class="container-timer shadow-xl drop-shadow-xl">
          {{ persianTime }}
        </div>
      </div>
      <div class="md:basis-1/5"></div>
    </div>
    <div class="lg:mx-16">
      <div class="flex flex-row lg:mx-16 my-2">
        <div
          class="basis-4/12 md:basis-1/6 flex justify-start px-4 text-sm md:text-base"
        >
          صرافی
        </div>
        <div
          class="basis-4/12 md:basis-1/6 flex justify-center font-bold text-sm md:text-base cursor-pointer"
          @click="changeSortPrice('sell')"
        >
          فروش به شما
          <span
            class="mx-1"
            v-if="sortType == 'sell' && sortPriceType == 'descending'"
          >
            ▲
          </span>
          <span
            id="ibwSellSortMarker"
            v-else-if="sortType == 'sell' && sortPriceType == 'ascending'"
          >
            ▼
          </span>
          <span class="mx-1" v-else-if="sortType == 'buy'">⇅</span>
        </div>
        <div
          class="basis-4/12 md:basis-1/6 flex justify-center font-bold text-sm md:text-base cursor-pointer"
          @click="changeSortPrice('buy')"
        >
          خرید از شما
          <span
            class="mx-1"
            v-if="sortType == 'buy' && sortPriceType == 'descending'"
            >▲</span
          >
          <span
            id="ibwSellSortMarker"
            v-else-if="sortType == 'buy' && sortPriceType == 'ascending'"
            >▼</span
          >
          <span class="mx-1" v-else-if="sortType == 'sell'">⇅</span>
        </div>
        <div class="basis-1/6 md:flex justify-center hidden">کارمزد</div>
        <div class="basis-1/6 md:flex justify-center hidden">نوع صرافی</div>
        <div class="basis-1/6 md:flex justify-center hidden">تعداد ارزها</div>
        <div class="basis-1/6 md:flex justify-center hidden">معامله</div>
      </div>
    </div>
    <div v-for="exchange in exchanges" :key="exchange.title">
      <price-container
        class="mx-2 lg:mx-16 my-2"
        v-model:model="exchange.value"
        v-model:currency="currency"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchInput = ref();
const sortType = ref("sell");
const sortPriceType = ref("descending");
const sellPrice = ref();
const buyPrice = ref();
const time = ref(60);
const loading = ref(true);
const currency = ref("btc");
const isOpen = ref(false);
const exchanges = ref([
  ref({
    img: "https://iranbroker.net/wp-content/plugins/iranbroker-widget/assets/public/img/exchanges/nobitex.webp",
    title: "نوبیتکس",
    type: "بازار معاملاتی",
    coinsCount: "111",
    fee: "0.35",
    btc: {},
    usdt: {},
  }),
  ref({
    img: "https://iranbroker.net/wp-content/plugins/iranbroker-widget/assets/public/img/exchanges/bit24.webp",
    title: "بیت 24",
    type: "فروشگاهی",
    coinsCount: "83",
    fee: "0",
    btc: {},
    usdt: {},
  }),
]);
const coins = ref([
  {
    img: "https://iranbroker.net/wp-content/uploads/ibw-coins-img/1.png",
    title: "بیت کوین",
    name: "btc",
  },
  {
    img: "https://iranbroker.net/wp-content/uploads/ibw-coins-img/825.png",
    title: "تتر",
    name: "usdt",
  },
]);

let timer = null;
const startTimer = () => {
  if (timer) return;

  timer = setInterval(() => {
    if (time.value > 0) {
      time.value = time.value - 1;
    } else {
      stopTimer();
      getExchangesPrices();
    }
  }, 1000);
};
function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function closeMenu(event) {
  const menu = ref(null);
  if (!menu.value || !menu.value.contains(event.target)) {
    isOpen.value = false;
  }
}
function changeSortPrice(item) {
  if (item == sortType.value) {
    if (sortPriceType.value == "descending") {
      sortPriceType.value = "ascending";
      sortAscending();
    } else {
      sortPriceType.value = "descending";
      sortDescending();
    }
  } else {
    sortType.value = item;
    if (sortPriceType.value == "ascending") {
      sortAscending();
    } else {
      sortDescending();
    }
  }
}
function sortAscending() {
  exchanges.value.sort((a, b) => {
    return (
      +a.value[currency.value][sortType.value] -
      +b.value[currency.value][sortType.value]
    );
  });
}
function sortDescending() {
  exchanges.value.sort(
    (a, b) =>
      +b.value[currency.value][sortType.value] -
      +a.value[currency.value][sortType.value]
  );
}

function selectCurrency(item) {
  currency.value = item;
  if (sortPriceType.value == "ascending") {
    sortAscending();
  } else {
    sortDescending();
  }
}
const stopTimer = () => {
  clearInterval(timer);
  timer = null;
  time.value = 60;
};

const persianTime = computed(() => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return time.value.toString().replace(/\d/g, (digit) => persianNumbers[digit]);
});

async function getExchangesPrices() {
  try {
    if (!loading.value) loading.value = true;
    const data = new FormData();
    data.append("action", "ibwPricesUpdaterCompare");
    const response = await $fetch(
      "https://iranbroker.net/wp-admin/admin-ajax.php",
      { mode: "cors", method: "POST", body: data }
    );

    exchanges.value[1].value.btc =
      response.exchangesPrices.bit24.prices.btc.irt;
    exchanges.value[1].value.usdt =
      response.exchangesPrices.bit24.prices.usdt.irt;
    exchanges.value[0].value.btc =
      response.exchangesPrices.nobitex.prices.btc.irt;
    exchanges.value[0].value.usdt =
      response.exchangesPrices.nobitex.prices.usdt.irt;
    startTimer();
  } catch {
    console.error("Error:", error);
  }
}

onMounted(() => {
  getExchangesPrices();
});
</script>
<style lang="scss">
.divider {
  width: 94%;
  margin: auto;
  height: 1px;
  background-color: rgb(221, 221, 221);
}
.container {
  &-timer {
    display: flex;
    border-radius: 100%;
    border: 1px solid rgb(7, 143, 13);
    width: 32px;
    height: 32px;

    justify-content: center;
  }
}
</style>
