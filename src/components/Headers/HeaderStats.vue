<template>
  <!-- Header -->
  <div class="relative bg-emerald-600 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-6/12 px-6">
            <card-stats
              statSubtitle="UPCOMING Payment"
              statTitle="300.00"
              statArrow="none"
              statPercent=""
              statPercentColor="text-emerald-500"
              statIconName="far fa-chart-bar"
              statIconColor="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-6/12 px-6">
            <card-stats
              statSubtitle="Last Payment"
              statTitle="350.00"
              statArrow="none"
              statPercent=""
              statPercentColor="text-red-500"
              statIconName="fas fa-chart-pie"
              statIconColor="bg-orange-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";

export default {
  components: {
    CardStats,
  },
};
</script>
