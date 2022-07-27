<template>
  <div class="tools">
    <div class="tools-title">叉车等效均布荷载计算</div>
    <div class="tools-form">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="tools-form-title">
              <span>叉车资料:</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="clear1">清零</el-button>
            </div>
            <el-form>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item prop="Pf" label-width="80px" label="前轴载重">
                    <el-input size="mini" v-model="shuju.Pf">
                      <span slot="prefix" style="font-size: 16px"
                        >P<span style="font-size: 10px">前</span></span
                      ></el-input
                    >
                  </el-form-item></el-col
                >
                <el-col :span="12">
                  <el-form-item prop="Pb" label-width="80px" label="后轴载重"
                    ><el-input size="mini" v-model="shuju.Pb"
                      ><span slot="prefix" style="font-size: 16px"
                        >P<span style="font-size: 10px">后</span></span
                      ></el-input
                    >
                  </el-form-item></el-col
                >
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item prop="e" label-width="80px" label="前轴轮距">
                    <el-input size="mini" v-model="shuju.e"
                      ><span slot="prefix" style="font-size: 16px">e</span></el-input
                    >
                  </el-form-item></el-col
                >
                <el-col :span="12">
                  <el-form-item prop="c" label-width="80px" label="轴距">
                    <el-input size="mini" v-model="shuju.c">
                      <span slot="prefix" style="font-size: 16px">c</span></el-input
                    >
                  </el-form-item></el-col
                >
              </el-row>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="tools-form-title">
              <span>假设叉车轮胎接地尺寸:</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="clear2">清零</el-button>
            </div>
            <el-form>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item prop="length" label-width="80px" label="着地长">
                    <el-input size="mini" v-model="shuju.length">
                      <span slot="prefix" style="font-size: 12px">大值</span></el-input
                    >
                  </el-form-item></el-col
                >
                <el-col :span="12">
                  <el-form-item prop="width" label-width="80px" label="着地宽"
                    ><el-input size="mini" v-model="shuju.width"
                      ><span slot="prefix" style="font-size: 12px">小值</span></el-input
                    >
                  </el-form-item></el-col
                >
              </el-row>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="tools-form-title">
              <span>结构资料:</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="clear3">清零</el-button>
            </div>
            <el-form>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item prop="h" label-width="80px" label="楼板厚度">
                    <el-input size="mini" v-model="shuju.h">
                      <span slot="prefix" style="font-size: 16px">h</span>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="L" label-width="80px" label="次梁间距">
                    <el-input size="mini" v-model="shuju.L">
                      <span slot="prefix" style="font-size: 16px">L</span>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item prop="s" label-width="80px" label="面层厚度">
                    <el-input size="mini" v-model="shuju.s">
                      <span slot="prefix" style="font-size: 16px">s</span>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="xs" label-width="80px" label="动力系数">
                    <el-input-number
                      size="mini"
                      style="width: 100%"
                      v-model="shuju.xs"
                      :min="1.1"
                      :max="1.3"
                      :precision="1"
                      :step="0.1"
                      label="描述文字"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card" shadow="hover" style="height: 259px">
            <div slot="header" class="tools-form-title">
              <span>工况计算:</span>
              <el-radio-group v-model="radio">
                <el-tooltip effect="dark" content="即荷载作用面的长边垂直于板跨" placement="top">
                  <el-radio style="margin-left: 10px" v-model="radio" label="1">
                    叉车运行方向与楼板跨度方向平行时
                  </el-radio>
                </el-tooltip>
                <el-tooltip effect="dark" content="即荷载作用面的长边平行于板跨" placement="top">
                  <el-radio v-model="radio" label="2"> 叉车运行方向与楼板跨度方向垂直时 </el-radio>
                </el-tooltip>
              </el-radio-group>

              <div style="float: right">
                <el-button type="text" @click="clearAll">全部清零</el-button>
              </div>
            </div>
            <div class="result">
              <span>合力中心距前轴距离</span> a
              {{ result.a ? '=' + result.a : '' }}
              <el-row :gutter="10">
                <el-col :span="8">
                  1、跨中最大弯矩M<span style="font-size: 10px">max</span>
                  <div v-show="result.Mmax">M<span style="font-size: 10px">max</span>={{ result.Mmax }}</div>
                </el-col>
                <el-col :span="8">
                  2、有效分布宽度b
                  <div v-show="result.btx">
                    平行于板跨计算宽度b<span style="font-size: 10px">tx</span>={{ result.btx }}
                  </div>
                  <div v-show="result.bty">
                    垂直于板跨计算宽度b<span style="font-size: 10px">ty</span>={{ result.bty }}
                  </div>
                  <div v-show="result.bcx">
                    平行板跨计算宽度b<span style="font-size: 10px">cx</span>={{ result.bcx }}
                  </div>
                  <div v-show="result.bcy">
                    垂直板跨计算宽度b<span style="font-size: 10px">cy</span>={{ result.bcy }}
                  </div>
                  <div v-show="result.b">简支板上有效分布荷载b={{ result.b }}</div>
                  <div v-show="result.b2">荷载相邻折减分布宽度b'={{ result.b2 }}</div>
                </el-col>
                <el-col :span="8">
                  3、等效均布荷载q<span style="font-size: 10px">e</span>
                  <div v-show="result.qe">q<span style="font-size: 10px">e</span>={{ result.qe }}</div>
                  <div v-show="result.qe">q<span style="font-size: 10px">e</span>'={{ result.qe2 }}</div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tools',
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
        xs: 1.1
      },
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
      radio: '1'
    }
  },
  computed: {
    result() {
      let shuju = {}
      for (const key in this.shuju) {
        if (Object.hasOwnProperty.call(this.shuju, key)) {
          const element = this.shuju[key]
          this.$set(shuju, key, element != null ? Number(element) : null)
        }
      }
      console.log(shuju)
      let a = shuju.Pb && shuju.c && shuju.Pf ? (shuju.Pb * shuju.c) / (shuju.Pf + shuju.Pb) : null
      let Mmax = null
      if (shuju.Pf && shuju.Pb && shuju.L && a && this.radio == '1') {
        Mmax = ((shuju.Pf + shuju.Pb) * Math.pow(shuju.L - a, 2)) / (8 * shuju.L)
      } else if (shuju.Pf && shuju.Pb && shuju.L && a && this.radio == '2') {
        Mmax = (shuju.Pf * Math.pow(shuju.L - shuju.e / 2, 2)) / (4 * shuju.L)
      } else {
        Mmax = null
      }
      let btx
      if (this.radio == '1') {
        btx = shuju.width
      } else if (this.radio == '2') {
        btx = shuju.length
      } else {
        btx = null
      }
      let bty
      if (this.radio == '1') {
        bty = shuju.length
      } else if (this.radio == '2') {
        bty = shuju.width
      } else {
        bty = null
      }
      let bcx
      if (btx && shuju.s && shuju.h) {
        bcx = btx + 2 * shuju.s + shuju.h
      } else {
        bcx = null
      }
      let bcy
      if (bty && shuju.s && shuju.h) {
        bcy = bty + 2 * shuju.s + shuju.h
      } else {
        bcy = null
      }
      let b
      if (this.radio == '1' && shuju.L && bcy) {
        if (bcy <= 2.2 * shuju.L) {
          b = (bcy * 2) / 3 + 0.73 * shuju.L
        } else {
          b = bcy
        }
      } else if (this.radio == '2' && shuju.L && bcy) {
        b = bcy + 0.7 * shuju.L
      } else {
        b = null
      }
      let b2
      if (this.radio == '1' && shuju.e && b) {
        if (shuju.e < b) {
          b2 = (b + shuju.e) / 2
        } else {
          b2 = b
        }
      } else if (this.radio == '2') {
        if (shuju.c < b) {
          b2 = (shuju.c + b) / 2
        } else {
          b2 = b
        }
      } else {
        b2 = null
      }
      let qe
      if (Mmax && b2 && shuju.L) {
        qe = (8 * Mmax) / (b2 * Math.pow(shuju.L, 2))
      } else {
        qe = null
      }
      let qe2
      if (shuju.xs && qe) {
        qe2 = shuju.xs * qe
      } else {
        qe2 = null
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
        qe2: qe2
      }
      for (const key in param) {
        if (Object.hasOwnProperty.call(param, key)) {
          const element = param[key]
          param[key] = element ? Math.round(element * 10000).toFixed(4) / 10000 : null
        }
      }
      console.log(param)
      return param
    }
  },
  props: [],
  methods: {
    clear1() {
      this.shuju.Pf = null
      this.shuju.Pb = null
      this.shuju.e = null
      this.shuju.c = null
    },
    clear2() {
      this.shuju.length = null
      this.shuju.width = null
    },
    clear3() {
      this.shuju.h = null
      this.shuju.L = null
      this.shuju.s = null
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
        xs: 1.1
      }
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.tools {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-title {
    text-align: center;
    // margin-top: 20px;
    font-size: 30px;
    color: #663300;
    font-family: SiYuanM;
    font-weight: 600;
    text-shadow: 0px 0px 1px #333;
  }
  &-form {
    width: 100%;
    padding: 10px;
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
  height: 159px;
  /deep/.el-card__body,
  /deep/.el-card__header {
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
/deep/.el-icon-plus:before {
  content: '+';
  font-size: 21px;
  line-height: 22px;
}
/deep/.el-icon-minus:before {
  content: '-';
  font-size: 21px;
  line-height: 22px;
}
</style>