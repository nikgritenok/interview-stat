<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getFirestore, doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore'
import { useUserStore } from '@/stores/user'
import type { IInterview, IStage } from '@/interfaces'

const userStore = useUserStore()
const db = getFirestore()
const route = useRoute()

const isLoading = ref<boolean>(true)
const interview = ref<IInterview>()

const docref = doc(db, `users/${userStore.userId}/interviews/`, route.params.id as string)

const getData = async (): Promise<void> => {
  isLoading.value = true
  const docSnap = await getDoc(docref)

  if (docSnap.exists()) {
    const data = docSnap.data() as IInterview

    if (data.stages && data.stages.length) {
      data.stages = data.stages.map((stage: IStage) => {
        if (stage.date && stage.date instanceof Timestamp) {
          return {
            ...stage,
            date: stage.date.toDate(),
          }
        }
        return stage
      })
    }
    interview.value = data
  }

  isLoading.value = false
  console.log(interview.value)
}

const addStage = (): void => {
  if (interview.value) {
    if (!interview.value.stages) {
      interview.value.stages = []
    }
    interview.value.stages.push({ name: '', date: null, description: '' })
  }
}

const removeStage = (index: number): void => {
  if (interview.value) {
    if (interview.value.stages) {
      interview.value.stages.splice(index, 1)
    }
  }
}

const saveInterview = async (): Promise<void> => {
  isLoading.value = true

  await updateDoc(docref, { ...interview.value })
  await getData()
  isLoading.value = false
}

onMounted(async () => await getData())
</script>

<template>
  <app-progress-spinner v-if="isLoading" />
  <div class="content-interview" v-else-if="interview?.id && !isLoading">
    <app-card>
      <template #title>Собеседование в компанию {{ interview.company }}</template>
      <template #content>
        <div class="flex-column gap-2">
          <label for="company">Компания</label>
          <app-input-text
            class="input mb-3"
            id="company"
            v-model="interview.company"
          ></app-input-text>
        </div>
        <div class="flex-column gap-2">
          <label for="vacancyLink">Описание вакансии(ссылка)</label>
          <app-input-text
            class="input mb-3"
            id="vacancyLink"
            v-model="interview.vacancyLink"
          ></app-input-text>
        </div>
        <div class="flex-column gap-2">
          <label for="hrName">Контакт (Имя)</label>
          <app-input-text
            class="input mb-3"
            id="hrName"
            v-model="interview.hrName"
          ></app-input-text>
        </div>
        <div class="flex-column gap-2">
          <label for="contactTelegram">Telegram username HR</label>
          <app-input-text
            class="input mb-3"
            id="contactTelegram"
            v-model="interview.contactTelegram"
          ></app-input-text>
        </div>
        <div class="flex-column gap-2">
          <label for="contactWhatsApp">WhatsApp телефон HR</label>
          <app-input-text
            class="input mb-3"
            id="contactWhatsApp"
            v-model="interview.contactWhatsApp"
          ></app-input-text>
        </div>
        <div class="flex-column gap-2">
          <label for="contactPhone">Телефон HR</label>
          <app-input-text
            class="input mb-3"
            id="contactPhone"
            v-model="interview.contactPhone"
          ></app-input-text>
        </div>
        <div class="flex flex-wrap gap-3 p-fluid mb-3">
          <div class="flex">
            <app-input-number
              inputID="salaryFrom"
              placeholder="Зарплата вилка от"
              v-model="interview.salaryFrom"
            ></app-input-number>
            <app-input-number
              inputID="salaryTo"
              placeholder="Зарплата вилка до"
              v-model="interview.salaryTo"
            ></app-input-number>
          </div>
        </div>
        <app-button
          label="Добавить этап"
          severity="info"
          icon="pi pi-plus"
          class="mb-3"
          @click="addStage"
        ></app-button>

        <template v-if="interview.stages">
          <div v-for="(stage, index) in interview.stages" :key="index" class="interview-stage">
            <div class="flex flex-column gap-2">
              <label :for="`stage-name-${index}`">Название этапа</label>
              <app-input-text
                class="input mb-3"
                :id="`stage-name-${index}`"
                v-model="stage.name"
              ></app-input-text>
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage-date-${index}`">Дата прохождения этапа</label>
              <app-datepicker
                class="input mb-3"
                :id="`stage-date-${index}`"
                dateFormat="dd.mm.yy"
                v-model="stage.date"
              />
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage-description-${index}`">Комментарий</label>
              <app-textarea
                class="input mb-3"
                :id="`stage-description-${index}`"
                rows="5"
                v-model="stage.description"
              ></app-textarea>
            </div>
            <app-button
              severity="danger"
              label="Удалить этап"
              class="mb-3"
              @click="removeStage"
            ></app-button>
          </div>
        </template>
        <div class="flex flex-wrap gap-3 mb-3">
          <div class="flex align-items-center gap-2">
            <div class="flex items-center gap-2">
              <app-radiobutton
                v-model="interview.result"
                inputId="interviewResult1"
                name="result"
                value="Refusal"
              />
              <label for="interviewResult1">Отказ</label>
            </div>
            <div class="flex items-center gap-2">
              <app-radiobutton
                v-model="interview.result"
                inputId="interviewResult2"
                name="result"
                value="Offer"
              />
              <label for="interviewResult2">Оффер</label>
            </div>
          </div>
        </div>
        <app-button label="Сохранить" icon="pi pi-save" severity="info" @click="saveInterview" />
      </template>
    </app-card>
  </div>
</template>

<style scoped>
.content-interview {
  max-width: 600px;
  margin: auto;
}
.input {
  width: 100%;
}
.interview-stage {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
