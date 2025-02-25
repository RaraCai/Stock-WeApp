Page({
  data: {
    searchKey: '',
    searchList: [],
    historyList: []
  },

  onLoad: function() {
    // 获取历史记录
    const history = wx.getStorageSync('searchHistory') || []
    this.setData({ historyList: history })
  },

  onInput: function(e) {
    const value = e.detail.value
    this.setData({ searchKey: value })
    if (value) {
      this.searchStocks(value)
    }
  },

  searchStocks: function(keyword) {
    // 这里添加搜索股票的逻辑
    // 模拟搜索结果
    const result = [
      { name: '贵州茅台', code: '600519' },
      { name: '五粮液', code: '000858' }
    ].filter(item => 
      item.name.includes(keyword) || item.code.includes(keyword)
    )
    this.setData({ searchList: result })
  },

  selectStock: function(e) {
    const stock = e.currentTarget.dataset.stock
    this.saveToHistory(stock)
    wx.navigateTo({
      url: `/pages/stock-detail/stock-detail?code=${stock.code}`
    })
  },

  saveToHistory: function(stock) {
    let history = wx.getStorageSync('searchHistory') || []
    // 去重
    history = history.filter(item => item.code !== stock.code)
    // 最多保存10条
    history.unshift(stock)
    if (history.length > 10) {
      history.pop()
    }
    wx.setStorageSync('searchHistory', history)
  },

  onHistoryTap: function(e) {
    const stock = e.currentTarget.dataset.stock
    wx.navigateTo({
      url: `/pages/stock-detail/stock-detail?code=${stock.code}`
    })
  },

  clearHistory: function() {
    wx.removeStorageSync('searchHistory')
    this.setData({ historyList: [] })
  },

  clearInput: function() {
    this.setData({ 
      searchKey: '',
      searchList: []
    })
  },

  goBack: function() {
    wx.navigateBack()
  }
}) 