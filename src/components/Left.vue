<template>
  <div class="left">
    <!-- 系统名称 -->
    <div class="gegp"><div class="gegpText" style="font-size:30px;">Gegp</div></div>
    <!-- 所使用模型 -->
    <div class="grapphModel" style="height:130px;">
        <div class="model1" style="border-bottom:1px solid #DCDFE6;height:50px;margin-top:10px;">
            <el-switch
                  style="display: block;width:100px;float:left;-webkit-transform: scale(0.90);"
                  v-model="ShowButton1"
                  active-color="#54759e"
                  inactive-color="#DCDFE6"
                  active-text="KGAT"
                  >
            </el-switch>
            <div style="font-weight:100;font-size:8px;color:#606266">Knowledge Graph Attention Network for Recommendation</div>

        </div>
        
        <div class="model1" style="height:69px;margin-top:10px;">
            <el-switch
                  style="display: block;width:150px;height:40px;float:left;font-size:12px;-webkit-transform: scale(0.90);-webkit-transform-origin-x: 1;"
                  v-model="ShowButton2"
                  active-color="#54759e"
                  inactive-color="#DCDFE6"
                  active-text="GNNExplainer"
                  >
            </el-switch>
            <div style="font-weight:100;font-size:5px;color:#606266;-webkit-transform: scale(1);width:50%;margin-left:50%;transform: translateX(-1px)">Generating Explanations for Graph Neural Networks</div>
<!-- transform: translateX(-20px) -->
        </div>

        <!-- <el-switch
                style="display: block"
                v-model="ShowButton2"
                active-color="#54759e"
                inactive-color="#DCDFE6"
                active-text="GNNExplainer"
                >
        </el-switch> -->
    </div>
    
    <!-- 所有特征列表图 -->
    <div class="allFeatureClass">
          <el-table :data="tableData" height=100% style="width: 100%"
          @row-click="featureRowClick"
          :cell-class-name="featureClassName"
          >
            <el-table-column
              prop="featureName"
              label="Feature Name"
              min-width=120
              
              >
            </el-table-column>

            <!-- icon图标 特征选择图标 -->
            <!-- <el-table-column>
              <template slot-scope="scope"> 
                <el-button type="info" icon=:rowIcon @click="featureRowClick(scope)" circle>

                </el-button>
              </template>
            </el-table-column> -->

        </el-table>
    </div>
    
    <!-- <div class="selectedGroupFeatureButton" style="width: 50%;float:left">
        <el-button type="info" class="selectedGroupFeatureButton" @click="selectedGroupFeature()">select</el-button>
    </div> -->
    

    <!-- 关注特征的用户群 -->
    <div class="featureGroup">
      <div class="selectedGroupFeatureButton" @click="selectedGroupFeature()">
        <div class="selectedGroupFeatureButtonText">select</div>
      </div>
  
      <div class="clearGroupFeatureButton" @click="clearGroupFeature()">
        <div class="clearGroupFeatureButtonText">clear</div>
      </div>

      <!-- <div class="clearGroupFeatureButton" style="width: 50%;float:left;">
          <el-button type="info" class="clearGroupFeatureButton" @click="clearGroupFeature()">clear</el-button>
      </div> -->
      
      <div class="featureGroupName">

      </div>
      <div class="featureGroupRect">
      </div>

    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';//引入d3v7版本
import axios from "axios"
import pubsub from 'pubsub-js'
export default {
  name: 'Left',
  props: {
  },
  data(){
    return {
              // 显示模型
              ShowButton1:true,
              ShowButton2:true,
              //特征数据集合 
              tableData: [
                    {
                      featureName: '演员',
                    }, 
                    {
                      featureName: '导演',
                    }, 
                    {
                      featureName:'剧情',
                    }, 
                    {
                      featureName:'犯罪',
                    }, 
                    {
                      featureName:'情色',
                    }, 
                    {
                      featureName:'喜剧',
                    }, 
                    {
                      featureName:'爱情',
                    }, 
                    {
                      featureName:'动作',
                    }, 
                    {
                      featureName:'西部',
                    }, 
                    {
                      featureName:'冒险',
                    }, 
                    {
                      featureName:'音乐',
                    }, 
                    {
                      featureName:'传记',
                    }, 
                    {
                      featureName:'悬疑',
                    }, 
                    {
                      featureName:'惊悚',
                    }, 
                    {
                      featureName:'恐怖',
                    }, 
                    {
                      featureName:'纪录片',
                    }, 
                    {
                      featureName:'历史',
                    }, 
                    {
                      featureName:'战争',
                    }, 
                    {
                      featureName:'奇幻',
                    }, 
                    {
                      featureName:'运动',
                    }, 
                    {
                      featureName:'同性',
                    }, 
                    {
                      featureName:'动画',
                    }, 
                    {
                      featureName:'短片',
                    }, 
                    {
                      featureName:'儿童',
                    }, 
                    {
                      featureName:'歌舞',
                    }, 
                    {
                      featureName:'科幻',
                    }, 
                    {
                      featureName:'家庭',
                    }, 
                    {
                      featureName:'武侠',
                    }, 
                    {
                      featureName:'古装',
                    }, 
                    {
                      featureName:'灾难',
                    }, 
                    {
                      featureName:'真人秀',
                    }, 
                    {
                      featureName:'黑色电影',
                    }, 
                    {
                      featureName:'脱口秀',
                    }, 
                    {
                      featureName:'戏曲',
                    }, 
                    {
                      featureName:'舞台艺术',
                    }, 
                    {
                      featureName:'鬼怪',
                    }, 
                    {
                      featureName:'荒诞',
                    }
                  ],
              // 选中的特征名称集合
              selectedRow:[],
              // 所有的用户群特征信息
              allGroupAllGroup:[],
              // 选中的特征,所有用户的该特征分数
              allGroupselectedFeature:[],
              // 用于提交对比的用户群
              conveyGroupCompare:[],
    }
  },
  methods:{
    // 选中的特征行,添加到特征数组中
            featureRowClick(row,column,event,cell){
                // 如果数组中不存在,添加;否则,移除
                if((this.selectedRow).indexOf(row.featureName)==-1){
                  (this.selectedRow).push(row.featureName)
                }
                else{
                  (this.selectedRow).splice((this.selectedRow).indexOf(row.featureName), 1)
                }
            },
    // 选中的特征行的class发生变化,改变css样式
            featureClassName(row){
                if ((this.selectedRow).indexOf(row.row.featureName)!=-1) {
                  
                    return 'selectedColumn'
                   }
                
                return "allColumn"
            },
    //所有用户群的特征信息 
            allGroupFeature(){
              
               
               
               var path="http://localhost:5000/featureGroup"
                  axios.get(path)
                  .then(res=>{
                    
                        for(var i=0;i<(res.data).length;i++){
                          res.data[i]=res.data[i].replaceAll("(","").replaceAll(/\"/g,"").replaceAll("'","").replaceAll(" ","")
                          res.data[i]=(res.data[i]).split("),")
                          for(var j=0;j<(res.data[i]).length;j++){
                            res.data[i][j]=(res.data[i][j]).replaceAll("\n","").replaceAll(")","")
                            res.data[i][j]=(res.data[i][j]).split(",")
                          }
                        }
                        this.allGroupAllGroup=res.data
                        // console.log("center中的",this.allGroupAllGroup);
                        // 传递给center组件
                        pubsub.publish('allGroupAllGroup',this.allGroupAllGroup)
                  })
                
            },  
    // 选中的用户群的特征信息   
            selectedGroupFeature(){
              
              // .style("background-color", "white")
              var selectedFeature=this.selectedRow

              // this.allGroupFeature();
              setTimeout(() => {
                
                // 点击之后所有特征的颜色变为正常
                d3.selectAll("td").attr("class","none")
                  // console.log(selectedFeature);
                  // console.log(this.allGroupAllGroup);
                  
                  this.allGroupselectedFeature=[]
                  for(var i=0;i<this.allGroupAllGroup.length;i++){
                    this.allGroupselectedFeature.push([])
                    this.allGroupselectedFeature[i].push(i);
                    for(var j=0;j<selectedFeature.length;j++){
                      var featureExit=0
                      for(var k=0;k<(this.allGroupAllGroup[i]).length;k++){
                        if(this.allGroupAllGroup[i][k][0]==selectedFeature[j]){
                          featureExit=1
                          this.allGroupselectedFeature[i].push(parseFloat([this.allGroupAllGroup[i][k][1]]))
                          break;
                        }
                      }
                      // 如果该用户没有该选中特征的相关性分数,该特征的分数为0
                      if(!featureExit){
                        this.allGroupselectedFeature[i].push(0)
                      }
                    }
                  }
                    // console.log(this.allGroupselectedFeature);
                    // 特征排序,输出特征组合分数最高的前6个用户群
                    this.allGroupselectedFeature.sort((arr1, arr2) => {
                          var tempOneGroup1Feature=0;
                          var tempOneGroup2Feature=0;
                          for(var i=0;i<selectedFeature.length;i++){
                            tempOneGroup1Feature=tempOneGroup1Feature+arr1[i+1]
                            tempOneGroup2Feature=tempOneGroup2Feature+arr2[i+1]
                          }
                          // return  (arr2[1]+arr2[2])-(arr1[1]+arr1[2]);
                          return tempOneGroup2Feature-tempOneGroup1Feature
                    });
                      this.allGroupselectedFeature=this.allGroupselectedFeature.slice(0,12)
                    
                    // 用用户群的数据画图
                    this.drawGroupRect(selectedFeature,this.allGroupselectedFeature);
                  }, 1000);
                  
              this.selectedRow=[]  
            },    
    // 用选中的用户群的特征信息画图
    drawGroupRect(selected,featureGroup){
                    // _this指向vm
                    var _this=this
                    // console.log(featureGroup);
                    // 画特征文字信息
                    var featureGroupNameSvg=d3.select(".featureGroupName").append("svg").attr("width",150).attr("height",140).style("border-bottom","1px solid #54759e")
                    var featureGroupText = featureGroupNameSvg.append("text")
                          .attr("x",0)
                          .attr("y",0)
                          .attr("fill","#919191")
                          .attr("font-size",15)
                          .attr("font-family","JamesonBold")

                    featureGroupText.selectAll("tspan")
                        .data(selected)
                        .enter()
                        .append("tspan")
                        .attr("x",featureGroupText.attr("x"))
                        .attr("dy","1.5em")
                        .text(function(d,i){
                          console.log("selected",selected,i)
                          return "Ft."+(i+1)+" "+d;
                        });
                        
                

                  //  画矩形
                  var groupRectWidth=30
                  var groupRectHeight=30

                  var groupPositionX=[3,50,100,150,3,50,100,150,3,50,100,150]
                  var groupPositionY=[10,10,10,10,50,50,50,50,90,90,90,90]
                  var featureGroupRectSvg=d3.select(".featureGroupRect").append("svg").attr("width",192).attr("height",140).style("border-bottom","1px solid #54759e")
                  
                  var FeatureInfo=[]    
                  // 取每个特征的最大值
                  for(var p=0;p<selected.length;p++){
                    FeatureInfo.push([])
                      for(var k=0;k<12;k++){
                        FeatureInfo[p].push(featureGroup[k][p+1])
                      }
                      FeatureInfo[p].sort((a, b) => {
                        return b-a // 降序
                      })
                      
                  }
                  // console.log("获得每种特征的降序数组",FeatureInfo);
                    for(var i=0;i<12;i++){
                              var groupRectPositionX=groupPositionX[i];
                              var groupRectPositionY=groupPositionY[i];
                              // 添加矩形
                              featureGroupRectSvg.append('rect')
                                        .attr('x',groupRectPositionX)
                                        .attr('y',groupRectPositionY)
                                        .attr('rx',5)
                                        .attr('width',groupRectWidth)
                                        .attr('height',groupRectHeight)
                                        .attr('fill','#71a28f')

                                        .attr('stroke','#f2a37c')
                                        .attr('stroke-width',5)
                                        // .attr('stroke-dasharray',[featureGroup[i][1]* ((groupRectWidth-5)*4/selected.length) / featureGroup[0][1],300])
                                        .attr('stroke-dasharray',function(){
                                                if(FeatureInfo[0][0]!=0){
                                                  return [featureGroup[i][1]* ((groupRectWidth-5)*4/selected.length) / FeatureInfo[0][0] , 500]
                                                }
                                                else{
                                                  return [0,500]
                                                }
                                        })

                                        // .attr("stroke-dashoffset",-10)
                                        .attr('stroke-opacity',1)

                              // 添加矩形内文字
                              featureGroupRectSvg.append("text")
                                        .style("cursor","pointer")
                                        .style("font-size", "13px")
                                        .attr("text-anchor", "middle")
                                        .attr("font-family", "JamesonBold")
                                        .attr("fill","white")
                                        .attr("dy", "0.35em")
                                        .attr("x", groupRectPositionX+groupRectWidth/2)
                                        .attr("y", groupRectPositionY+groupRectHeight/2)
                                        .text("G"+featureGroup[i][0])
                                        .attr("class","text"+featureGroup[i][0])
                                        .on("click",function(d){
                                          var selectedClustName=(d3.select(this).attr("class")).replaceAll("text","") 
                                          
                                          
                                          // 点击用户群,显示该用户群的阴影
                                          // 如果没显示阴影,添加阴影
                                          if( d3.select("#clustPath"+selectedClustName).attr("opacity")==0){
                                            
                                            d3.select("#clustPath"+selectedClustName).attr("opacity", 0.4)
                                            d3.select(this).style("fill","black")//选中后rect字体变黑
                                            _this.conveyGroupCompare.push(selectedClustName)
                                           
                                          }
                                          // 有阴影,去掉阴影
                                          else{
                                            d3.select("#clustPath"+selectedClustName).attr("opacity", 0)
                                            d3.select(this).style("fill","white")//返回后rect字体变白
                                            _this.conveyGroupCompare = (_this.conveyGroupCompare).filter((val) => val !== selectedClustName)
                                          }
                                        // console.log("初始_this.conveyGroupCompare",_this.conveyGroupCompare);
                                         pubsub.publish('conveyGroupCompare',_this.conveyGroupCompare)
                                        //  console.log("出版的conveyGroupCompare",_this.conveyGroupCompare)
                                        })
                                        

                              // 如果特征组合数大于1,添加边框
                              
                              var borderColorArr=["#9acced","#3a67a3"]
                              for(var j=1;j<selected.length;j++){
                                  featureGroupRectSvg.append('rect')
                                                          .attr('x',groupRectPositionX)
                                                          .attr('y',groupRectPositionY)
                                                          .attr('rx',5)
                                                          .attr('width',groupRectWidth)
                                                          .attr('height',groupRectHeight)
                                                          .attr('fill','none')

                                                          .attr('stroke',borderColorArr[j-1])
                                                          .attr('stroke-width',5)
                                                          // .attr('stroke-dasharray',[featureGroup[i][j+1]* ((groupRectWidth-5)*4/selected.length) / FeatureInfo[j][0],700])
                                                          // .attr("stroke-dashoffset",-((groupRectWidth-4)*4/selected.length)*j)
                                                          .attr('stroke-dasharray',function(){
                                                            // 如果该特征的最大值FeatureInfo[j][0]为0,但分母不能为0,做判断处理
                                                                  if(FeatureInfo[j][0]!=0){
                                                                    return [featureGroup[i][j+1]* ((groupRectWidth-5)*4/selected.length) / FeatureInfo[j][0],500]
                                                                  }
                                                                  else{
                                                                    return [0,500]
                                                                  }
                                                          })
                                                          .attr("stroke-dashoffset",-((groupRectWidth-4)*4/selected.length)*j)

                                                          .attr('stroke-opacity',1)
                                      }
                              
          


                             
                  }
    },
    // 清除现在选的所有的
    clearGroupFeature(){
      console.log("现在已经选的那些了",this.conveyGroupCompare)
      // 清除字体颜色，清除阴影hull
     
      // remove()
      d3.select(".featureGroupRect").selectAll("text").style("fill","white")//选中后rect字体变白
      for(var i=0;i<this.conveyGroupCompare.length;i++){
         d3.select("#clustPath"+this.conveyGroupCompare[i]).attr("opacity", 0)//清除hull
      }
      this.conveyGroupCompare=[]

      console.log("清除后的",this.conveyGroupCompare)
    },


  },

  mounted(){
    this.allGroupFeature();
        },
  watch:{
            selectedRow:{
              handler(newVal,oldVal){
                  // console.log("当前的选中的特征集合",newVal.length,newVal);
              },
              immediate:true,
              deep:true,
            },
  }
}
</script>
<style>
  /* 去掉表格内的线,作用在全局*/
.allFeatureClass  table th,  table td {
    /* 使用一个 !important 规则时,此声明将覆盖任何其他声明 */
    border-bottom: none !important; 
    cursor: pointer;
  }
  /* 选定行的样式改变 */
  .selectedColumn{
    /* background-color: rgb(76 152 122 / 80%) !important; */
    background-color: rgb(72 124 163 / 50%) !important;
    
    /* border:4px solid #737574 !important;
    border-bottom:4px solid #737574; */
  }


   /* 改变滑动条的样式 */
:deep(.el-slider__bar) {
  background-color: #67b1ce;
}
:deep(.el-slider__button) {
  border: 4px solid #67b1ce;
  background-color: #fff;
  margin-left: 5px;
}
/* 设置滑动条的样式 */
::-webkit-scrollbar {
width:10px;
}
/* 滑动条滑块 */
::-webkit-scrollbar-thumb {
border-radius:10px;
background:rgba(0,0,0,0.1);
}

</style>

<style scoped>
.gegp{
  width:100%;
  height:5%;
  background:#54759e;
  color:white;
  font-family:"fangsong";
  font-size:23px;
  text-align:left;
  /* border: 2px solid white; */
}
.gegpText{
  /* margin-top:10px; */
  margin-left: 20px;
  font-weight: bold;
}
.allFeatureClass{
   /* border-bottom:1px solid #dddddd; */
    /* border-bottom:1px solid #54759e; */
    /* margin-top: 0px; */
    /* left: 1%; */
    width:100%;
    height:36%;
    float:left;
    border-top:2px solid #54759e;
}
.featureGroup{
    width:100%;
    height:42%;
    float:left;
    overflow-y:auto;
    border-top:1px solid #54759e;
}
.featureGroupName{
    margin-left:10px;
    margin-top:10px;
    /* left: 1%; */
    width:30%;
    height:90%;
    float: left;
}
.featureGroupRect{
    margin-top:10px;
    margin-left:-5px;
    width:50%;
    height:90%;
    float: left;
}



.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
  }
  
  /* 修改表头字体颜色 */
  ::v-deep.el-table thead {
    color: #3e3e3e;
    font-weight: 70;
    font-size: 100%;
    font-family: 'JamesonBold ';
  }
  /* 修改行高,默认上下是padding12px*/
  ::v-deep .el-table td{
      padding:10px 15px;  
      
  }
  ::v-deep .el-table td, .el-table th {
      font-family: 'JamesonBold ';
      color: #606266;
      font-size: 100%;
      border-radius: 15px;
  }

/* 特征查询按钮 */
.selectedGroupFeatureButton{
  
  width:80%;
  color: #54759e;
  cursor: pointer;
}
::v-deep .selectedGroupFeatureButton {
  float:left;
  width:50px;
  height:30px;
  background: url('css/select.png') center no-repeat;			
  /* font-size: 12px; */
  background-size: cover;
}
::v-deep .selectedGroupFeatureButton:before {
  content: "挑选";
  visibility: hidden;
}
.selectedGroupFeatureButtonText{
  margin-left: 40px;
  margin-top: -15px;
}

/* 特征清除按钮 */
.clearGroupFeatureButton{
  width:100%;
  color: #54759e;
  cursor: pointer;
}
::v-deep .clearGroupFeatureButton{
  float: left;
  margin-left: 120px;
  width:40px;
  height:30px;
  background: url('css/delete.png') center no-repeat;		
  background-size: cover;
}

::v-deep .clearGroupFeatureButton:before {
  content: "删除";
  visibility: hidden;
}
.clearGroupFeatureButtonText{
  margin-left: 40px;
  margin-top: -15px;
}

::v-deep .el-switch__label.is-active{
    color:#54759e;
}
::v-deep .el-switch__label {
  font-weight: bold;
}
</style>

