<template>
  <div class="coatings-pg">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "CoatingsContainer"
}
</script>

<style lang="less">
.coatings-pg{
	.pg-header{
		width: 100%;
		text-align: right;
	}
	.coating-add-btn{
		width: 100px;
		background-color: #2D60D0;
		border: 1px solid #2D60D0;
		margin-bottom: 8px;
	}

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

	.coating-edit-btn{
		background-color: #E5A312;
		border: 1px solid #E5A312;
		margin-right: 12px;
	}

	.edit-coating-form{
		margin-left: 40px;
		margin-right: 40px;
	}
	.el-form-item__label{
		text-align: left;
	}

	.el-select{
		width: 100%;
	}

	.el-dialog__body{
		padding: 20px 20px 0px 20px;
	}
}
</style>