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
  }

}