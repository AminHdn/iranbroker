<template>
  <div>
    <div
      class="flex flex-row mx-16 my-2 outline outline-1 outline-slate-200 px-2 py-4 rounded"
    >
      <div class="basis-1/6 flex justify-start">
        <img class="ibw-exchange-logo" :src="model?.img" width="25px" />
        <p class="mx-1">{{ model?.title }}</p>
      </div>
      <div class="basis-1/6 flex justify-center">
        {{
          toPersianNumber(
            currency == "btc" ? model?.btc.sell : model?.usdt.sell
          )
        }}

        تومان
      </div>
      <div class="basis-1/6 flex justify-center">
        {{
          toPersianNumber(currency == "btc" ? model?.btc.buy : model?.usdt.buy)
        }}
        تومان
      </div>
      <div class="basis-1/6 flex justify-center">
        %{{ toPersianNumber(model?.fee) }}
      </div>
      <div class="basis-1/6 flex justify-center">{{ model?.type }}</div>
      <div class="basis-1/6 flex justify-center">
        {{ toPersianNumber(model?.coinsCount) }}
      </div>
      <div class="basis-1/6 flex justify-center">
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
