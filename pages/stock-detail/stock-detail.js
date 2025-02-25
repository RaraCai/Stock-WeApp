import * as echarts from '../../ec-canvas/echarts';

// 模拟K线数据生成函数
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

const createOption = (dates, values) => {
  return {
    backgroundColor: '#fff',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#732BF5'
        }
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#eee',
      borderWidth: 1,
      padding: [10, 15],
      formatter: function (params) {
        const data = params[0].data;
        const change = (data[1] - data[0]).toFixed(2);
        const changePercent = ((change / data[0]) * 100).toFixed(2);
        const color = change >= 0 ? '#f5222d' : '#52c41a';
        
        return [
          '日期：' + params[0].axisValue,
          '开盘价：' + data[0].toFixed(2),
          '收盘价：' + data[1].toFixed(2),
          '最低价：' + data[2].toFixed(2),
          '最高价：' + data[3].toFixed(2),
          '涨跌幅：' + `${change}(${changePercent}%)`
        ].join('\n');
      },
      textStyle: {
        color: '#333',
        fontSize: 13,
        lineHeight: 20
      }
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '5%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dates,
      scale: true,
      boundaryGap: false,
      axisLine: { 
        onZero: false,
        lineStyle: {
          color: '#999'
        }
      },
      splitLine: { 
        show: true,
        lineStyle: {
          color: ['#eee'],
          type: 'dashed'
        }
      },
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax',
      axisLabel: {
        formatter: function (value) {
          return value.substring(5);
        },
        color: '#666',
        margin: 8
      }
    },
    yAxis: {
      scale: true,
      position: 'left',
      splitArea: {
        show: true,
        areaStyle: {
          color: ['#fff', '#f9f9f9']
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#999'
        }
      },
      splitLine: {
        lineStyle: {
          color: ['#eee'],
          type: 'dashed'
        }
      },
      axisLabel: {
        formatter: function (value) {
          return value.toFixed(2);
        },
        color: '#666',
        inside: false,
        margin: 8
      }
    },
    dataZoom: [{
      type: 'inside',
      start: 50,
      end: 100,
      minValueSpan: 10,
      zoomLock: false
    }],
    series: [{
      name: '价格',
      type: 'candlestick',
      data: values,
      itemStyle: {
        color: '#f5222d',
        color0: '#52c41a',
        borderColor: '#f5222d',
        borderColor0: '#52c41a'
      },
    }]
  };
};

Page({
  data: {
    stockInfo: {
      name: '',
      code: '',
      price: '',
      change: '',
      changePercentage: 0,
      yearOnYear: 0,
      monthOnMonth: 0,
      peDynamic: 0,
      peStatic: 0,
      pb: 0,
      pbEstimate: 0,
      pcf: 0,
      pcfEstimate: 0,
      peDynamicEstimate: 0,
      peStaticEstimate: 0
    },
    timeRange: 'day',
    ec: {
      lazyLoad: true
    }
  },

  onLoad: function(options) {
    const { code } = options;
    this.getStockDetail(code);
  },

  onReady: function() {
    this.initChart();
  },

  getStockDetail: function(code) {
    // 模拟数据
    this.setData({
      stockInfo: {
        name: '贵州茅台',
        code: '600519',
        price: '1899.99',
        change: '+43.51',
        changePercentage: 2.35,
        yearOnYear: 15.6,
        monthOnMonth: 5.2,
        peDynamic: 32.5,
        peStatic: 30.8,
        pb: 8.5,
        pbEstimate: 8.2,
        pcf: 25.6,
        pcfEstimate: 24.8,
        peDynamicEstimate: 31.5,
        peStaticEstimate: 29.8
      }
    });
  },

  initChart: function() {
    const ecComponent = this.selectComponent('#mychart-dom-kline');
    ecComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      canvas.setChart(chart);

      // 生成初始数据
      const klineData = generateKlineData('day');
      const dates = klineData.map(item => item.date);
      const values = klineData.map(item => [
        parseFloat(item.open),
        parseFloat(item.close),
        parseFloat(item.low),
        parseFloat(item.high)
      ]);

      const option = createOption(dates, values);
      chart.setOption(option);
      return chart;
    });
  },

  switchTimeRange: function(e) {
    const range = e.currentTarget.dataset.range;
    this.setData({ timeRange: range });
    
    // 获取图表实例
    const chart = this.selectComponent('#mychart-dom-kline').chart;
    
    // 生成新的模拟数据
    const klineData = generateKlineData(range);
    const dates = klineData.map(item => item.date);
    const values = klineData.map(item => [
      parseFloat(item.open),
      parseFloat(item.close),
      parseFloat(item.low),
      parseFloat(item.high)
    ]);

    // 更新图表数据
    chart.setOption({
      xAxis: {
        data: dates
      },
      series: [{
        data: values
      }]
    });
  }
}); 