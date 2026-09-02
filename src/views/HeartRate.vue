<template>
  <div class="page-container">
    <div class="page-header">
      <button class="back-btn" @click="$router.push('/')">← 返回</button>
      <h2 class="page-title">心率记录</h2>
    </div>

    <div class="form-card">
      <div class="form-row">
        <div class="form-group">
          <label>心率 (次/分钟)</label>
          <input v-model.number="form.bpm" type="number" placeholder="请输入心率" min="0" />
        </div>
        <div class="form-group">
          <label>测量时间</label>
          <input v-model="form.time" type="datetime-local" />
        </div>
        <button class="submit-btn" @click="handleSubmit">记录</button>
      </div>
    </div>

    <div class="record-list">
      <h3 class="list-title">记录列表</h3>
      <table v-if="records.length" class="record-table">
        <thead>
          <tr><th>心率</th><th>测量时间</th><th>记录时间</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="r in records" :key="r.id">
            <td>{{ r.bpm }} bpm</td><td>{{ r.time }}</td>
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

function getDefaultDateTime() {
  const d = new Date()
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const STORE = 'heartRate'
const form = ref({ bpm: null, time: getDefaultDateTime() })
const records = ref([])

async function handleSubmit() {
  if (!form.value.bpm || !form.value.time) return
  await addRecord(STORE, { ...form.value, time: form.value.time.replace('T', ' ') })
  form.value = { bpm: null, time: getDefaultDateTime() }
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