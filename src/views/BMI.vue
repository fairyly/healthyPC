<template>
  <div class="page-container">
    <div class="page-header">
      <button class="back-btn" @click="$router.push('/')">← 返回</button>
      <h2 class="page-title">BMI 计算</h2>
    </div>

    <div class="form-card">
      <div class="form-row">
        <div class="form-group">
          <label>身高 (cm)</label>
          <input v-model.number="form.height" type="number" placeholder="请输入身高" min="0" />
        </div>
        <div class="form-group">
          <label>体重 (kg)</label>
          <input v-model.number="form.weight" type="number" placeholder="请输入体重" min="0" step="0.1" />
        </div>
        <button class="submit-btn" @click="handleSubmit">记录</button>
      </div>
      <div v-if="result" class="bmi-result">
        <span>BMI: <strong>{{ result.bmi }}</strong></span>
        <span :class="['result-tag', result.className]">{{ result.label }}</span>
      </div>
    </div>

    <div class="record-list">
      <h3 class="list-title">记录列表</h3>
      <table v-if="records.length" class="record-table">
        <thead>
          <tr><th>身高 (cm)</th><th>体重 (kg)</th><th>BMI</th><th>状态</th><th>时间</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="r in records" :key="r.id">
            <td>{{ r.height }}</td>
            <td>{{ r.weight }}</td>
            <td>{{ r.bmi }}</td>
            <td><span :class="['result-tag', r.className]">{{ r.label }}</span></td>
            <td>{{ formatTime(r.createdAt) }}</td>
            <td><button class="delete-btn" @click="handleDelete(r.id)">删除</button></td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-text">暂无记录</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { addRecord, getAllRecords, deleteRecord } from '../db'

const STORE = 'bmi'
const form = ref({ height: null, weight: null })
const result = ref(null)
const records = ref([])

function calcBMI(h, w) {
  const bmi = (w / ((h / 100) ** 2)).toFixed(1)
  let label, className
  if (bmi < 18.5) { label = '偏瘦'; className = 'result-underweight' }
  else if (bmi < 24) { label = '正常'; className = 'result-normal' }
  else if (bmi < 28) { label = '超重'; className = 'result-overweight' }
  else { label = '肥胖'; className = 'result-obese' }
  return { bmi, label, className }
}

async function handleSubmit() {
  if (!form.value.height || !form.value.weight) return
  const r = calcBMI(form.value.height, form.value.weight)
  result.value = r
  await addRecord(STORE, { height: form.value.height, weight: form.value.weight, ...r })
  form.value = { height: null, weight: null }
  await loadRecords()
}

async function loadRecords() {
  records.value = await getAllRecords(STORE)
}

async function handleDelete(id) {
  await deleteRecord(STORE, id)
  await loadRecords()
}

function formatTime(s) {
  return new Date(s).toLocaleString('zh-CN')
}

onMounted(loadRecords)
</script>

<style scoped>
.bmi-result {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 8px;
  font-size: 15px;
  color: #555;
}
</style>