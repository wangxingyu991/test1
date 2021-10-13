<template>
      <div class="components">
          <el-scrollbar  style="height: 100%">
              <div class="card">
                  <el-divider> transfer穿梭框</el-divider>
                  <div class="el-tr">
                        <el-transfer v-model="value" :data="data"></el-transfer>
                  </div>  

                  <el-divider>可搜索 transfer穿梭框</el-divider>
                  <div class="el-tr">
                        <el-transfer
                        filterable
                        :filter-method="filterMethod"
                        :titles="['原生列表', '树状目标列表']"
                        filter-placeholder="请输入城市拼音"
                        v-model="value2"
                        :data="data2">
                        </el-transfer>
                  </div>  
              </div>
          </el-scrollbar>
       </div>
</template>

<script>
export default {
      name:"transfer",
    data() {
            const generateData = _ => {
                  const data = [];
                  for (let i = 1; i <= 15; i++) {
                        data.push({
                              key: i,
                              label: `备选项 ${ i }`,
                              disabled: i % 4 === 0
                        });
                  }
                  return data;
            };
            const generateData2 = _ => {
                  const data = [];
                  const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
                  const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
                  cities.forEach((city, index) => {
                  data.push({
                        label: city,
                        key: index,
                        pinyin: pinyin[index],
                        disabled: index % 4 === 0//可以动态设置禁止某些列表转移
                  });
                  });
                  return data;
            };
            return {
                  data: generateData(),
                  data2:generateData2(),
                  value: [1, 4],
                  value2:[],
                  filterMethod(query,item){
                        return item.pinyin.indexOf(query)>-1
                  },
                  // filterMethod(query, item) {
                  //       return item.pinyin.indexOf(query) > -1;
                  // }
            };
    }
}
</script>