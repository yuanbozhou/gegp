<template>
  <div class="center">
    Embedding Results


    <!-- 用户散点 --> 
    <div class="userEmbedding">
       <div class="search1" @click="enLarge()"></div>
        <div class="search2" @click="enSearch()"></div>
      <svg id="userChoose" width="300" height="430"></svg>
    </div>
    
    <div class="clustCompare">
        <!-- 比较 -->
        <div class="compareGroupHistory" style="width: 50%">
            <el-button type="info" class="compareGroupHistory" @click="compareGroupHistory()">历史偏好模式</el-button>
        </div>
        <div class="compareGroupExplain" style="width: 50%">
            <el-button type="info" class="compareGroupExplain" @click="compareGroupExplain()">推荐解释模式</el-button>
        </div>

        <!-- 内圈外圈导航栏 -->
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{G}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{G1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{G2}}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="leftGraph">
              <!-- 环形图 -->
                <svg id="drawPie" width="400" height="400"></svg>
                <!-- 条形图 -->
                <svg id="compareBar" width="300" height="300"></svg>
                <!-- 雷达图 -->
                <svg id="radarGroupSvg" width="110" height="110"></svg> 
        </div>
      
       
       
      
        
    </div>
    
  </div>
</template>

<script>

import * as d3 from 'd3';//引入d3v7版本
import axios from "axios"
import pubsub from 'pubsub-js'

export default {
  name: 'Center',
  props: {
  },
  data(){
    return {
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
        // 记录当前用户群的各自前三位排名
        thirdName:[],
        // 内圈外圈导航栏
        G:"",
        G1:"",
        G2:"",
          
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
                                // .style("opacity", 0.4)
                                .style("visibility","visible")
                    // 缩放当前类的扩放
                    
                    
                    if(this.selectedClust!=""){
                        //console.log("当前要缩放的类是",this.selectedClust)
                        //console.log("arrXClass",this.maxClassX,this.minClassX,this.maxClassY,this.minClassY);
                                    d3.selectAll("#"+this.selectedClust)
                                                .transition()
                                                .duration(1000)
                                            
                                                .attr("transform",function(d){
                                                    
                                                    // 给一个初始值，防止紧挨边缘
                                                

        //console.log("newX",newX,"newY",newY)
                                                    var newX=d3.select(this).attr('x')
                                                    var newY=d3.select(this).attr('y')

                                                    
                                                    return `translate(${newX},${newY})`
                                                })
                                                .attr("r",2)

                        //console.log(this.selectedClust,"已缩放完成",)
                    }
                



        setTimeout(() => {// val c1 val.kength 2
                //console.log("val",val,"val.kength",val.length)
            
                var _this=this;
                //console.log("当前选择了",val,"簇")
                

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
                        
                                .attr("stroke", "red")
                                .attr("stroke-width", 1)
                                // .style("opacity",0.6)
                                .transition()
                                .duration(2000)
                            
                                .attr("transform",function(d){
                                    
                                    // 给一个初始值，防止紧挨边缘
                                    var newX=40+(d3.select(this).attr('x')-_this.minClassX)*650/(_this.maxClassX-_this.minClassX)
                                    var newY=15+(d3.select(this).attr('y')-_this.minClassY)*360/(_this.maxClassY-_this.minClassY)
                                    // 记录新的坐标值数组
                                selectedArr.push({"x":newX,"y":newY})
                                    return `translate(${newX},${newY})`
                                })
                                
                                .attr("r",6) 
                                .attr("stroke", "steelblue")
                                .attr("class",function(d,i){
                                
                                    _this.oneClustNumber=i;
                                    
                                    // //console.log("_this.oneClustNumber",_this.oneClustNumber)
                                    return "cl"+i;
                                })


                            // 当前显示的簇的数量 
                            pubsub.publish("LeftoneClustNumber",_this.oneClustNumber)    
                
                        //   画该簇的词云，发送簇名，返回该簇的词频
                        pubsub.publish('clustName',val)
                        
                
                
                
                var _this=this
                //console.log("回来了1",this.circle)
                const brush=d3.brush()
                      .on("start",brushStart)
                    //   .on("brush",brushed)
                      .on("end", brushed);

                const gBrush=d3.select("#gCircle").append("g").attr("id","gBrush")
                    
                
                
                gBrush.call(brush);//添加brush刷子
                function brushStart() {
                    // //console.log("回来了2",_this.circle)
                    // if (d3.brushSelection(this)[0][0] == d3.brushSelection(this)[1][0]) {
                    // (_this.circle).style("fill", "black");
                    // }
                }


                // 刷子矩形框
                d3.select("#gBrush").select(".selection").style("fill","green").style("fill-opacity",0.1)
                
                var oldSelect=[]
                const radius=8 
                var focNumber=0
                var oldNewTemp=[]
                function brushed() {
                    const ext = d3.brushSelection(this)
                    // //console.log("this",this)
                    var selected=[];
                    // d3.selectAll("circle").style("fill",function(d,i){
                    //     if(i<12386){
                    //         // 是电影
                    //         return "red"
                    //     }
                    //     else{
                    //         return "grey"
                    //     }
                        
                    // })
                    
                    
                         
                    var p1=0;
                    (_this.circle).style("fill", function(d,i) {
                        // //console.log("回来了3",_this.circle,this.circle,p1)
                        // //console.log("c"+d.clustName,val)
                        if("c"+d.clustName==val){
                            // //console.log("开始——选中的点",selectedArr[p1],p1,"i",i)
                            
                            // //console.log(selectedArr[p1].x >= ext[0][0] - radius && selectedArr[p1].x <= ext[1][0] + radius && selectedArr[p1].y >= ext[0][1] - radius && selectedArr[p1].y <= ext[1][1] + radius)
                            // //console.log(this,"矩形",ext[0][0],ext[0][1])
                        
                            if (selectedArr[p1].x >= ext[0][0] - radius && selectedArr[p1].x <= ext[1][0] + radius && selectedArr[p1].y >= ext[0][1] - radius && selectedArr[p1].y <= ext[1][1] + radius){
                                selected.push(i)
                                d3.select("#c"+i).style("fill","green")
                                p1=p1+1
                                // //console.log("p1加了个1")
                                return "green";
                            }
                        p1=p1+1
                        // //console.log("p1加了个1")
                        }
                       
                    })
                    
                    focNumber=focNumber+1
                    oldNewTemp.push(selected)
                   
                    
                }
          

            
        }, 1000);
                
                    
                
            },
    // 放大某一用户群
    enLarge(){
        console.log("放大");
        this.handleSelectionChange("c34")
    },
   enSearch(){
        console.log("框选");
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
                        console.log("Data1",data1[0])
                        for(var i=0;i<data1.length;i++){
                            if(data1[i][2]!=-1){
                                dataPlot.push({"userId":i,"x1":data1[i][0],"y1":data1[i][1],"clustName":data1[i][2],"size":5,"director":data1[i][3],"actor":data1[i][4],"genre":data1[i][5] })
                                }
                            }

                    // 聚类图的大小
                    var height = 400
                    var width=710
                    var margin = ({top: 0, right: 20, bottom: 20, left: 60})
                    
                    var svg = d3.select("#userChoose")
                    .attr("id","view").attr("width",width).attr("height",500)
                    .append("g")

                    const g = svg.append("g")
                                        .attr("id","choose")
                                        .attr("width",width)
                                        .attr("height",500)
                                        .attr("transform", d => `translate(0,${20})`)
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


                    // 添加点
                    const points = d3.select("#gCircle")
                        .selectAll("g")
                        .data(dataPlot)
                        .join("circle")
                        .attr("fill", function(d){
                            return _this.colorArr[d.clustName]
                        })
                        // .attr("stroke", "white")
                        // .attr("stroke-width", 0.2)
                        .attr("stroke", "grey")
                        .attr("stroke-width", 0.1)
                        .style('opacity',0.6)
                        .attr("id",function(d){
                            return "c"+d.clustName
                        })
                        .attr("class",function(d,i){
                            return "序号"+i
                        })
                        .attr("x",function(d,i){
                            dataPlot[i]["x"]=x(d.x1)
                            dataPlot[i]["y"]=y(d.y1)
                            return x(d.x1)
                        })
                        .attr("y",function(d){
                            return y(d.y1)
                        })
                        .attr("transform", d => `translate(${x(d[xSelect])},${y(d[ySelect])})`)
                        .attr("r", function(d){
                            return 3
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
                            console.log(i,d)
                            d3.select(".relateShow").style("display","block")

                        _this.Ufooter="User"+d.userId
                        d3.select(this)
                            .attr("stroke", "blue")
                            .attr("stroke-width",3)
                            d3.selectAll("#circle").style("fill","#11a6a4")
                            d3.select(this).style("fill","blue")


                            pubsub.publish('UserIndex',parseInt(d.userId))
                        // 发送用户id，接收到推荐电影均分，指标列表
                            _this.UserIndex=parseInt(d.userId)
                            console.log("用户",parseInt(d.userId))

                            });
                // 给点添加环形图
                // 环形图假数据
                var data=[
    {
        "Month": "Apr1854",
        "Other": 5,
        "Wounds": 0,
        "Disease": 1,
        "total": 6
    },
    {
        "Month": "May1854",
        "Other": 9,
        "Wounds": 0,
        "Disease": 12,
        "total": 21
    },
    {
        "Month": "Jun1854",
        "Other": 6,
        "Wounds": 0,
        "Disease": 11,
        "total": 17
    },
    {
        "Month": "Jul1854",
        "Other": 23,
        "Wounds": 0,
        "Disease": 359,
        "total": 382
    },
    {
        "Month": "Aug1854",
        "Other": 30,
        "Wounds": 1,
        "Disease": 828,
        "total": 859
    },
    {
        "Month": "Sep1854",
        "Other": 70,
        "Wounds": 81,
        "Disease": 788,
        "total": 939
    },
    {
        "Month": "Oct1854",
        "Other": 128,
        "Wounds": 132,
        "Disease": 503,
        "total": 763
    },
    {
        "Month": "Nov1854",
        "Other": 106,
        "Wounds": 287,
        "Disease": 844,
        "total": 1237
    },
    {
        "Month": "Dec1854",
        "Other": 131,
        "Wounds": 114,
        "Disease": 1725,
        "total": 1970
    },
    {
        "Month": "Jan1855",
        "Other": 324,
        "Wounds": 83,
        "Disease": 2761,
        "total": 3168
    },
    {
        "Month": "Feb1855",
        "Other": 361,
        "Wounds": 42,
        "Disease": 2120,
        "total": 2523
    },
    {
        "Month": "Mar1855",
        "Other": 172,
        "Wounds": 32,
        "Disease": 1205,
        "total": 1409
    },
    {
        "Month": "Apr1855",
        "Other": 57,
        "Wounds": 48,
        "Disease": 477,
        "total": 582
    },
    {
        "Month": "May1855",
        "Other": 37,
        "Wounds": 49,
        "Disease": 508,
        "total": 594
    },
    {
        "Month": "Jun1855",
        "Other": 31,
        "Wounds": 209,
        "Disease": 802,
        "total": 1042
    },
    {
        "Month": "Jul1855",
        "Other": 33,
        "Wounds": 134,
        "Disease": 382,
        "total": 549
    },
    {
        "Month": "Aug1855",
        "Other": 25,
        "Wounds": 164,
        "Disease": 483,
        "total": 672
    },
    {
        "Month": "Sep1855",
        "Other": 20,
        "Wounds": 276,
        "Disease": 189,
        "total": 485
    },
    {
        "Month": "Oct1855",
        "Other": 18,
        "Wounds": 53,
        "Disease": 128,
        "total": 199
    },
    {
        "Month": "Nov1855",
        "Other": 32,
        "Wounds": 33,
        "Disease": 178,
        "total": 243
    },
    {
        "Month": "Dec1855",
        "Other": 28,
        "Wounds": 18,
        "Disease": 91,
        "total": 137
    },
    {
        "Month": "Jan1856",
        "Other": 48,
        "Wounds": 2,
        "Disease": 42,
        "total": 92
    },
    {
        "Month": "Feb1856",
        "Other": 19,
        "Wounds": 0,
        "Disease": 24,
        "total": 43
    },
    {
        "Month": "Mar1856",
        "Other": 35,
        "Wounds": 0,
        "Disease": 15,
        "total": 50
    }
                        ]
      var innerRadius = 200
  var outerRadius = 487.5    
  
    var barx = d3.scaleBand()
    .domain(data.map(d => d.Month))
    .range([-0.5*Math.PI,  0.5*Math.PI])
    .align(0)

    var bary = d3.scaleRadial()
      .domain([0, d3.max(data, d => d.total)])
      .range([innerRadius, outerRadius])

    var barz = d3.scaleOrdinal()
    .domain(["Other","Wounds","Disease"])//.range(["#DB004C", "#8CCBFF", "#FF3700"])
    .range(["#FF3700", "#DB004C", "#8CCBFF"])
    
    
    var arc = d3.arc()
                    .innerRadius(d => bary(d[0]))
                    .outerRadius(d => bary(d[1]))
                    .startAngle(d => barx(d.data.Month))
                    .endAngle(d => barx(d.data.Month) + barx.bandwidth())
                    .padRadius(innerRadius)


console.log("最初的arc",arc)


    var xAxis = g => g
    .attr("text-anchor", "middle")
    .call(g => g.selectAll("g")
      .data(data)
      .join("g")
        .attr("transform", d => `
          rotate(${((barx(d.Month) + barx.bandwidth() / 2) * 180 / Math.PI - 90)})
          translate(${innerRadius},0)
        `)
        .call(g => g.append("line")
            .attr("x2", -5)
            .attr("stroke", "#000"))
        .call(g => g.append("text")
            .attr("transform", d => (barx(d.Month) + barx.bandwidth() / 2 + Math.PI / 2) % (Math.PI) < 0.5*Math.PI
                ? "rotate(180)translate(30,3)"
                : "rotate(0)translate(-30,3)")
            .text(d => d.Month)))

    var yAxis = g => g
    .attr("text-anchor", "middle")
    .call(g => g.selectAll("g")
      .data(bary.ticks(5).slice(1))
      .join("g")
        .attr("fill", "none")
        .call(g => g.append("path")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.05)
            .attr("d", d3.arc()
              .innerRadius(bary)
              .outerRadius(bary)
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
            .attr("x", d => bary(d))
            .attr("dx", "0.35em")
            .attr("dy", "-0.35em")
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .text(bary.tickFormat())
         .clone(true)
            .attr("fill", "#000")
            .attr("stroke", "none"))
         )


    var legend = g => g.append("g")
  .selectAll("g")
  .data(["Disease", "Wounds", "Other"])
  .join("g")
    .attr("transform", (d, i) => `translate(-20,${(i - (3) / 2) * 20-40})`)
    .call(g => g.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", barz))
    .call(g => g.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .text(d => d))

  

var sliceA=["Other","Wounds","Disease"]
// d3.select("#c7").append("svg")
    svg.append("g")
    .selectAll("g")
    .data(d3.stack().keys(sliceA)(data))
    .join("g")
    // .attr("fill", d => barz(d.key))
    .selectAll("path")
    // .data(function(d,i){
    //   console.log("d",d)
    //   return d
    // })
    .data(d=>d)
    .join("path")
    .attr("d", arc)
    .attr("pp",function(){
        console.log("最初的打印",arc)
    })

//   svg.append("g")
//       .call(xAxis);

//   svg.append("g")
//       .call(yAxis);

//   svg.append("g")
//       .call(legend);












                            
                })  
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


            const svg = d3.select("#compareBar").attr('transform', `translate(${-350},${-48})`)
                .append("svg")
                .attr("id","comPareSvg")
                .attr("viewBox", `${-300} ${-180} ${600} ${400}`)
                .style("width", 350)
                .style("height", 350)
                
                .style("font", "24px JamesonBold");
// console.log("下面的arc",arc)
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
                    pubsub.publish('thirdName',this.thirdName)
                    var data=groupData
                    // var data=conveyData
                        var width=110
                        var height=110
                        var margin={top:0, bottom:0, left:0, right:0}
                        // console.log(data)
                        const svg = d3.select('#radarGroupSvg').attr('transform', `translate(${150},${-260})rotate(${(360/conveyData.length)/2},0,0)`)
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
            var sizes = {height: 400, width: 400}
            var data = [{"id":0,name: 'Apples', value: 0.3},{"id":"other",name: 'Apples', value:0.13}, {"id":1,name: 'Bananas', value: 0.56}, {"id":2,name: 'Oranges', value: 0.12}]
            // console.log("newData",newData);
            // console.log("data",data);
            data=newData;
            // 清除已有的差值图
            d3.select('#drawPie').selectAll("g").remove()
            const svg = d3.select('#drawPie').attr('height', sizes.height).attr('width', sizes.width).attr('transform', `translate(${0}, ${0})`)
            const container = svg.append('g').attr('transform', `translate(${200}, ${190})`)
            const colors = d3.scaleOrdinal()
                .domain(data.map(d => d.name))
                .range(d3.schemeCategory10)
            
            // pie不排序
            const pie = d3.pie().sort(null)
            const pieData = pie.value(d=> d.value)(data)
            // console.log("pieData",pieData);
            
            const segments = d3.arc()
                .innerRadius(170)
                .outerRadius(180)
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
                    // return "lightsteelblue"
                    return "grey"
                    
                }
                else{
                    // return "steelblue"
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
            // 传送给Right.vue
            pubsub.publish('CenterGroups',this.conveyGroupCompare)

        }
           

  },

  mounted(){
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
            
  }
}
</script>
<style>
 

</style>

<style scoped>
.userEmbedding{
    border-bottom:1px solid #dddddd;
    /* margin-top: 0px; */
    /* left: 1%; */
    width:100%;
    height:50%;
    float:left;
}
.clustCompare{
    /* border-bottom:1px solid #dddddd; */
    width:100%;
    height:50%;
    float:left;
}
.compareGroupHistory{
    float:left;
}
.compareGroupExplain{
    float:left;
}


/* 两个按钮，放大和框选 */
::v-deep .search1 {
    float:right;
  width:60px;
  background: url('css/expand.png') center no-repeat;			
  font-size: 12px;
  background-size: cover;
}

::v-deep .search1:before {
  content: "搜";
  font-size: 12px;
  visibility: hidden;
}

::v-deep .search2 {
   float:right;
  width:60px;
  background: url('css/search.png') center no-repeat;			
  font-size: 12px;
  background-size: cover;
}

::v-deep .search2:before {
  content: "搜";
  font-size: 12px;
  visibility: hidden;
}

.compareGroupHistory{
  background: #909399;
  width:100%;
}
.compareGroupExplain{
  background: #909399;
  width:100%;
}
</style>

