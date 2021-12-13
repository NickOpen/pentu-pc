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

		display: flex;
		align-items: center;
		justify-content: space-between;

		.fitler{
			display: flex;

			.filter_item{
				width: 220px;
			}

			.filter_plating-types{
				margin-left: 20px;
			}

			.filter-btn{
				border: 1px solid #2D60D0;
				color: #2D60D0;
				background-color: white;
				margin-left: 20px;
				
				:hover{
					opacity: 0.7;
				}
			}
		}
	}
	.coating-add-btn{
		width: 100px;
		background-color: #2D60D0;
		border: 1px solid #2D60D0;
		margin-bottom: 8px;

		:hover{
			opacity: 0.7;
		}
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

		.powder-rate-input > input{
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
		}

		.powder-rate-unit-select{
			color: #909399;
			input{
				border-left: 0px;
				border-top-left-radius: 0px;
				border-bottom-left-radius: 0px;
				background-color: #F5F7FA;
				color: #909399;
			}
		}
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