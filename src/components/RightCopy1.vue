<template>
  <div class="right">
    <h2>Explain Results</h2>
    <!-- 是否框选关键模式节点 -->
    <div class="showExplainButtonDiv">
        <el-switch
          style="display: block"
          v-model="ShowExplainButton"
          active-color="#f98619"
          inactive-color="#DCDFE6"
          active-text="KeyN"
          inactive-text="AllN"
          @change="isShowExplain()"
          >
        </el-switch>
    </div>

    <!-- 解释结果图 -->
    <div class="explainRe">
          <!-- 用户群A -->
          <div class="explainResultsA">
      
          </div>
            <!-- 用户群B -->
         <div class="explainResultsB">
    
        </div>
    </div>


  </div>
</template>

<script>
import * as d3 from 'd3';//引入d3v7版本
//引入d3的 v3版本
import * as d3v3 from 'd3v3';
import axios, { all } from "axios"
import pubsub from 'pubsub-js'
import expandImg from "../assets/expand.png"
import moreImg from "../assets/more.png"
export default {
  name: 'Right',
  props: {
  },
  data(){
    return {
        ShowExplainButton: false,
        groupsInfo:[],
        //所有的类型 
        allFatureName:['剧情', '犯罪', '情色', '喜剧', '爱情', '动作', '西部', '冒险', '音乐', '传记', '悬疑', '惊悚', '恐怖',
        '纪录片', '历史', '战争', '奇幻', '运动', '同性', '动画', '短片', '儿童', '歌舞', '科幻', '家庭',
        '武侠', '古装', '灾难', '真人秀', '黑色电影', '脱口秀', '戏曲', '舞台艺术', '鬼怪', '荒诞','导演','演员','电影'],
        // nodeType:["#5576a1","#aacee8","#fbba76","#58a74b", "#b15928", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a",  "#b2df8a", "#33a02c",'#38382e', '#10108b', '#35ccb1', '#0c729f','#061b28', '#5bc0f0','#460a7b', '#187a99','#ff99ff',"#00ff99","#8A8A8A","#ffff00","	#FFE1FF","	#EED8AE","	#B03060","#8B7D7B","#7CFC00","#6499ED",'#062d97', '#11b576', '#1658fa', '#936b23', '#07542d', '#48b7fa', '#0eedf0', '#7f2133', '#80ee65', '#160b04', 'grey'],
        nodeType:["#5576a1","#aacee8","#fbba76","#a6cee3", "#b15928", "#fb9a99", "#e31a1c", "#ff7f00",  "yellow","#cab2d6", "#6a3d9a",  "#b2df8a", "#33a02c",'#38382e', '#10108b', '#35ccb1', '#0c729f','#061b28', '#5bc0f0','#460a7b', '#187a99','#ff99ff',"#00ff99","#8A8A8A","#ffff00","	#FFE1FF","	#EED8AE","	#B03060","#8B7D7B","#7CFC00","#6499ED",'#062d97', '#11b576', '#1658fa', '#936b23', '#07542d', '#48b7fa', '#0eedf0', '#7f2133', '#80ee65', '#160b04', 'grey'],
        // 所有的节点
        AllInfo:[],

         
    }
  },
  methods:{
    multiplyNode(node, count, deep) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = node.cloneNode(deep);
        node.parentNode.insertBefore(copy, node);
    }
    },

// 是否框选重要节点
    isShowExplain(){
      console.log(this.ShowExplainButton);
      if(this.ShowExplainButton){
        d3.selectAll(".AllExplaineLine")
          .transition()
          .duration(1000)
          .style("opacity",1) 
      }
      else{
        d3.selectAll(".AllExplaineLine")
          .transition()
          .duration(500)
          .style("opacity",0) 
      }
    },

    // 传入的参数：节点类型数组
    drawExplainResults(SvgGroup,oneExplainGraphNodeType,oneGraph_x,oneGraph_y,index){
      var _this=this;
      // 画框线的起始xy坐标，框的大小
      var oneGraphDis_x=oneGraph_x //100
      var oneGraphDis_Y=oneGraph_y//25
      var rectSelect=[]
      
      // 每个图有1个svg，svg移动的位置
      var explainResultsSvg=d3.select(SvgGroup).append("svg")
                              .attr("id","E"+index)
                              // .attr("transform", function(d,i){
                              //             return `translate(${0},${oneGraphDis_Y})`
                              //         })
                              .attr("width","90px").attr("height","190px")
                              
      var circleR=10//圆的大小
      // 添加框线 ，隐藏
      explainResultsSvg.append("rect").attr("fill","white").attr("stroke","#fbba76").attr("stroke-width","3px")
                                     .attr("width","50px")
                                     .attr("class","AllExplaineLine")
                                     .attr("height",(oneExplainGraphNodeType.length-3)*2*circleR)
                                     .attr("id","L"+index)
                                     .attr("transform", function(d,i){
                                      // console.log((2)*oneGraphDis_Y+10);
                                          return `translate(${oneGraphDis_x-25},${circleR*5})`
                                      })
                                      .style("opacity",0)
      
      // 添加圆圈
      explainResultsSvg.selectAll("g")
                      .data(oneExplainGraphNodeType)
                      .join("circle")
                      .attr("x",function(d,i){
                            return 20
                        })
                        .attr("y",function(d){
                            return 20
                        })
                        .attr("transform", function(i,d){

                                // console.log(d,i);
                                return `translate(${oneGraphDis_x},${2*circleR*(d+1)})`
                            })
                        .attr("r", circleR)
                        .attr("stroke", "black")
                        .attr("stroke-width", 2)
                        .style('opacity',0.75)
                       .attr("fill", function(d,i){
                        // console.log(d)
                            return _this.nodeType[d]
                        })
                        .on("click",function(d,i){
                          console.log(d,i)
                        })
        
         var tooltip = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);


        // 添加放大按钮
        explainResultsSvg
          .append("image")
          .attr("xlink:href",function(){
            return expandImg;
            // return "https://img2.baidu.com/it/u=1058523739,787479358&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            })
          .attr('width', 25)
          .attr('height', 20)
          .on("mouseover",function(){
            this.style.cursor="pointer";
          })
           .attr("id","expandButton"+index)
          .attr("transform", function(d,i){
            return `translate(${40},${-1})`
            })
          .on("click",function(d,i,k){
                            // 显示面板
                            this.style.cursor="pointer";
                                 
                            tooltip.style('display', 'block')
                                // .html("用户："+d.userId+"<br>"+"Rec_Explain： "+ index)
                                .html("Rec_Explain： "+ index)
                                .style("left", d.pageX + "px")
                                .style("top",d.pageY+10+ "px")
                                
                            tooltip.attr("id","newTooltip"+index)
                                .transition()
                                .duration(1000)
                                .style("opacity", 1)
                                .style('border-radius', '20px')
                                .style('position', 'absolute')
                                .style("border","4px solid #DDD")
                                .style('z-index', '10')
                                // .style('padding', '10px')
                                .style('background', 'white')
                                .style("stroke","white")
                                ;

                           
                        
                              d3.select("#newPanel"+index).remove()//清除已有面板

                             tooltip.append("svg")
                                    .attr("id","newPanel"+index)
                                    .attr("width","600px")
                                   .attr("height","500px")
                           
                          //  面板分为两个部分newPanel_l和newPanel_r     
                                
                                // 中间直线隔开
                                var data = [[300, 0],[300, 600]],
                                centerPath = d3.select("#newPanel"+index),  
                                lineGenerator = d3.line()
                                                  .x(function(d) {
                                                        return d[0]
                                                    })
                                                  .y(function(d) {
                                                        return d[1];
                                                  });
                                 centerPath.append('path')
                                  .attr('stroke', 'grey')
                                  .attr('stroke-width', '1')
                                  .attr('fill', 'none')
                                  .attr('d', lineGenerator(data));
      

                                // 左面板
                                d3.select("#newPanel"+index)
                                    .append("g")
                                    .attr("width","200px")
                                    .attr("height","300px")
                                    .attr("id","newPanel"+index+"l")
                                      .attr("transform", function(i,d){
                                          return `translate(${0},${0})`
                                      })
                                 
                         
                          
                                 // 右面板
                                d3.select("#newPanel"+index)
                                    .append("g")
                                    .attr("width","200px")
                                    .attr("height","300px")
                                    .attr("id","newPanel"+index+"r")
                                      .attr("transform", function(i,d){
                                          return `translate(${300},${0})`
                                      })
                                      
                          // 左右面板画图           
                          _this.drawForceLeft("#newPanel"+index+"l")
                          _this.drawForceRight("#newPanel"+index+"r")
          })


      // 添加更多按钮
        explainResultsSvg
          .append("image")
          .attr("xlink:href",function(){
            return moreImg;
            })
          .attr('width', 25)
          .attr('height', 30)
          .on("mouseover",function(){
            this.style.cursor="pointer";
          })
           .attr("id","expandButton"+index)
          .attr("transform", function(d,i){
            return `translate(${65},${-5})`
            })
          .on("click",function(d,i,k){
            console.log("这个按钮还没开发");
          })

        // 点击空白页面，清除tooltip的浮动
        d3.selectAll(".tooltip").on("click",function(d,i){
          // console.log("点击了空白区域",this);
          d3.selectAll(".tooltip")
                .style('display', 'none')
        })
        
                        
    },
    // 画力导引图
    drawForce(svgId){
      // d3.select("#drawRect").append("rect").attr("width","200px").attr("height","200px").attr("fill","red")
   
  //  var width=500
  //  var height=340
    var width=200
    var height=340
  //  var margin = ({top: 30, right: 80, bottom: 30, left: 30});
   var margin = ({top: 10, right: 40, bottom: 10, left: 40});
      const svg = d3.select(svgId).append("svg")
                      .attr("id","E1")
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                      .attr("transform", `translate(${margin.left},${margin.top})`);
  
      //create dummy data
    const dataset =  {
      nodes: [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6}
      ], 
      links: [
        {source: 1, target: 5},
        {source: 4, target: 5},
        {source: 4, target: 6},
        {source: 3, target: 2},
        {source: 5, target: 2},
        {source: 1, target: 2},
        {source: 3, target: 4}
      ]
    };

    // console.log("dataset is ...",dataset);

     // Initialize the links
    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(dataset.links)
      .enter().append("line")
      .style("stroke","black");

    // Initialize the nodes
    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(dataset.nodes)
        .enter().append("circle")
        .attr("r", 20)
        .style("fill","grey")
        .call(d3.drag()  //sets the event listener for the specified typenames and returns the drag behavior.
            .on("start", dragstarted) //start - after a new pointer becomes active (on mousedown or touchstart).
            .on("drag", dragged)      //drag - after an active pointer moves (on mousemove or touchmove).
            .on("end", dragended)     //end - after an active pointer becomes inactive (on mouseup, touchend or touchcancel).
         );

    // Text to nodes
    const text = svg.append("g")
        .attr("class", "text")
        .selectAll("text")
        .data(dataset.nodes)
      .enter().append("text")
        .text(d => d.id)

    var simulation = d3.forceSimulation()
    .force("link", d3.forceLink() // This force provides links between nodes
                    .id(d => d.id) // This sets the node id accessor to the specified function. If not specified, will default to the index of a node.
     ) 
    .force("charge", d3.forceManyBody().strength(-500)) // This adds repulsion (if it's negative) between nodes. 
    .force("center", d3.forceCenter(width / 2, height / 2)); // This force attracts nodes to the center of the svg area


    //Listen for tick events to render the nodes as they update in your Canvas or SVG.
    simulation
        .nodes(dataset.nodes)//sets the simulation’s nodes to the specified array of objects, initializing their positions and velocities, and then re-initializes any bound forces;
        .on("tick", ticked);//use simulation.on to listen for tick events as the simulation runs.
        // After this, Each node must be an object. The following properties are assigned by the simulation:
        // index - the node’s zero-based index into nodes
        // x - the node’s current x-position
        // y - the node’s current y-position
        // vx - the node’s current x-velocity
        // vy - the node’s current y-velocity

    simulation.force("link")
        .links(dataset.links);//sets the array of links associated with this force, recomputes the distance and strength parameters for each link, and returns this force.
        // After this, Each link is an objdrawForceect with the following properties:
        // source - the link’s source node; 
        // target - the link’s target node; 
        // index - the zero-based index into links, assigned by this method


    // This function is run at each iteration of the force algorithm, updating the nodes position (the nodes data array is directly manipulated).
    function ticked() {
      link.attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

      node.attr("cx", d => d.x)
          .attr("cy", d => d.y);

      text.attr("x", d => d.x - 5) //position of the lower left point of the text
          .attr("y", d => d.y + 5); //position of the lower left point of the text
    }

    //When the drag gesture starts, the targeted node is fixed to the pointer
    //The simulation is temporarily “heated” during interaction by setting the target alpha to a non-zero value.
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();//sets the current target alpha to the specified number in the range [0,1].
      d.fy = d.y; //fx - the node’s fixed x-position. Original is null.
      d.fx = d.x; //fy - the node’s fixed y-position. Original is null.
    }

    //When the drag gesture starts, the targeted node is fixed to the pointer
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    //the targeted node is released when the gesture ends
    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      
      console.log("dataset after dragged is ...",dataset);
    }
    },

    
    // 正确力导引图
    drawForceLeft(svgId){
      // 发送电影id，获取用户和推荐电影的路径图
                                      var flowLogsResponse1=[]
                                                              
                                      var path="http://localhost:5000/MovieIndex"
                                      // console.log("_this.UserIndex",_this.MovieIndex)
                                      // 用户3721的推荐电影0-19
                                      path +=`?UserMovieIndex=${[3721,0]}`;
                                      axios.get(path)
                                      .then(res=>{
                                              // 处理当res.data为空的情况
                                              res.data=(res.data).replaceAll("[","").replaceAll("]","").replaceAll("{","").replaceAll(/'/g, '"')
                                              res.data=res.data.split("},")
                                              res.data.pop()
                                            //  console.log("(res.data)",(res.data))  
                                          for(var t=0;t<(res.data).length;t++){
                                              // console.log("t",t)
                                              res.data[t]=(res.data[t]).replaceAll("{","").replaceAll("}","").replaceAll(/[\n\r]/g,"")
                                              res.data[t]="{"+res.data[t]+"}"
                                              // console.log("你觉得呢",typeof((res.data[t])),(res.data[t]))

                                              // console.log("你觉得呢",typeof(JSON.parse(res.data[t])),JSON.parse(res.data[t]))
                                              flowLogsResponse1.push(JSON.parse(res.data[t]))
                                          }
                                              // console.log("res.data_movieIndex",typeof(res.data),res.data[0])  
                                              // console.log("flowLogsResponse1",flowLogsResponse1) 
                                              // 对象的深拷贝
                                              // let result = JSON.parse(JSON.stringify(flowLogsResponse1));
                                              var convey1=JSON.parse(JSON.stringify(flowLogsResponse1));
                                              var convey2=JSON.parse(JSON.stringify(flowLogsResponse1));
                                              console.log("用户0的推荐的第0部电影flowLogsResponse",convey1,convey2) 
                                              // 推荐原始图
                                              d3.select("#drawPie").selectAll("g").remove()
                                              console.log("推荐图传入的数据",convey1);
                                              this.funOriginal(svgId,convey1)

                                      })
    },
    drawForceRight(svgId){
      // 发送电影id，获取用户和推荐电影的路径图
                                      var flowLogsResponse1=[]
                                                              
                                      var path="http://localhost:5000/MovieIndex"
                                      // console.log("_this.UserIndex",_this.MovieIndex)
                                      // 用户3721的推荐电影0-19
                                      path +=`?UserMovieIndex=${[3721,0]}`;
                                      axios.get(path)
                                      .then(res=>{
                                              // 处理当res.data为空的情况
                                              res.data=(res.data).replaceAll("[","").replaceAll("]","").replaceAll("{","").replaceAll(/'/g, '"')
                                              res.data=res.data.split("},")
                                              res.data.pop()
                                            //  console.log("(res.data)",(res.data))  
                                          for(var t=0;t<(res.data).length;t++){
                                              // console.log("t",t)
                                              res.data[t]=(res.data[t]).replaceAll("{","").replaceAll("}","").replaceAll(/[\n\r]/g,"")
                                              res.data[t]="{"+res.data[t]+"}"
                                              // console.log("你觉得呢",typeof((res.data[t])),(res.data[t]))

                                              // console.log("你觉得呢",typeof(JSON.parse(res.data[t])),JSON.parse(res.data[t]))
                                              flowLogsResponse1.push(JSON.parse(res.data[t]))
                                          }
                                              // console.log("res.data_movieIndex",typeof(res.data),res.data[0])  
                                              // console.log("flowLogsResponse1",flowLogsResponse1) 
                                              // 对象的深拷贝
                                              // let result = JSON.parse(JSON.stringify(flowLogsResponse1));
                                              var convey1=JSON.parse(JSON.stringify(flowLogsResponse1));
                                              var convey2=JSON.parse(JSON.stringify(flowLogsResponse1));
                                              console.log("用户0的推荐的第0部电影flowLogsResponse",convey1,convey2) 
                                              // // 解释图
                                              d3.select("#compareBar").selectAll("g").remove()
                                              console.log("解释图传入的数据",convey2);
                                              this.funExplain(svgId,convey2)

                                      })
    },
   
      //  对后端数组进行处理
    dealpyData(groupA){
              groupA=groupA.split("\\n")
              
              for(var i=0;i<groupA.length;i++){
                groupA[i]=groupA[i].replaceAll("[","").replaceAll("'","").replaceAll(" ","")
                groupA[i]=groupA[i].split("]")
                for(var j=0;j<groupA[i].length;j++){
                  groupA[i][j]=groupA[i][j].split(",")
                  
                  if(groupA[i][j][0]==""){
                    groupA[i][j].shift();
                  }
                  groupA[i][j].pop()//去除分数指标
                  // console.log(groupA[i][j],groupA[i][j][0],groupA[i][j][0]=="");
                }
                groupA[i].pop()
              }
              groupA.pop()
              return groupA
    },

    // 传入数组，传入类型，把数组按类型排序
    sortGroupFun(groupA,labelA){
            var sortGroupA=[]
            var temp1=[]
            var temp2=[]
            // 如果只比前两位
            if(labelA.length==2){
                              for(var i=0;i<groupA.length;i++){
                                    // console.log("哈",groupA[i][0][0],groupA[i][1][0],groupA[i][2][0]);
                                    // console.log("哈哈",labelA.includes(groupA[i][0][0]) && labelA.includes(groupA[i][1][0]) && labelA.includes(groupA[i][2][0]))
                                    var tempArr=[groupA[i][0][0],groupA[i][1][0],groupA[i][2][0]]
                                    if(tempArr.includes(labelA[0]) && tempArr.includes(labelA[1]) ){
                                      temp1.push([labelA[0],labelA[1]])
                                    }
                                    else{
                                      temp2.push([groupA[i][0][0],groupA[i][1][0]])
                                    }
                              }
            }
            else{
                            for(var i=0;i<groupA.length;i++){
                                // console.log("哈",groupA[i][0][0],groupA[i][1][0],groupA[i][2][0]);
                                // console.log("哈哈",labelA.includes(groupA[i][0][0]) && labelA.includes(groupA[i][1][0]) && labelA.includes(groupA[i][2][0]))
                                var tempArr=[groupA[i][0][0],groupA[i][1][0],groupA[i][2][0]]
                                if(tempArr.includes(labelA[0]) && tempArr.includes(labelA[1]) && tempArr.includes(labelA[2]) ){
                                  temp1.push([labelA[0],labelA[1],labelA[2]])
                                }
                                else{
                                  temp2.push([groupA[i][0][0],groupA[i][1][0],groupA[i][2][0]])
                                }
                          }
            }
           
            sortGroupA=temp1.concat(temp2)
            // console.log("排序后的",sortGroupA)
            return sortGroupA;
    },

    // 数组中的对象去重
    uniqueArr(arr){
         let data = [];
          arr.forEach(item => {

            if (data.length == 0) {
              data.push(item);
            } else {

              let isDiff = true;//是否不同
              for (let i = 0; i < data.length; i++) {
                let dataItem = data[i];
                if (dataItem.source_name == item.source_name && dataItem.dest_name == item.dest_name) {
                  /*集合中已经存在相同数据*/
                  isDiff = false;
                  break;
                }
              }

              if (isDiff) {
                data.push(item);
              }
            }

          });


        return data;




    },
    // 根据复杂Hull图得到原图
    dealToOriginalGraph(allData){
      var data=[]
      var tempSourceName=[]
      var tempDestName=[]
      for(var i=0;i<allData.length;i++){
        if( allData[i].source_namespace=="Movie"){
            allData[i].source_name="1"
        }
         if( allData[i].dest_namespace=="Movie"){
            allData[i].dest_name="1"
        }
      }
      // for(var j=0;j<)
      // 把allData中有uesrload的去除掉
      var list = allData.filter((val) => val.source_namespace!=="UserLoad")
      list = list.filter((val) => val.dest_namespace!=="UserLoad")
      // for(var p=0;p<allData.length;p++){
      //   if(allData[p].source_namespace=="UserLoad" || allData[p].dest_namespace=="UserLoad"){
      //     allData.
      //   }
      // }
      allData=list
      // console.log("元数据",allData);
      // console.log("元数据",list);
      allData=this.uniqueArr(allData)
      // console.log("元博处理过的数据",allData)
      var countG=0;
      var countUL=0;
      var countD=0;
      var countA=0;
      // 记录类型的名称
      var countGName=[]
      for(var m=0;m<allData.length;m++){
        // 展开类型
        if(allData[m].dest_namespace=="Genre"){
          allData[m].dest_namespace="Genre"+countG;
        }
        if(allData[m].source_namespace=="Genre"){
          allData[m].source_namespace="Genre"+countG;
          countGName.push(this.AllInfo[parseInt(allData[m].source_name)])
          countG=countG+1;
        }
        
        // // 展开UL
        // if(allData[m].dest_namespace=="UserLoad"){
        //   allData[m].dest_namespace="UserLoad"+countUL;
        // }
        // if(allData[m].source_namespace=="UserLoad"){
        //   allData[m].source_namespace="UserLoad"+countUL;
        //   countUL=countUL+1;
        // }
        // // 导演
        // if(allData[m].dest_namespace=="Director"){
        //   allData[m].dest_namespace="Director"+countD;
        // }
        // if(allData[m].source_namespace=="Director"){
        //   allData[m].source_namespace="Director"+countD;
        //   countD=countD+1;
        // }
        // // 演员
        // if(allData[m].dest_namespace=="Actor"){
        //   allData[m].dest_namespace="Actor"+countA;
        // }
        // if(allData[m].source_namespace=="Actor"){
        //   allData[m].source_namespace="Actor"+countA;
        //   countA=countA+1;
        // }
      }
      console.log("类型",countGName);
      // console.log(this.AllInfo);
      return [allData,countGName];
    },

    // 推荐图
      //  xgnn导引图
    // 画力导引图调用的函数，svgName为svg的id       
    funOriginal(svgName,flowLogsResponse){   
      var _this=this;
                // pauseLoading();
                // console.log("_this",_this)
                console.log("funOriginal",flowLogsResponse)
                // 对flowLogsResponse数据进行处理
                var countGName=this.dealToOriginalGraph(flowLogsResponse)[1]
                flowLogsResponse=this.dealToOriginalGraph(flowLogsResponse)[0]
                
                // console.log("flowLogsResponse",flowLogsResponse)
                var width = 200
                var height = 400
            
                var  vis=d3v3.select(svgName)
                    
                    .attr("width",width)
                    .attr("height",height)
                    // vis = d3v3.select(DOM.svg(width, height));
                
                var dr = 15,      // 默认点的基础半径
                    off = 15,    // 簇的抵消
                    expand = {}, // 倒下的簇
                    data, net, force, hullg, hull, linkg, link, nodeg, node,
                    nodeTextg,nodeText,nodePicg,nodePic
                    // ,nodeTitleg,nodeTitle
                
                setTimeout(() => {
                    let flowNodes = [];
                    let flowLinks = [];
                    

                    
                    let flowResponse = flowLogsResponse;
                    
               
                  

                   
                    for (let i = 0; i < flowResponse.length; i++) {
                        const flow = flowResponse[i];
                        const sourceFullName =flow.source_name + '.' + flow.source_namespace;
                        const destFullName = flow.dest_name + '.' + flow.dest_namespace;

                        // 把姓名和group压入lowNodes中，没有group_data
                        flowNodes.push({
                        name: sourceFullName,
                        group: flow.source_namespace
                        // group: flow.source_name
                        });

                        flowNodes.push({
                        name: destFullName,
                        group: flow.dest_namespace
                        // group: flow.dest_name
                        });
                    }
                    
                    
                    
                    // flowNodes,去除name和group相同的对象，并且根据name属性重新排序
                    flowNodes = _(flowNodes).uniqBy(x => x.name).sortBy(x => x.name).value();
                    
                   

//    50个边的对应flowNodes，记录下标，这个下标对应flowNodes中的下标，即30个点：
                    for (let i = 0; i < flowResponse.length; i++) {
                        const flow = flowResponse[i];
                        const sourceFullName = flow.source_name + '.' + flow.source_namespace;
                        const sourceIndex = flowNodes.findIndex(x => x.name === sourceFullName);

                        const destFullName = flow.dest_name + '.' + flow.dest_namespace;
                        const destIndex = flowNodes.findIndex(x => x.name === destFullName);
                        
                        flowLinks.push({
                        source: sourceIndex,
                        target: destIndex,
                        value: 1000,
                        });
                    }


                    flowLinks = _(flowLinks).value();
                    

                    data = {
                        links: flowLinks,
                        nodes: flowNodes,
                    };
                    
                
                    for (var i=0; i<data.links.length; ++i) {
                        var o = data.links[i];
                        o.source = data.nodes[o.source];
                        o.target = data.nodes[o.target];
                    }

//   分别对应三个g元素
                    hullg = vis.append("g");
                    linkg = vis.append("g");
                    nodeg = vis.append("g");
                    nodeTextg=vis.append("g");
                    nodePicg=vis.append("g");
                    // nodeTitleg=vis.append("g")
                    

                    init();
 /* 
                    vis.attr("opacity", 1e-6)
                        .transition()
                        .duration(2000)
                        .attr("opacity", 1);


*/
                    }, 0);


// -----------------------------------------------------------------------------

                var curve = d3v3.svg.line()
                    .interpolate("cardinal-closed")
                    .tension(.85);

                var fill = d3v3.scale.category20();


                function nodeid(n) {
                    return n.size ? "_g_"+n.group : n.name;
                }

                function linkid(l) {
                    // console.log("l",l)
                    var u = nodeid(l.source),
                        v = nodeid(l.target);
                    return u<v ? u+"|"+v : v+"|"+u;
                }

                function getGroup(n) { return n.group; }


                // 构建网络可视化
                function network(data, prev, index, expand) {
                        expand = expand || {};
                        var gm = {},    // group map
                            nm = {},    // node map
                            lm = {},    // link map
                            gn = {},    // previous group nodes
                            gc = {},    // previous group centroids
                            nodes = [], // output nodes
                            links = []; // output links

                        // 处理以前的节点用来 重用或计算重心
                        if (prev) {
                            prev.nodes.forEach(function(n) {
                            var i = index(n), o;
                            if (n.size > 0) {
                                gn[i] = n;
                                n.size = 0;
                            } else {
                                o = gc[i] || (gc[i] = {x:0,y:0,count:0});
                                o.x += n.x;
                                o.y += n.y;
                                o.count += 1;
                            }
                            });
                        }

                        // 确定节点
                        for (var k=0; k<data.nodes.length; ++k) {
                            var n = data.nodes[k],
                                i = index(n),
                                l = gm[i] || (gm[i]=gn[i]) || (gm[i]={group:i, size:0, nodes:[]});
                            if (expand[i]) {
                                // 节点应该直接可见
                                nm[n.name] = nodes.length;
                                nodes.push(n);
                                if (gn[i]) {
                                    // 在集群位置放置新节点（加上抖动）
                                    n.x = gn[i].x + Math.random();
                                    n.y = gn[i].y + Math.random();
                                }
                                
                            } 
                            
                            else {
                                // 该节点是已折叠群集的一部分
                                if (l.size == 0) {
                                    // 如果是新簇，则添加到叶节点的质心处的集合和位置
                                    nm[i] = nodes.length;
                                    nodes.push(l);
                                    if (gc[i]) {
                                    l.x = gc[i].x / gc[i].count;
                                    l.y = gc[i].y / gc[i].count;
                                    }
                                }
                                l.nodes.push(n);
                            }
                            
                            // 始终计算组大小，因为我们也使用它来调整力图强度/距离
                        l.size += 1;
                        n.group_data = l;
                        }
                       
                        for (i in gm) { gm[i].link_count = 0; }

                        // 确定边
                        for (k=0; k<data.links.length; ++k) {
                            var e = data.links[k],
                                u = index(e.source),
                                v = index(e.target);
                                if (u != v) {
                                    gm[u].link_count++;
                                    gm[v].link_count++;
                                }
                                u = expand[u] ? nm[e.source.name] : nm[u];
                                v = expand[v] ? nm[e.target.name] : nm[v];
                                i = (u<v ? u+"|"+v : v+"|"+u),
                                l = lm[i] || (lm[i] = {source:u, target:v, size:0});
                                l.size += 1;
                        }

                        for (i in lm) { links.push(lm[i]); }

                        return {nodes: nodes, links: links};
                }


                function convexHulls(nodes, index, offset) {
                        var hulls = {};

                        // create point sets
                        for (var k=0; k<nodes.length; ++k) {
                            var n = nodes[k];
                            if (n.size) continue;
                            var i = index(n),
                                l = hulls[i] || (hulls[i] = []);
                            l.push([n.x-offset, n.y-offset]);
                            l.push([n.x-offset, n.y+offset]);
                            l.push([n.x+offset, n.y-offset]);
                            l.push([n.x+offset, n.y+offset]);
                        }

                        // create convex hulls
                        var hullset = [];
                        for (i in hulls) {
                            hullset.push({group: i, path: d3v3.geom.hull(hulls[i])});
                        }

                return hullset;
                }

                function drawCluster(d) {
                     return curve(d.path); // 0.8
                }
           



                
                function init() {

                if (force) {
                    force.stop();
                }

// 确定点和边，计算重心等
                net = network(data, net, getGroup, expand);

                // console.log("net",net)
                // console.log("nodeid",nodeid)
                

// 力导引图的参数
                force = d3v3.layout.force()
                        .nodes(net.nodes)
                        .links(net.links)
                        .size([width, height*0.8])
                        // .linkDistance(50)
                        .linkDistance(function(l) {
                        var n1 = l.source, n2 = l.target;
                        
                        if(n1.group=="UserTarget"&&n2.group=="Movie"){
                            // console.log("n1",n1.group,"n2",n2.group)
                            return 0
                        }
                        else{
                             return 500
                        }
                       
                        })
                        .linkStrength(function(l, i) {
                        return 0;
                        }) 
                        .gravity(0.8)   // gravity+charge tweaked to ensure good 'grouped' view (e.g. green group not smack between blue&orange, ...
                        
                          // gravity+charge tweaked to ensure good 'grouped' view (e.g. green group not smack between blue&orange, ...
                        // .charge(-600)    // ... charge is important to turn single-linked groups to the outside
                        .charge(-200)    // ... charge is important to turn single-linked groups to the outside
                        .friction(0.8)   // friction adjusted to get dampened display: less bouncy bouncy ball [Swedish Chef, anyone?]
                        
                        .start(0.01)
                        


                hullg.selectAll("path.hull").remove();


// hull是超点的簇
                hull = hullg.selectAll("path.hull")
                    .data(function(){
                        // console.log("net.nodes",net.nodes);
                        // console.log("getGroup",getGroup, );
                        // console.log("off",off);
                        // console.log("convexHulls(net.nodes, getGroup, off)",convexHulls(net.nodes, getGroup, off));
                        return convexHulls(net.nodes, getGroup, off)})

                    .enter().append("path")
                    .attr("class", "hull")
                    .attr("d", drawCluster)
                    .style("fill", function(d) { return fill(d.group); })
                    // .style("stroke-width",0.5)
                    .style("fill-opacity",0.3)
                    .on("click", function(d) {

                        

                        d3v3.selectAll(".text").remove();

                    expand[d.group] = false; init();
                    });

// 添加边
                link = linkg.selectAll("line.link").data(net.links, linkid);
                link.exit().remove();

                link.enter().append("line")
                    .attr("class", "link")
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; })
                    .attr("d",function(d) { return Math.sqrt((d.source.x-d.target.x)*(d.source.x-d.target.x)+(d.source.y-d.target.y)*(d.source.y-d.target.y)) })
                    .style("stroke","#828282")
                    .style("stroke-width", function(d) {
                        if(d.size>1000)
                            return d.size/1000
                        else if(d.size>100)
                            return d.size/100
                        else if(d.size>10)
                            return d.size/10
                        else
                            return d.size || 0.5; });


// 添加点
                node = nodeg.selectAll("circle.node").data(net.nodes, nodeid);
                // console.log("net.nodes",net.nodes)
                
                node.exit().remove();
                // var gg1=    node.enter()
                //     .append("g")
                //     .attr("class",function(d) { 
                //         return "g" + d.index; });
                
                node.enter().append("circle")
                    .attr("id",svgName)
                    .attr("class", function(d) { return "node" + (d.size?"":" leaf"); })
                    .attr("r", function(d) {
                        // console.log("d.size/2",d.size); 
                        return d.size ? d.size/dr + 15 : dr+1; })
                    .attr("cx", function(d) {
                       return d.x; })
                    .attr("cy", function(d) {
                        
                        return d.y; })
                   
                    .classed("fixed",true)
                    .style("fill", function(d) { return fill(d.group); })
                    .style("stroke","#555")
                    .style("stroke-width", function(d){
                        if(arguments[0].size>1){
                            // console.log("超点,聚集了",arguments[0].size)
                            return 4;
                        }
                        else{
                            return 0;
                        }
                    })
                    .attr("p",function(d){return d.group})
                    .attr("pname",function(d){return  setTimeout(() => {
                            // console.log("net.nodes",net.nodes[d.index].name)
                            return net.nodes[d.index].name;
                        },0);
                    }
                        )
                    
                    .on("click", function(d) {
                        
                        // console.log("node click1111", d, this);

                        // circle中内容的设置
                        if(d.group!="UserTarget" && d.group!="MovieTarget"){
                        
                            d3v3.selectAll(".text").remove();
                            expand[d.group] = !expand[d.group]; 
                            init(); 

                        }
                        // 点击movieTarget圆圈，查看电影的内容
                        if(d.group=="MovieTarget"){

//  [37, "'M13_1093_入殓师'"]

                            if(this.id=="#force1"){
                                pubsub.publish('UserMovieIndexRight',[_this.oldUserIndex ,_this.oldMovieIndex])
                                  console.log("node click",_this.oldUserIndex ,_this.oldMovieIndex);
                            }
                            else{
                                pubsub.publish('UserMovieIndexRight',[_this.userIndex ,_this.movieIndex])
                                  console.log("node click",_this.userIndex ,_this.movieIndex);

                            }
                           
                        }
                    }) 
                    
                    
                    .on("mouseover",function(d,i){
                        // console.log("主题",d,d.group,_this)

                        if(d.group=="UserTarget"){
                            // console.log("对比",this.id)
                            if(this.id=="#force1"){
                                
                                  d3v3.select(this).append("title")
                                    .text("用户"+_this.oldUserIndex)
                                }
                            else{
                                d3v3.select(this).append("title")
                              .text("用户"+_this.userIndex)
                            }
                            
                            
                        }
                        if(d.group=="MovieTarget"){
                            // console.log("对比",this.id)
                            // console.log("d",d)
                            // console.log("i",i)
                            // console.log("_this",_this)

                            if(this.id=="#force1"){
                                
                                d3v3.select(this).append("title")
                                  .text("推荐"+_this.oldMovieIndex)
                            }
                            else{
                                 d3v3.select(this).append("title")
                                   .text("推荐"+_this.movieIndex)
                            }
                           
                        }
                        else{
                             
                              

                            if(typeof(d.name)=="string"){
                                // console.log("d.name",d.name)

                                d3v3.select(this).append("title")
                                .text(function(){
                                    
                                    if(parseInt(d.name.split(".")[0])>28305){
                                        return d.name
                                    }
                                    else{
                                        return _this.AllInfo[parseInt(d.name.split(".")[0])]
                                    }
                                })
                                // console.log("AllInfo",_this.AllInfo[parseInt(d.name.split(".")[0])])
                            }
                            
                            
                        }                        
                           
                    })
                    .on("mouseleave",function(){
                        d3v3.select(this).selectAll("title").remove()
                        // .attr("stroke-width",8)
                    })




// 添加图像

                nodePic=nodePicg.selectAll("image.img").data(net.nodes, nodeid);
                nodePic.exit().remove();
                  
                  nodePic.enter().append("image")
                    .attr("class","img")
                    .attr("x",function(d,i) {return d.x; }) 
                    .attr("y",function(d,i) {return d.y; })
                    .attr("width", 0)
                    .attr("height",0)
                    .attr("xlink:href",  function(d) {
                        
                        
                        if(d.group=="kube"){
                            // console.log("d",d,typeof(this),this,this.width.baseVal.value); 
                            // 更改宽度和高度
                            this.width.baseVal.value=40
                            this.height.baseVal.value=40
                            // console.log("d",d,typeof(this),this,this.width.baseVal.value); 

                            d3v3.select("this").attr("width", 30)
                                        .attr("height",30)
                            return "https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic1.png";
                            // return "https://img1.doubanio.com/view/photo/l/public/p2805328447.jpg";
                        }
                        else{
                            return ""
                        }
                            })
                    // .attr("xlink:href",  function() {console.log(__filename); return "file://C:/Users/86173/Desktop/XKGAT/src/asserts/pigg.png";})
                    
                        //   .attr('transform','translate(-20,-20)')



// 添加文字
                nodeText =nodeTextg.selectAll("text.node").data(net.nodes, nodeid);
                nodeText.exit().remove();


                  nodeText.enter().append("text")
                  
                    .attr("class", "node")
                    .attr("x",function(d,i) {return d.x; }) 
                    .attr("y",function(d,i) {return d.y; })
                    .attr("dx",-6)
                    .attr("dy",5)
                    .style('font-size', 15)
                    .style('font-family', 'Arial')
                    
                    .style('fill', 'black')
                    .text(function(d,i) {
                        // console.log("text",d.group)
                        if(d.group=="UserLoad"){
                            return "UL"
                        }
                        if(d.group.substring(0,1)=="G"){
                          // console.log("初始1",(d))
                          // console.log("初始1",parseInt((d.group).replaceAll("Genre","")),countGName)
                          // console.log("添加的文字1",countGName[parseInt((d.group).replaceAll("Genre",""))])
                          d3.select(this).attr("dx",-10).style('font-size', 12).style('fill', 'black')
                          return countGName[parseInt((d.group).replaceAll("Genre",""))]
                        }
                        
                        return d.group.substring(0,1);
                    })

                   
                node.call(force.drag);


                   

                
                var nodeG = node;
                // cx
                  for(var i=0;i<node[0].length;i++){
                    if(node[0][i].firstChild!=null){
                            // console.log("周元博3",i,node,node[0][i])
                            nodeG[0][i]=nodeG[0][i].firstChild;
                            // console.log("周元博31",i,node,node[0][i])

                    }
                        }
                

//力导引开始画图 
                force.on("tick", function() {
                 


                    link.attr("x1", function(d) {
                        
                            if(d.source.group=="UserTarget"){
                                return width/2;
                            }
                            if(d.source.group=="Movie"){
                                return width/2;
                            }
                            return d.source.x; 
                            })

                        .attr("y1", function(d) {
                            if(d.source.group=="UserTarget"){
                                return 50
                            }    
                           if(d.source.group=="Movie"){
                                return 100;
                            }
                            return d.source.y; 
                        })

                        .attr("x2", function(d) { 
                            if(d.target.group=="MovieTarget"){
                                return width/2;
                            }
                            if(d.target.group=="Movie"){
                                return width/2;
                            }
                            return d.target.x; 
                        })
                        .attr("y2", function(d) {
                            if(d.target.group=="MovieTarget"){
                                return height-30
                            } 
                            if(d.target.group=="Movie"){
                                return 100;
                            }
                            return d.target.y; 
                        })
                        .attr("d",function(d) { return Math.sqrt((d.source.x-d.target.x)*(d.source.x-d.target.x)+(d.source.y-d.target.y)*(d.source.y-d.target.y)) })
                    
                        ;

                      
                    node.attr("cx", function(d) {
                        if(d.group=="UserTarget"){
                            return width/2;
                        }
                        if(d.group=="MovieTarget"){
                            return width/2;;
                        }
                        if(d.group=="Movie"){
                                return width/2;
                            }
                        
                       
                         return d.x; })
                        .attr("cy", function(d) {
                        if(d.group=="UserTarget"){
                            return 50;
                        }
                        if(d.group=="MovieTarget"){
                            return height-30;
                        }
                        if(d.group=="Movie"){
                                return 100;
                            }
                        
                         return d.y; })
                         .classed("fixed",true)
                         
                    
                    


                    nodeText.attr("x", function(d) {
                        if(d.group=="UserTarget"){
                            return width/2;
                        }
                        if(d.group=="MovieTarget"){
                            return width/2;
                        }
                        if(d.group=="Movie"){
                            return width/2;
                        }
                       
                        return d.x; })
                        .attr("y", function(d) {
                            if(d.group=="UserTarget"){
                            return 50;
                        }
                        if(d.group=="MovieTarget"){
                            return height-30;
                        }
                        if(d.group=="Movie"){
                            return 100;
                        }
                       
                         return d.y; });


                    nodePic.attr("x", function(d) { return d.x; })
                        .attr("y", function(d) { return d.y; });




   if (!hull.empty()) {
                    hull.data(convexHulls(net.nodes, getGroup, off))
                        .attr("d", drawCluster);
                    }
                        
                });



               
                }

                return vis.node();
                 

            },
    // 解释图
     funExplain(svgName,flowLogsResponse){   
                var _this=this;
                // pauseLoading();
                // console.log("_this",_this)
                console.log("funExplain",flowLogsResponse)
                // 对flowLogsResponse数据进行处理
                var countGName=this.dealToOriginalGraph(flowLogsResponse)[1]
                flowLogsResponse=this.dealToOriginalGraph(flowLogsResponse)[0]
                console.log("解释图里的countGName",this.dealToOriginalGraph(flowLogsResponse));
                // console.log("flowLogsResponse",flowLogsResponse)
                var width = 200
                var height = 400
            
                var  vis=d3v3.select(svgName)
                    
                    .attr("width",width)
                    .attr("height",height)
                    // vis = d3v3.select(DOM.svg(width, height));
                
                var dr = 15,      // 默认点的基础半径
                    off = 15,    // 簇的抵消
                    expand = {}, // 倒下的簇
                    data, net, force, hullg, hull, linkg, link, nodeg, node,
                    nodeTextg,nodeText,nodePicg,nodePic
                    // ,nodeTitleg,nodeTitle
                
                setTimeout(() => {
                    let flowNodes = [];
                    let flowLinks = [];
                    

                    
                    let flowResponse = flowLogsResponse;
                    
               
                  

                   
                    for (let i = 0; i < flowResponse.length; i++) {
                        const flow = flowResponse[i];
                        const sourceFullName =flow.source_name + '.' + flow.source_namespace;
                        const destFullName = flow.dest_name + '.' + flow.dest_namespace;

                        // 把姓名和group压入lowNodes中，没有group_data
                        flowNodes.push({
                        name: sourceFullName,
                        group: flow.source_namespace
                        // group: flow.source_name
                        });

                        flowNodes.push({
                        name: destFullName,
                        group: flow.dest_namespace
                        // group: flow.dest_name
                        });
                    }
                    
                    
                    
                    // flowNodes,去除name和group相同的对象，并且根据name属性重新排序
                    flowNodes = _(flowNodes).uniqBy(x => x.name).sortBy(x => x.name).value();
                    
                   

//    50个边的对应flowNodes，记录下标，这个下标对应flowNodes中的下标，即30个点：
                    for (let i = 0; i < flowResponse.length; i++) {
                        const flow = flowResponse[i];
                        const sourceFullName = flow.source_name + '.' + flow.source_namespace;
                        const sourceIndex = flowNodes.findIndex(x => x.name === sourceFullName);

                        const destFullName = flow.dest_name + '.' + flow.dest_namespace;
                        const destIndex = flowNodes.findIndex(x => x.name === destFullName);
                        
                        flowLinks.push({
                        source: sourceIndex,
                        target: destIndex,
                        value: 1000,
                        });
                    }


                    flowLinks = _(flowLinks).value();
                    

                    data = {
                        links: flowLinks,
                        nodes: flowNodes,
                    };
                    
                
                    for (var i=0; i<data.links.length; ++i) {
                        var o = data.links[i];
                        o.source = data.nodes[o.source];
                        o.target = data.nodes[o.target];
                    }

//   分别对应三个g元素
                    hullg = vis.append("g");
                    linkg = vis.append("g");
                    nodeg = vis.append("g");
                    nodeTextg=vis.append("g");
                    nodePicg=vis.append("g");
                    // nodeTitleg=vis.append("g")
                    

                    init();
 /* 
                    vis.attr("opacity", 1e-6)
                        .transition()
                        .duration(2000)
                        .attr("opacity", 1);


*/
                    }, 0);


// -----------------------------------------------------------------------------

                var curve = d3v3.svg.line()
                    .interpolate("cardinal-closed")
                    .tension(.85);

                var fill = d3v3.scale.category20();


                function nodeid(n) {
                    return n.size ? "_g_"+n.group : n.name;
                }

                function linkid(l) {
                    // console.log("l",l)
                    var u = nodeid(l.source),
                        v = nodeid(l.target);
                    return u<v ? u+"|"+v : v+"|"+u;
                }

                function getGroup(n) { return n.group; }


                // 构建网络可视化
                function network(data, prev, index, expand) {
                        expand = expand || {};
                        var gm = {},    // group map
                            nm = {},    // node map
                            lm = {},    // link map
                            gn = {},    // previous group nodes
                            gc = {},    // previous group centroids
                            nodes = [], // output nodes
                            links = []; // output links

                        // 处理以前的节点用来 重用或计算重心
                        if (prev) {
                            prev.nodes.forEach(function(n) {
                            var i = index(n), o;
                            if (n.size > 0) {
                                gn[i] = n;
                                n.size = 0;
                            } else {
                                o = gc[i] || (gc[i] = {x:0,y:0,count:0});
                                o.x += n.x;
                                o.y += n.y;
                                o.count += 1;
                            }
                            });
                        }

                        // 确定节点
                        for (var k=0; k<data.nodes.length; ++k) {
                            var n = data.nodes[k],
                                i = index(n),
                                l = gm[i] || (gm[i]=gn[i]) || (gm[i]={group:i, size:0, nodes:[]});
                            if (expand[i]) {
                                // 节点应该直接可见
                                nm[n.name] = nodes.length;
                                nodes.push(n);
                                if (gn[i]) {
                                    // 在集群位置放置新节点（加上抖动）
                                    n.x = gn[i].x + Math.random();
                                    n.y = gn[i].y + Math.random();
                                }
                                
                            } 
                            
                            else {
                                // 该节点是已折叠群集的一部分
                                if (l.size == 0) {
                                    // 如果是新簇，则添加到叶节点的质心处的集合和位置
                                    nm[i] = nodes.length;
                                    nodes.push(l);
                                    if (gc[i]) {
                                    l.x = gc[i].x / gc[i].count;
                                    l.y = gc[i].y / gc[i].count;
                                    }
                                }
                                l.nodes.push(n);
                            }
                            
                            // 始终计算组大小，因为我们也使用它来调整力图强度/距离
                        l.size += 1;
                        n.group_data = l;
                        }
                       
                        for (i in gm) { gm[i].link_count = 0; }

                        // 确定边
                        for (k=0; k<data.links.length; ++k) {
                            var e = data.links[k],
                                u = index(e.source),
                                v = index(e.target);
                                if (u != v) {
                                    gm[u].link_count++;
                                    gm[v].link_count++;
                                }
                                u = expand[u] ? nm[e.source.name] : nm[u];
                                v = expand[v] ? nm[e.target.name] : nm[v];
                                i = (u<v ? u+"|"+v : v+"|"+u),
                                l = lm[i] || (lm[i] = {source:u, target:v, size:0});
                                l.size += 1;
                        }

                        for (i in lm) { links.push(lm[i]); }

                        return {nodes: nodes, links: links};
                }


                function convexHulls(nodes, index, offset) {
                        var hulls = {};

                        // create point sets
                        for (var k=0; k<nodes.length; ++k) {
                            var n = nodes[k];
                            if (n.size) continue;
                            var i = index(n),
                                l = hulls[i] || (hulls[i] = []);
                            l.push([n.x-offset, n.y-offset]);
                            l.push([n.x-offset, n.y+offset]);
                            l.push([n.x+offset, n.y-offset]);
                            l.push([n.x+offset, n.y+offset]);
                        }

                        // create convex hulls
                        var hullset = [];
                        for (i in hulls) {
                            hullset.push({group: i, path: d3v3.geom.hull(hulls[i])});
                        }

                return hullset;
                }

                function drawCluster(d) {
                     return curve(d.path); // 0.8
                }
           



                
                function init() {

                if (force) {
                    force.stop();
                }

// 确定点和边，计算重心等
                net = network(data, net, getGroup, expand);

                // console.log("net",net)
                // console.log("nodeid",nodeid)
                

// 力导引图的参数
                force = d3v3.layout.force()
                        .nodes(net.nodes)
                        .links(net.links)
                        .size([width, height*0.8])
                        // .linkDistance(50)
                        .linkDistance(function(l) {
                        var n1 = l.source, n2 = l.target;
                        
                        if(n1.group=="UserTarget"&&n2.group=="Movie"){
                            // console.log("n1",n1.group,"n2",n2.group)
                            return 0
                        }
                        else{
                             return 500
                        }
                       
                        })
                        .linkStrength(function(l, i) {
                        return 0;
                        }) 
                        .gravity(0.8)   // gravity+charge tweaked to ensure good 'grouped' view (e.g. green group not smack between blue&orange, ...
                        
                          // gravity+charge tweaked to ensure good 'grouped' view (e.g. green group not smack between blue&orange, ...
                        // .charge(-600)    // ... charge is important to turn single-linked groups to the outside
                        .charge(-200)    // ... charge is important to turn single-linked groups to the outside
                        .friction(0.8)   // friction adjusted to get dampened display: less bouncy bouncy ball [Swedish Chef, anyone?]
                        
                        .start(0.01)
                        


                hullg.selectAll("path.hull").remove();


// hull是超点的簇
                hull = hullg.selectAll("path.hull")
                    .data(function(){
                        // console.log("net.nodes",net.nodes);
                        // console.log("getGroup",getGroup, );
                        // console.log("off",off);
                        // console.log("convexHulls(net.nodes, getGroup, off)",convexHulls(net.nodes, getGroup, off));
                        return convexHulls(net.nodes, getGroup, off)})

                    .enter().append("path")
                    .attr("class", "hull")
                    .attr("d", drawCluster)
                    .style("fill", function(d) { return fill(d.group); })
                    // .style("stroke-width",0.5)
                    .style("fill-opacity",0.3)
                    .on("click", function(d) {

                        

                        d3v3.selectAll(".text").remove();

                    expand[d.group] = false; init();
                    });

// 添加边
                link = linkg.selectAll("line.link").data(net.links, linkid);
                link.exit().remove();

                link.enter().append("line")
                    .attr("class", "link")
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; })
                    .attr("d",function(d) { return Math.sqrt((d.source.x-d.target.x)*(d.source.x-d.target.x)+(d.source.y-d.target.y)*(d.source.y-d.target.y)) })
                    .style("stroke","#828282")
                    .style("stroke-width", function(d) {
                        if(d.size>1000)
                            return d.size/1000
                        else if(d.size>100)
                            return d.size/100
                        else if(d.size>10)
                            return d.size/10
                        else
                            return d.size || 0.5; });


// 添加点
                node = nodeg.selectAll("circle.node").data(net.nodes, nodeid);
                // console.log("net.nodes",net.nodes)
                
                node.exit().remove();
                // var gg1=    node.enter()
                //     .append("g")
                //     .attr("class",function(d) { 
                //         return "g" + d.index; });
                
                node.enter().append("circle")
                    .attr("id",svgName)
                    .attr("class", function(d) { return "node" + (d.size?"":" leaf"); })
                    .attr("r", function(d) {
                        // console.log("d.size/2",d.size); 
                        return d.size ? d.size/dr + 15 : dr+1; })
                    .attr("cx", function(d) {
                       return d.x; })
                    .attr("cy", function(d) {
                        
                        return d.y; })
                   
                    .classed("fixed",true)
                    .style("fill", function(d) { return fill(d.group); })
                    .style("stroke","#555")
                    .style("stroke-width", function(d){
                        if(arguments[0].size>1){
                            // console.log("超点,聚集了",arguments[0].size)
                            return 4;
                        }
                        else{
                            return 0;
                        }
                    })
                    .attr("p",function(d){return d.group})
                    .attr("pname",function(d){return  setTimeout(() => {
                            // console.log("net.nodes",net.nodes[d.index].name)
                            return net.nodes[d.index].name;
                        },0);
                    }
                        )
                    
                    .on("click", function(d) {
                        
                        // console.log("node click1111", d, this);

                        // circle中内容的设置
                        if(d.group!="UserTarget" && d.group!="MovieTarget"){
                        
                            d3v3.selectAll(".text").remove();
                            expand[d.group] = !expand[d.group]; 
                            init(); 

                        }
                        // 点击movieTarget圆圈，查看电影的内容
                        if(d.group=="MovieTarget"){

//  [37, "'M13_1093_入殓师'"]

                            if(this.id=="#force1"){
                                pubsub.publish('UserMovieIndexRight',[_this.oldUserIndex ,_this.oldMovieIndex])
                                  console.log("node click",_this.oldUserIndex ,_this.oldMovieIndex);
                            }
                            else{
                                pubsub.publish('UserMovieIndexRight',[_this.userIndex ,_this.movieIndex])
                                  console.log("node click",_this.userIndex ,_this.movieIndex);

                            }
                           
                        }
                    }) 
                    
                    
                    .on("mouseover",function(d,i){
                        // console.log("主题",d,d.group,_this)

                        if(d.group=="UserTarget"){
                            // console.log("对比",this.id)
                            if(this.id=="#force1"){
                                
                                  d3v3.select(this).append("title")
                                    .text("用户"+_this.oldUserIndex)
                                }
                            else{
                                d3v3.select(this).append("title")
                              .text("用户"+_this.userIndex)
                            }
                            
                            
                        }
                        if(d.group=="MovieTarget"){
                            // console.log("对比",this.id)
                            // console.log("d",d)
                            // console.log("i",i)
                            // console.log("_this",_this)

                            if(this.id=="#force1"){
                                
                                d3v3.select(this).append("title")
                                  .text("推荐"+_this.oldMovieIndex)
                            }
                            else{
                                 d3v3.select(this).append("title")
                                   .text("推荐"+_this.movieIndex)
                            }
                           
                        }
                        else{
                             
                              

                            if(typeof(d.name)=="string"){
                                // console.log("d.name",d.name)

                                d3v3.select(this).append("title")
                                .text(function(){
                                    
                                    if(parseInt(d.name.split(".")[0])>28305){
                                        return d.name
                                    }
                                    else{
                                        return _this.AllInfo[parseInt(d.name.split(".")[0])]
                                    }
                                })
                                // console.log("AllInfo",_this.AllInfo[parseInt(d.name.split(".")[0])])
                            }
                            
                            
                        }                        
                           
                    })
                    .on("mouseleave",function(){
                        d3v3.select(this).selectAll("title").remove()
                        // .attr("stroke-width",8)
                    })




// 添加图像

                nodePic=nodePicg.selectAll("image.img").data(net.nodes, nodeid);
                nodePic.exit().remove();
                  
                  nodePic.enter().append("image")
                    .attr("class","img")
                    .attr("x",function(d,i) {return d.x; }) 
                    .attr("y",function(d,i) {return d.y; })
                    .attr("width", 0)
                    .attr("height",0)
                    .attr("xlink:href",  function(d) {
                        
                        
                        if(d.group=="kube"){
                            // console.log("d",d,typeof(this),this,this.width.baseVal.value); 
                            // 更改宽度和高度
                            this.width.baseVal.value=40
                            this.height.baseVal.value=40
                            // console.log("d",d,typeof(this),this,this.width.baseVal.value); 

                            d3v3.select("this").attr("width", 30)
                                        .attr("height",30)
                            return "https://raw.githubusercontent.com/jienagu/Picture_gif_Personal_Web/master/network_pic1.png";
                            // return "https://img1.doubanio.com/view/photo/l/public/p2805328447.jpg";
                        }
                        else{
                            return ""
                        }
                            })
                    // .attr("xlink:href",  function() {console.log(__filename); return "file://C:/Users/86173/Desktop/XKGAT/src/asserts/pigg.png";})
                    
                        //   .attr('transform','translate(-20,-20)')



// 添加文字
                nodeText =nodeTextg.selectAll("text.node").data(net.nodes, nodeid);
                nodeText.exit().remove();


                  nodeText.enter().append("text")
                  
                    .attr("class", "node")
                    .attr("x",function(d,i) {return d.x; }) 
                    .attr("y",function(d,i) {return d.y; })
                    .attr("dx",-6)
                    .attr("dy",5)
                    .style('font-size', 15)
                    .style('font-family', 'Arial')
                    
                    .style('fill', 'black')
                    .text(function(d,i) {
                        // console.log("text",d.group)
                        if(d.group=="UserLoad"){
                            return "UL"
                        }
                        if(d.group.substring(0,1)=="G"){
                          // console.log("初始2",(d))
                          // console.log("初始2",parseInt((d.group).replaceAll("Genre","")),countGName)
                          // console.log("添加的文字2",countGName[parseInt((d.group).replaceAll("Genre",""))])
                          d3.select(this).attr("dx",-10).style('font-size', 12).style('fill', 'black')
                          return countGName[parseInt((d.group).replaceAll("Genre",""))]
                        }
                        
                        return d.group.substring(0,1);
                    })

                   
                node.call(force.drag);


                   

                
                var nodeG = node;
                // cx
                  for(var i=0;i<node[0].length;i++){
                    if(node[0][i].firstChild!=null){
                            // console.log("周元博3",i,node,node[0][i])
                            nodeG[0][i]=nodeG[0][i].firstChild;
                            // console.log("周元博31",i,node,node[0][i])

                    }
                        }
                

//力导引开始画图 
                force.on("tick", function() {
                 


                    link.attr("x1", function(d) {
                        
                            if(d.source.group=="UserTarget"){
                                return width/2;
                            }
                            if(d.source.group=="Movie"){
                                return width/2;
                            }
                            return d.source.x; 
                            })

                        .attr("y1", function(d) {
                            if(d.source.group=="UserTarget"){
                                return 50
                            }    
                           if(d.source.group=="Movie"){
                                return 100;
                            }
                            return d.source.y; 
                        })

                        .attr("x2", function(d) { 
                            if(d.target.group=="MovieTarget"){
                                return width/2;
                            }
                            if(d.target.group=="Movie"){
                                return width/2;
                            }
                            return d.target.x; 
                        })
                        .attr("y2", function(d) {
                            if(d.target.group=="MovieTarget"){
                                return height-30
                            } 
                            if(d.target.group=="Movie"){
                                return 100;
                            }
                            return d.target.y; 
                        })
                        .attr("d",function(d) { return Math.sqrt((d.source.x-d.target.x)*(d.source.x-d.target.x)+(d.source.y-d.target.y)*(d.source.y-d.target.y)) })
                    
                        ;

                      
                    node.attr("cx", function(d) {
                        if(d.group=="UserTarget"){
                            return width/2;
                        }
                        if(d.group=="MovieTarget"){
                            return width/2;;
                        }
                        if(d.group=="Movie"){
                                return width/2;
                            }
                        
                       
                         return d.x; })
                        .attr("cy", function(d) {
                        if(d.group=="UserTarget"){
                            return 50;
                        }
                        if(d.group=="MovieTarget"){
                            return height-30;
                        }
                        if(d.group=="Movie"){
                                return 100;
                            }
                        
                         return d.y; })
                         .classed("fixed",true)
                         
                    
                    


                    nodeText.attr("x", function(d) {
                        if(d.group=="UserTarget"){
                            return width/2;
                        }
                        if(d.group=="MovieTarget"){
                            return width/2;
                        }
                        if(d.group=="Movie"){
                            return width/2;
                        }
                       
                        return d.x; })
                        .attr("y", function(d) {
                            if(d.group=="UserTarget"){
                            return 50;
                        }
                        if(d.group=="MovieTarget"){
                            return height-30;
                        }
                        if(d.group=="Movie"){
                            return 100;
                        }
                       
                         return d.y; });


                    nodePic.attr("x", function(d) { return d.x; })
                        .attr("y", function(d) { return d.y; });




   if (!hull.empty()) {
                    hull.data(convexHulls(net.nodes, getGroup, off))
                        .attr("d", drawCluster);
                    }
                        
                });



               
                }

                return vis.node();
                 

            }       

  },

  mounted(){

            // 读取文件
            // 保存演员,导演等信息
            var path="http://localhost:5000/getInfo"
            axios.get(path)
            .then(res=>{
                res.data=(res.data.replaceAll("[","").replaceAll("]","")).split("间隔")
                // console.log("res11",res.data)
                this.MovieInfo=res.data[0].split("\\n")

//     #             # [0-12385] 电影
//     #             # [12386-21983] 演员
//     #             # [21984-28270] 导演
//     #             # [28271-28305] 类型
//     #             # [28306-37927]  用户

                // 电影
                this.MovieInfo[0]=this.MovieInfo[0].split(",")
                this.AllInfo.push(this.MovieInfo[0][1])
                for(var i=1;i<(this.MovieInfo).length-1;i++){
                    this.MovieInfo[i]=this.MovieInfo[i].split(",")
                    this.AllInfo.push(this.MovieInfo[i][2])
                }

                // 演员
                this.ActorInfo=res.data[1].split("\\n")
                // console.log("this.ActorInfo",this.ActorInfo)
                
                // eslint-disable-next-line no-redeclare
                for(var i=0;i<this.ActorInfo.length-1;i++){
                    this.AllInfo.push((this.ActorInfo[i]).replaceAll("', '","").replaceAll("'",""))
                }
                

                // 导演
                this.DirectorInfo=res.data[2].split("\\n")
                for(var i=0;i<this.DirectorInfo.length-1;i++){
                    this.AllInfo.push((this.DirectorInfo[i]).replaceAll("', '","").replaceAll("'",""))
                }

                // 类型
                this.GenreInfo=(res.data[3]).split("\\n")
                for(var i=0;i<this.GenreInfo.length-1;i++){
                    this.AllInfo.push((this.GenreInfo[i]).replaceAll("', '","").replaceAll("'",""))
                }
                
                
              

                // console.log("AllInfo",this.AllInfo)
            })


            // // 发送电影id，获取用户和推荐电影的路径图
            // var flowLogsResponse1=[]
                                    
            // var path="http://localhost:5000/MovieIndex"
            // // console.log("_this.UserIndex",_this.MovieIndex)
            // // 用户3721的推荐电影0-19
            // path +=`?UserMovieIndex=${[3721,0]}`;
            // axios.get(path)
            // .then(res=>{
            //         // 处理当res.data为空的情况
            //         res.data=(res.data).replaceAll("[","").replaceAll("]","").replaceAll("{","").replaceAll(/'/g, '"')
            //         res.data=res.data.split("},")
            //         res.data.pop()
            //       //  console.log("(res.data)",(res.data))  
            //     for(var t=0;t<(res.data).length;t++){
            //         // console.log("t",t)
            //         res.data[t]=(res.data[t]).replaceAll("{","").replaceAll("}","").replaceAll(/[\n\r]/g,"")
            //         res.data[t]="{"+res.data[t]+"}"
            //         // console.log("你觉得呢",typeof((res.data[t])),(res.data[t]))

            //         // console.log("你觉得呢",typeof(JSON.parse(res.data[t])),JSON.parse(res.data[t]))
            //         flowLogsResponse1.push(JSON.parse(res.data[t]))
            //     }
            //         // console.log("res.data_movieIndex",typeof(res.data),res.data[0])  
            //         // console.log("flowLogsResponse1",flowLogsResponse1) 
            //         // 对象的深拷贝
            //         // let result = JSON.parse(JSON.stringify(flowLogsResponse1));
            //         var convey1=JSON.parse(JSON.stringify(flowLogsResponse1));
            //         var convey2=JSON.parse(JSON.stringify(flowLogsResponse1));
            //         console.log("用户0的推荐的第0部电影flowLogsResponse",convey1,convey2) 
            //         // 推荐原始图
            //         d3.select("#drawPie").selectAll("g").remove()
            //         console.log("推荐图传入的数据",convey1);
            //         this.funOriginal("#drawPie",convey1)
                    
            //         // // 解释图
            //         d3.select("#compareBar").selectAll("g").remove()
            //         console.log("解释图传入的数据",convey2);
            //         this.funExplain("#compareBar",convey2)

            // })


                          
                          var _this=this
                          var path="http://localhost:5000/GroupsExplain"
                          axios.get(path)
                          .then(res=>{
                              res.data=res.data.split("next")
                              
                              var groupA=_this.dealpyData(res.data[0])
                              var groupB=_this.dealpyData(res.data[1])
                              var labelA=["剧情","动作"]
                              var labelB=["剧情","喜剧"]
                              // console.log(groupA);
                              // console.log(groupB);
                              // 传入数组，传入类型，把数组按类型排序
                              var sortGroupA=this.sortGroupFun(groupA,labelA)
                              var sortGroupB=this.sortGroupFun(groupB,labelB)
                              // 排序后的用户群AB
                              // console.log("sortGroupA",sortGroupA);
                              // console.log("sortGroupB",sortGroupB);


                               // 画列向圆
                              var oneGraph_x=[30,30,30,30,30,  30,30,30,30,30,  30,30,30,30,30,  30,30,30,30,30,]
                              var oneGraph_y=[25,25,25,25,25,  50,50,50,50,50,  75,75,75,75,75,  100,100,100,100,100]

                              // 用户群A
                              for(var i=0;i<sortGroupA.length;i++){
                                // 添加用户，看过电影
                                var oneExplainGraphNodeType=[0,1]//表示点的类型
                                for(var j=0;j<sortGroupA[i].length;j++){
                                  for(var p=0;p<_this.allFatureName.length;p++){
                                    if(sortGroupA[i][j]==_this.allFatureName[p]){
                                        oneExplainGraphNodeType.push(p+2)
                                        break;
                                    }
                                  }
                                }
                                // 添加推荐电影
                                oneExplainGraphNodeType.push(_this.nodeType.length-1)
                                // console.log("oneExplainGraphNodeType",oneExplainGraphNodeType);
                                this.drawExplainResults(".explainResultsA",oneExplainGraphNodeType,30,25*parseInt(i/5),i)

                                      



                              }



                              // // 用户群B
                              // for(var i=0;i<sortGroupB.length;i++){
                              //   // 添加用户，看过电影
                              //   var oneExplainGraphNodeType=[0,1]//表示点的类型
                              //   for(var j=0;j<sortGroupB[i].length;j++){
                              //     for(var p=0;p<_this.allFatureName.length;p++){
                              //       if(sortGroupB[i][j]==_this.allFatureName[p]){
                              //           oneExplainGraphNodeType.push(p+2)
                              //           break;
                              //       }
                              //     }
                              //   }
                              //   // 添加推荐电影
                              //   oneExplainGraphNodeType.push(_this.nodeType.length-1)
                              //   // console.log("oneExplainGraphNodeType",oneExplainGraphNodeType);
                              //   this.drawExplainResults(".explainResultsB",oneExplainGraphNodeType,30,25*parseInt(i/5),i)
                              // }
                             

                          })
                        
          

              // })

              
              


              // // 用户群B
              // for(var i=0;i<4;i++){
              //   // 画圆的起始xy坐标，是要平移的参数：一行画五个，画四行共20个，
                
              //   var oneExplainGraphNodeType=[0,1,2,4,5]//表示点的类型
              //   this.drawExplainResults(".explainResultsB",oneExplainGraphNodeType,oneGraph_x[i],oneGraph_y[i],i)
              // }
              // for(var i=4;i<10;i++){
              //   // 画圆的起始xy坐标，是要平移的参数：一行画五个，画四行共20个，
                
              //   var oneExplainGraphNodeType=[0,1,2,3,4,5]//表示点的类型
              //   this.drawExplainResults(".explainResultsB",oneExplainGraphNodeType,oneGraph_x[i],oneGraph_y[i],i)
              // }
              // for(var i=10;i<20;i++){
              //   // 画圆的起始xy坐标，是要平移的参数：一行画五个，画四行共20个，
                
              //   var oneExplainGraphNodeType=[0,1,3,4,5]//表示点的类型
              //   this.drawExplainResults(".explainResultsB",oneExplainGraphNodeType,oneGraph_x[i],oneGraph_y[i],i)
              // }

    
    
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

<style scoped>
#newPanel0l{
  border:1px solid red;
}
.showExplainButtonDiv{
  margin-left: 10%;
  /* float:left; */
}
.explainRe{
  width:100%;
  height:68%;
  overflow-y:auto;
}
.explainResultsA{
  padding-left: 1%;
  padding-right: 0%;
  margin-top: 5%;
  float:left;
  /* width: 46%; */
  width: 48%;
  height:100%;
  border-right:4px solid #dedede;
}
.explainResultsB{
  padding-left: 4%;
  margin-top: 5%;
  /* margin-right:5%; */
  float:left;
  /* width: 44%; */
  width: 46%;
  height:300px;
}
.detailPanel{
  float:left;
  /* visibility: hidden; */
  /* display: none; */
}
.drawSvg{
  width: 200px;
  height:400px;
}
</style>

