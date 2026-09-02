<template>
  <div class="page-container">
    <div class="page-header">
      <button class="back-btn" @click="$router.push('/')">← 返回</button>
      <h2 class="page-title">睡眠记录</h2>
    </div>

    <div class="form-card">
      <div class="form-row">
        <div class="form-group">
          <label>睡眠时长 (小时)</label>
          <input v-model.number="form.duration" type="number" placeholder="请输入时长" min="0" step="0.5" />
        </div>
        <div class="form-group">
          <label>睡眠质量</label>
          <select v-model="form.quality">
            <option value="">请选择</option>
            <option :value="1">⭐ 很差</option>
            <option :value="2">⭐⭐ 较差</option>
            <option :value="3">⭐⭐⭐ 一般</option>
            <option :value="4">⭐⭐⭐⭐ 良好</option>
            <option :value="5">⭐⭐⭐⭐⭐ 极佳</option>
          </select>
        </div>
        <div class="form-group">
          <label>日期</label>
          <input v-model="form.date" type="date" />
        </div>
        <button class="submit-btn" @click="handleSubmit">记录</button>
      </div>
    </div>

    <div class="record-list">
      <h3 class="list-title">记录列表</h3>
      <table v-if="records.length" class="record-table">
        <thead>
          <tr><th>日期</th><th>时长</th><th>质量</th><th>记录时间</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="r in records" :key="r.id">
            <td>{{ r.date }}</td><td>{{ r.duration }} 小时</td>
            <td>{{ '⭐'.repeat(r.quality) }}</td>
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

function getDefaultDate() {
  const d = new Date()
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const STORE = 'sleep'
const form = ref({ duration: null, quality: '', date: getDefaultDate() })
const records = ref([])

async function handleSubmit() {
  if (!form.value.duration || !form.value.quality || !form.value.date) return
  await addRecord(STORE, { ...form.value })
  form.value = { duration: null, quality: '', date: getDefaultDate() }
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