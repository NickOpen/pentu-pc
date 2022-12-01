<template>
	<section class="sub-pg perf-test">
		<el-table
      :data="items"
			:span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 4px">
      <el-table-column
        prop="type"
        label="内容"
        width="180">
      </el-table-column>
      <el-table-column
        prop="subject"
        label="检测项目"
				width="260">
      </el-table-column>
      <el-table-column
        prop="method"
        label="检测方法"
				width="260">
      </el-table-column>
      <el-table-column
        prop="reference"
        label="参考标准或文献">
      </el-table-column>
    </el-table>
	</section>
</template>

<script>

export default {
	name: "PerformanceTestPage",
	data() {
		return {
			items: [
				{
					type: '力学性能',
					subject: '拉伸结合强度',
					method: '胶粘法、拉伸试验机',
					reference: 'HB5476-1991 《热喷涂涂层结合强度实验方法》；MHT3027-2013《热喷涂涂层结合强度测试》；GB/T8642-2002《热喷涂抗拉结合强度的测定》'
				},{
					type: '力学性能',
					subject: '剪切结合强度',
					method: '万能力学试验仪',
					reference: 'GB/T 13222-91《金属热喷涂层剪切强度的测定》；HB 5474-91《热喷涂涂层剪切强度试验方法》；YST 550-2006《金属热喷涂层剪切强度的测定》'
				}, {
					type: '力学性能',
					subject: '划痕强度',
					method: '划痕试验仪',
					reference: 'BS ISO 27307-2015《热喷涂. 采用横向划痕试验评估热喷涂陶瓷涂层的粘结性/凝聚性》'
				}, {
					type: '力学性能',
					subject: '弯曲接合强度',
					method: '薄片试样',
					reference: 'GBT232-2010《金属材料弯曲试验方法 》'
				}, {
					type: '力学性能',
					subject: '涂层应力',
					method: '力学应力仪、XRD',
					reference: 'GB/T 32073-2015 《无损检测 残余应力超声临界折射纵波检测方法》'
				}, 

				{
					type: '外观',
					subject: '表面粗糙度',
					method: '轮廓仪、表面粗糙度仪',
					reference: 'GB1031-83《表面粗糙度术语表面及其参数》；JJG 2018-89《中华人民共和国国家计量检定系统》；ISO468-1982《表面粗糙度参数及其数值和给定要求的通则》'
				}, {
					type: '外观',
					subject: '表面宏观缺陷',
					method: '放大镜、光学显微镜',
					reference: 'GB/T 37421-2019 《热喷涂 热喷涂涂层的表征和试验》'
				}, {
					type: '外观',
					subject: '厚度和均匀性',
					method: '无损检测测厚仪、横截面微观形貌',
					reference: 'GB∕T 31563-2015 《金属覆盖层 厚度测量 扫描电镜法》'
				}, 

				{
					type: '显微结构',
					subject: '涂层内部结构',
					method: '光学显微、扫描电镜、X射线衍射',
					reference: 'ISO-1463-2003《Metallic and oxide coatings——Measurement of coating thickness——Microscopital method》'
				},{
					type: '显微结构',
					subject: '涂层与基体结构',
					method: '光学显微、扫描电镜',
					reference: 'ISO-1463-2003《Metallic and oxide coatings——Measurement of coating thickness——Microscopital method》'
				},{
					type: '显微结构',
					subject: '微裂纹、气孔',
					method: '光学显微、扫描电镜、无损检测',
					reference: 'ISO-1463-2003《Metallic and oxide coatings——Measurement of coating thickness——Microscopital method》'
				}, 

				{
					type: '物理化学性能',
					subject: '密度、气孔率',
					method: '图片法、阿基米德仪',
					reference: 'JB2112(3)-77《金属覆盖层孔隙率试验方法 湿润滤纸贴置法》'
				},{
					type: '物理化学性能',
					subject: '热膨胀系数',
					method: '热膨胀仪',
					reference: 'GB2572-81《玻璃钢平均线膨胀系数测量方法》'
				},{
					type: '物理化学性能',
					subject: '冲击试验',
					method: '冲击试验仪',
					reference: 'GB/T229-2007《 金属材料 夏比摆锤冲击试验方法》'
				},{
					type: '物理化学性能',
					subject: '热导率',
					method: '热导率仪',
					reference: 'GB3139-82《玻璃钢导热系数试验方法》；ISO-DIS 18555 2014《 金属和其它无机涂层——热障涂层热导率的测定》'
				},{
					type: '物理化学性能',
					subject: '电导（阻）率',
					method: '电化学仪或工作站',
					reference: 'GB/T10295-2008《绝热材料稳态热阻及有关特性的测定》'
				},{
					type: '物理化学性能',
					subject: '抗烧结性',
					method: '图片法、纳米硬度仪',
					reference: 'JB/T 6646-2007《烧结金属制品 物理性能检测规范》'
				},{
					type: '物理化学性能',
					subject: '热震性能',
					method: '热震仪',
					reference: 'GB/T30873-2014《耐火材料抗热震性试验方法》'
				},{
					type: '物理化学性能',
					subject: '组织组成',
					method: 'XRD、X射线荧光',
					reference: 'GB/T 37421-2019 热喷涂 热喷涂涂层的表征和试验'
				},{
					type: '物理化学性能',
					subject: '介电化学等性能',
					method: '电化学仪或工作站',
					reference: 'GB1408-2006《绝缘材料电气强度试验方法》'
				}, 

				{
					type: '服役性能',
					subject: '显微硬度',
					method: '显微硬度仪、纳米硬度仪',
					reference: 'GB8640-88《金属热喷涂层表面硬度试验方法》'
				},
				{
					type: '服役性能',
					subject: '摩擦磨损',
					method: '万能摩擦磨损试验机',
					reference: 'GB 12444-1990《 金属磨损试验方法》'
				}, 
				{
					type: '服役性能',
					subject: '环境腐蚀',
					method: '潮湿、盐雾、浸渍试验仪',
					reference: 'ASTM65-81,GB6485-86,GB6460-88'
				}, 
				{
					type: '服役性能',
					subject: '高温腐蚀',
					method: '高温炉等',
					reference: 'GB 10124-1988 《金属材料试验室均匀腐蚀全浸试验方法》'
				}, 
				{
					type: '服役性能',
					subject: '高温炉等',
					method: '力学应力仪、XRD',
					reference: 'ASTM G54-91《简单静态氧化（900℃)试验标准》'
				}, 
			]
		};
	},
	methods: {
		objectSpanMethod({ rowIndex, columnIndex }) {
			if (columnIndex === 0) {
				if (rowIndex  === 0) {
					return {
						rowspan: 5,
						colspan: 1
					};
				} else if (rowIndex === 5) {
					return {
						rowspan: 3,
						colspan: 1
					};
				} else if (rowIndex === 8) {
					return {
						rowspan: 3,
						colspan: 1
					};
				} else if (rowIndex === 11) {
					return {
						rowspan: 9,
						colspan: 1
					};
				} else if (rowIndex === 20) {
					return {
						rowspan: 5,
						colspan: 1
					};
				}
				else {
					return {
						rowspan: 0,
						colspan: 0
					};
				}
			}
		}
	}
}
</script>