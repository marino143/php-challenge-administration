<template>
  <div class="statistic-information">
    <div class="section-default">
      <div class="headline">
        <h1 class="headline__title">Statistic</h1>
      </div>
      <div class="content">
        <div class="content__box">
          <el-row :gutter="16" type="flex">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="statistic-card">
                <el-statistic :value="statistic.users">
                  <template #title>
                    <span>Users</span>
                  </template>
                </el-statistic>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="statistic-card">
                <el-statistic :value="statistic.tasks">
                  <template #title>
                    <span>Tasks</span>
                  </template>
                </el-statistic>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Vue
import { Options, Vue } from "vue-class-component";

// Models
import { Statistic } from "@/models/statistic";

// Components
import {
  ElRow,
  ElCol,
  ElStatistic,
  ElTooltip,
} from "element-plus";

@Options({
  props: [
    "statistic",
  ],
  components: {
    ElRow,
    ElCol,
    ElStatistic,
    ElTooltip,
  },
})
export default class StatisticInformationIndex extends Vue {
  statistic: Statistic = new Statistic();
}
</script>
