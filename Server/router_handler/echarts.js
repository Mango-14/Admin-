const { default: axios } = require("axios")

exports.getEchartsData = async (req, res) => {
  const result = await axios.post('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf')
  res.json({
    code: 200,
    message: '请求成功',
    data: result.data
  })
}