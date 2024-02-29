<template>
  <div class="tools">
    <div class="tools-title">叉车等效均布荷载计算器</div>
    <div class="tools-form">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="叉车数据" name="first">
          <el-row>
            <el-col :span="24">
              <el-card class="box-card" shadow="hover">
                <div slot="header" class="tools-form-title" shadow="never">
                  <span>叉车资料</span>
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="clear1"
                    >清零
                  </el-button>
                </div>
                <el-form>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item
                        prop="Pf"
                        label-width="80px"
                        label="前轴载重"
                      >
                        <el-input
                          size="mini"
                          v-model="shuju.Pf"
                          placeholder="P前"
                        >
                          <span slot="suffix">kN</span></el-input
                        >
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        prop="Pb"
                        label-width="80px"
                        label="后轴载重"
                      >
                        <el-input
                          size="mini"
                          v-model="shuju.Pb"
                          placeholder="P后"
                        >
                          <span slot="suffix">kN</span>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item
                        prop="e"
                        label-width="80px"
                        label="前轴轮距"
                      >
                        <el-input size="mini" v-model="shuju.e" placeholder="e">
                          <span slot="suffix">m</span></el-input
                        >
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="c" label-width="80px" label="轴距">
                        <el-input size="mini" v-model="shuju.c" placeholder="c"
                          ><span slot="suffix">m</span></el-input
                        >
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-col>
            <el-col :span="24" style="margin-top: 20px">
              <el-card class="box-card" shadow="never">
                <div slot="header" class="tools-form-title">
                  <span>假设叉车轮胎接地尺寸</span>
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="clear2"
                    >清零
                  </el-button>
                </div>
                <el-form>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item
                        prop="length"
                        label-width="80px"
                        label="着地长"
                      >
                        <el-input
                          size="mini"
                          v-model="shuju.length"
                          placeholder="大值"
                        >
                          <span slot="suffix">m</span></el-input
                        >
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        prop="width"
                        label-width="80px"
                        label="着地宽"
                      >
                        <el-input
                          size="mini"
                          v-model="shuju.width"
                          placeholder="小值"
                          ><span slot="suffix">m</span></el-input
                        >
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="结构资料" name="second">
          <el-row>
            <el-col :span="24">
              <el-card class="box-card" shadow="never">
                <div slot="header" class="tools-form-title">
                  <span>结构资料</span>
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="clear3"
                    >清零
                  </el-button>
                </div>
                <el-form>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item
                        prop="h"
                        label-width="80px"
                        label="楼板厚度"
                      >
                        <el-input size="mini" v-model="shuju.h" placeholder="h">
                          <span slot="suffix">m</span>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        prop="L"
                        label-width="80px"
                        label="次梁间距"
                      >
                        <el-input size="mini" v-model="shuju.L" placeholder="L">
                          <span slot="suffix">m</span>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item
                        prop="s"
                        label-width="80px"
                        label="面层厚度"
                      >
                        <el-input size="mini" v-model="shuju.s" placeholder="s">
                          <span slot="suffix">m</span>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        prop="xs"
                        label-width="80px"
                        label="动力系数"
                      >
                        <el-select
                          size="mini"
                          style="width: 100%"
                          v-model="shuju.xs"
                        >
                          <el-option :value="1.1"></el-option>
                          <el-option :value="1.2"></el-option>
                          <el-option :value="1.3"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="平行工况计算" name="third">
          <el-row style="height: calc(100% - 338px)">
            <el-col :span="24" style="height: 100%">
              <el-card
                class="box-card scroll-box"
                shadow="never"
                style="height: 100%"
              >
                <div slot="header" class="tools-form-title">
                  <span>
                    平行工况计算结果
                    <i
                      title="显示图例"
                      class="custom-icon el-icon-view"
                      @click="
                        openPhoto(
                          'shuipin.jpg',
                          '叉车运行方向与楼板跨度方向平行时图例'
                        )
                      "
                    ></i>
                  </span>
                  <div style="float: right">
                    <el-button type="text" @click="clearAll"
                      >全部清零
                    </el-button>
                  </div>
                </div>
                <div class="result">
                  <div>
                    <span>合力中心距前轴距离</span> a
                    {{ result.a ? "=" + result.a + "m" : "" }}
                  </div>

                  <el-row>
                    <el-col :span="24">
                      <el-descriptions
                        class="margin-top"
                        :column="1"
                        size="mini"
                        border
                      >
                        <template slot="title">
                          1、跨中最大弯矩 M<span style="font-size: 10px"
                            >max</span
                          >
                        </template>
                        <el-descriptions-item>
                          <template slot="label">
                            跨中最大弯矩 M<span style="font-size: 10px"
                              >max</span
                            >
                          </template>
                          {{ result.Mmax ? result.Mmax + "kNm" : "" }}
                        </el-descriptions-item>
                      </el-descriptions>
                    </el-col>
                    <el-col :span="24">
                      <el-descriptions
                        class="margin-top"
                        :column="1"
                        size="mini"
                        border
                      >
                        <template slot="title"> 2、有效分布宽度 b</template>
                        <el-descriptions-item>
                          <template slot="label">
                            平行于板跨计算宽度 b<span style="font-size: 10px"
                              >tx</span
                            >
                          </template>
                          {{ result.btx ? result.btx + "m" : "" }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label">
                            垂直于板跨计算宽度 b<span style="font-size: 10px"
                              >ty</span
                            ></template
                          >
                          {{ result.bty ? result.bty + "m" : "" }}
                        </el-descriptions-item>
                        <el-descriptions-item label="平行板跨计算宽度">
                          <template slot="label">
                            平行板跨计算宽度 b<span style="font-size: 10px"
                              >cx</span
                            ></template
                          >
                          {{ result.bcx ? result.bcx + "m" : "" }}
                        </el-descriptions-item>
                        <el-descriptions-item label="垂直板跨计算宽度">
                          <template slot="label">
                            垂直板跨计算宽度 b<span style="font-size: 10px"
                              >cy</span
                            ></template
                          >
                          {{ result.bcy ? result.bcy + "m" : "" }}
                        </el-descriptions-item>
                        <el-descriptions-item label="简支板上有效分布荷载 b"
                          >{{ result.b ? result.b + "m" : "" }}
                        </el-descriptions-item>
                        <el-descriptions-item label="荷载相邻折减分布宽度 b'"
                          >{{ result.b2 ? result.b2 + "m" : "" }}
                        </el-descriptions-item>
                      </el-descriptions>
                    </el-col>
                    <el-col :span="24">
                      <el-descriptions
                        class="margin-top"
                        :column="1"
                        size="mini"
                        border
                      >
                        <template slot="title">
                          3、等效均布荷载q<span style="font-size: 10px"
                            >e</span
                          ></template
                        >
                        <el-descriptions-item>
                          <template slot="label"
                            >动力系数前 q<span style="font-size: 10px"
                              >e</span
                            ></template
                          >
                          {{ result.qe ? result.qe + "kPa" : "" }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label"
                            >动力系数后 q<span style="font-size: 10px">e</span>'
                          </template>
                          {{ result.qe2 ? result.qe2 + "kPa" : "" }}
                        </el-descriptions-item>
                      </el-descriptions>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="垂直工况计算" name="fourth">
          <el-row style="height: calc(100% - 338px)">
            <el-col :span="24" style="height: 100%">
              <el-card
                class="box-card scroll-box"
                shadow="never"
                style="height: 100%"
              >
                <div slot="header" class="tools-form-title">
                  <span>
                    垂直工况计算结果
                    <i
                      title="显示图例"
                      class="custom-icon el-icon-view"
                      @click="
                        openPhoto(
                          'chuizhi.jpg',
                          '叉车运行方向与楼板跨度方向平行时图例'
                        )
                      "
                    ></i
                  ></span>
                  <div style="float: right">
                    <el-button type="text" @click="clearAll"
                      >全部清零
                    </el-button>
                  </div>
                </div>
                <div class="result">
                  <div>
                    <span>合力中心距前轴距离</span> a
                    {{ result2.a ? "=" + result2.a + "m" : "" }}
                  </div>

                  <el-row>
                    <el-col :span="24">
                      <el-descriptions
                        class="margin-top"
                        :column="1"
                        size="mini"
                        border
                      >
                        <template slot="title">
                          1、跨中最大弯矩 M<span style="font-size: 10px"
                            >max</span
                          >
                        </template>
                        <el-descriptions-item>
                          <template slot="label">
                            跨中最大弯矩 M<span style="font-size: 10px"
                              >max</span
                            >
                          </template>
                          {{ result2.Mmax ? result2.Mmax + "kNm" : "" }}
                        </el-descriptions-item>
                      </el-descriptions>
                    </el-col>
                    <el-col :span="24">
                      <el-descriptions
                        class="margin-top"
                        :column="1"
                        size="mini"
                        border
                      >
                        <template slot="title"> 2、有效分布宽度 b</template>
                        <el-descriptions-item>
                          <template slot="label">
                            平行于板跨计算宽度 b<span style="font-size: 10px"
                              >tx</span
                            >
                          </template>
                          {{ result2.btx ? result2.btx + "m" : "" }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label">
                            垂直于板跨计算宽度 b<span style="font-size: 10px"
                              >ty</span
                            ></template
                          >
                          {{ result2.bty ? result2.bty + "m" : "" }}
                        </el-descriptions-item>
                        <el-descriptions-item label="平行板跨计算宽度">
                          <template slot="label">
                            平行板跨计算宽度 b<span style="font-size: 10px"
                              >cx</span
                            ></template
                          >
                          {{ result2.bcx ? result2.bcx + "m" : "" }}
                        </el-descriptions-item>
                        <el-descriptions-item label="垂直板跨计算宽度">
                          <template slot="label">
                            垂直板跨计算宽度 b<span style="font-size: 10px"
                              >cy</span
                            ></template
                          >
                          {{ result2.bcy ? result2.bcy + "m" : "" }}
                        </el-descriptions-item>
                        <el-descriptions-item label="简支板上有效分布荷载 b"
                          >{{ result2.b ? result2.b + "m" : "" }}
                        </el-descriptions-item>
                        <el-descriptions-item label="荷载相邻折减分布宽度 b'"
                          >{{ result2.b2 ? result2.b2 + "m" : "" }}
                        </el-descriptions-item>
                      </el-descriptions>
                    </el-col>
                    <el-col :span="24">
                      <el-descriptions
                        class="margin-top"
                        :column="1"
                        size="mini"
                        border
                      >
                        <template slot="title">
                          3、等效均布荷载q<span style="font-size: 10px"
                            >e</span
                          ></template
                        >
                        <el-descriptions-item>
                          <template slot="label"
                            >动力系数前 q<span style="font-size: 10px"
                              >e</span
                            ></template
                          >
                          {{ result2.qe ? result2.qe + "kPa" : "" }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                          <template slot="label"
                            >动力系数后 q<span style="font-size: 10px">e</span>'
                          </template>
                          {{ result2.qe2 ? result2.qe2 + "kPa" : "" }}
                        </el-descriptions-item>
                      </el-descriptions>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="计算书输出" name="fifth">
          <div class="calBook">
            <el-form :model="form" ref="exportFile" label-width="100px">
              <el-form-item
                label="导出路径"
                prop="dir"
                :rules="[
                  {
                    required: true,
                    message: '请选择导出路径',
                    trigger: 'change',
                  },
                ]"
              >
                <el-select v-model="form.dir">
                  <el-option
                    v-for="(item, index) in dirList"
                    :label="item.label"
                    :value="item.value"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="文件名"
                prop="fileName"
                :rules="[
                  {
                    required: true,
                    message: '请填写文件名',
                    trigger: 'change',
                  },
                ]"
              >
                <el-input v-model="form.fileName"></el-input>
              </el-form-item>
            </el-form>

            <el-button
              type="primary"
              style="padding: 8px 12px; margin-top: 20px"
              @click="exportFile"
              >导出
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
// import { ipcRenderer } from "electron";
import { exportWordDocx } from "@/plugins/exportWordDocx";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "tools",
  data() {
    return {
      shuju: {
        Pf: null, //B9
        Pb: null, //B10
        e: null, //B11
        c: null, //B12
        length: null, //B14
        width: null, //B15
        h: null, //B17
        L: null, //B18
        s: null, //B19
        xs: 1.1,
      },
      form: {
        dir: "",
        fileName: "叉车等效均布活荷载.doc",
      },
      dirList: [
        {
          label: "桌面",
          value: "desktop",
        },
        {
          label: "文档",
          value: "documents",
        },
        {
          label: "下载",
          value: "downloads",
        },
      ],
      // result: {
      //   a: null, //C22
      //   Mmax: null,
      //   btx: null,
      //   bty: null,
      //   bcx: null,
      //   bcy: null,
      //   b: null,
      //   b2: null,
      //   qe: null,
      //   qe2: null
      // },
      radio: "1",
      activeName: "first",
    };
  },
  computed: {
    result() {
      return this.getResult("1");
    },
    result2() {
      return this.getResult("2");
    },
  },
  props: [],
  methods: {
    clear1() {
      this.shuju.Pf = null;
      this.shuju.Pb = null;
      this.shuju.e = null;
      this.shuju.c = null;
    },
    clear2() {
      this.shuju.length = null;
      this.shuju.width = null;
    },
    clear3() {
      this.shuju.h = null;
      this.shuju.L = null;
      this.shuju.s = null;
      this.shuju.xs = 1.1;
    },
    clearAll() {
      this.shuju = {
        Pf: null, //B9
        Pb: null, //B10
        e: null, //B11
        c: null, //B12
        length: null, //B14
        width: null, //B15
        h: null, //B17
        L: null, //B18
        s: null, //B19
        xs: 1.1,
      };
    },
    getResult(radio) {
      let shuju = {};
      for (const key in this.shuju) {
        if (Object.hasOwnProperty.call(this.shuju, key)) {
          const element = this.shuju[key];
          this.$set(shuju, key, element != null ? Number(element) : null);
        }
      }
      let a =
        shuju.Pb && shuju.c && shuju.Pf
          ? (shuju.Pb * shuju.c) / (shuju.Pf + shuju.Pb)
          : null;
      let Mmax = null;
      if (shuju.Pf && shuju.Pb && shuju.L && a && radio == "1") {
        Mmax =
          ((shuju.Pf + shuju.Pb) * Math.pow(shuju.L - a, 2)) / (8 * shuju.L);
      } else if (shuju.Pf && shuju.Pb && shuju.L && a && radio == "2") {
        Mmax = (shuju.Pf * Math.pow(shuju.L - shuju.e / 2, 2)) / (4 * shuju.L);
      } else {
        Mmax = null;
      }
      let btx;
      if (radio == "1") {
        btx = shuju.width;
      } else if (radio == "2") {
        btx = shuju.length;
      } else {
        btx = null;
      }
      let bty;
      if (radio == "1") {
        bty = shuju.length;
      } else if (radio == "2") {
        bty = shuju.width;
      } else {
        bty = null;
      }
      let bcx;
      if (btx && shuju.s && shuju.h) {
        bcx = btx + 2 * shuju.s + shuju.h;
      } else {
        bcx = null;
      }
      let bcy;
      if (bty && shuju.s && shuju.h) {
        bcy = bty + 2 * shuju.s + shuju.h;
      } else {
        bcy = null;
      }
      let b;
      if (radio == "1" && shuju.L && bcy) {
        if (bcy <= 2.2 * shuju.L) {
          b = (bcy * 2) / 3 + 0.73 * shuju.L;
        } else {
          b = bcy;
        }
      } else if (radio == "2" && shuju.L && bcy) {
        b = bcy + 0.7 * shuju.L;
      } else {
        b = null;
      }
      let b2;
      if (radio == "1" && shuju.e && b) {
        if (shuju.e < b) {
          b2 = (b + shuju.e) / 2;
        } else {
          b2 = b;
        }
      } else if (radio == "2") {
        if (shuju.c < b) {
          b2 = (shuju.c + b) / 2;
        } else {
          b2 = b;
        }
      } else {
        b2 = null;
      }
      let qe;
      if (Mmax && b2 && shuju.L) {
        qe = (8 * Mmax) / (b2 * Math.pow(shuju.L, 2));
      } else {
        qe = null;
      }
      let qe2;
      if (shuju.xs && qe) {
        qe2 = shuju.xs * qe;
      } else {
        qe2 = null;
      }
      let param = {
        a: a,
        Mmax: Mmax,
        btx: btx,
        bty: bty,
        bcx: bcx,
        bcy: bcy,
        b: b,
        b2: b2,
        qe: qe,
        qe2: qe2,
      };
      for (const key in param) {
        if (Object.hasOwnProperty.call(param, key)) {
          const element = param[key];
          param[key] = element
            ? Math.round(element * 10000).toFixed(4) / 10000
            : null;
        }
      }
      return param;
    },
    openPhoto(name) {
      window.open(`/photo?name=${name}`);
      // ipcRenderer.send("openWindow", `/photo?name=${name}`, title);
    },
    exportFile() {
      this.$refs.exportFile.validate((valid) => {
        if (valid) {
          try {
            const { dir, fileName } = this.form;
            let data = {};
            for (const key in this.shuju) {
              if (Object.hasOwnProperty.call(this.shuju, key)) {
                const element = this.shuju[key];
                this.$set(data, key, element);
              }
            }
            for (const key in this.result) {
              if (Object.hasOwnProperty.call(this.result, key)) {
                const element = this.result[key];
                this.$set(data, key, element);
              }
            }
            for (const key in this.result2) {
              if (Object.hasOwnProperty.call(this.result, key)) {
                const element = this.result[key];
                this.$set(data, "_" + key, element);
              }
            }
            console.log(data);
            console.log(data, fileName, dir);
            exportWordDocx("./template/template.docx", data, fileName, dir)
              .then((is) => {
                if (is) this.$message.success("导出成功");
                else this.$message.error("导出失败");
              })
              .catch((err) => {
                this.$message.error("导出失败");
                console.error(err);
              });
          } catch (error) {
            this.$message.error("导出失败");
            console.error(error);
          }
        } else {
          return false;
        }
      });
    },
  },
  async mounted() {},
};
</script>
<style lang="scss" scoped>
.tools {
  height: 100%;
  width: 100%;
  // overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-title {
    width: 100%;
    align-items: center;
    justify-content: center;
    background: #fff;
    display: flex;
    align-items: center;
    // margin-top: 20px;
    font-size: 30px;
    line-height: 45px;
    color: #663300;
    font-family: SiYuanM;
    font-weight: 600;
    text-shadow: 0px 0px 1px #333;
  }

  &-form {
    width: 100%;
    height: calc(100% - 45px);
    padding: 10px;
    overflow-y: auto;

    &-title {
      font-weight: 600;
      padding-left: 10px;
    }

    &-btn {
      margin-top: 20px;
      text-align: center;
    }

    .result {
      font-size: 14px;
    }
  }
}

.box-card {
  // height: 159px;
  /deep/ .el-card__body,
  /deep/ .el-card__header {
    padding: 10px;
  }
}

.el-row {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-icon-question {
  color: teal;
  cursor: pointer;
}

.el-button {
  padding: 0;
}

/deep/ .el-icon-plus:before {
  font-weight: 600;
}

/deep/ .el-icon-minus:before {
  font-weight: 600;
}

/deep/ .el-descriptions__title {
  font-size: 14px;
}

/deep/ .el-descriptions-item__label {
  width: 50%;
}

/deep/ .el-descriptions__header {
  margin-bottom: 10px;
}

.scroll-box {
  /deep/ .el-card__body {
    overflow-y: auto;
    height: calc(100% - 44.2px);
  }
}

.custom-icon {
  color: #99cc99;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #008080;
  }
}

.calBook {
  text-align: center;
}
</style>
