const express = require('express');
const app = express();

app.get('/api/kline', (req, res) => {
  const { code, type } = req.query;
  
  // 这里应该是从数据库或其他数据源获取数据
  // 这里使用模拟数据
  const klineData = generateKlineData(type);
  
  res.json(klineData);
});

function generateKlineData(type) {
  const data = [];
  const basePrice = 1899.99;
  const days = type === 'day' ? 30 : type === 'week' ? 52 : 24;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const randomChange = (Math.random() - 0.5) * 20;
    const open = basePrice + randomChange;
    const close = open + (Math.random() - 0.5) * 10;
    const low = Math.min(open, close) - Math.random() * 5;
    const high = Math.max(open, close) + Math.random() * 5;
    
    data.unshift({
      date: date.toISOString().split('T')[0],
      open: open.toFixed(2),
      close: close.toFixed(2),
      low: low.toFixed(2),
      high: high.toFixed(2)
    });
  }
  
  return data;
}

app.listen(3000, () => {
  console.log('Server running on port 3000');
}); 