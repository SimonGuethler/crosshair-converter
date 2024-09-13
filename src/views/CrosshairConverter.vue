<template>
  <div class="crosshair-converter card flex justify-center">
    <h1>CS2 Crosshair Converter</h1>
    <h2>
      Converts a CS2/CSGO crosshair share code/hash <br />
      into crosshair cl_crosshair... code.
    </h2>
    <Button
      as="a"
      class="link"
      label="Source Code"
      link
      href="https://github.com/SimonGuethler/crosshair-converter"
      target="_blank"
      rel="noopener"
      ><i class="pi pi-github"></i> Source Code
    </Button>

    <div class="inputcode" style="margin-bottom: 1rem; margin-top: 0.5rem">
      <FloatLabel>
        <InputText id="crosshaircode" v-model="inputCode" style="width: 17rem" />
        <label for="crosshaircode">CSGO-xXXx-xXXx-xXXx-xXXx-xXXx</label>
      </FloatLabel>
      <Button @click="convertCode">Convert</Button>
    </div>

    <!--    <label for="outputcode" style="margin-bottom: 0.25rem; font-weight: 200">-->
    <!--      Converted crosshair code:-->
    <!--    </label>-->
    <Textarea
      id="outputcode"
      style="margin-bottom: 1rem"
      rows="21"
      cols="50"
      readonly
      :value="outputCode"
    />
    <Button style="margin-bottom: 1rem" @click="copyToClipboard">
      <i class="pi pi-clone"></i> Copy
    </Button>
  </div>

  <Toast style="width: 300px" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type Crosshair, crosshairToConVars, decodeCrosshairShareCode } from 'csgo-sharecode'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const showSuccessCopy = () => {
  toast.add({ severity: 'success', summary: 'Success', detail: 'Copied to clipboard!', life: 3000 })
}

const showFailureCopy = () => {
  toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to copy', life: 3000 })
}

const showSuccessConvert = () => {
  toast.add({ severity: 'success', summary: 'Success', detail: 'Converted!', life: 3000 })
}

const showFailureConvert = () => {
  toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to convert', life: 3000 })
}

const inputCode = ref('')
const outputCode = ref('')

const convertCode = () => {
  try {
    const crosshair: Crosshair = decodeCrosshairShareCode(inputCode.value.trim())
    outputCode.value = crosshairToConVars(crosshair).trim()
    showSuccessConvert()
  } catch (error) {
    outputCode.value = ''
    showFailureConvert()
  }
}

const copyToClipboard = () => {
  if (!outputCode.value) {
    showFailureCopy()
    return
  }

  navigator.clipboard
    .writeText(outputCode.value)
    .then(() => showSuccessCopy())
    .catch(() => showFailureCopy())
}
</script>

<style scoped>
.crosshair-converter {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

h1 {
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 3rem;
  color: var(--p-primary-color);
}

h2 {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 200;
}

.inputcode {
  display: flex;
  justify-content: center;
}

.inputcode > * {
  margin-inline: 0.75rem;
}

.link {
  font-weight: 200;
  font-size: 1rem;
  text-decoration: none;
  margin: 0;
  padding: 0.5rem 0 1rem;
}
</style>
