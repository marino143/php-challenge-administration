<template>
  <div class="app-administration-dashboard-index">
    <el-container>
      <StatisticInformation :statistic="statistic" />
    </el-container>
  </div>
</template>

<script lang="ts">
// Vue
import { Options, Vue } from "vue-class-component";

// Models
import { Statistic } from "@/models/statistic";
import { Response } from "@/models/response";

// Components
import {
  ElContainer,
} from "element-plus";

import StatisticInformation from "@/components/administration/statistic/information/index.vue";

// Services
import { getRequest } from "@/services/api/request";

@Options({
  components: {
    ElContainer,
    StatisticInformation,
  },
})
export default class AppAdministrationDashboardIndex extends Vue {
  statistic: Statistic = new Statistic();

  async getStatistic(): Promise<void> {
    await getRequest({
      uri: "/administration/statistic",
      isProtected: true,
    }).then((r: Response) => {
      if (r.data) {
        this.statistic = r.data.statistic;
      }
    });
  }

  async getView(): Promise<void> {
    await this.getStatistic();
  }

  async created(): Promise<void> {
    await this.getView();
  }
}
</script>
