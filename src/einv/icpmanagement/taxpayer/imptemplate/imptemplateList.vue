<template>
	<div>
		<div class="rh-page-header">
			<div class="rh-head-and-operate">
				<div class="tips-content">
					<span class="rh-helpTip-text">导入模板管理</span>
				</div>
			</div>
		</div>
		<div class="rh-page-content">
			<div class="rh-operate clearfix">
				<el-button type="primary" @click="onAdd">新增</el-button>
				<div class="rh-pull-right">
					<el-form :model="queryForm" :rules="rules" ref="queryForm" :inline="false" label-width="0px"
						label-position="right">
						<el-form-item prop="xmbh">
							<el-input v-model.trim="queryForm.xmbh" placeholder="项目编号" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item prop="xmmc">
							<el-input v-model.trim="queryForm.xmmc" placeholder="项目名称" maxlength="256"></el-input>
						</el-form-item>
						<el-button icon="el-icon-search" type="primary" @click="searchForm('queryForm')"></el-button>
						<el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置
						</el-button>
					</el-form>
				</div>
			</div>
			<div class="rh-table">
				<el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange"
					v-loading="loading">
					<template slot="empty">
						<div class="pic_nodata"></div>
					</template>
					<el-table-column label="序号" width="50px" align="center" fixed>
						<template slot-scope="scope"> {{scope.$index+1}}</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip align="left" prop="xmbh" label="项目编号"></el-table-column>
					<el-table-column show-overflow-tooltip align="left" prop="xmmc" label="项目名称"></el-table-column>
					<el-table-column show-overflow-tooltip align="center" prop="sfbt" label="模板必填项">
						<template slot-scope="scope">
							<span class="cell-red" v-if="scope.row.sfbt =='N'">否</span>
							<span class="cell-green" v-if="scope.row.sfbt =='Y'">是</span>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip align="center" prop="yxbz" label="有效标志">
						<template slot-scope="scope">
							<div v-if="scope.row.yxbz == 'Y'">
								<i class="el-icon-success" style="color: #67c23a"></i>有效
							</div>
							<div v-else-if="scope.row.yxbz == 'N'">
								<i class="el-icon-remove"></i>无效
							</div>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip align="left" prop="lrrDm" label="录入人代码"></el-table-column>
					<el-table-column show-overflow-tooltip align="left" prop="lrsj" label="录入时间"></el-table-column>
					<el-table-column show-overflow-tooltip align="left" prop="xgrDm" label="修改人代码"></el-table-column>
					<el-table-column show-overflow-tooltip align="left" prop="xgsj" label="修改时间"></el-table-column>
					<el-table-column align="center" label="操作" width="150px" fixed="right">
						<template slot-scope="scope">
							<el-button class="table_btn" type="text" @click="onEdit(scope)">修改</el-button>
							<el-button class="table_btn" type="text" @click="onDel(scope.row.xmbh)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="rh-pagination">
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
					@size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current"
					:page-sizes="page.Size" :page-size="tableData.size">
				</el-pagination>
			</div>
			<!-- 新增抽屉页面 -->
			<div class="drawer-container add" :key="1001">
			  <el-drawer append-to-body size="61.8%" :visible.sync="drawer">
			    <editPage v-if="drawer" @back="back" @close="close"  @reload="init_Table" :updatePageData="updatePageData"></editPage>
			  </el-drawer>
			</div>
		</div>
	</div>
</template>

<script>
	import validate from "@/utils/validate.js";
	import editPage from "./imptemplateEdit.vue";

	export default {
		components: {
		  editPage,
		},
		data() {
			return {
				drawer: false,
				queryForm: {
					xmbh: "",
					xmmc: "",
					pageNo: 1,
					pageSize: 10,
				},
				page: {
					Total: 100,
					Size: [10, 20, 30],
					currentPage: 1,
				},
				tableData: [],
				//表格选择
				tr_sels: [],
				updatePageData: {},
				//校验规则
				rules: {
					xmbh: [{
							required: false,
							message: "请输入项目编号",
							trigger: "blur"
						},
						{
							max: 100,
							message: "最多100个字符",
							trigger: "blur"
						},
						{
							validator: this.$validate.checkForbiddenWord,
							trigger: "blur"
						},
					],
					xmmc: [{
							required: false,
							message: "请输入项目名称",
							trigger: "blur"
						},
						{
							max: 256,
							message: "最多256个字符",
							trigger: "blur"
						},
						{
							validator: this.$validate.checkForbiddenWord,
							trigger: "blur"
						},
					],
				},
				loading: false,
			};
		},

		created() {},

		mounted() {
			this.init_Table();
		},

		methods: {
			//初始化表格
			init_Table() {
				let _this = this;
				let params = this.queryForm;
				if (params != null) {
					if (validate.checkForbiddenWordForm(JSON.stringify(params))) {
						_this.$message({
							showClose: true,
							message: "不允许有特殊字符",
							type: "error",
						});
						return;
					}
				}
				//打开loading
				_this.loading = true;
				this.$api.post(
					_this.$apis.icpmanagement + "/taxpayer/imptemplate/listImpTemplate", params,
					function(res) {
						//关闭loading
						_this.loading = false;
						if (res.success) {
							_this.tableData = res.data;
							console.info(JSON.stringify(res.data));
						} else {
							_this.$message({
								message: "查询失败," + res.errorMsg,
								type: "error",
							});
						}
					}
				);
			},

			//分页页码操作
			handleSelectionChange(val) {
				this.tr_sels = val;
			},
			//分页操作
			handleCurrentChange(val) {
				this.queryForm.pageNo = val;
				//更改分页后重新初始化页面
				this.init_Table();
			},
			handleSizeChange(val) {
				this.queryForm.pageSize = val;
				//更改分页后重新初始化页面
				this.init_Table();
			},

			//搜索
			searchForm(formName) {
				let _this = this;
				_this.$refs[formName].validate((valid) => {
					//校验完成，进行查询
					if (valid) {
						this.queryForm.pageNo = 1;
						this.init_Table();
					}
				});
			},

			//删除
			onDel(xmbh) {
				let _this = this;
				_this.$confirm("确定要删除记录吗?", "提示", {
					type: "warning",
				}).then(() => {
					_this.loading = true;
					_this.$api.delete(
						_this.$apis.icpmanagement + "/taxpayer/imptemplate/deleteImpTemplateInfo/" + xmbh, {},
						function(res) {
							_this.loading = false;
							_this.init_Table();
							if (res.success) {
								_this.$message({
									message: "删除成功",
									type: "success",
								});
							} else {
								_this.$message({
									message: "删除失败," + res.errorMsg,
									type: "error",
								});
							}

						}
					);
				});
			},

			//弹出新增页面抽屉
			onAdd() {
				this.drawer = true;
				this.updatePageData = {};
			},

			//弹出修改页面抽屉
			onEdit(scope) {
				this.drawer = true;
        this.updatePageData = {
					xmbh: scope.row.xmbh,
          xmmc: scope.row.xmmc,
          sfbt: scope.row.sfbt,
          yxbz: scope.row.yxbz,
				};
				/* this.updatePageData = {
					xmbh: xmbh,
				}; */
			},
			//保存成功后关闭抽屉
			back() {
				this.drawer = false;
				this.queryForm.pageNo = 1;
				this.init_Table();
			},

			//子页面关闭调用close方法
			close() {
				this.drawer = false;
				this.queryForm.pageNo = 1;
			},

			//初始化table
			init() {
				this.init_Table();
			},

			//重置
			resetForm(formName) {
				if (this.$refs[formName] !== undefined) {
					this.$refs[formName].resetFields();
				}
				this.queryForm.pageNo = 1;
				this.init_Table();
			},
		},
	}
</script>
