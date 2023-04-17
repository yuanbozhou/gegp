<template>
  <div class="center">
    <div style="background-color:#54759e;color:white;height:22px;">
        Embedding Results
    </div>

    <!-- 用户散点 --> 
    <div class="userEmbedding">
        <div class="filter">
            <span class="demonstration" style="color:#606266;margin-left:20px;margin-top:5px">Director</span>
            <!-- <el-slider v-model="filterButton[0]" :step="0.05" :max="0.25" show-stops></el-slider> -->
            <el-slider v-model="filterButton[0]" range show-stops :step="0.01" :max="0.15"></el-slider>
        </div>
        <div class="filter">
            <span class="demonstration" style="color:#606266;margin-left:20px;margin-top:5px">Actor</span>
            <el-slider v-model="filterButton[1]" range show-stops :step="0.01" :max="0.15"></el-slider>
        </div>
        <div class="filter">
            <span class="demonstration" style="color:#606266;margin-left:20px;margin-top:5px">Genre</span>
            <el-slider v-model="filterButton[2]" range show-stops :step="0.01" :max="0.15"></el-slider>
        </div>

        <el-select v-model="selectedClust" placeholder="search" style="margin-left:160px;margin-top:10px;width:120px;" :popper-append-to-body="false">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>

        <div class="search1" @click="enLarge()"></div>
        <div class="search2" @click="enSearch()"></div>
        <div class="search3" @click="enHome()"></div>
         <div class="compareGroupExplain" @click="compareGroupExplain()">
                    <!-- <el-button type="info" class="compareGroupExplain" @click="compareGroupExplain()">推荐解释模式</el-button> -->
        </div>
      <svg id="userChoose" width="300" height="430"></svg>
    </div>

    <!-- 比较 -->
    <div class="clustCompare">
        <!-- 比较 -->
     

        

        <!-- 用户群解释图 -->
        <div class="leftGraph">
            
           
            <div class="compareGroupHistory" @click="compareGroupHistory()">
                <div class="compareGroupHistoryText">历史偏好模式</div>
            </div>
            <div class="breadFooter">
                <!-- 内圈外圈导航栏 -->
                <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">{{G}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{G1}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{G2}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
                <!-- 环形图 -->
                <svg id="drawPie" width="400" height="400"></svg>
                <!-- 条形图 -->
                <svg id="compareBar" width="300" height="300"></svg>
                <!-- 雷达图 -->
                <svg id="radarGroupSvg" width="110" height="110"></svg> 
        </div>
        <!-- 用户解释图 -->
        <div class="rightGraph">
                 
                <!-- <div class="compareGroupExplain" style="width: 50%">
                    <el-button type="info" class="compareGroupExplain" @click="compareGroupExplain()">推荐解释模式</el-button>
                </div> -->
                    
              <!-- 气泡图 -->
              <div class="drawBubble" width="400" height="200" style="float:left;">
                <!-- 走马灯 -->
                <!-- <el-carousel height="200px" direction="vertical" :autoplay="false">
                            <el-carousel-item v-for="item in 3" :key="item">
                            <h3 class="medium">{{ item }}</h3>
                            <div>1234</div>
                            </el-carousel-item>
                </el-carousel> -->

                <!-- 切换按钮 -->
                <!-- relevance score -->
                <div class="compareGroupExplain1" @click="changingOver1()">
                    <div class="compareGroupExplainText1">Director</div>
                </div>
                <div class="compareGroupExplain2" @click="changingOver2()">
                    <div class="compareGroupExplainText2">Actor</div>
                </div>
                <div class="compareGroupExplain3" @click="changingOver3()">
                    <div class="compareGroupExplainText3">Genre</div>
                </div>
                <div style="float:left;margin-left:80px;margin-top:10px;fill:#606266">{{selecterUser}}</div>
                <svg id="bubbleSvg" width="415" height="144"></svg>
              </div>
              
              <div class="watchedMovie" width="150" height="200"  style="float:left;" v-show="showWatch">
                        
                        <el-table
                            :data="tableMovie"
                            @row-click="onemovieClick"
                            height="171"
                            style="width: 100%;font-size: 11px;color:#000000;font-family: fangsong"
                            :header-cell-style="{height:'25px',color:'#000000',padding:'2px'}"
                            :cell-style="{padding:'8px'}"
                            >
                            <el-table-column
                            prop="date"
                            label="HistoryM"
                            width="140">
                            </el-table-column>
                        </el-table>
                        <div class="broom" @click="changingtableMovie()"></div>
              </div>

              <div class="MovieDeatils" width="200" height="200"  style="float:left;font-size: 8px;color:#000000;font-family: fangsong" v-show="showMovie">
                        <!-- 电影海报信息 -->
                        <!-- 如果显示403 Forbidden  说明源地址加了防盗链 ：在引用链接时,浏览器对地址发起请求加上了refre这个请求头,而有些服务器能根据refre反盗所以引用失败返回403 -->
                        <meta name="referrer" content="no-referrer" />
                        <p><font size="3" color="#606266"><b>&nbsp;&nbsp;&nbsp;&nbsp;{{itemName}}</b></font></p>
                        <div class="pic" style="margin-left:9px;">
                            <img id="picShow" src="../assets/movie.png" width="80" height="100" alt="" style="margin-top:15px;"/>
                        </div>
                        <div class="picInfo">
                            <br>
                            <br>
                            <ul v-for="(info,index) in items" :key="info" width="200">
                                <p v-bind:title="info">{{itemsName[index]}}: <font color="#606266" width="10">{{info}}</font></p>
                            </ul>
                        </div>
              </div>
        </div>
      
       
       
      
        
    </div>
    
  </div>
</template>

<script>

import * as d3 from 'd3';//引入d3v7版本
import axios from "axios"
import pubsub from 'pubsub-js'
import { pointer } from 'd3';

export default {
  name: 'Center',
  props: {
  },
  data(){
    return {
        // 表格电影数据
        tableMovie:[],
        // 看过的所有电影
        allHistoryM: [],
        // 看过的某导演，演员的电影
        newHistoryM:[],
        // 所有电影的详细信息
        allMovieDetails:[],
        // 某电影海报
        itemName:"",
        itemsName:["导演","主演","类型","上映","标签","评分"],
        items:[],
        // 是否展示表格
        showWatch:false,
        showMovie:false,
        // 所选用户相关分数
        bubbleData:[
            ],

        // 选择器
        options: [{value: "c0",label: 'Group0'},
                  {value: 'c1',label: 'Group1'}, 
                  {value: 'c2',label: 'Group2'}, 
                  {value: 'c3',label: 'Group3'}, 
                  {value: 'c4',label: 'Group4'}, 
                  {value: 'c5',label: 'Group5'}, 
                  {value: 'c6',label: 'Group6'}, 
                  {value: 'c7',label: 'Group7'}, 
                  {value: 'c8',label: 'Group8'}, 
                  {value: 'c9',label: 'Group9'}, 
                  {value: 'c10',label: 'Group10'}, 
                  {value: 'c11',label: 'Group11'}, 
                  {value: 'c12',label: 'Group12'}, 
                  {value: 'c13',label: 'Group13'}, 
                  {value: 'c14',label: 'Group14'}, 
                  {value: 'c15',label: 'Group15'}, 
                  {value: 'c16',label: 'Group16'}, 
                  {value: 'c17',label: 'Group17'}, 
                  {value: 'c18',label: 'Group18'}, 
                  {value: 'c19',label: 'Group19'}, 
                  {value: 'c20',label: 'Group20'},
                  {value: 'c21',label: 'Group21'}, 
                  {value: 'c22',label: 'Group22'}, 
                  {value: 'c23',label: 'Group23'}, 
                  {value: 'c24',label: 'Group24'}, 
                  {value: 'c25',label: 'Group25'}, 
                  {value: 'c26',label: 'Group26'}, 
                  {value: 'c27',label: 'Group27'}, 
                  {value: 'c28',label: 'Group28'}, 
                  {value: 'c29',label: 'Group29'}, 
                  {value: 'c30',label: 'Group30'},
                  {value: 'c31',label: 'Group31'}, 
                  {value: 'c32',label: 'Group32'}, 
                  {value: 'c33',label: 'Group33'}, 
                  {value: 'c34',label: 'Group34'}, 
                  {value: 'c35',label: 'Group35'}, 
                  {value: 'c36',label: 'Group36'}, 
                  {value: 'c37',label: 'Group37'}
                  

       ],
        

        // 过滤条1，2，3
        filterButton:[[0,0.15],[0,0.15],[0,0.15]],
        // 所有用户群的所有特征
            allGroupAllGroup:[], 
        // 选择的对比用户群的下标
            conveyGroupCompare:[],
        // 选择的对比用户群的barchart数据
            barChartData:[],
            //所有的类型 
            allFatureName:['剧情', '犯罪', '情色', '喜剧', '爱情', '动作', '西部', '冒险', '音乐', '传记', '悬疑', '惊悚', '恐怖',
            '纪录片', '历史', '战争', '奇幻', '运动', '同性', '动画', '短片', '儿童', '歌舞', '科幻', '家庭',
            '武侠', '古装', '灾难', '真人秀', '黑色电影', '脱口秀', '戏曲', '舞台艺术', '鬼怪', '荒诞','导演','演员'],
            colorArr:["#a6cee3", "#b15928", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a",  "#b2df8a", "#33a02c",'#38382e', '#10108b', '#35ccb1', '#0c729f','#061b28', '#5bc0f0','#460a7b', '#187a99','#ff99ff',"#00ff99","#8A8A8A","#ffff00","	#FFE1FF","	#EED8AE","	#B03060","#8B7D7B","#7CFC00","#6499ED",'#062d97', '#11b576', '#1658fa', '#936b23', '#07542d', '#48b7fa', '#0eedf0', '#7f2133', '#80ee65', '#160b04', ],

        // 记录当前簇的数量
            oneClustNumber:0,
            selectedClust:"",
            oldSelectedClust:"",
        // 记录当前用户群的各自前三位排名
        thirdName:[],
        // 内圈外圈导航栏
        G:"",
        G1:"",
        G2:"",
        // 控制是否显示相关分数
        showuserScore:0,
        // 用户的信息，包含坐标，群名，相关性分数
        userInfoScore:[],

        // 选择的一个用户
        selecterUser:"",
          
    }
  },
  methods:{

    
    // 单类别的选择
    handleSelectionChange(val) {
        // 当什么类都不选时，返回最初的散点聚类图
            d3.select("#cloud").transition().duration(1000).remove()

            d3.selectAll(".userEmbedding").selectAll("circle")
                        .transition()
                        .duration(4000)
                        .delay(100)
                        .style("visibility","visible")
            // 缩放当前类的扩放
            
            
            if(this.oldSelectedClust!=""){
                console.log("缩放当前类的扩放",this.selectedClust,"旧的缩放类",this.oldSelectedClust)
                            d3.selectAll("#"+this.oldSelectedClust)
                                        .transition()
                                        .duration(1000)
                                    
                                        .attr("transform",function(d){
                                            
                                            // 给一个初始值，防止紧挨边缘
                                            var newX=d3.select(this).attr('x')
                                            var newY=d3.select(this).attr('y')

                                            
                                            return `translate(${newX},${newY})`
                                        })
                                        .attr("r",2)

            }
        



setTimeout(() => {// val c1 val.kength 2
        //console.log("val",val,"val.kength",val.length)
    
        var _this=this;
        console.log("当前选择了",val,"簇")
        

        var selectedArr=[]
        
        
        pubsub.publish("FooterBlock",[0,0])
        
            this.multipleSelection = val;
            
            this.selectedClust=val
            
            // 让其他点透明度为0，就是不显示
            d3.select("#choose").selectAll("circle")
                        .style("cursor","null")
                        .transition()
                        .duration(3000)
                        .delay(1000)
                        // .style("opacity", 0)
                        .style("visibility","hidden")
                        
                        
                        
            
            // 当前所选类的最大，最小的x，y值
            var arrXClass=[]
            var arrYClass=[]
            d3.selectAll("#"+val)
            // .style("visibility","visible")
                        .attr("stroke", "red")
                        .attr("stroke-width", 1)
                        .transition()
                        .attr("stroke-width", 0.6)
                        .duration(3000)
                        .style("visibility","visible")
                        .attr("d",function(d){
                            arrXClass.push(parseFloat(d3.select(this).attr('x')))
                            arrYClass.push(parseFloat(d3.select(this).attr('y')))
                            
                        })
                        
                    
    this.maxClassX=Math.max.apply(null,arrXClass)
    this.minClassX=Math.min.apply(null,arrXClass)
    this.maxClassY=Math.max.apply(null,arrYClass)
    this.minClassY=Math.min.apply(null,arrYClass)                   

// //console.log("arrXClass",this.maxClassX,this.minClassX,this.maxClassY,this.minClassY);
            d3.selectAll("#"+val)
                
                        .attr("stroke", "yellow")
                        .attr("stroke-width", 1)
                        // .style("opacity",0.6)
                        .transition()
                        .duration(4000)
                        .attr("r",5) 
                        .attr("transform",function(d,i){
                            
                            // 给一个初始值，防止紧挨边缘
                            var newX=40+(d3.select(this).attr('x')-_this.minClassX)*720/(_this.maxClassX-_this.minClassX)
                            var newY=15+(d3.select(this).attr('y')-_this.minClassY)*360/(_this.maxClassY-_this.minClassY)
                            // 记录新的坐标值数组
                            selectedArr.push({"x":newX,"y":newY})
                                

                                    var data=[]
                                data.push({"Month":1,"Other":d.director, "Wounds": 0,"Disease": 0,"total": d.director})
                                data.push({"Month":2,"Other":0, "Wounds": d.actor,"Disease": 0,"total": d.actor})
                                // 类型分数太大了，缩小
                                data.push({"Month":3,"Other":0, "Wounds": 0,"Disease": d.genre,"total": d.genre})
                                // console.log("data",data)
                                setTimeout(() => {

                                        _this.drawUserScore(data,newX,newY,"b"+d.userId,_this.selectedClust)
                                    }, 3000);
                                return `translate(${newX},${newY})`
                            })
                        
                        
                        .attr("stroke", "steelblue")
                        // .attr("class",function(d,i){
                        
                        //     _this.oneClustNumber=i;
                        //     return "cl"+i;
                        // })


                    // 当前显示的簇的数量 
                    pubsub.publish("LeftoneClustNumber",_this.oneClustNumber)    
        
                //   画该簇的词云，发送簇名，返回该簇的词频
                pubsub.publish('clustName',val)
                
        
        
        
        

        
    

    
}, 1000);
        
            
        
    },

    
    // 返回多类别的展示
    allClustShow(){
        this.dis=false
        this.Ufooter=""
        d3.select("#cloud").transition().duration(1000).remove()

        
        pubsub.publish("footerName",["多类别",""])
        // 清除相关分数
        // d3.select("#userBarchart").style('visibility', 'hidden')
        d3.select("#userBarchart").selectAll(".p"+this.selectedClust).style('visibility', 'hidden')
        // 当什么类都不选时，返回最初的散点聚类图
        d3.select("#cloud").transition().duration(1000).remove()
        d3.selectAll("#gCircle").selectAll("circle")
                    .transition()
                    .duration(1000)
                    // .style("opacity", 0.4)
                    .style("visibility","visible")
        
        
        
        
        if(this.selectedClust!=""){
                d3.selectAll("#"+this.selectedClust)
                    .transition()
                    .duration(1000)
                
                    .attr("transform",function(d){
                        
                        
                        
                        var newX=d3.select(this).attr('x')
                        var newY=d3.select(this).attr('y')

                        
                        return `translate(${newX},${newY})`
                    })
                    
                    .attr("r",2) 
        }
      
    
    },


    // 放大某一用户群
    enLarge(){
        console.log("放大用户群",this.selectedClust);
        this.handleSelectionChange(this.selectedClust)
        this.showuserScore=1
    },
    
    // 显示用户群相关分数
   enSearch(){
        if(this.showuserScore){
            console.log("显示相关分数",this.userInfoScore);
            console.log("当前的过滤条",this.filterButton);
            // d3.select("#userBarchart")
            //   .style('visibility', 'visible')
            d3.select("#userBarchart").selectAll(".p"+this.selectedClust)
            // .attr("i",function(d,i,k){
            //     console.log("出错",parseInt(this.id.replace("b","")))
            //     var temp=_this.userInfoScore[parseInt(this.id.replace("b",""))]
            //     console.log("夜曲",temp["director"],temp["actor"],temp["genre"]);
            // })
                .style('visibility', 'visible')
            this.showuserScore=0
        }
        else{
            console.log("取消显示相关分数",".p"+this.selectedClust);
            d3.select("#userBarchart").selectAll(".p"+this.selectedClust).style('visibility', 'hidden')
            this.showuserScore=1
        }
   },
    // 返回所有聚类
    enHome(){
        console.log("返回主页")
        this.allClustShow();
    },
     //散点聚类图 
        funCircle(fixedValue){
                    var _this=this
                    var path="http://localhost:5000/UserCLust"
                    axios.get(path)
                    .then(res=>{
                        
                        var dataPlot=[]
                        // 按钮中的东西
                        var xSelect="x1"
                        var ySelect="y1"

                        res.data=(res.data.replaceAll(" ","")).split("],")
                        // //console.log("Res",res.data)
                        for(var j=0;j<(res.data).length;j++){
                            res.data[j]=(res.data[j]).replaceAll("'","").replaceAll("[","").replaceAll("]","").replaceAll("\\n","")
                            res.data[j]=(res.data[j]).split(",")
                            for(var t=0;t<res.data[j].length;t++){
                                res.data[j][t]=parseFloat(res.data[j][t])
                            }
                        }
                        var data1=res.data
                        
                        for(var i=0;i<data1.length;i++){
                            if(data1[i][2]!=-1){
                                dataPlot.push({"userId":i,"x1":data1[i][0],"y1":data1[i][1],"clustName":data1[i][2],"size":5,"director":data1[i][3],"actor":data1[i][4],"genre":data1[i][5]/2 })
                                }
                            else{
                                dataPlot.push({"userId":i,"x1":0,"y1":0,"clustName":"notShow","size":0,"director":0,"actor":0,"genre":0})
                            }
                        }
                    
                    console.log("Data1",dataPlot.length,dataPlot)
                    this.userInfoScore=dataPlot
                    // 聚类图的大小
                    var height = 350
                    var width=780
                    var margin = ({top: 10, right: 50, bottom: 10, left: 100})
                    
                    var svg = d3.select("#userChoose")
                    .attr("id","view").attr("width",width).attr("height",500)
                    .append("g")

                    const g = svg.append("g")
                                        .attr("id","choose")
                                        .attr("width",width)
                                        .attr("height",500)
                                        .attr("transform", d => `translate(${0},${20})`)
                                        .append("g")
                                        .attr("id","gCircle")
                                        ;
                
                    let x = d3.scaleLinear()
                            .domain([0.9*d3.min(dataPlot, d => parseFloat(d[xSelect])),1.05*d3.max(dataPlot, d => parseFloat(d[xSelect]))]) 
                            .range([margin.left,width-margin.right])


                    let y = d3.scaleLinear()
                            .domain([0.95*d3.min(dataPlot, d => parseFloat(d[ySelect])),1.05*d3.max(dataPlot, d => parseFloat(d[ySelect]))])
                            .range([height-margin.bottom,margin.top])
                    
                    // circle的颜色
                    // var colorArr=['#38382e', '#10108b', '#35ccb1', '#4f953e', '#0c729f', '#0e3ade', '#047b19', '#332a1b', '#617b35', '#56ee88', '#76bb7c', '#44e16f', '#4a79e5', '#41310b', '#23fb9a', '#53014a', '#061b28', '#8061a3', '#5bc0f0', '#40d0fa', '#32e422', '#315736', '#62e593', '#11f8e9', '#14cff0', '#12d9f5', '#73267e', '#851491', '#519a6e', '#427a01', '#961465', '#129504', '#460a7b', '#187a99', '#79310b', '#5ae83a', '#6391b3', '#8cbbcc', '#82b02a', '#971a3a', '#883d5b', '#53ab6e', '#400f04', '#79a3dc', '#45411c', '#0c89fa', '#007715', '#3426e8', '#3b9728', '#494358', '#96118d', '#1ff02f', '#0894d2', '#998dad', '#1e3508', '#157348', '#56ea05', '#19da9c', '#062d97', '#11b576', '#1658fa', '#936b23', '#07542d', '#48b7fa', '#0eedf0', '#7f2133', '#80ee65', '#160b04', '#620171', '#8fa828', '#7a4cd3', '#846880', '#76dbe8', '#0aeac8', '#487984']
                    // var colorArr=  ["#a6cee3", "#b15928", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a",  "#b2df8a", "#33a02c",'#38382e', '#10108b', '#35ccb1', '#0c729f','#061b28', '#5bc0f0','#460a7b', '#187a99','#ff99ff',"#00ff99","#8A8A8A","#ffff00","	#FFE1FF","	#EED8AE","	#B03060","#8B7D7B","#7CFC00","#6499ED",'#062d97', '#11b576', '#1658fa', '#936b23', '#07542d', '#48b7fa', '#0eedf0', '#7f2133', '#80ee65', '#160b04', ]

                    var tooltip = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);
                    

                    // 添加点前,先添加阴影,否则后添加阴影,点就选择不上
                    var clustPosition=[]
                    // 所有的38个用户群
                    for(var j=0;j<38;j++){
                        clustPosition.push([])
                            for(var i=0;i<(dataPlot).length;i++){
                                if((dataPlot)[i].clustName==j){
                                        clustPosition[j].push([x(dataPlot[i].x1),y(dataPlot[i].y1)])
                                    }
                            }
                    }
                    this.drawAllClustHull(clustPosition)

                    // 用户的barchart图都画在这个svg里
                    d3.select("#view").append("svg")
                        .attr("id","userBarchart")

                    // 添加点
                    
                    const points = d3.select("#gCircle")
                        .selectAll("g")
                        .data(dataPlot)
                        .join("circle")
                        .attr("fill", function(d){
                            // console.log("这",d.userId)
                            if(d.userId==6527 || d.userId==86 || d.userId==4889 || d.userId==9395 || d.userId==149 || d.userId==245 || d.userId==27 || d.userId==116 || d.userId==616){
                                return "red"
                            }
                            return _this.colorArr[d.clustName]
                        })
                       
                        .style('opacity',0.8)
                        .attr("id",function(d){
                            return "c"+d.clustName
                        })
                        // .attr("stroke", "white")
                        // .attr("stroke-width", 0.2)
                        // .attr("stroke", "#54759e")
                        // .attr("stroke-width", 0.5)
                        .attr("stroke","steelblue")
                        .attr("stroke-width",0.3)

                        .attr("class",function(d,i){
                            return "index"+d.userId
                        })
                        .attr("x",function(d,i){
                            dataPlot[i]["x"]=x(d.x1)
                            dataPlot[i]["y"]=y(d.y1)
                            return x(d.x1)
                        })
                        .attr("y",function(d){
                            return y(d.y1)
                        })
                        .attr("transform", function(d,i){
                            // 这里给点绑定barchart
                             // 给用户点添加环形图
                             // 环形图假数据
              
                            if(i<20){
                                // console.log(d.userId,i,x(d[xSelect]),y(d[ySelect]));
                                var data=[]
                                

                                data.push({"Month":1,"Other":d.director, "Wounds": 0,"Disease": 0,"total": d.director})
                                data.push({"Month":2,"Other":0, "Wounds": d.actor,"Disease": 0,"total": d.actor})
                                // 类型分数太大了，缩小
                                data.push({"Month":3,"Other":0, "Wounds": 0,"Disease": d.genre,"total": d.genre})
                                // console.log("data",data)
                                //  setTimeout(() => {

                                //         _this.drawUserScore(data,x(d[xSelect]),y(d[ySelect]),"b"+d.userId)
                                //     }, 0);
                            }
                            
                            return `translate(${x(d[xSelect])},${y(d[ySelect])})`
                        })
                        .attr("r", function(d,i){
                            // console.log(d)
                            if(d.clustName!="notShow"){
                            //    if(d.userId==6527 || d.userId==86 || d.userId==4889 || d.userId==9395 || d.userId==149 || d.userId==245 || d.userId==27 || d.userId==116 || d.userId==616){
                            //         return 50
                            //     }
                                return 2.8
                            }
                        })

                // 给点添加悬浮等效果
                points.on('mouseover', function (i,d) {
                           
                            
                            this.style.cursor="pointer";
                            d3.select(this)
                                .attr("stroke", "blue")
                                .attr("stroke-width",3)
                    
                            this.style.cursor="pointer";
                            
                            tooltip.transition()
                                .duration(1000)
                                .style("opacity", 1)
                                .style('border-radius', '4px')
                                .style('position', 'absolute')
                                .style('z-index', '10')
                                .style('visibility', 'visible')
                                .style('padding', '10px')
                                .style('background', 'rgba(0,0,0,0.6)')
                                .style('border-radius', '4px')
                                .style('color', '#fff')
                                ;
                                
                            tooltip.html("用户群："+d.clustName+"<br>"+"用户："+d.userId)
                                .style("left", i.pageX+30 + "px")
                                .style("top",i.pageY-30+ "px")
                        

                            //  tooltip.append("svg")
                            //         .attr("id","newPanel")
                            //         .attr("width","200px")
                            //        .attr("height","200px")
                           
                            // d3.select("#newPanel").append("rect")
                            //        .attr("width","200px")
                            //        .attr("height","200px")
                            //        .style("fill","red")
                            })
                        
                       .on('mouseout', function (d, i) {
                            d3.select(this)
                            .attr("stroke-width",1)

                            tooltip.transition()
                                .style('visibility', 'visible')
                                .style("opacity", 0)
                            }) 

                       .on("click",function(i,d){
                            // console.log(i,d)
                            _this.selecterUser="U"+d.userId
                            d3.select(".relateShow").style("display","block")

                        _this.Ufooter="User"+d.userId
                        d3.select(this)
                            .attr("stroke", "blue")
                            .attr("stroke-width",3)
                            d3.selectAll("#circle").style("fill","#11a6a4")
                            d3.select(this).style("fill","blue")


                            pubsub.publish('conveyGroupCompare',d.userId)
                       
                            console.log("点击了用户",(d.userId))
                          
                            if(d.userId==6527 || d.userId==86 || d.userId==4889 || d.userId==9395){
                                pubsub.publish('thirdName',["导演","剧情","犯罪"])
                            }
                            if(d.userId==149 || d.userId==245 || d.userId==27 || d.userId==116 || d.userId==616){
                                pubsub.publish('thirdName',["演员","剧情","喜剧"])
                            }
                            
                            _this.bubbleData=[[],[],[]]
                            // 获取用户的导演相关评分
                            var path="http://localhost:5000/UserXiangguan"
                            path +=`?UserIndex=${d.userId}`;
                            axios.get(path)
                            .then(res=>{
                                res.data=(res.data).split("next")
                                for(var i=0;i<res.data.length;i++){
                                    res.data[i]=(res.data[i]).replaceAll("[","").replaceAll("]","")
                                    res.data[i]=(res.data[i]).split("', ',")
                                    for(var j=0;j<res.data[i].length;j++){
                                        res.data[i][j]=(res.data[i][j]).replaceAll("'","").replaceAll(" ","")
                                        res.data[i][j]=(res.data[i][j]).split(",")
                                        res.data[i][j][1]=parseFloat(res.data[i][j][1])
                                    }
                                }
                                // console.log("用户的导演相关评分",res.data[0])
                               
                                for(var t=res.data[0].length-1;t>=0;t--){
                                    _this.bubbleData[0].push({"level":parseInt(t/7),"name":res.data[0][t][0],"value":res.data[0][t][1]})
                                }
                                for(var t=res.data[1].length-1;t>=0;t--){
                                    _this.bubbleData[1].push({"level":parseInt(t/7),"name":res.data[1][t][0],"value":res.data[1][t][1]})
                                }
                                for(var t=res.data[2].length-1;t>=0;t--){
                                    _this.bubbleData[2].push({"level":parseInt(t/7),"name":res.data[2][t][0],"value":res.data[2][t][1]})
                                }
                                console.log("bubbledata",_this.bubbleData);
                             

                            })

                            
                             // 获取用户看过的电影信息
                            var path1="http://localhost:5000/UserWatched"
                            path1 +=`?UserIndex=${d.userId}`;
                            axios.get(path1)
                            .then(res=>{
                                
                                res.data=(res.data).split(" ")
                                res.data.shift()
                                // console.log("用户看过的电影id",res.data.length)
                                // console.log(_this.allMovieDetails.length);
                                _this.allHistoryM=[]
                                _this.tableMovie=[]
                                for(var i=0;i<res.data.length;i++){
                                    // console.log(parseInt(res.data[i]))
                                    // console.log(_this.allMovieDetails[parseInt(res.data[i])][1])
                                    _this.allHistoryM.push({date:_this.allMovieDetails[parseInt(res.data[i])][1],id:parseInt(res.data[i])})
                                    _this.tableMovie.push({date:_this.allMovieDetails[parseInt(res.data[i])][1],id:parseInt(res.data[i])})
                                }
                                // _this.tableMovie=_this.allHistoryM
                            })

                            _this.showWatch=true;
                            
                             // 发送用户id，接收到推荐电影均分，指标列表
                            _this.UserIndex=parseInt(d.userId)
                            

                    });
                
                            
                })  
            },

 // 给用户点添加环形图
 drawUserScore(data,trX,trY,svgId,clustName){

// console.log("Data",data)
data['columns']=["Month", "Other", "Wounds", "Disease"]
var innerRadius = 7
var outerRadius = 20

var x = d3.scaleBand()
    .domain(data.map(d => d.Month))
    .range([-0.5*Math.PI,  0.5*Math.PI])
    .align(0)

var y = d3.scaleRadial()
      .domain([0, d3.max(data, d => d.total)])
      .range([innerRadius, outerRadius])

var z = d3.scaleOrdinal()
    .domain(["Other", "Wounds", "Disease"])
    // .range(["#FF3700", "#DB004C", "#8CCBFF"])
    .range(["#98abc5", "#8a89a6", "#7b6888"])
    
var arc = d3.arc()
    .innerRadius(function(d){
        // console.log("上面的",y,d,d[0]);
        // console.log(y(d[0]));
        return y(d[0])
    })
    .outerRadius(d => y(d[1]))
    .startAngle(d => x(d.data.Month))
    .endAngle(d => x(d.data.Month) + x.bandwidth())
    .padRadius(innerRadius)




var xAxis = g => g
    .attr("text-anchor", "middle")
    .call(g => g.selectAll("g")
      .data(data)
      .join("g")
        .attr("transform", d => `
          rotate(${((x(d.Month) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
          translate(${innerRadius},0)
        `)
        .call(g => g.append("line")
            .attr("x2", -5)
            .attr("stroke", "#000"))
        .call(g => g.append("text")
            .attr("transform", d => (x(d.Month) + x.bandwidth() / 2 + Math.PI / 2) % (Math.PI) < 0.5*Math.PI
                ? "rotate(180)translate(30,3)"
                : "rotate(0)translate(-30,3)")
            .text(d => d.Month)))

var yAxis = g => g
    .attr("text-anchor", "middle")
    .call(g => g.selectAll("g")
      .data(y.ticks(5).slice(1))
      .join("g")
        .attr("fill", "none")
        .call(g => g.append("path")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.05)
            .attr("d", d3.arc()
              .innerRadius(y)
              .outerRadius(y)
              .startAngle(-0.5*Math.PI)
              .endAngle(0.5*Math.PI) ))

          .call(g => g.append("text")
            .attr("x", d => -y(d))
            .attr("dx", "0.35em")
            .attr("dy", "0.35em")
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .text(y.tickFormat())
         .clone(true)
            .attr("fill", "#000")
            .attr("stroke", "none"))
         .call(g => g.append("text")
            .attr("x", d => y(d))
            .attr("dx", "0.35em")
            .attr("dy", "-0.35em")
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .text(y.tickFormat())
         .clone(true)
            .attr("fill", "#000")
            .attr("stroke", "none"))
         )
        
var legend = g => g.append("g")
  .selectAll("g")
  .data(["Disease", "Wounds", "Other"])
  .join("g")
    .attr("transform", (d, i) => `translate(-20,${(i - (4 - 1) / 2) * 20-40})`)
    .call(g => g.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", z))
    .call(g => g.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .text(d => d))


const svg = d3.select("#userBarchart").style('visibility', 'hidden')
            
           
  svg.append("g")
      .attr("id",svgId)
      .attr("class","p"+clustName)
      .attr("width","20px")
      .attr("height","20px")
      .attr("transform", `translate(${trX},${22+trY})`)
    .selectAll("g")
    .data(d3.stack().keys([
    "Other",
    "Wounds",
    "Disease"
])(data))
    .join("g")
      .attr("fill", d => z(d.key))
    .selectAll("path")
    .data(function(d,i){
      // console.log("d",d)
      return d
    })
    .join("path")
    .attr("d", arc)
    
// console.log("arc",arc)
//   svg.append("g")
//       .call(xAxis);

//   svg.append("g")
//       .call(yAxis);

//   svg.append("g")
//       .call(legend);


 },

// 给所有的用户群添加透明度为0的阴影
        drawAllClustHull(data){
            // var colorArr=  ["#a6cee3", "#b15928", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a",  "#b2df8a", "#33a02c",'#38382e', '#10108b', '#35ccb1', '#0c729f','#061b28', '#5bc0f0','#460a7b', '#187a99','#ff99ff',"#00ff99","#8A8A8A","#ffff00","	#FFE1FF","	#EED8AE","	#B03060","#8B7D7B","#7CFC00","#6499ED",'#062d97', '#11b576', '#1658fa', '#936b23', '#07542d', '#48b7fa', '#0eedf0', '#7f2133', '#80ee65', '#160b04', ]

            for(var i=0;i<data.length;i++){
                var points=data[i]
                
                var line = d3.line()
                        .x(d => d[0])
                        .y(d => d[1])
                        .curve(d3.curveCatmullRomClosed);
                var hullResult = hull(points)
                var hullPath = line(hullResult)
                function hull(points) {
                // No sense in rendering a hull for fewer than two points
                // Comment by David -  Makes sense actually, if your client has such requirements for you
                if (points.length < 2)  return d3.polygonHull([points[0],points[0], ...points]);
                if (points.length < 3) return d3.polygonHull([points[0], ...points]);

                return d3.polygonHull(points);
                }
              
                
                function dragged(d) {
                    d3.select(this)
                        .attr("cx", d[0] = d3.event.x)
                        .attr("cy", d[1] = d3.event.y);
                    
                    path.attr("d", line(hull(svg.selectAll("circle").data())));
                }
                    
                const path = d3.select("#gCircle").append("path")
                    .attr("id","clustPath"+i)
                    .attr("fill", this.colorArr[i])
                    .attr("stroke", this.colorArr[i])
                    .attr("stroke-width", 16)
                    .attr("opacity", 0)
                    .attr("d", hullPath)
                    
            }

        },

        // 传递对比用户群的下标，调用barchart图,-->历史推荐模式
        compareGroupHistory(){
            this.barChartData=[]
            
           
            // 只有一个用户群
                    if(this.conveyGroupCompare.length==1){
                        this.G="用户群"
                        this.G1="G"+this.conveyGroupCompare[0]
                        this.G2=""
                        // 清除比较的外圈
                        d3.select('#drawPie').selectAll("g").remove()
                        var Aindex=parseInt(this.conveyGroupCompare[0])
                        for(var i=0;i<this.allFatureName.length;i++){
                                var tempGroupA=0
                                for(var j=0;j<this.allGroupAllGroup[Aindex].length;j++){
                                    if(this.allFatureName[i] == this.allGroupAllGroup[Aindex][j][0] ){
                                        tempGroupA=this.allGroupAllGroup[Aindex][j][1]
                                    }
                                }
                              
                                (this.barChartData).push({"month":this.allFatureName[i],"groupA": parseFloat(tempGroupA),"groupB": 0,"blank": 0})
                            }
                            (this.barChartData)["columns"]=[
                                    "month",
                                    "FRP_total",
                                    "groupA",
                                    "groupB",
                                    "blank"
                                ]
                        
                    }
                        
                    
            else{
                this.G="用户群"
                this.G1="G"+this.conveyGroupCompare[0]
                this.G2="G"+this.conveyGroupCompare[1]
                
                        var Aindex=parseInt(this.conveyGroupCompare[0])
                        var Bindex=parseInt(this.conveyGroupCompare[1])
                        for(var i=0;i<this.allFatureName.length;i++){
                                var tempGroupA=0
                                for(var j=0;j<this.allGroupAllGroup[Aindex].length;j++){
                                    if(this.allFatureName[i] == this.allGroupAllGroup[Aindex][j][0] ){
                                        tempGroupA=this.allGroupAllGroup[Aindex][j][1]
                                    }
                                }
                                var tempGroupB=0
                                for(var k=0;k<this.allGroupAllGroup[Bindex].length;k++){
                                    if(this.allFatureName[i] == this.allGroupAllGroup[Bindex][k][0] ){ 
                                        tempGroupB=this.allGroupAllGroup[Bindex][k][1]
                                    }
                                }
                                (this.barChartData).push({"month":this.allFatureName[i],"groupA": parseFloat(tempGroupA),"groupB": parseFloat(tempGroupB),"blank": 0})
                            }
                            (this.barChartData)["columns"]=[
                                    "month",
                                    "FRP_total",
                                    "groupA",
                                    "groupB",
                                    "blank"
                                ]
                    }
                        
            this.drawBarChart(this.barChartData)
        },

        // 画barChart图
        drawBarChart(barChartData){
            console.log("barChartData",barChartData)
            var _this=this
            // console.log("清除已有的对比图",barChartData);
            d3.select("#comPareSvg").remove()//清除已有的对比图
            var data=[]
            
            // 对数据再处理，当两个用户群中某个用户群的某个类型都接近0时，就把这些类型统称为其他，计为0
            // 对数据再处理，当两个用户群中某个用户群的某个类型分数大于阈值时，展示该类型
            for(var i=0;i<barChartData.length;i++){
                // if(barChartData[i].groupA!=0 && barChartData.groupB!=0){
                if(barChartData[i].groupA>0.004 || barChartData[i].groupB>0.004){
                    data.push(barChartData[i])
                }
            }
            console.log("data",data)
            data.push({"month":"Other","groupA": parseFloat(0.0001),"groupB": parseFloat(0.0001),"blank": 0})


            // 画外环相差图
            // 如果只有一个用户群，没有对比的话，不需要调用外环相差图
            // console.log("周元博啊",this.conveyGroupCompare,this.conveyGroupCompare.length)
            if(this.conveyGroupCompare.length!=1){
                this.drawOutPieSvg(data)
            }
            
            // // 画雷达图前三位
            this.drawRadar(data)

            
            var width = 1500 
            var height = 500
            var innerRadius = 170
            var outerRadius = 250
            var sliceArr=["groupA","groupB", "blank"]
            
         
            var arcDistance=[0,5,10]
            var arcCount=0
            var arc = d3.arc()
                .innerRadius(function(d,i,index){
                    // 还有最后一圈是多余的，
                    // console.log("下面的",y,d,d[0]);
                    // console.log(y(d[0]));
                    if(d[0]!=d[1]){
                        return y(d[0])+arcDistance[parseInt(arcCount/data.length)]
                    }
                    else{
                        return y(d[0])
                    }
                    
                })
                .outerRadius(function(d,i){
                    arcCount=arcCount+1
                    return y(d[1])
                })
                .startAngle(d => x(d.data.month))
                .endAngle(d => x(d.data.month) + x.bandwidth())
                .padAngle(0.03)
                .padRadius(innerRadius)

         

            var x = d3.scaleBand()
                .domain(data.map(d => d.month))
                .range([0, 2 * Math.PI])
                .align(0)
            var y = d3.scaleRadial()
                .domain([0, d3.max(data, d => (d.groupA+d.groupB) )])
                .range([innerRadius, outerRadius])


            
            var xAxis = g => g
                .attr("text-anchor", "middle")
                .call(g => g.selectAll("g")
                .data(data)
                .enter().append("g")
                    .attr("transform", d => `
                    rotate(${((x(d.month) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
                    translate(${innerRadius},0)
                    `)
                    .call(g => g.append("line")
                        .attr("x2", -5)
                        .attr("stroke", "lightsteelblue"))
                    .call(g => g.append("text")
                        .attr("transform", d => (x(d.month) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                            ? "rotate(90) translate(0,25)"
                            : "rotate(-90) translate(0,-9)")
                        .text(d => d.month)))


            var yAxis = g => g
                .attr("text-anchor", "end")
                .call(g => g.append("text")
                    .attr("x", -6)
                    .attr("y", d => -y(y.ticks(10).pop())) 
                    // .attr("dy", "-1em")
                    // .text("Total Acres Burned")
                    )
                .call(g => g.selectAll("g")
                .data(y.ticks(4)) // 等高圆圈的个数//6
                .join("g")
                    .attr("fill", "none")
                    .call(g => g.append("circle")
                        .attr("stroke", "lightsteelblue")
                        .attr("stroke-opacity", 0.5)
                        .attr("r", y))
                    .call(g => g.append("text")
                        .attr("x", -6)
                        .attr("y", d => -y(d))
                        .attr("dy", "0.35em")
                        .attr("stroke", "#fff")
                        .attr("stroke-width", 5)
                        // .text(y.tickFormat(5, "s"))//刻度的数值变换
                        .text(function(d,i){
                            return d;
                        })
                    .clone(true)
                        .attr("fill", "lightsteelblue")
                        .attr("stroke", "none")))


            var colorFeature=  ["#a6cee3", "#b15928", "#fb9a99",  "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a",  "#b2df8a", "#33a02c",'#38382e', '#10108b', '#35ccb1', '#0c729f','#061b28', '#5bc0f0','#460a7b', '#187a99','#ff99ff',"#00ff99","#8A8A8A","#ffff00","	#FFE1FF","	#EED8AE","	#B03060","#8B7D7B","#7CFC00","#6499ED",'#062d97', '#11b576', '#1658fa', '#936b23', '#07542d', '#48b7fa', '#0eedf0', '#7f2133', '#80ee65', '#160b04', ]

            var numberOrder=-1
             var tooltip = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);


            const svg = d3.select("#compareBar").attr('transform', `translate(${40},${-280})`)
                .append("svg")
                .attr("id","comPareSvg")
                .attr("viewBox", `${-300} ${-180} ${600} ${400}`)
                .style("width", 350)
                .style("height", 350)
                
                .style("font", "24px JamesonBold");
                
            svg.append("g")
                .selectAll("g")
                
                .data( d3.stack().keys(sliceArr)(data) )
                .join("g")
                .attr("id","fillPath")
                // .attr("fill", "fill", d => z(d.key))
                .selectAll("path")
                .data(d => d)
                .join("path")
                .attr("id",function(d,i,k){
                    // console.log(i,this)
                    // console.log(numberOrder)
                    
                    if(i==0){
                        numberOrder=numberOrder+1
                    }
                    return "clust"+numberOrder+"_"+i;
                })
                .attr("d", arc)
                .attr("pp",function(){
                    console.log("打印",arc)
                })
                .attr("fill",function(d,i){
                    return colorFeature[i]
                })
                .on("click",function(d,i){
                    console.log("点击了",d,i,this)
                    d3.select(this)
                        .attr("stroke", "blue")
                        .attr("stroke-width",3)
                })
                .on('mouseover', function (d,i,k) {
                    // console.log("d,i,k",d,i[1]-i[0],k)
                    var temptext="G"+_this.conveyGroupCompare[ parseInt((((d3.select(this).attr("id")).split("_"))[0]).replace("clust","")) ]
                    // console.log("temptext",temptext)
                    
                            this.style.cursor="pointer";
                            
                            tooltip.transition()
                                .duration(1000)
                                .style("opacity", 1)
                                .style('border-radius', '4px')
                                .style('position', 'absolute')
                                .style('z-index', '10')
                                .style('visibility', 'visible')
                                .style('padding', '10px')
                                .style('background', 'rgba(0,0,0,0.6)')
                                .style('border-radius', '4px')
                                .style('color', '#fff')
                                ;
                                
                            tooltip.html("用户群："+temptext+"<br>"+"特征分数："+(i[1]-i[0]).toFixed(4) )
                                .style("left", d.pageX+30 + "px")
                                .style("top",d.pageY-30+ "px")
                        
                            
                            })
                        
                        // Setting things back to normal after tool tip
                        .on('mouseout', function (d, i) {
                            d3.select(this)
                            .attr("stroke-width",1)

                            tooltip.transition()
                                .style('visibility', 'visible')
                                .style("opacity", 0)
                            }) 
                        


            svg.append("g")
                .call(xAxis);

            svg.append("g")
                .call(yAxis);

                

        },

        // 寻找一维数组的前三个最大值的下标
        findArrMax3(GroupIndex){
            // 第一大
            var max1=Math.max(...GroupIndex);
            var index1 = GroupIndex.map(item => item).indexOf(max1);
            GroupIndex[index1]=0
            // 第二大
            var max2=Math.max(...GroupIndex);
            var index2 = GroupIndex.map(item => item).indexOf(max2);
            GroupIndex[index2]=0
            // 第一大
            var max3=Math.max(...GroupIndex);
            var index3 = GroupIndex.map(item => item).indexOf(max3);
            GroupIndex[index3]=0
            // console.log("输出",index1,index2,index3)
            return [index1,index2,index3];

        },
 
         // 两个用户群的前三位雷达图
        drawRadar(conveyData){
            // console.log("执行雷达图",this.conveyGroupCompare)
            // 判断是否是一个用户群
            this.thirdName=[]
            var GroupAIndex=[]
            var GroupBIndex=[]
            var groupData=[[],[]]
            if(this.conveyGroupCompare.length==1){
                // 取用户群GroupA的前三位的下标
                    for(var i=0;i<conveyData.length;i++){
                        GroupAIndex.push(conveyData[i].groupA)
                    }
                    var MaxA=this.findArrMax3(GroupAIndex);

                    const arr1 = new Array(GroupAIndex.length).fill(0.001)
                    arr1[MaxA[0]]=1;(this.thirdName).push(conveyData[MaxA[0]].month)
                    arr1[MaxA[1]]=0.8;(this.thirdName).push(conveyData[MaxA[1]].month)
                    arr1[MaxA[2]]=0.6;(this.thirdName).push(conveyData[MaxA[2]].month)
                    
                    for(var j=0;j<conveyData.length;j++){
                        groupData[0].push({ "axis": j,"value":arr1[j] })
                    }
            }
            // 多个用户群
           else{
                    // 取用户群GroupA的前三位的下标
                    for(var i=0;i<conveyData.length;i++){
                        GroupAIndex.push(conveyData[i].groupA)
                        GroupBIndex.push(conveyData[i].groupB)
                    }
                    // 寻找一维数组的前三个最大值的下标
                    // console.log("GroupAIndex",GroupAIndex);
                    // console.log("GroupBIndex",GroupBIndex);
                    var MaxA=this.findArrMax3(GroupAIndex);
                    var MaxB=this.findArrMax3(GroupBIndex);

                    const arr1 = new Array(GroupAIndex.length).fill(0.001)
                    arr1[MaxA[0]]=1;(this.thirdName).push(conveyData[MaxA[0]].month)
                    arr1[MaxA[1]]=0.8;(this.thirdName).push(conveyData[MaxA[1]].month)
                    arr1[MaxA[2]]=0.6;(this.thirdName).push(conveyData[MaxA[2]].month)
                    const arr2 = new Array(GroupBIndex.length).fill(0.001)
                    arr2[MaxB[0]]=1;(this.thirdName).push(conveyData[MaxB[0]].month)
                    arr2[MaxB[1]]=0.8;(this.thirdName).push(conveyData[MaxB[1]].month)
                    arr2[MaxB[2]]=0.6;(this.thirdName).push(conveyData[MaxB[2]].month)
                    // console.log("A最大的下标",typeof(MaxA),MaxA)
                    // console.log("B最大的下标",typeof(MaxB),MaxB)
                    // 赋值
                    
                    for(var j=0;j<conveyData.length;j++){
                        groupData[0].push({ "axis": j,"value":arr1[j] })
                        groupData[1].push({ "axis": j,"value":arr2[j] })
                    }

           }
                    console.log("周元博",this.thirdName);
                    // 传递用户群的关注特征
                    pubsub.publish('thirdName',this.thirdName)
                    var data=groupData
                    // var data=conveyData
                        var width=110
                        var height=110
                        var margin={top:0, bottom:0, left:0, right:0}
                        // console.log(data)
                        const svg = d3.select('#radarGroupSvg').attr('transform', `translate(${140},${-500})rotate(${(360/conveyData.length)/2},0,0)`)
                        d3.select("#radarGroupSvg").select("g").remove()
                        d3.select("#radarGroupSvg").select("defs").remove()
                        // const svg = d3.select('#radarGroupSvg').attr('transform', `translate(${100},${-260})`)
                            .attr('height', height)
                            .attr('width', width)
                            // .attr('transform', 'rotate(0,100,100)')
                            .style('font-family', 'sans-serif')
                            .style('font-size', 12)
                        
                        const config = {
                            maxValue: 0.5, //What is the value that the biggest circle will represent
                            levels: 0, //How many levels or inner circles should there be drawn
                            roundStrokes: true, //If true the area and stroke will follow a round path (cardinal-closed
                            strokeWidth: 3, //The width of the stroke around each blob
                            opacityCircles: 0.19, //The opacity of the circles of each blob
                            labelFactor: 1.15, //How much farther than the radius of the outer circle should the labels be placed
                            wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
                            opacityArea: 0.10, //The opacity of the area of the blob
                            dotRadius:10  //The size of the colored circles of each blog
                        }
                        
                          const c = d3.scaleOrdinal()
                                    // .range(['#EDC951', '#CC333F', '#00A0B0'])
                                    .range([this.colorArr[this.conveyGroupCompare[0]], this.colorArr[this.conveyGroupCompare[1]], '#00A0B0'])
                            
            
                        
                        //If supplied maxValue is smaller than the actual one, replace by the max in the data
                        const maxValue = Math.max(
                            config.maxValue,
                            d3.max(data, i => d3.max(i.map(o => o.value)))
                        )
                        
                        const allAxis = data[0].map((i,j) => i.axis), //Names of each axis
                                total = allAxis.length, // number of different axis
                                radius = Math.min(width / 2 - margin.left / 2 - margin.right / 2, height / 2 - margin.top / 2 - margin.bottom / 2), // radius of the outermost circle 
                                format = d3.format('~%'), // percentage formatting
                                angleSlice = ((Math.PI) * 2) / (total) // width in radians of each slice

                        const r = d3.scaleLinear()
                            .domain([0, maxValue])
                            .range([0, radius])
                        
                        const g = svg.append('g')
                            // .attr('transform', `translate(${width / 2-2},${height / 2+3})`)
                            .attr('transform', `translate(${width / 2-2},${height / 2+3})`)
                        
                        //// Draw the Circular grid
                        const axisGrid = g.append('g')
                            .attr('class', 'axisWrapper')
                        
                        //Draw background circles
                        axisGrid.selectAll('.levels')
                            .data(d3.range(1, config.levels + 1).reverse())
                            .join('circle')
                            .attr('class', 'gridCircle')
                            .attr('r', (d,i) => (radius / config.levels) * d)
                            .style('fill', 'none')
                            .style('stroke', '#CDCDCD')
                            .style('fill-opacity', config.opacityCircles)
                        
                     
                        
                        // Draw radar chart blobs
                        const radarLine = d3.lineRadial()
                            .curve(d3.curveLinearClosed)
                            .radius(d => r(d.value))
                            .angle(function(d,i){
                                // console.log("角度",d,i * angleSlice);
                                    return i * angleSlice;
                                
                                
                            })
                        
                        if(config.roundStrokes){
                            radarLine.curve(d3.curveCatmullRomClosed.alpha(1))
                        }


                        // inner glow effect
                        const inverseArea = d3.areaRadial()
                            .curve(d3.curveCatmullRomClosed.alpha(1))
                            .innerRadius(d => r(d.value))
                            .outerRadius(0)
                            .angle((d,i) => i * angleSlice)
                        
                        const defs = svg.append("defs")

                        const filter = defs.append("filter")
                            .attr("id", 'blur2')
                        
                        filter.append("feGaussianBlur")
                            .attr("stdDeviation", 15)
                            .attr("result","blur2")
                        
                        const feMerge = filter.append("feMerge")
                            feMerge.append("feMergeNode").attr("in","blur")
                            feMerge.append("feMergeNode").attr("in","SourceGraphic")

                        defs
                            .selectAll('clipPath')
                            .data(data)
                            .join('clipPath')
                            .attr('id',  (d,i) => 'clipPath-' + i)
                            .append("path")
                            .attr("d", d => inverseArea(d))
                        // ---
                        
                        const blobWrapper = g.selectAll('.radarWrapper2')
                            .data(data)
                            .join('g')
                            .attr('class', 'radarWrapper2')
                        
                        //Append backgrounds
                        blobWrapper.append('path')
                            .attr('class', 'radarArea2')
                            .attr('d', d => radarLine(d))
                            .attr('fill', (d,i) => c(i))
                            .style('fill-opacity', config.opacityArea)
                            .on('mouseover', function(d) {
                            //Dim all blobs
                            d3.selectAll('.radarArea2')
                                .transition()
                                .duration(200)
                                .style('fill-opacity', Math.min(0.1, config.opacityArea))
                            //Bring back the hovered over blob
                            d3.select(this)
                                .transition()
                                .duration(200)
                                .style('fill-opacity', Math.max(0.9, config.opacityArea))
                            })
                            .on('mouseout', () => {
                            //Bring back all blobs
                            d3.selectAll('.radarArea2')
                                .transition()
                                .duration(200)
                                .style('fill-opacity', config.opacityArea)
                            })
                        
                        //Create outlines
                        blobWrapper.append('path')
                            .attr('class', 'radarStroke')
                            .attr('d', function(d){
                                // console.log("哈哈",d,radarLine(d));
                                return radarLine(d)
                            })
                            .style('stroke-width', config.strokeWidth + 'px')
                            .style('stroke',(d,i) => c(i))
                            .style('fill', 'none')
                            .attr("filter", 'url(#blur2)')
                            .attr("clip-path", (d,i) => 'url(#clipPath-'+ i +')')
                        
                        //Append dots
                        blobWrapper.selectAll('.radarCircle')
                            .data(d => d)
                            .join('circle')
                            .attr('class', 'radarCircle')
                            .attr('r', function(d,i,k){
                                console.log(d.value*config.dotRadius/2)
                                return d.value*config.dotRadius/2
                            })
                            .attr('cx', (d,i) => r(d.value) * Math.cos(angleSlice * i - Math.PI / 2) )
                            .attr('cy', (d,i) => r(d.value) * Math.sin(angleSlice * i - Math.PI / 2) )
                            .style('fill', function(d,i){
                                return "#737373";
                            })
                            .style('fill-opacity', 0.8)
                        
                        //// Append invisible circles for tooltip
                        const blobCircleWrapper = g.selectAll('.radarCircleWrapper')
                            .data(data)
                            .join('g')
                            .attr('class', 'radarCircleWrapper')
                        
                        //Append a set of invisible circles on top for the mouseover pop-up
                        var tempCircleRadar=0
                        blobCircleWrapper.selectAll('.radarInvisibleCircle')
                            .data(d => d)
                            .join('circle')
                            .attr('class', 'radarInvisibleCircle')
                            .attr('r', function(d,i,k){
                                console.log(d.value*config.dotRadius/2)
                                return d.value*config.dotRadius/2
                            })
                            .attr('cx', (d,i) => r(d.value) * Math.cos(angleSlice * i - Math.PI / 2) )
                            .attr('cy', (d,i) => r(d.value) * Math.sin(angleSlice * i - Math.PI / 2) )
                            .style('fill',function(d,i){
                                // console.log("节点的颜色",i,parseInt(tempCircleRadar/conveyData.length),c(parseInt(tempCircleRadar/conveyData.length)) )
                                tempCircleRadar=tempCircleRadar+1
                                return c(parseInt(tempCircleRadar/conveyData.length));
                            })
                            .style('pointer-events', 'all')
                            .on('mouseover', function(event,d,i){
                                if(d.axis!=conveyData.length-1){
                                    this.style.cursor="pointer";
                                    var newX = parseFloat(d3.select(this).attr('cx')) - 10
                                    var newY = parseFloat(d3.select(this).attr('cy')) - 10
                                    
                                    tooltip
                                    .attr('x', newX)
                                    .attr('y', newY+30)
                                    .attr('transform', `rotate(${(-360/conveyData.length)/2},0,0)`)
                                    .text(conveyData[d.axis].month)
                                    .style("font-size", "13px")
                                    .transition()
                                    .duration(200)
                                    .style('opacity', 1)
                                    // console.log("节点的提示",d);
                                }
                                
                                })
                            .on('mouseout', () => {
                                tooltip
                                .transition()
                                .duration(200)
                                .style('opacity', 0)
                                })
                        
                        const tooltip = g.append('text')
                            .attr('class', 'tooltip')
                            .style('opacity', 0)

        },
       

       // 画外面环形的相差图 
        drawOutPieSvg(data){
            // console.log("先执行外面环形",data)
            var newData=[]
            for(var i=0;i<data.length;i++){
                var max=data[i].groupA>data[i].groupB?data[i].groupA:data[i].groupB
                var reduce=data[i].groupA>data[i].groupB?data[i].groupA-data[i].groupB:data[i].groupB-data[i].groupA
                
                // console.log("得到的",i,max,reduce);
                // 如果大的值够大，才会画出差值
                if(max>0.04){
                    // 如果内圈的groupA大，那么线条先画A、差值，再画none
                    if(data[i].groupA>data[i].groupB){
                        newData.push({"id":i, name: "groupA", value: (reduce/max).toFixed(3)})
                        newData.push({"id":"other", name: "groupB", value: (1-reduce/max).toFixed(3)})
                    }
                    // 否则，先画none，再画差值
                    else{
                        newData.push({"id":"other", name: "groupA", value: (1-reduce/max).toFixed(3)})
                        newData.push({"id":i, name: "groupB", value: (reduce/max).toFixed(3)})
                    }
                    
                }
                // 否则都不画出来
                else{
                    newData.push({"id":"other", name: i, value: 1})
                }
                
            }
            // var sizes = {height: 400, width: 400}
            var sizes = {height: 300, width: 330}
            var data = [{"id":0,name: 'Apples', value: 0.3},{"id":"other",name: 'Apples', value:0.13}, {"id":1,name: 'Bananas', value: 0.56}, {"id":2,name: 'Oranges', value: 0.12}]
            // console.log("newData",newData);
            // console.log("data",data);
            data=newData;
            // 清除已有的差值图
            d3.select('#drawPie').selectAll("g").remove()
            const svg = d3.select('#drawPie').attr('height', sizes.height).attr('width', sizes.width).attr('transform', `translate(${30}, ${15})`)
            const container = svg.append('g').attr('transform', `translate(${160}, ${145})`)
            const colors = d3.scaleOrdinal()
                .domain(data.map(d => d.name))
                .range(d3.schemeCategory10)
            
            // pie不排序
            const pie = d3.pie().sort(null)
            const pieData = pie.value(d=> d.value)(data)
            // console.log("pieData",pieData);
            
            const segments = d3.arc()
                .innerRadius(135)
                .outerRadius(144)
                .padAngle(.01)
                .padRadius(10)
                .cornerRadius(4)

            let sections = container.selectAll('path').data(pieData, d => d.data.name)
            // console.log("sections",sections);
            sections.exit().remove()
            const sectionsEnter = sections.enter().append('path')
            .attr("class",function(d,i){
                // console.log("这里的值",d.data.name,i);
                return d.data.name;
            })
            .attr("d", segments)
            .attr('fill', function(d,i){
                // return colors(d.data.name)
                if(d.data.id=="other"){
                    d3.select(this).attr("fill-opacity",0.4)
                    return "grey"
                    
                }
                else{
                    // return "steelblue"
                    d3.select(this).attr("fill-opacity",0.6)
                    return "red"
                }
            })
            .attr("display",function(d,i){
                // console.log(d.data);
                // if(d.data.id=="other"){
                //     return "none"
                // }
                // else{
                //     return "block"
                // }
                return "block"
                
            })
            sections = sectionsEnter.merge(sections)

            sections
                    .on('mouseover', function(d,i) {
                        // console.log(d,i);
                        // console.log(this);
                        d3.select(this).transition().duration(500).attr('transform', 'scale(1.05)')
                    })
                    .on('mouseout', function() {
                        d3.select(this).transition().duration(500).attr('transform', 'scale(1)')
                    })

            },
    
    
        // 推荐模式的解释图模式提取
        compareGroupExplain(){
            // 清除评估结果图
            d3.select("#measureSvg").selectAll("g").remove()
            // 传送给Right.vue
            pubsub.publish('CenterGroups',this.conveyGroupCompare)

        },
       
       // 用于生成不重复的二维数组
        generateArray(rows, cols) {
        // 创建一个空数组
        const arr = [];

        // 填充数组
        for (let i = 0; i < rows; i++) {
            // 创建一个空数组用于存储该行的数据
            const row = [];

            for (let j = 0; j < cols; j++) {
            let num;

            // 生成一个不重复的随机数
            if(j==0){
                do {
                    num = Math.floor(30+Math.random() * 320);
                } while (row.includes(num) || arr.some(row => row.includes(num)));

            }
            if(j==1){
                do {
                    num = Math.floor(30+Math.random() * 110);
                } while (row.includes(num) || arr.some(row => row.includes(num)));

            }
            // do {
            //     num = Math.floor(50+Math.random() * 300);
            // } while (row.includes(num) || arr.some(row => row.includes(num)));

            // 将随机数添加到该行中
            row.push(num);
            }

            // 将该行添加到数组中
            arr.push(row);
        }

        // 将每个数组间隔50
        //   arr.forEach((row, i) => {
        //     row.forEach((num, j) => {
        //       arr[i][j] = num + i * 50;
        //     });
        //   });

        return arr;
        },



    //    用户的历史观影气泡图
    drawBubble(index,label){
        var _this=this
        var data=this.bubbleData[index]
            var pack = data => d3.pack()
                .size([width - 2, height - 2])
                .padding(3)
            (d3.hierarchy({children: data})
            .sum(d => d.level + 1))

            var width=400
            var height=400
            var format = d3.format(",d")
            var color = d3.scaleOrdinal().domain(d3.extent(data.map(d => d.level))).range(['#decbe4', '#b3cde3', '#ccebc5'])
            var drawHexagon = d3.line()
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; })
                    .curve(d3.curveCardinalClosed.tension(0.5));



            // console.log("和",data)
            const root = pack(data);
            // console.log("望",root)
            // console.log(root.leaves())
            d3.select("#bubbleSvg").selectAll("g").remove()
            const svg = d3.select("#bubbleSvg")
                .attr("font-size", 10)
                .attr("font-family", "sans-serif")
                .attr("text-anchor", "middle");



            var posi=[[50,50],[100,100],[150,150]]
            // 生成一个 4 行 5 列的数组
            posi = this.generateArray(20, 2);
            // console.log("myArray",posi);


            const leaf = svg.selectAll("g")
                .data(root.leaves())
                .join("g")
                .attr("transform", function(d,i) {
                    // return `translate(${d.x + 1},${d.y + 1})`
                    return `translate(${posi[i][0]},${posi[i][1]})`
                });
            
            leaf.append("path")
                .attr("d", function(d)  {
                    const h = (Math.sqrt(3)/2);
                    // 如果是类型的话，需要修改类型大小
                    var radius=0;
                    // console.log("index",index,radius,index==2)
                    if(index==2){
                        radius = d.data.value<0.01?15:15+d.data.value*200;
                    }
                    else{
                        radius = d.data.value<0.01?15:15+d.data.value*1200;
                    }
                    // console.log("radius",radius);
                    var xp = 0;
                    var yp = 0;
                    var hexagonData = [
                    { "x": radius+xp, "y": yp}, 
                    //   { "x": radius/2+xp, "y": radius*h+yp},
                    //   { "x": -radius/2+xp, "y": radius*h+yp},
                    { "x": -radius+xp, "y": yp},
                    { "x": -radius/2+xp, "y": -radius*h+yp},
                    { "x": radius/2+xp, "y": -radius*h+yp}
                    
                    ];
                    // console.log("倍率",d.data.value,radius)
                return drawHexagon(hexagonData);
                })
                .attr("id", d => (d.leafUid = d.data.value))
                .attr("fill", d => color(d.data.level))
                .attr("stroke", d => color(d.data.level))
                .attr("fill-opacity",0.7)
                .style("cursor","pointer")
                .on("click",function(i,d,k){
                    // console.log("点击了",d.data,d.data.name)
                    _this.newHistoryM=[]
                    for(var i=0;i<_this.allHistoryM.length;i++){
                        // console.log("详细信息",_this.allMovieDetails[_this.allHistoryM[i].id])
                        if(_this.allMovieDetails[_this.allHistoryM[i].id][label].includes(d.data.name)){
                            _this.newHistoryM.push(_this.allHistoryM[i])
                        }
                    }
                    _this.tableMovie=_this.newHistoryM
                    console.log("新电影",_this.newHistoryM,_this.tableMovie)
                    
                    // for()
                })

                
                


            // leaf.append("clipPath")
            //     .attr("id", d => (d.clipUid = d.data.value))
            //     .append("use")
            //     .attr("xlink:href", d => d.leafUid.href);

            leaf.append("text")
                .attr("clip-path", d => d.clipUid)
                .attr("dy",-5)
                .text(function(d,i){
                    return d.data.name
                })
                  
                
            
            leaf.append("title")
                .text(d => d.data.value);

    },


    // 点击电影详细信息
    onemovieClick(row,column,event,cell){
        console.log("点击电影",row.id,this.allMovieDetails[row.id])
        var movieInfo=this.allMovieDetails[row.id]
        this.itemName=movieInfo[1]
        this.items=movieInfo.slice(2,7)
        this.items.push(movieInfo[8])
        console.log("000",this.itemsName)
        console.log("评分",movieInfo[8])
        document.getElementById("picShow").src=movieInfo[11];
        this.showMovie=true;
    },
// 点击不同的相关性分数按钮
    changingOver1(k,i){
        this.drawBubble(0,2)
    },
    changingOver2(k,i){
        this.drawBubble(1,3)
    },
    changingOver3(k,i){
        this.drawBubble(2,4)
    },
    // 列表中返回所有电影数据
    changingtableMovie(){
        this.tableMovie=this.allHistoryM
    },
  },

  mounted(){
            // 获取电影详细信息
            var path="http://localhost:5000/MovieInfo"
            axios.get(path)
            .then(res=>{
                // console.log("电影初始",res.data)
                res.data=(res.data).replaceAll("[","").replaceAll("]","")
                res.data=(res.data).split(", ")
                for(var i=0;i<res.data.length;i++){
                    // res.data[i]=res.data[i].slice(0,res.data.length-2)
                    res.data[i]=(res.data[i]).replaceAll("'","")
                    res.data[i]=res.data[i].split(",")
                    
                }
                
                this.allMovieDetails=res.data
                pubsub.publish('allMovieDetails',this.allMovieDetails)
            })

            this.funCircle()
            pubsub.subscribe('allGroupAllGroup',(msgName,data)=>{
                this.allGroupAllGroup=data
               
 


            })

            
            pubsub.subscribe('conveyGroupCompare',(msgName,data)=>{
                this.conveyGroupCompare=data
                // console.log("Center中得到对比的用户群",data)

            })
            // this.drawOutPieSvg([])
           
           
           


            
  },
  watch:{
            filterButton:{
              handler(newVal,oldVal){
                var _this=this
                //   console.log("当前的过滤值",newVal[0],newVal[1],newVal[2]);
                  d3.select("#userBarchart").selectAll(".p"+_this.selectedClust)
                        .attr("i",function(d,i,k){
                            var temp=_this.userInfoScore[parseInt(this.id.replace("b",""))]
                            // console.log("夜曲",temp.userId,temp["director"],temp["actor"],temp["genre"]);
                            if(temp["director"]>newVal[0][0] && temp["actor"]>newVal[1][0] && temp["genre"]>newVal[2][0] ){
                                // console.log("没错吧",".index"+temp.userId)

                                d3.select(this).style('visibility', 'visible')
                                d3.select("#gCircle").selectAll(".index"+temp.userId).style('visibility', 'visible')
                            }
                            else{
                                // console.log("需要隐藏",".index"+temp.userId)

                                d3.select(this).style('visibility', 'hidden')
                                d3.select("#gCircle").selectAll(".index"+temp.userId).style('visibility', 'hidden')
                                d3.select("#gCircle").selectAll("#c2441").style('visibility', 'hidden')
                            }
                        })
                            

              },
            //   immediate:true,
              deep:true,
            },

            selectedClust:{
              handler(newVal,oldVal){
                this.oldSelectedClust=oldVal
                  console.log("当前的用户群",newVal);
              },
              immediate:true,
              deep:true,
            },

            bubbleData:{
                handler(newVal,oldVal){
                //   console.log("当前观影相关性分数",newVal);
                //   this.drawBubble()
              },
              immediate:true,
              deep:true,
            },

            tableMovie:{
                 handler(newVal,oldVal){
                //   console.log("当前观影相关性分数",newVal);
                // console.log("watch看过的全部电影",this.tableMovie)
              },
            //   immediate:true,
              deep:true,
            }
  }
}
</script>
<style>
 

</style>

<style scoped>
.filter{
    margin-left: 3%;
    width:15%;
    height:1%;
    float:left;
}
/* 控制滑块的默认颜色 */
::v-deep .el-slider__bar{
        background-color: #54759e;
        
    }
/* ::v-deep .el-slider{
    height:15px;
} */
::v-deep .el-slider__button{
    border: 2px solid #54759e;
    width:6px;
    height:6px;
}
.userEmbedding{
    border:1px solid #54759e;
    /* margin-top: 0px; */
    /* left: 1%; */
    width:100%;
    height:55%;
    float:left;
}
.clustCompare{
    border-top:1px solid #54759e;
    width:100%;
    height:42%;
    float:left;
}

.leftGraph{
    width:49%;
    height:100%;
    float:left;
    border-top:1px solid #54759e;
}
.rightGraph{
    width:50.5%;
    height:100%;
    float:left;
    border-top:1px solid #54759e;
    border-left:1px solid #54759e;
}
/* 两个按钮，放大和框选 */
::v-deep .search1 {
  float:left;
  margin-left: 68%;
  margin-top:-30px;
  width:30px;
  height: 30px;
  background: url('css/expand.png') center no-repeat;			
  font-size: 12px;
  background-size: cover;
  cursor: pointer;
}

::v-deep .search1:before {
  content: "搜";
  font-size: 12px;
  visibility: hidden;
}

::v-deep .search2 {
  float:left;
  margin-left: 63%;
  margin-top:-30px;
  width:30px;
  height: 30px;
  background: url('css/chart.png') center no-repeat;			
  font-size: 12px;
  background-size: cover;
  cursor: pointer;
}

::v-deep .search2:before {
  content: "搜";
  font-size: 12px;
  visibility: hidden;
}

::v-deep .search3 {
  float:left;
  margin-left: 58%;
  margin-top:-30px;
  width:30px;
  height: 30px;
  background: url('css/home.png') center no-repeat;			
  font-size: 12px;
  background-size: cover;
  cursor: pointer;
}

::v-deep .search3:before {
  content: "搜";
  font-size: 12px;
  visibility: hidden;
}

.compareGroupExplain{
  float:left;
  margin-left: 90%;
  margin-top:-40px;
  width:60px;
  height: 60px;
  background: url('css/network.png') center no-repeat;		
  background-size: cover;
  cursor: pointer;
}
::v-deep .compareGroupExplain:before {
  content: "搜";
  font-size: 12px;
  visibility: hidden;
}


/* 用户群特征对比 */
.compareGroupHistory{
  width:150px;
  color: #54759e;
  cursor: pointer;
}
::v-deep .compareGroupHistory{
  float:left;
  width:40px;
  height:40px;
  background: url('css/radar.png') center no-repeat;			
  /* font-size: 12px; */
  background-size: cover;
}
::v-deep .compareGroupHistory:before{
  content: "雷达图";
  visibility: hidden;
}
.compareGroupHistoryText{
  width:150px;
  margin-left: 50px;
  margin-top: -30px;
}


/* 面包屑 */
.breadFooter{
    margin-left: 180px;
    margin-top:-27px;
    width:180px;
    float: left;
}
/* .compareGroupExplain{
  background: #909399;
  width:100%;
  float:left;
} */

/* 相关性分数按钮——导演 */
.compareGroupExplain1{
  width:80%;
  color: #54759e;
  cursor: pointer;
}
::v-deep .compareGroupExplain1 {
  float:left;
  width:40px;
  height:40px;
  background: url('css/director.png') center no-repeat;			
  /* font-size: 12px; */
  background-size: cover;
}
::v-deep .compareGroupExplain1:before {
  content: "相关性按钮";
  visibility: hidden;
}
.compareGroupExplainText1{
  margin-left: 50px;
  margin-top: -50px;
}
/* 相关性分数按钮——演员 */
.compareGroupExplain2{
  width:80%;
  color: #54759e;
  cursor: pointer;
}
::v-deep .compareGroupExplain2 {
  margin-left: 90px;
  float:left;
  width:40px;
  height:35px;
  background: url('css/actor.png') center no-repeat;			
  /* font-size: 12px; */
  background-size: cover;
}
::v-deep .compareGroupExplain2:before {
  content: "相关性按钮";
  visibility: hidden;
}
.compareGroupExplainText2{
  margin-left: 50px;
  margin-top: -50px;
}
/* 相关性分数按钮——类型 */
.compareGroupExplain3{
  width:80%;
  color: #54759e;
  cursor: pointer;
}
::v-deep .compareGroupExplain3 {
  margin-left: 70px;
  float:left;
  width:30px;
  height:35px;
  background: url('css/genre.png') center no-repeat;			
  /* font-size: 12px; */
  background-size: cover;
}
::v-deep .compareGroupExplain3:before {
  content: "相关性按钮";
  visibility: hidden;
}
.compareGroupExplainText3{
  margin-left: 40px;
  margin-top: -50px;
}
.drawBubble{
    border-bottom:1.5px solid #54759e;
}
.watchedMovie{
    border:1px solid #54759e;
}
.broom{
  color: #54759e;
  cursor: pointer;
  transform: translate(115px,-170px);
}
::v-deep .broom {
  float:left;
  position: absolute;
  width:20px;
  height:25px;
  background: url('css/broom.png') center no-repeat;			
  /* font-size: 12px; */
  background-size: cover;
}
::v-deep .broom:before {
  content: "相关性按钮";
  visibility: hidden;
}
::v-deep .el-input--suffix .el-input__inner {
    height: 30px;
    border: 2px solid #54759e;
}
::v-deep .el-input__suffix {
    height: 120%;
}
::v-deep .el-select .el-input.is-focus .el-input__inner {
    border-color: #54759e;
}
::v-deep .el-select .el-input__inner:focus {
    border-color: #54759e;
}

::v-deep .el-select-dropdown__item.selected {
    color: #54759e;
    border:1px solid #54759e;
    border-radius: 40px 40px 40px 40px;
}
::v-deep el-select-dropdown__item {
    /* font-size: 102px; */
    color:grey;
}
.MovieDeatils{
    border-top:1px solid #54759e;
}
.pic{
    float:left;
}
.picInfo{
    /* margin-left:-35px; */
    margin-left:-5px;
    margin-top:-30px;
    width:175px;
    float:left;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    height:176.5px;
}
p {
    margin-left:-20px;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
    cursor: pointer;
    }

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

