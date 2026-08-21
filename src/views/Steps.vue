<template>
  <div class="page-container">
    <div class="page-header">
      <button class="back-btn" @click="$router.push('/')">← 返回</button>
      <h2 class="page-title">步数记录</h2>
    </div>

    <div class="form-card">
      <div class="form-row">
        <div class="form-group">
          <label>步数</label>
          <input v-model.number="form.steps" type="number" placeholder="请输入步数" min="0" />
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
          <tr><th>日期</th><th>步数</th><th>记录时间</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="r in records" :key="r.id">
            <td>{{ r.date }}</td><td>{{ r.steps.toLocaleString() }} 步</td>
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

const STORE = 'steps'
const form = ref({ steps: null, date: '' })
const records = ref([])

async function handleSubmit() {
  if (!form.value.steps || !form.value.date) return
  await addRecord(STORE, { ...form.value })
  form.value = { steps: null, date: '' }
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