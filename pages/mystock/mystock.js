Page({
  data: {
    stockList: [
      {
        name: '贵州茅台',
        code: '600519',
        price: '1899.99',
        changePercentage: 2.35
      },
      // 这里可以添加更多股票数据
    ]
  },

  onLoad: function() {
    // 获取自选股票列表
    this.getMyStocks()
  },

  getMyStocks: function() {
    // 这里添加获取自选股票的逻辑
  },

  goToSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  goToDetail: function(e) {
    const stock = e.currentTarget.dataset.stock
    wx.navigateTo({
      url: `/pages/stock-detail/stock-detail?code=${stock.code}`
    })
  }
}) 