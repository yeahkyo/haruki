export default {

  getWord() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://nihongo.yeah-site.com/words/one',
        header: {
          'X-NH-Agent': 'haruki'
        },
        success: function(res) {
          resolve(res.data.words[0])
        }
      })
    })
  },

  getSentences(wordId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://nihongo.yeah-site.com/words/${wordId}/sentences`,
        header: {
          'X-NH-Agent': 'haruki'
        },
        success: function(res) {
          resolve(res.data.sentences);
        }
      })
    })
  },

  login() {
    wx.showLoading({title: "正在登录..."})
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: function(res) {
          let userInfo = res.userInfo
          wx.login({
            success: function(res) {
              wx.hideLoading()
              if (res.code) {
                wx.request({
                  url: 'http://127.0.0.1:3000/login',
                  method: 'POST',
                  header: {
                    'X-NH-Agent': 'haruki'
                  },
                  data: {
                    code: res.code,
                    name: userInfo.nickName
                    // gender: userInfo.gender,
                    // language: userInfo.language,
                    // city: userInfo.city,
                    // province: userInfo.province,
                    // country: userInfo.country,
                    // avatarUrl: userInfo.avatarUrl
                  },
                  success: function(res) {
                    resolve(res.data)
                  }
                })
              } else {
                console.log('登录失败')
              }
            }
          })
        }
      })
    })
  }

}