<template>
  <div>
    <div
      class="lg:mx-16 my-2 outline outline-1 outline-slate-200 md:px-2 md:py-4 rounded hover:bg-[#4D7A91] hover:text-white"
    >
      <div class="flex flex-row">
        <div class="basis-4/12 lg:basis-1/6 block md:flex justify-start">
          <img class="ibw-exchange-logo" :src="model?.img" width="25px" />
          <p class="mx-1 text-[#2898F2] m-auto text-sm md:text-base">
            {{ model?.title }}
          </p>
        </div>
        <div
          class="basis-4/12 lg:basis-1/6 flex justify-center text-sm md:text-base"
        >
          {{
            toPersianNumber(
              currency == "btc" ? model?.btc.sell : model?.usdt.sell
            )
          }}

          تومان
        </div>
        <div class="basis-4/12 lg:basis-1/6 flex justify-center text-sm">
          {{
            toPersianNumber(
              currency == "btc" ? model?.btc.buy : model?.usdt.buy
            )
          }}
          تومان
        </div>
        <div class="basis-1/6 md:flex justify-center hidden">
          %{{ toPersianNumber(model?.fee) }}
        </div>
        <div class="basis-1/6 md:flex justify-center hidden">
          {{ model?.type }}
        </div>
        <div class="basis-1/6 md:flex justify-center hidden">
          {{ toPersianNumber(model?.coinsCount) }}
        </div>

        <div class="md:basis-1/6 md:flex justify-center hidden">
          <button class="bg-[#4CAF50] text-white p-1 w-1/2">خرید</button>
          <button class="bg-[#DC3545] text-white p-1 mr-1 w-1/2">فروش</button>
        </div>
      </div>
      <div class="flex flex-row py-2 mx-1 md:hidden">
        <button class="bg-[#4CAF50] text-white p-1 w-1/2">خرید</button>
        <button class="bg-[#DC3545] text-white p-1 mr-1 w-1/2">فروش</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const model = defineModel("model");
const currency = defineModel("currency");
// const props = defineProps(["currency"]);
function toPersianNumber(inputNumber) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return Number(inputNumber)
    ?.toLocaleString("en-US")
    .replace(/\d/g, (digit) => persianNumbers[digit]);
}
</script>

<style lang="scss" scoped></style>
