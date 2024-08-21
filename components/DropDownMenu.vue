<template>
  <div>
    <button
      @click="toggleMenu"
      class="w-full h-12 rounded-md border border-black shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
    >
      <div class="flex flex-row px-1">
        <div class="basis-4/5 flex justify-start text-black font-semibold">
          ارز مورد نظر را انتخاب کنید
        </div>
        <div class="basis-1/5 flex justify-end">
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </button>

    <div
      v-if="isOpen"
      class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <div
        class="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div class="text-right p-2 hover:bg-[#4D7A91] hover:text-white">
          <label for="fname">جستجوی ارز:</label>
          <br />
          <input
            v-model="searchInput"
            type="text"
            id="fname"
            name="fname"
            class="outline outline-1 outline-slate-200 my-1 w-full p-2 text-black"
          /><br />
        </div>
        <div class="divider"></div>
        <div v-for="item in props.items" :key="item.title">
          <div
            class="text-right p-2 flex hover:bg-[#4D7A91] hover:text-white"
            v-if="item.title.includes(searchInput)"
            @click="selectCurrency(item.name)"
          >
            <img
              id="ibwImgHeaderTitleComparison"
              :src="item.img"
              width="24px"
            />
            <p class="mx-2">{{ item.title }}</p>
          </div>
          <div class="divider" v-if="item.title.includes(searchInput)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["selectCurrency"]);
const props = defineProps(["items"]);
const searchInput = ref("");

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}
function selectCurrency(currency) {
  emit("selectCurrency", currency);
  toggleMenu();
}
</script>

<style lang="scss" scoped></style>
