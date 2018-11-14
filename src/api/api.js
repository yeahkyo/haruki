async function apiRequest(entry, options) {
  return new Promise( (resolve, reject) => {
    let defaultOpt = {
      url: `https://nihongo.yeah-site.com${entry}`,
      header: {
        'X-NH-Agent': 'haruki'
      },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    }
    wx.request(Object.assign(defaultOpt, options))
  })
}

async function getUserInfo() {
  return new Promise( (resolve, reject) => {
    wx.getUserInfo({
      success: (res) => {
        resolve(res.userInfo)
      }
    })
  })
}

async function wxLogin() {
  return new Promise( (resolve, reject) => {
    wx.login({
      success: (res) => {
        resolve(res.code)
      }
    })
  })
}

export default {
  async getWord() {
    const res = await apiRequest('/words/one')
    return res.data.words[0]
  },

  async getSentences(wordId) {
    const res = await apiRequest(`/words/${wordId}/sentences`)
    return res.data.sentences
  },

  async login() {

    const userInfo = await getUserInfo()
    const jsCode = await wxLogin()
    const res = await apiRequest('/login', {
      method: 'POST',
      data: {
        code: jsCode,
        name: userInfo.nickName
        // gender: userInfo.gender,
        // language: userInfo.language,
        // city: userInfo.city,
        // province: userInfo.province,
        // country: userInfo.country,
        // avatarUrl: userInfo.avatarUrl
      }
    })
    return res.data
  }
}