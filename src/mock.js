import Mock from 'mockjs';

const jn_company = ['济南超意兴餐饮有限公司', '济南大润发集团有限公司', '资产投资与运营岗（济南）青岛腾远设计事务所有限公司济南分公司', '漱玉平民大药房连锁股份有限公司', '千佛山医院', '山大二院', '齐鲁医院', '顺丰集团有限公司','华润置地(北京)物业管理有限责任公司济南分公司']

Mock.mock("http://table-api.com",(req,res)=>{
      
      return Mock.mock({
            "array|20-25":[
                  {
                        "id|+1":'@increment(1)',
                        "td_dwdm": /\d{5,10}/,
                        "td_dwmc|1": jn_company,
                        "td_qxjg": "山东政府",
                        "td_zgjgdm": /\d{5,10}/,
                        "td_dwbm": /\d{5,10}/,
                        "td_dwxz": "有限责任公司(自然人投资或控股)",
                        "td_sfqy": '@boolean',
                        "td_lyzh|1-10": 1,
                        "td_txdz": "@city(true)",
                        "td_yzbm": '25000',
                        "td_czgkbm": "济南市市中区市场监督管理局",
                        "td_ywzgbm": '济南市市中区市场监督管理局',
                        "td_jglx": "省直用票单位"
                  }
            ]
      })
})
