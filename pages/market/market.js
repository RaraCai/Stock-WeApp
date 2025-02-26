// pages/market/market.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMarket: 'SH', // 默认市场
    indexList: [
      {
        name: '上证指数',
        code: '000001',
        price: '3500.00',
        change: '-10.00',
        changePercent: -0.28
      },
      {
        name: '深证成指',
        code: '399001',
        price: '14000.00',
        change: '20.00',
        changePercent: 0.14
      },
      {
        name: '创业板指',
        code: '399006',
        price: '2243.51',
        change: '3.52',
        changePercent: 0.17
      }
    ],
    stockList: [
      {
        name: '贵州茅台',
        code: '600519',
        price: '1899.99',
        changePercent: 2.35
      },
      {
        name: '五粮液',
        code: '000858',
        price: '299.99',
        changePercent: 1.25
      }
    ],
    sortField: '', // 排序字段：'price' 或 'changePercent'
    sortOrder: 'desc', // 排序方向：'asc' 或 'desc'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMarketData(this.data.currentMarket);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  switchMarket: function(e) {
    const market = e.currentTarget.dataset.market;
    this.setData({ currentMarket: market });
    this.getMarketData(market);
  },

  getMarketData: function(market) {
    let indexList = [];
    let stockList = [];

    if (market === 'SH') {
      indexList = [
        { name: '上证指数', code: '000001', price: '3500.00', change: '-10.00', changePercent: -0.28 },
        { name: '深证成指', code: '399001', price: '14000.00', change: '20.00', changePercent: 0.14 },
        { name: '创业板指', code: '399006', price: '2243.51', change: '3.52', changePercent: 0.17 }
      ];
      stockList = [
        { name: '贵州茅台', code: '600519', price: '1899.99', changePercent: 2.35 },
        { name: '五粮液', code: '000858', price: '299.99', changePercent: 1.25 }
      ];
    } else if (market === 'HK') {
      indexList = [
        { name: '恒生指数', code: 'HSI', price: '23000.00', change: '-100.00', changePercent: -0.43 },
        { name: '国企指数', code: 'HSCEI', price: '8000.00', change: '50.00', changePercent: 0.63 },
        { name: 'AH股溢价', code: 'HSAHP', price: '132.47', change: '-1.07', changePercent: -0.80 }
      ];
      stockList = [
        { name: '腾讯控股', code: '00700', price: '500.00', changePercent: 1.50 },
        { name: '阿里巴巴', code: '09988', price: '200.00', changePercent: -0.75 }
      ];
    } else if (market === 'US') {
      indexList = [
        { name: '道琼斯', code: 'DJI', price: '35000.00', change: '150.00', changePercent: 0.43 },
        { name: '标普500', code: 'SPX', price: '5955.25', change: '-28.00', changePercent: -0.47 },
        { name: '纳斯达克', code: 'IXIC', price: '14000.00', change: '-50.00', changePercent: -0.35 }
      ];
      stockList = [
        { name: '苹果', code: 'AAPL', price: '150.00', changePercent: 0.85 },
        { name: '亚马逊', code: 'AMZN', price: '3300.00', changePercent: -0.45 }
      ];
    }

    this.setData({
      indexList: indexList,
      stockList: stockList
    });
  },

  goToSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  goToDetail: function(e) {
    const stock = e.currentTarget.dataset.stock;
    wx.navigateTo({
      url: `/pages/stock-detail/stock-detail?code=${stock.code}`
    });
  },

  // 按价格排序
  sortByPrice: function() {
    this.sort('price');
  },

  // 按涨跌幅排序
  sortByChange: function() {
    this.sort('changePercent');
  },

  // 排序方法
  sort: function(field) {
    let { stockList, sortField, sortOrder } = this.data;
    
    // 如果点击的是同一个字段，则切换排序方向
    if (field === sortField) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      sortField = field;
      sortOrder = 'desc'; // 默认降序
    }

    // 对股票列表进行排序
    stockList.sort((a, b) => {
      let aValue = parseFloat(field === 'price' ? a.price : a.changePercent);
      let bValue = parseFloat(field === 'price' ? b.price : b.changePercent);
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    this.setData({
      stockList,
      sortField,
      sortOrder
    });
  }
})