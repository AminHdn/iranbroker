<template>
  <div>
    <div class="w-full flex items-center justify-center p-5" v-if="loading">
      <span class="relative flex h-3 w-3">
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
        ></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500">
        </span>
      </span>
      <p class="text-xl font-semibold py-5">...loading</p>
    </div>
    <div v-for="faq in faqs.data" :key="faq._id" class="m-6" v-else>
      <div class="flex my-1">
        <img
          src="https://cdn.ok-ex.io/asset/svg/okex.svg"
          class="w-8 h-8 ml-2"
          alt="logo"
        />
        <h2 class="font-semibold text-2xl">{{ faq.category }}</h2>
      </div>
      <div v-for="item in faq.children" :key="item._id">
        <h3 class="text-xl font-semibold my-4">{{ item.category }}</h3>
        <div v-for="row in item.rows" :key="row._id">
          <div
            class="bg-slate-200 p-3 py-5 flex justify-between font-medium text-[#6D5FD7]"
            @click="open(row._id)"
          >
            {{ row.question }}
            <div>
              <svg
                v-if="row._id != isOpen"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-[#6D5FD7] cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-[#6D5FD7] cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
          <div class="divider"></div>

          <div class="p-2 mx-2" :class="row._id == isOpen ? 'block' : 'hidden'">
            {{ row.answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true);
const isOpen = ref("");

const { data: faqs } = await useAsyncData("faqs", () =>
  $fetch("https://azapi.ok-ex.io/server/api/support/faq")
);
if (faqs.value.data) loading.value = false;

function open(id) {
  if (isOpen.value == id) {
    isOpen.value = "";
  } else isOpen.value = id;
}
</script>

<style lang="scss" scoped>
.divider {
  width: 100%;
  height: 1px;
  background-color: rgb(219, 216, 216);
}
</style>
