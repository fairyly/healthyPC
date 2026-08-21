<template>
  <div class="home-container">
    <header class="home-header">
      <h1>生活健康小助手</h1>
      <p class="subtitle">记录每一天，守护健康生活</p>
    </header>
    <div class="feature-grid">
      <div class="feature-card" @click="$router.push('/bmi')">
        <div class="card-icon">⚖️</div>
        <div class="card-name">BMI 计算</div>
        <div class="card-desc">身高体重指数</div>
      </div>
      <div class="feature-card" @click="$router.push('/water')">
        <div class="card-icon">💧</div>
        <div class="card-name">饮水建议</div>
        <div class="card-desc">每日推荐饮水量</div>
      </div>
      <div class="feature-card" @click="$router.push('/medicine')">
        <div class="card-icon">💊</div>
        <div class="card-name">用药记录</div>
        <div class="card-desc">药品服用管理</div>
      </div>
      <div class="feature-card" @click="$router.push('/blood-pressure')">
        <div class="card-icon">🩺</div>
        <div class="card-name">血压记录</div>
        <div class="card-desc">收缩压/舒张压</div>
      </div>
      <div class="feature-card" @click="$router.push('/blood-sugar')">
        <div class="card-icon">🩸</div>
        <div class="card-name">血糖记录</div>
        <div class="card-desc">空腹/餐后血糖</div>
      </div>
      <div class="feature-card" @click="$router.push('/heart-rate')">
        <div class="card-icon">❤️</div>
        <div class="card-name">心率记录</div>
        <div class="card-desc">每分钟心跳次数</div>
      </div>
      <div class="feature-card" @click="$router.push('/sleep')">
        <div class="card-icon">🌙</div>
        <div class="card-name">睡眠记录</div>
        <div class="card-desc">时长与质量</div>
      </div>
      <div class="feature-card" @click="$router.push('/steps')">
        <div class="card-icon">🚶</div>
        <div class="card-name">步数记录</div>
        <div class="card-desc">每日行走步数</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 24px;
}

.home-header {
  text-align: center;
  margin-bottom: 40px;
}

.home-header h1 {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 8px;
}

.subtitle {
  color: #999;
  font-size: 14px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.feature-card {
  background: #fff;
  border-radius: 14px;
  padding: 28px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid transparent;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(74,144,217,0.15);
  border-color: #4a90d9;
}

.card-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.card-name {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.card-desc {
  font-size: 12px;
  color: #aaa;
}

@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>