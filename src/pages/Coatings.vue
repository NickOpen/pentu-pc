<template>
	<div class="sub-pg coatings-pg">
		<el-table
			class="coating-table"
			:data="list">
			<el-table-column
				v-for="column in columns"
				:prop="column.prop"
				:label="column.label"
				v-bind:key="column.prop">
			</el-table-column>
			<el-table-column
				label="性能特点">
				<template slot-scope="scope">
					<el-link type="primary" @click="viewCoatingFeatures(scope.row)">查看</el-link>
				</template>
			</el-table-column>
			<el-table-column
				label="文献出处">
				<template slot-scope="scope">
					<el-link type="primary" @click="viewCoatingReferences(scope.row)">查看</el-link>
				</template>
			</el-table-column>

			<el-table-column
				width="146"
				label="操作">
				<template slot-scope="scope">
					<div>
						<el-button
						size="mini"
						type="primary"
						@click="handleEditCoating(scope.row)">编辑</el-button>
						<el-button
						size="mini"
						type="danger"
						@click="handleDeleteCoating(scope.row)">删除</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>

		<div class="footer-pagination">
			<el-pagination
				@current-change="getPageData"
				:current-page.sync="page"
				:page-size="10"
				layout="total, prev, pager, next"
				:total="size">
			</el-pagination>
		</div>

		<el-drawer
			title="性能特点"
			:visible.sync="featuresDrawer"
			direction="rtl"
			:before-close="handleCloseFeaturesDrawer">
			<div class="drawer-features-content">
				{{selectedCoatingFeatures}}
			</div>
		</el-drawer>

		<el-drawer
			title="文献出处"
			:visible.sync="referenceDrawer"
			direction="rtl"
			:before-close="handleCloseReferenceDrawer">
			<div class="drawer-reference-content">
				{{selectedCoatingReference}}
			</div>
		</el-drawer>
	</div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
	name: "CoatingsPage",
	data(){
		return {
			columns: [
				{
					prop: "id",
					label: "ID"
				},{
					prop: "name",
					label: "名称"
				},{
					prop: "current",
					label: "电流(A)"
				},{
					prop: "totalFlowAmount",
					label: "总气流量(SLPM)"
				},{
					prop: "workingGasName",
					label: "工作气体"
				},{
					prop: "coatingDeviceName",
					label: "设备"
				},{
					prop: "distance",
					label: "喷涂距离"
				},{
					prop: "powderRate",
					label: "送粉率"
				} /*,{
					prop: "features",
					label: "性能特点"
				},{
					prop: "docReferences",
					label: "文献出处"
				}*/
			],

			featuresDrawer: false,
			referenceDrawer: false,
			selectedCoatingFeatures: "",
			selectedCoatingReference: ""
		}
	},
	computed: {
		...mapState({
			size: state => state.coatings.size,
			page: state => state.coatings.page,
			list: state => state.coatings.list
		}),
	},

	methods: {
		...mapActions([
			'listCoatings'
		]),

		handleCloseFeaturesDrawer(){
			this.featuresDrawer = false;
		},

		handleCloseReferenceDrawer(){
			this.referenceDrawer = false;
		},

		handleEditCoating(coating){
			console.log(coating);
		},

		handleDeleteCoating(coating){
			console.log(coating);
		},

		viewCoatingFeatures(coating){
			this.selectedCoatingFeatures = coating.features;
			this.featuresDrawer = true;
		},

		viewCoatingReferences(coating){
			this.selectedCoatingReference = coating.docReferences;
			this.referenceDrawer = true;
		},

		getPageData(page){
			this.listCoatings({page: page});
		}
	},
	mounted(){
		this.listCoatings({page: 1})
	}
}
</script>

<style lang="less">
.coatings-pg{
	.drawer-features-content,
	.drawer-reference-content{
		padding: 0px 20px;
	}

	.coating-table{
		min-height: 80%;
	}

	.footer-pagination{
		text-align: right;
		margin-top: 10px;
	}
}

</style>