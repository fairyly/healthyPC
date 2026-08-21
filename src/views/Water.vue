<template>
  <div class="page-container">
    <div class="page-header">
      <button class="back-btn" @click="$router.push('/')">← 返回</button>
      <h2 class="page-title">每日饮水建议</h2>
    </div>

    <div class="form-card">
      <div class="form-row">
        <div class="form-group">
          <label>性别</label>
          <select v-model="form.gender">
            <option value="">请选择</option>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
        <div class="form-group">
          <label>体重 (kg)</label>
          <input v-model.number="form.weight" type="number" placeholder="请输入体重" min="0" step="0.1" />
        </div>
        <button class="submit-btn" @click="handleSubmit">记录</button>
      </div>
      <div v-if="result" class="water-result">
        每日推荐饮水量：<strong>{{ result }} ml</strong>
      </div>
    </div>

    <div class="record-list">
      <h3 class="list-title">记录列表</h3>
      <table v-if="records.length" class="record-table">
        <thead>
          <tr><th>性别</th><th>体重 (kg)</th><th>推荐饮水量 (ml)</th><th>时间</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="r in records" :key="r.id">
            <td>{{ r.gender }}</td><td>{{ r.weight }}</td><td>{{ r.water }}</td>
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

const STORE = 'water'
const form = ref({ gender: '', weight: null })
const result = ref(null)
const records = ref([])

function calcWater(gender, weight) {
  return Math.round(gender === '男' ? weight * 35 : weight * 30)
}

async function handleSubmit() {
  if (!form.value.gender || !form.value.weight) return
  const water = calcWater(form.value.gender, form.value.weight)
  result.value = water
  await addRecord(STORE, { gender: form.value.gender, weight: form.value.weight, water })
  form.value = { gender: '', weight: null }
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
.water-result {
  padding-top: 8px;
  font-size: 15px;
  color: #555;
}
</style>