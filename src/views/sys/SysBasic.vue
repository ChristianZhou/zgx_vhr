<template>
	<div>
		<el-tabs type="border-card" v-model="activeName">
			<el-tab-pane label="部门管理" name="depMana">
				<DepMana></DepMana>
			</el-tab-pane>
			<el-tab-pane label="职位管理" name="poMana">
				<PoMana></PoMana>
			</el-tab-pane>
			<el-tab-pane label="职称管理" name="jobLevelMana">
				<JobLevelMana></JobLevelMana>
			</el-tab-pane>
			<el-tab-pane label="奖惩规则" name="ecMana">
				<EcMana></EcMana>
			</el-tab-pane>
			<el-tab-pane label="权限组" name="permissionMana">
				<PermissionMana></PermissionMana>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>

import DepMana from "@/components/sys/basic/DepMana";
import PoMana from "@/components/sys/basic/PoMana";
import EcMana from "@/components/sys/basic/EcMana";
import JobLevelMana from "@/components/sys/basic/JobLevelMana";
import PermissionMana from "@/components/sys/basic/PermissionMana";

export default {
	name: "SysBasic",
	data() {
		return {
			activeName: 'permissionMana'
		}
	},
	components: {
		DepMana,
		EcMana,
		PoMana,
		JobLevelMana,
		PermissionMana
	}
}
</script>

<style scoped>

</style>