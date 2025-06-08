<template>
  <div
    class="min-h-screen bg-gray-900 flex items-center justify-center p-6 text-gray-100"
  >
    <div
      class="w-full max-w-xl bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-700"
    >
      <h1 class="text-3xl font-bold text-emerald-400 mb-6 text-center">
        MTB Tire Pressure Calculator
      </h1>

      <form @submit.prevent="calculatePressure" class="space-y-5">
        <div>
          <label
            for="riderWeight"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Rider Weight (kg)</label
          >
          <input
            id="riderWeight"
            v-model.number="riderWeight"
            type="number"
            min="30"
            max="150"
            class="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            for="tireWidth"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Tire Width (mm)</label
          >
          <input
            id="tireWidth"
            v-model.number="tireWidth"
            type="number"
            min="40"
            max="80"
            class="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            for="ridingStyle"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Riding Style</label
          >
          <select
            id="ridingStyle"
            v-model="ridingStyle"
            class="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            required
          >
            <option value="xc">Cross-country</option>
            <option value="enduro">Enduro</option>
            <option value="dh">Downhill</option>
          </select>
        </div>

        <div>
          <label
            for="tireType"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Tire Type</label
          >
          <select
            v-model="tireType"
            class="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            required
          >
            <option value="tubeless">Tubeless</option>
            <option value="tube">Tube</option>
          </select>
        </div>

        <div>
          <label
            for="wheelSize"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Wheel Size</label
          >
          <select
            v-model="wheelSize"
            class="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            required
          >
            <option value="29">29"</option>
            <option value="27.5">27.5"</option>
          </select>
        </div>

        <div class="pt-4">
          <button
            class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Calculate Pressure
          </button>
        </div>
      </form>
    </div>
    <div
      v-if="frontPressure !== null"
      class="mt-6 bg-green-100 p-4 rounded-lg text-gray-800"
    >
      <p class="font-semibold text-lg">Recommended Pressures:</p>
      <p>
        Front Tire: <span class="font-mono">{{ frontPressure }}</span> psi
      </p>
      <p>
        Rear Tire: <span class="font-mono">{{ rearPressure }}</span> psi
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const riderWeight = ref(70);
const tireWidth = ref(55);
const ridingStyle = ref("xc");
const tireType = ref("tubeless");
const wheelSize = ref("29");
const frontPressure = ref(null);
const rearPressure = ref(null);

function calculatePressure() {
  const baseFront = 22;
  const baseRear = 24;
  const weightAdj = (riderWeight.value - 70) * 0.15;

  const widthInches = tireWidth.value / 25.4;
  const widthFactor = 2.3 / widthInches;

  let frontStyleAdj = 0;
  let rearStyleAdj = 0;

  if (ridingStyle.value === "enduro") {
    frontStyleAdj = -0.5;
    rearStyleAdj = 0.5;
  } else if (ridingStyle.value === "dh") {
    frontStyleAdj = -1;
    rearStyleAdj = 1;
  }

  const tireAdj = tireType.value === "tube" ? 1 : 0;
  const wheelAdj = wheelSize.value === "29" ? -0.5 : 0;

  const rawFront =
    (baseFront + weightAdj) * widthFactor + frontStyleAdj + tireAdj + wheelAdj;
  const rawRear =
    (baseRear + weightAdj) * widthFactor + rearStyleAdj + tireAdj + wheelAdj;

  frontPressure.value = Math.round(rawFront * 10) / 10;
  rearPressure.value = Math.round(rawRear * 10) / 10;
}
</script>
