<template>
  <div class="app">
    <Left/>
    <Center/>
    <Right/>
  </div>
  
</template>

<script>
import Left from './components/Left.vue'
import Center from './components/Center.vue'
import Right from './components/Right.vue'

export default {
  name: 'App',
  components: {
    Left,
    Center,
    Right,
  }
}
</script>

<style>
    .app{
        /* width:1900px; */
        width:1895px;
        height:860px;
        border:5px solid #54759e;
    }
    
    .left{
        width:15%;
        /* height:60%; */
        height:100%;
        border-right:2px solid #54759e;
        /* margin:2px; */
        /* 两个元素都设置为浮动，才能在一行显示（Left和Center） */
        float:left;
        background-color: #ffffff;
        
        font-family: 'JamesonBold ';
        font-weight:600;
        font-size: 15px;
    }
    .center{
        width:43%;
        /* height:60%; */
        height:100%;
        border-right:2px solid #54759e;
        /* margin:2px; */
        /* 两个元素都设置为浮动，才能在一行显示（Left和Center） */
        float:left;
        background-color: #ffffff;
        
        font-family: Verdana;
        font-weight:600;
        font-size: 15px;
    }
    .right{
        width:41.66%;
        /* height:60%; */
        height:100%;
        border-right:2px solid #54759e;
        /* margin:2px; */
        /* 两个元素都设置为浮动，才能在一行显示（Left和Center） */
        float:left;
        background-color: #ffffff;
        
        font-family: Verdana;
        font-weight:600;
        font-size: 15px;
    }
    
</style>
