<script setup>
import { ref, onMounted } from 'vue'
import { config } from '@/config'
import { useRouter} from 'vue-router'
const router = useRouter()

const menus = ref([])
const menusHandle=()=>{
  const threeMenus = config.menus.find(item => item.name == 'echarts')
  let list = threeMenus.children.filter(item => item.path !== '/')
  menus.value = list.map(item =>{
      const {img,...rest} = item
      return {
          img: import.meta.env.VITE_BASE_URL + img,
          ...rest
      }
  })
}

const go = (path,index) => {
  router.push(path)
  gotoItem(index)
}

const gotoItem = (index) => {
  const menu = document.getElementById('menu')
  if (menu) {
    menu.scrollTop =  index * 140
  }
}
onMounted(() => {
  menusHandle()
})
</script>

<template>
  <div class="content">
    <div class="file-title">
      <img src="https://ghchenjingqi.github.io/resources/images/echart.jpg" alt="">
      <div class="file-content">
        <h1>Echarts <a href="https://echarts.apache.org/zh/index.html" target="_blank" rel="noopener noreferrer">官方案例</a></h1>
        <p>基于JavaScript 的开源可视化图表库</p>
        <p>Echarts官方地址：<a href="https://echarts.apache.org/zh/option-gl.html#globe"  target="_blank" rel="noopener noreferrer">https://echarts.apache.org</a></p>
      </div>
    </div>
    <div class="box">
        <h3>Demo案例</h3>
        <ul class="list">
          <li v-for="(item,index) in menus" :key="index" @click="go(item.path,index)">
            <img :src="item.img" :alt="item.name">
            <h5>{{ item.name }}</h5>
          </li>
        </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.file-title{
  padding: 1rem 2rem;
  box-sizing: border-box;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background: #fff;
  height: 180px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;

  img{
    height: 100%;
    margin-right: 2rem;
  }

  .file-content {
    h1{
      a{
        margin-left: .5rem;
        display: inline-block;
        padding: 4px 12px;
        background: var(--mainColor);
        font-size: 12px;
        text-decoration: none;
        border-radius: 4px;
        vertical-align: top;
        color: #fff;
      }
    }
  }
  p a{
    color: var(--mainColor);
  }
}

.box{
    background: #fff;
    padding: 1rem 2rem;
    overflow: hidden;
    border-radius: 8px;
    max-height: 580px;
    overflow-y: auto;
    h3{
        font-size: 1rem;
    }

    ul,li{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    li{
        width: 23%;
        margin-right: 2%;
        margin-bottom: 1rem;
        height: 240px;
        float: left;
        cursor: pointer;

        img{
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 4px;
            transition: all .3s ease-in-out;
        }
        h5{
            margin-top: 10px;
        }
        &:nth-of-type(4n){
            margin-right: 0;
        }
        &:hover {
            img{
                transform: scale(1.02);
            }
            h5{
                color: var(--mainColor);
            }
        }

    }
}
</style>
