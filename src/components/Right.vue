<template>
  <div class="right">
    <div style="background-color:#54759e;color:white;height:23px;">
        Explain Results
    </div>
    <!-- 操作栏 -->
    <div class="operate">
        <!-- 统计数值 -->
        <div class="ststistic">
            <el-row :gutter="20">
                    <el-col :span="2">
                        <div>
                        <el-statistic group-separator=","  :value="value11"  :title="title11"></el-statistic>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div>
                        <el-statistic group-separator=","  :value="value12" :title="title12"></el-statistic>
                        </div>
                    </el-col>

                    <!-- <el-col :span="6">
                        <div>
                        <el-statistic title="男女比">
                            <template slot="formatter"> 456/2 </template>
                        </el-statistic>
                        </div>
                    </el-col> -->

                    <!-- <el-col :span="6">
                        <div>
                        <el-statistic group-separator=","  decimal-separator="." :value="value2" :title="title">
                            <template slot="prefix">
                            <i class="el-icon-s-flag" style="color: red"></i>
                            </template>
                            <template slot="suffix">
                            <i class="el-icon-s-flag" style="color: blue"></i>
                            </template>
                        </el-statistic>
                        </div>
                    </el-col> -->
                    <el-col :span="5">
                        <div>
                            <!-- <el-statistic :value="like ? 521 : 520" title="Feedback">
                                <template slot="suffix">
                                <span @click="like = !like" class="like">
                                    <i class="el-icon-star-on" style="color:red" v-show="!!like"></i>
                                    <i class="el-icon-star-off" v-show="!like"></i>
                                </span>
                                </template>
                            </el-statistic> -->

                            <!-- 是否框选关键模式节点 -->
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
                    </el-col>
                    
                    <el-col :span="4">
                             <el-input-number v-model="nodeNumber" controls-position="right" @change="handleChange" :min="1" :max="4" size="small"></el-input-number>
                    </el-col>
            
                     <el-col :span="4" v-show="valueShow">
                        <div>
                        <el-statistic group-separator=","  :value="value21" :title="title21"></el-statistic>
                        </div>
                    </el-col>

                    <el-col :span="3" v-show="valueShow">
                        <div>
                        <el-statistic group-separator=","  :value="value22" :title="title22"></el-statistic>
                        </div>
                    </el-col>


                   
            </el-row>
             
        </div>
      
    
    </div>

    <!-- 解释结果图 -->
    <div class="explainRe">
          <!-- 用户群A -->
          <div class="explainResultsA" id="userView">
      
          </div>
            <!-- 用户群B -->
         <div class="explainResultsB" >
        

                <!-- 如果是用户，才显示 -->
                <div class="MovieDeatils" width="200" height="200"  style="float:left;font-size: 8px;color:#000000;font-family: fangsong" v-show="showMovie">
                                <!-- 电影海报信息 -->
                                <!-- 如果显示403 Forbidden  说明源地址加了防盗链 ：在引用链接时,浏览器对地址发起请求加上了refre这个请求头,而有些服务器能根据refre反盗所以引用失败返回403 -->
                                <meta name="referrer" content="no-referrer" />
                                <p><font size="3" color="#606266"><b>&nbsp;&nbsp;&nbsp;&nbsp;{{itemName}}</b></font></p>
                                <div class="pic" style="margin-left:40px;">
                                    <img id="recpicShow" src="../assets/movie.png" width="100" height="150" alt="" style="margin-top:10px;"/>
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
    <!-- 结果评估图 :popper-append-to-body="true" :row-style="{height:'32px'}" :cell-style="cellStyle" border :header-cell-style="{height:'50px',color:'#000000',fontFamily:'STSong'}"-->
    
        <div class="evaluation" @click="evaluation()">
                <div class="evaluationText">结果评估</div>
        </div>

    <div class="measureView" v-show="showMeasure" >
        <svg id="measureSvg"></svg>

        <!-- <div class="measureViewl">
            <el-table
                :data="tableData"
                style="width: 100%;font-size: 13px;color:#000000;font-family: fangsong"
                :header-cell-style="{height:'25px',color:'#000000',padding:'4px'}"
                :cell-style="{padding:'8px'}"
                >
                <el-table-column
                prop="date"
                label="ExplainPattern"
                width="230">
                </el-table-column>

                <el-table-column
                prop="name"
                label="N"
                sortable
                width="80">
                </el-table-column>

                <el-table-column
                prop="address"
                label="P"
                width="80">
                </el-table-column>
            </el-table>
        </div>
        <div class="measureViewr">
            <el-table
                :data="tableData1"
                style="width: 100%;font-size: 13px;color:#000000;font-family: fangsong"
                :header-cell-style="{ background:'#fafafa',height:'25px',color:'#000000',padding:'4px'}"
                :cell-style="{padding:'8px'}"
                >
                <el-table-column
                prop="date"
                label="ExplainPattern"
                width="230">
                </el-table-column>

                <el-table-column
                prop="name"
                label="N"
                sortable
                width="80">
                </el-table-column>

                <el-table-column
                prop="address"
                label="P"
                width="80">
                </el-table-column>
            </el-table>
        </div> -->
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
// import closeImg from "../assets/close.png"
import closeImg from "../components/css/close.png"
import { pointer } from 'd3';
export default {
  name: 'Right',
  props: {
  },
  data(){
    return {
        // 表格数据
         tableData: [{
          date: '剧情',
          name: 91,
          address: '100%'
        }, {
          date: '喜剧',
          name: 85,
          address: '85%'
        }, {
          date: '动作',
          name: 80,
          address: '80%'
        }, {
          date: '剧情，喜剧',
          name: 60,
          address: '60%'
        }],
         tableData1: [{
          date: '剧情',
          name: 89,
          address: '100%'
        }, {
          date: '喜剧',
          name: 85,
          address: '85%'
        }, {
          date: '爱情',
          name: 80,
          address: '80%'
        }, {
          date: '剧情，爱情',
          name: 60,
          address: '60%'
        }],
        // 是否展示表格
        showMeasure:false,
        // 用户群A
        value11: "",
        value12: "",
        // 用户群/用户
        title11:"  ",
        // 图模式
        title12:"  ",


        // 用户群B
        value21: "",
        value22: "",
        valueShow:true,
        // 用户群/用户
        title21:"  ",
        // 图模式
        title22:"  ",

        like: true,
        
        title: '用户数量',

        ShowExplainButton: false,
        groupsInfo:[],
        //所有的类型 
        allFatureName:['剧情', '犯罪', '情色', '喜剧', '爱情', '动作', '西部', '冒险', '音乐', '传记', '悬疑', '惊悚', '恐怖',
        '纪录片', '历史', '战争', '奇幻', '运动', '同性', '动画', '短片', '儿童', '歌舞', '科幻', '家庭',
        '武侠', '古装', '灾难', '真人秀', '黑色电影', '脱口秀', '戏曲', '舞台艺术', '鬼怪', '荒诞','导演','演员','电影'],
        // nodeType:["#5576a1","#aacee8","#fbba76","#58a74b", "#b15928", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a",  "#b2df8a", "#33a02c",'#38382e', '#10108b', '#35ccb1', '#0c729f','#061b28', '#5bc0f0','#460a7b', '#187a99','#ff99ff',"#00ff99","#8A8A8A","#ffff00","	#FFE1FF","	#EED8AE","	#B03060","#8B7D7B","#7CFC00","#6499ED",'#062d97', '#11b576', '#1658fa', '#936b23', '#07542d', '#48b7fa', '#0eedf0', '#7f2133', '#80ee65', '#160b04', 'grey'],
        nodeType:["rgb(255, 127, 14)","rgb(31, 119, 180)","#fbba76","#a6cee3", "#b15928", "#fb9a99", "#e31a1c","#cab2d6", "#ff7f00",  "yellow", "#6a3d9a",  "#b2df8a", "#33a02c",'#38382e', '#10108b', '#35ccb1', '#0c729f','#061b28', '#5bc0f0','#460a7b', '#187a99','#ff99ff',"#00ff99","#8A8A8A","#ffff00","	#FFE1FF","	#EED8AE","	#B03060","#8B7D7B","#7CFC00","#6499ED",'#062d97', '#11b576', '#1658fa', '#936b23', '#07542d', '#48b7fa', '#0eedf0', '#7f2133', '#80ee65', '#160b04', 'rgb(174, 199, 232)'],
        // 用户群颜色
        colorArr:["#a6cee3", "#b15928", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a",  "#b2df8a", "#33a02c",'#38382e', '#10108b', '#35ccb1', '#0c729f','#061b28', '#5bc0f0','#460a7b', '#187a99','#ff99ff',"#00ff99","#8A8A8A","#ffff00","	#FFE1FF","	#EED8AE","	#B03060","#8B7D7B","#7CFC00","#6499ED",'#062d97', '#11b576', '#1658fa', '#936b23', '#07542d', '#48b7fa', '#0eedf0', '#7f2133', '#80ee65', '#160b04', ],

        // 所有的节点
        AllInfo:[],
        // 选择的对比用户群的下标
        conveyGroupCompare:[],
        // 选择的用户群的所有用户
        clustGroups:[],
        // 后端传递的两个对比用户群的数据
        flowDataA:[],
        flowDataB:[],
        // 两个对比用户群的解释关键节点
        keynode:[],
        // 每个用户群排名前三的类型
        thirdName:[],
        thirdNameIndex:[],
        // 控制解释缩略图和细节图显示的关键节点个数
        // nodeNumber:2,
        nodeNumber:1,
        // 加载显示解释图细节的个数，太多了，防止后端太卡，太慢
        showDetailPanelData:5,
         
        //  用于结果对比的数组
        measureData:[[],[]],
        measureResults:[[],[],[],[]],
        measureSvgData:[],
        // 给用户 推荐的电影ID
        userRecId:[],
        // 某电影海报
        itemName:"",
        itemsName:["导演","主演","类型","上映","标签","评分"],
        items:[],
        showMovie:false,
        // 所有电影的详细信息
        allMovieDetails:[],
    }
  },
  methods:{
    handleChange(value) {
        this.nodeNumber=value
      },
    multiplyNode(node, count, deep) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = node.cloneNode(deep);
        node.parentNode.insertBefore(copy, node);
    }
    },

      // 计算列向圆数据，根据用户群id 
    drawExplainCircle(){
          // 提前后端计算所有的力导引数据，并保存.    先计算前4个图的连接图
                   

                    var _this=this
                    var path="http://localhost:5000/GroupsExplain"
                    // console.log("用户群",this.conveyGroupCompare);
                    // 传递的是用户
                    if(typeof(this.conveyGroupCompare)=="number"){
                        path +=`?UserGroupIndex=${"U"+this.conveyGroupCompare}`;
                    }
                    // 传递的是用户群
                    else{
                        path +=`?UserGroupIndex=${this.conveyGroupCompare}`;
                    }
                    
                    axios.get(path)
                    .then(res=>{
                        
                        // res.data是模型的解释图结果排序
                        console.log("res.data",res.data!="")
                        if(res.data!=""){
                                res.data=res.data.split("next")
                                
                                var groupA=_this.dealpyData(res.data[0])
                                var groupB=_this.dealpyData(res.data[1])
                                // var labelA=["剧情","动作","喜剧"]
                                // var labelB=["剧情","喜剧","爱情"]
                                console.log("_this.thirdName",_this.thirdName,_this.nodeNumber)
                                var labelA=_this.thirdName.slice(0,_this.nodeNumber)
                                var labelB=_this.thirdName.slice(3,3+_this.nodeNumber)
                                console.log("labelA1labelA1",labelA,labelB);
                                console.log("groupA",groupA);
                                console.log("groupB",groupB);
                                // 传入数组，传入类型，把数组按类型排序
                                
                                var sortGroupA=[]
                                var sortGroupB=[]
                                var sortedIndexA=[]
                                var sortedIndexB=[]
                                if(typeof(this.conveyGroupCompare)=="number"){
                                    sortGroupA=this.sortGroupFunUser(groupA,labelA)
                                    sortGroupB=this.sortGroupFunUser(groupB,labelB)
                                    sortedIndexA=sortGroupA.map(row => row[sortGroupA[0].length-1]);
                                    sortedIndexB=sortGroupB.map(row => row[sortGroupA[0].length-1]);
                                }
                                else{
                                    sortGroupA=this.sortGroupFun(groupA,labelA)
                                    sortGroupB=this.sortGroupFun(groupB,labelB)
                                    sortedIndexA=sortGroupA.map(row => row[sortGroupA[0].length-1]);
                                    sortedIndexB=sortGroupB.map(row => row[sortGroupA[0].length-1]);
                                }
                                // 排序后的用户群AB,排序后用户的推荐电影排列顺序改变了，
                                console.log("sortGroupA",sortGroupA);
                                console.log("sortGroupB",sortGroupB);
   
                                console.log("sortedIndexA",sortedIndexA);
                                console.log("sortedIndexB",sortedIndexB);
                                // 画列向圆
                                var oneGraph_x=[30,30,30,30,30,  30,30,30,30,30,  30,30,30,30,30,  30,30,30,30,30,]
                                var oneGraph_y=[25,25,25,25,25,  50,50,50,50,50,  75,75,75,75,75,  100,100,100,100,100]

                                // 如果接收的是用户
                                if(typeof(this.conveyGroupCompare)=="number"){
                                    this.measureData=[[],[]]

                                     d3.select(".explainResultsA").selectAll("svg").remove()
                                        setTimeout(() => {
                                            
                                            console.log("用户的宽度",);
                                            // d3.select(".explainResultsA").attr("width","500px")
                                            (document.getElementsByClassName("explainResultsA"))[0].style.width="500px";
                                            (document.getElementsByClassName("explainResultsB"))[0].style.width="200px";
                                            for(var i=0;i<20;i++){

                                                // 添加用户，看过电影
                                                var oneExplainGraphNodeType=[0,1]//表示点的类型
                                                for(var j=0;j<sortGroupA[i].length;j++){
                                                    for(var p=0;p<_this.allFatureName.length;p++){
                                                    if(sortGroupA[i][j]==_this.allFatureName[p]){
                                                        oneExplainGraphNodeType.push("2"+p)
                                                        break;
                                                    }
                                                    }
                                                }
                                                // 添加推荐电影
                                                // console.log("轮到用户上场了");
                                                this.measureData[0].push(oneExplainGraphNodeType.slice(2))
                                                oneExplainGraphNodeType.push(_this.nodeType.length-1)
                                                // console.log("oneExplainGraphNodeType",oneExplainGraphNodeType);
                                                // console.log("i",i,_this.clustGroups);

                                                // 画列向圆圈, _this.clustGroups[i]是每个用户的id
                                                
                                                this.drawExplainResults(".explainResultsA",oneExplainGraphNodeType,30,25*parseInt(i/5),_this.clustGroups[0],sortedIndexA[i],'A')
                                    
                                    } 
                                                console.log("加载完毕",this.measureData)
                                                // 计算评估结果数据
                                                this.computeMeasure()



                                        }, 1000);
                                    
                                }
                                // 如果接收的是用户群
                                else{

                                    this.measureData=[[],[]]
                                    

                                        // 用户群A
                                        d3.select(".explainResultsA").selectAll("svg").remove()
                                        setTimeout(() => {
                                            _this.showMovie=false;
                                            (document.getElementsByClassName("explainResultsA"))[0].style.width="386px";
                                            (document.getElementsByClassName("explainResultsB"))[0].style.width="340px";
                                            
                                            for(var i=0;i<(_this.clustGroups[0]).length;i++){
                                                // 添加用户，看过电影
                                                var oneExplainGraphNodeType=[0,1]//表示点的类型
                                                for(var j=0;j<sortGroupA[i].length;j++){
                                                    for(var p=0;p<_this.allFatureName.length;p++){
                                                    if(sortGroupA[i][j]==_this.allFatureName[p]){
                                                        oneExplainGraphNodeType.push("2"+p)
                                                        break;
                                                    }
                                                    }
                                                }
                                                // 添加推荐电影
                                                this.measureData[0].push(oneExplainGraphNodeType.slice(2))
                                                oneExplainGraphNodeType.push(_this.nodeType.length-1)
                                                
                                                // console.log("列向圆——用户群——A——数据",oneExplainGraphNodeType);
                                                // console.log("i",i,_this.clustGroups);

                                                // 画列向圆圈, _this.clustGroups[i]是每个用户的id
                                                this.drawExplainResults(".explainResultsA",oneExplainGraphNodeType,30,25*parseInt(i/5),_this.clustGroups[0][i],i,'A')
                                            
                                            } 
                                            if(this.clustGroups.length==1){
                                                console.log("加载完毕",this.measureData)
                                                // 计算评估结果数据
                                                this.computeMeasure()
                                            }
                                            


                            }, 1000);
                                    
                                        // 用户群B
                                        if(this.clustGroups.length>1){
                                            
                                                // 用户群B
                                                d3.select(".explainResultsB").selectAll("svg").remove()
                                                setTimeout(() => {
                                                        for(var i=0;i<(_this.clustGroups[1]).length;i++){
                                                            // 添加用户，看过电影
                                                            var oneExplainGraphNodeType=[0,1]//表示点的类型
                                                            for(var j=0;j<sortGroupB[i].length;j++){
                                                                for(var p=0;p<_this.allFatureName.length;p++){
                                                                if(sortGroupB[i][j]==_this.allFatureName[p]){
                                                                    oneExplainGraphNodeType.push("2"+p)
                                                                    break;
                                                                }
                                                                }
                                                            }
                                                            // 添加推荐电影
                                                            this.measureData[1].push(oneExplainGraphNodeType.slice(2))
                                                            oneExplainGraphNodeType.push(_this.nodeType.length-1)
                                                            
                                                            // console.log("列向圆——用户群——B——数据",oneExplainGraphNodeType);
                                                            this.drawExplainResults(".explainResultsB",oneExplainGraphNodeType,30,25*parseInt(i/5),_this.clustGroups[1][i],i,'B')
                                                    
                                                        }
                                                        console.log("加载完毕",this.measureData)
                                                        // 计算评估结果数据
                                                        this.computeMeasure()
                                                        
                                                }, 1000);
                                                
                                        }
                                }
                            
                                    
                        }
                       
            
                           
                            
            
                        



                })



                

            },

//    计算评估结果数据
computeMeasure(){
    this.measureResults=[[],[],[],[]]
    this.measureSvgData=[]
    // 单个用户群
    if(this.clustGroups.length==1){
                // 组合-1个
                var justOne11=this.measureData[0].flat()
                var frequency11 = {}
                for(let i = 0; i < justOne11.length; i++) {
                            let element = justOne11[i];
                            frequency11[element] = frequency11[element] || 0;
                            frequency11[element]++;
                        }
                var sorted11 = Object.keys(frequency11).sort(function(a, b) {
                        return frequency11[b] - frequency11[a];
                    });   

                console.log("结果11",sorted11.slice(0, 3));
                console.log("结果11",frequency11,this.measureData[0].length);
                for(var i=0;i<3;i++){
                    this.measureResults[0].push([sorted11[i],frequency11[sorted11[i]]/this.measureData[0].length ])
                }


                // 组合-2个
                var frequency1 = {}
                for(let i = 0; i < this.measureData[0].length; i++) {
                        let element = this.measureData[0][i].join();
                        frequency1[element] = frequency1[element] || 0;
                        frequency1[element]++;
                    }
                var sorted1 = Object.keys(frequency1).sort(function(a, b) {
                    return frequency1[b] - frequency1[a];
                });   

                console.log("结果21",sorted1.slice(0, 3));
                console.log("结果21",frequency1,this.measureData[0].length);
                for(var i=0;i<3;i++){
                    this.measureResults[2].push([sorted1[i],frequency1[sorted1[i]]/this.measureData[0].length ])

                }


                console.log("结果数组",this.measureResults);

                for(var i=0;i<this.measureResults.length;i++){
                    for(var j=0;j<this.measureResults[i].length;j++){
                        var tempname=(this.measureResults[i][j][0]).split(",")
                        // console.log("tempname",tempname)
                        
                        var temp=i%2==1?this.measureResults[i][j][1]:-this.measureResults[i][j][1]
                        // 单个特征
                        if(i<2){
                            var tempname1=this.allFatureName[parseInt(tempname[0].slice(1))]
                            this.measureSvgData.push({"clust":i,"country":tempname1,"net_donations":temp})
                        }
                        // 组合特征
                        else{
                            var nameLabel=this.allFatureName[parseInt(tempname[0].slice(1))]
                            for(var t=1;t<tempname.length;t++){
                                nameLabel=nameLabel+"t"+this.allFatureName[parseInt(tempname[t].slice(1))]
                            }
                            // var tempname1=this.allFatureName[parseInt(tempname[0].slice(1))]
                            // var tempname2=this.allFatureName[parseInt(tempname[1].slice(1))]
                            console.log("出错",nameLabel);
                            this.measureSvgData.push({"clust":i,"country":nameLabel,"net_donations":temp})
                        }
                        
                    }
                }

                console.log("this.measureSvgData",this.measureSvgData);

        
    }

    if(this.clustGroups.length>1){
                    // 组合-1个
                var justOne11=this.measureData[0].flat()
                var frequency11 = {}
                for(let i = 0; i < justOne11.length; i++) {
                            let element = justOne11[i];
                            frequency11[element] = frequency11[element] || 0;
                            frequency11[element]++;
                        }
                var sorted11 = Object.keys(frequency11).sort(function(a, b) {
                        return frequency11[b] - frequency11[a];
                    });   

                    console.log("结果11",sorted11.slice(0, 3));
                    console.log("结果11",frequency11,this.measureData[0].length);
                    for(var i=0;i<3;i++){
                        this.measureResults[0].push([sorted11[i],frequency11[sorted11[i]]/this.measureData[0].length ])
                    }


                var justOne12=this.measureData[1].flat()
                var frequency12 = {}
                for(let i = 0; i < justOne12.length; i++) {
                            let element = justOne12[i];
                            frequency12[element] = frequency12[element] || 0;
                            frequency12[element]++;
                        }
                var sorted12 = Object.keys(frequency12).sort(function(a, b) {
                        return frequency12[b] - frequency12[a];
                    });   

                    console.log("结果12",sorted12.slice(0, 3));
                    console.log("结果12",frequency12,this.measureData[1].length);
                    for(var i=0;i<3;i++){
                        this.measureResults[1].push([sorted12[i],frequency12[sorted12[i]]/this.measureData[1].length ])
                    }





                // 组合-2个
                    var frequency1 = {}
                    for(let i = 0; i < this.measureData[0].length; i++) {
                            let element = this.measureData[0][i].join();
                            frequency1[element] = frequency1[element] || 0;
                            frequency1[element]++;
                        }
                    var sorted1 = Object.keys(frequency1).sort(function(a, b) {
                        return frequency1[b] - frequency1[a];
                    });   

                    console.log("结果21",sorted1.slice(0, 3));
                    console.log("结果21",frequency1,this.measureData[0].length);
                    for(var i=0;i<3;i++){
                        this.measureResults[2].push([sorted1[i],frequency1[sorted1[i]]/this.measureData[0].length ])

                    }



                    var frequency2 = {}
                    for(let i = 0; i < this.measureData[1].length; i++) {
                            let element = this.measureData[1][i].join();
                            frequency2[element] = frequency2[element] || 0;
                            frequency2[element]++;
                        }
                    var sorted2 = Object.keys(frequency2).sort(function(a, b) {
                        return frequency2[b] - frequency2[a];
                    });   
                    console.log("结果22",sorted2.slice(0, 3));
                    console.log("结果22",frequency2,this.measureData[1].length);
                    for(var i=0;i<3;i++){
                        this.measureResults[3].push([sorted2[i],frequency2[sorted2[i]]/this.measureData[1].length ])
                        
                    }


                    console.log("结果数组",this.measureResults);

                    for(var i=0;i<this.measureResults.length;i++){
                        for(var j=0;j<this.measureResults[i].length;j++){
                            var tempname=(this.measureResults[i][j][0]).split(",")
                            console.log("tempname",tempname)
                            
                            var temp=i%2==1?this.measureResults[i][j][1]:-this.measureResults[i][j][1]
                            // 单个特征
                            if(i<2){
                                var tempname1=this.allFatureName[parseInt(tempname[0].slice(1))]
                                this.measureSvgData.push({"clust":i,"country":tempname1,"net_donations":temp})
                            }
                            // 组合特征
                            else{
                                 var nameLabel=this.allFatureName[parseInt(tempname[0].slice(1))]
                                            for(var t=1;t<tempname.length;t++){
                                                nameLabel=nameLabel+"t"+this.allFatureName[parseInt(tempname[t].slice(1))]
                                            }
                                            // var tempname1=this.allFatureName[parseInt(tempname[0].slice(1))]
                                            // var tempname2=this.allFatureName[parseInt(tempname[1].slice(1))]
                                            console.log("出错",nameLabel);
                                            this.measureSvgData.push({"clust":i,"country":nameLabel,"net_donations":temp})
                            }

                            
                        }
                    }
    }
    

        console.log("measureSvgData",this.measureSvgData);
        d3.select("#measureSvg").selectAll("g").remove()
        this.drawMeasure(this.measureSvgData);


   

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
    drawExplainResults(SvgGroup,oneExplainGraphNodeType,oneGraph_x,oneGraph_y,index,p,lr){
        // console.log("传入的有问题",oneExplainGraphNodeType);
     
      var _this=this;
      // 画框线的起始xy坐标，框的大小
      var oneGraphDis_x=oneGraph_x //100
      var oneGraphDis_Y=oneGraph_y//25
      var rectSelect=[]
      
      // 每个图有1个svg，svg移动的位置
      var explainResultsSvg=d3.select(SvgGroup)
                                // .style("border-right","1px solid #797576")
                                .append("svg")
                              .attr("id","E"+index)
                              .attr("index",p)
                              .attr("expKnode",oneExplainGraphNodeType)
                              // .attr("transform", function(d,i){
                              //             return `translate(${0},${oneGraphDis_Y})`
                              //         })
                              .attr("width","90px")
                              .attr("height","190px")
                              
                            //   .attr("position",function(d,i,k){
                            //     console.log(d,i,k,this)
                            //   })
    //   添加svg的序号index
    explainResultsSvg.append("text")
                    .attr("x",function(d,i) {return 25; }) 
                    .attr("y",function(d,i) {return 150; })
                    // .attr("x",function(d,i) {return 4; }) 
                    // .attr("y",function(d,i) {return 10; })
                    .attr("dx",-6)
                    .attr("dy",5)
                    .style('font-size', 15)
                    .style('font-family', 'Arial')
                    .style("stroke","none")
                    .style('fill', '#606266')
                    .text(function(d,i) {
                        // console.log((_this.conveyGroupCompare),typeof(_this.conveyGroupCompare))
                        if(typeof(_this.conveyGroupCompare)=="number"){
                            // _this.clustGroups+"--"
                            return "R"+_this.userRecId[p]+"N"+p
                        }
                        else{
                             if(lr=='A'){
                                return "N"+p+"--ID"+_this.clustGroups[0][p]
                            }
                            else{
                                return "N"+p+"--"+_this.clustGroups[1][p]
                            }
                        }
                       
                        
                    })                 
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
                            // console.log("列向圆的颜色",d,_this.nodeType[d],_this.nodeType.length)
                            // 如果类型是string，说明是类型，或者演员，导演的节点
                            if(typeof(d)=="string"){
                                // 是类型节点
                                // if(d.slice(0,1)=="2"){
                                    // console.log("类型",2+parseInt(d.slice(1)),"原",d)
                                    return _this.nodeType[ 2+parseInt(d.slice(1)) ]
                                // }
                            }
                            return _this.nodeType[d]
                        })
                        .on("click",function(d,i){
                          console.log(d,i)
                        })
        
     


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
          .attr("transform", function(d,i,k){
            // console.log("transform",d,i,k)
            return `translate(${40},${-1})`
            })
          .on("click",function(d,i,k){
           
                          console.log("下标值",p)
                        //   console.log("这里的值",this)
            //                 // 显示面板
                            this.style.cursor="pointer";
                             var tooltip = d3.select("body").append("div")
                                        .attr("class", "tooltip")
                                        .style("opacity", 0);


                           tooltip.style('display', 'block')
                                // .html("User_ID "+ index)
                                .style("left", d.pageX + "px")
                                .style("top",d.pageY+10+ "px")

                                // .append("text")
                                // .attr("x",function(d,i) {return 25; }) 
                                // .attr("y",function(d,i) {return 150; })
                                // .attr("dx",-6)
                                // .attr("dy",5)
                                // .style('font-size', 15)
                                // .style('font-family', 'Arial')
                                // .style('fill', 'black')
                                // .text("User_ID "+ index)

                            
                                
                            tooltip.attr("id","newTooltip"+p)
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

                           
                        
                              d3.select("#newPanel"+lr+p).remove()//清除已有面板

                             tooltip.append("svg")
                                    .attr("id","newPanel"+lr+p)
                                    .attr("width","450px")
                                   .attr("height","420px")
                           
                          //  面板分为两个部分newPanel_l和newPanel_r     
                        
//       rgb(255, 127, 14)#5576a1
// rgb(31, 119, 180)#aacee8
//  rgb(174, 199, 232)  grey                        
 
                        // 创建关闭面板的按钮
                            d3.select("#newPanel"+lr+p)
                                    .append("image")
                                    .attr("xlink:href",function(){
                                        return closeImg;
                                      })
                                    .attr('width', 30)
                                    .attr('height', 30)
                                    .on("mouseover",function(){
                                        this.style.cursor="pointer";
                                    })
                                    .attr("transform", function(d,i,k){
                                        // console.log("transform",d,i,k)
                                        return `translate(${410},${10})`
                                        })
                                    .on("click",function(d,i,k){
                                        console.log("点击了关闭面板",this,"#newTooltip"+p)
                                        d3.selectAll("#newTooltip"+p).style('display', 'none')
                                    })


                                // 左面板
                                d3.select("#newPanel"+lr+p)
                                    .append("g")
                                    .attr("width","150px")
                                    .attr("height","300px")
                                    .attr("id","newPanel"+lr+p+"l")
                                      .attr("transform", function(i,d){
                                          return `translate(${0},${0})`
                                      })
                                 
                         
                          
                                 // 右面板
                                d3.select("#newPanel"+lr+p)
                                    .append("g")
                                    .attr("width","200px")
                                    .attr("height","300px")
                                    .attr("id","newPanel"+lr+p+"r")
                                      .attr("transform", function(i,d){
                                          return `translate(${300},${0})`
                                      })
                                
                                      
                          // 左右面板画图           
                          var tempArr=[]

                          console.log("将后端准备后的值添加到面板上")
                        //   console.log(p,_this.flowDataA);
                        //   console.log(_this.flowDataA[p]);
                          if(lr=='A'){
                            _this.drawForce("#newPanel"+lr+p+"l","#newPanel"+lr+p+"r",p,_this.flowDataA[p],0,oneExplainGraphNodeType)
                          }
                          else{
                            _this.drawForce("#newPanel"+lr+p+"l","#newPanel"+lr+p+"r",p,_this.flowDataB[p],1,oneExplainGraphNodeType)
                          }
                          
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
            // 点击的是用户，才会触发
            // console.log("this.conveyGroupCompare",_this.conveyGroupCompare=="number");
            if(typeof(_this.conveyGroupCompare)=="number"){
                 // 显示用户的推荐按详情面板
            _this.userRecPanel(d,i,k,p)
            }
            else{
                console.log("用户群这个按钮还没开发");
            }
            
           
          })

        // 点击空白页面，清除tooltip的浮动
        d3.selectAll(".tooltip").on("click",function(d,i){
          // console.log("点击了空白区域",this);
        //   d3.selectAll(".tooltip")
        //         .style('display', 'none')
        })
        

        
                        
    },
// 显示用户的推荐按详情面板
userRecPanel(d,i,k,recId){
    console.log("recId",this.userRecId[recId])
    console.log("点击电影",this.allMovieDetails[this.userRecId[recId]])
        var movieInfo=this.allMovieDetails[this.userRecId[recId]]
        this.itemName="推荐"+this.userRecId[recId]+"--"+movieInfo[1]
        this.items=movieInfo.slice(2,7)
        this.items.push(movieInfo[8])
        console.log("评分",movieInfo)
        document.getElementById("recpicShow").src=movieInfo[11];
        console.log("movieInfo[11]",document.getElementById("recpicShow").src);
        this.showMovie=true;

    // // 创建电影面板
    //                 var tooltip = d3.select("body").append("div")
    //                                     .attr("class", "tooltip")
    //                                     .style("opacity", 0);


    //                        tooltip.style('display', 'block')
    //                             // .html("User_ID "+ index)
    //                             .style("left", d.pageX + "px")
    //                             .style("top",d.pageY+10+ "px")


                            
                                
    //                         tooltip
    //                             .transition()
    //                             .duration(1000)
    //                             .style("opacity", 1)
    //                             .style('border-radius', '20px')
    //                             .style('position', 'absolute')
    //                             .style("border","4px solid #DDD")
    //                             .style('z-index', '10')
    //                             // .style('padding', '10px')
    //                             .style('background', 'white')
    //                             .style("stroke","white")
    //                             ;

                           
                        
    //                         //   d3.select("#newPanel"+lr+p).remove()//清除已有面板

    //                          tooltip.append("svg")
    //                                 .attr("id","moviePanel")
    //                                 .attr("width","520px")
    //                                .attr("height","420px")
                               
 
    //                     // 创建关闭面板的按钮
    //                         d3.select("#moviePanel")
    //                                 .append("image")
    //                                 .attr("xlink:href",function(){
    //                                     return closeImg;
    //                                   })
    //                                 .attr('width', 30)
    //                                 .attr('height', 30)
    //                                 .on("mouseover",function(){
    //                                     this.style.cursor="pointer";
    //                                 })
    //                                 .attr("transform", function(d,i,k){
    //                                     // console.log("transform",d,i,k)
    //                                     return `translate(${460},${10})`
    //                                     })
    //                                 .on("click",function(d,i,k){
    //                                     console.log("点击了关闭面板",this,"#newTooltip"+p)
    //                                     d3.selectAll("#newTooltip"+p).style('display', 'none')
    //                                 })


    //                             // // 左面板
    //                             // d3.select("#newPanel"+lr+p)
    //                             //     .append("g")
    //                             //     .attr("width","150px")
    //                             //     .attr("height","300px")
    //                             //     .attr("id","newPanel"+lr+p+"l")
    //                             //       .attr("transform", function(i,d){
    //                             //           return `translate(${0},${0})`
    //                             //       })
                                 
},
  
//   提前计算后端的所有力导引数据，保存为数组
computeflowDataA(n){
    console.log("后端的数据开始加载~~~","A")
                                      console.log("传递用户、用户群",this.clustGroups[0])
                                      var path="http://localhost:5000/userNewJson"
                                      this.flowDataA=[]
                                    //   加载的是用户
                                      if(typeof(this.clustGroups[0])=="number"){
                                        
                                        path +=`?UserIndex=${["U"+(this.clustGroups[0])]}`;
                                           axios.get(path)
                                            .then(res=>{
                                                    //   先把res按用户组分隔开
                                                    
                                                    // res.data=(res.data).replaceAll("[","")
                                                    res.data=(res.data).split("]");
                                                    // console.log("这里的",(res.data));
                                                    
                                                    (res.data).pop();
                                                    (res.data).pop();
                                                   
                                                    // console.log("初始",(res.data));
                                                    for(var p=0;p<res.data.length;p++){
                                                        var flowLogsResponse1=[]

                                                             var temp=res.data[p]
                                                             
                                                                temp=(temp).replaceAll("[","")
                                                                temp=(temp).replaceAll("'","")
                                                                // temp=(temp).replaceAll('"MovieTarget"','"MovieTarget"&')
                                                                temp=(temp).replaceAll('"source_name":','&"source_name":')
                                                                temp=temp.replaceAll(/\r\n/g,"")
                                                                // console.log("不知道",temp)
                                                                // temp=(temp).split('&,')
                                                                temp=(temp).split('&')
                                                                
                                                                temp.shift()
                                                               
                                                                
                                                            // console.log("中间的temp",temp);

                                                            for(var t=0;t<(temp).length;t++){
                                                                if(t==(temp).length-1){
                                                                    temp[t]=temp[t].slice(0,temp[t].length-2)
                                                                }
                                                                
                                                                // console.log("temp",t,(temp).length,temp[t])
                                                                temp[t]='{'+temp[t]+'}'
                                                                //    temp[t]=temp[t].replaceAll("{,","{")
                                                                
                                                               temp[t]=temp[t].replaceAll(", }","}")
                                                               

                                                               
                                                               var tempo=eval("(" + temp[t] + ")") 
                                                                flowLogsResponse1.push(tempo)
                                                            }
                                                            // console.log("啊哈的temp",flowLogsResponse1); 
                                                        this.flowDataA.push(flowLogsResponse1)
                                                        
                                                    }
                                                    
                                                
                                                    console.log("这里得到了this.flowDataA",(this.flowDataA));
                                                    for(var i=this.flowDataA.length;i<20;i++){
                                                        this.flowDataA.push([])
                                                    }
                                                    console.log("A加载完毕")  
                                                    
                                                        
                                            })
                                    

                                      }
                                    //   加载的是用户群
                                    else{
                                        path +=`?UserIndex=${[(this.clustGroups[0]).slice(0,n)]}`;
                                        axios.get(path)
                                        .then(res=>{
                                                //   先把res按用户组分隔开
                                            // console.log("初始",(res.data));
                                            res.data=(res.data).replaceAll("n'","").replaceAll("\\","")
                                            res.data=(res.data).split("}]");
                                            // console.log("这里的",(res.data));
                                            
                                            (res.data).pop();
                                            // console.log("删除最后一个",(res.data));
                                            for(var p=0;p<res.data.length;p++){
                                                var flowLogsResponse1=[]

                                                    var temp=res.data[p]
                                                    temp=(temp).replaceAll(/\"/g,"{")
                                                    
                                                    temp=temp.replaceAll(",{","{")
                                                    temp=(temp).replaceAll('{,',"}&")
                                                    temp=(temp).replaceAll("[","").replaceAll("]","").replaceAll(" ","")
                                                    temp=(temp).split('&')
                                                    temp.pop()
                                                    // console.log("冒号",(temp));
                                                    

                                                    for(var t=0;t<(temp).length;t++){
                                                        var position=(temp[t]).indexOf('{')//第一次{的位置
                                                        temp[t]=(temp[t]).slice(position)
                                                        var tempo=(temp[t]).replaceAll(/'/g, '"').replaceAll("\\n',","").replaceAll(",{", '{')
                                                        // console.log("小问题",t,tempo)
                                                        flowLogsResponse1.push( eval("(" + tempo + ")") )
                                                    }
                                                this.flowDataA.push(flowLogsResponse1)
                                            }
                                           
                                              console.log("这里得到了this.flowDataA",(this.flowDataA));
                                              console.log("A加载完毕")  
                                              
                                                
                                      })
                            
                                    }
                                      
                      

},

computeflowDataB(n){
    console.log("后端的数据开始加载~~~","B")
                                      this.flowDataB=[] 
                                      var path="http://localhost:5000/userNewJson"
                                      console.log("杨锐",this.clustGroups[1])
                                      path +=`?UserIndex=${[(this.clustGroups[1]).slice(0,n)]}`;
                                      axios.get(path)
                                      .then(res=>{
                                            //   先把res按用户组分隔开
                                            // console.log("初始",(res.data));
                                            res.data=(res.data).replaceAll("n'","").replaceAll("\\","")
                                            res.data=(res.data).split("}]");
                                            
                                            
                                            (res.data).pop();
                                            // console.log("删除最后一个",(res.data));
                                            for(var p=0;p<res.data.length;p++){
                                                var flowLogsResponse1=[]

                                                    var temp=res.data[p]
                                                    temp=(temp).replaceAll(/\"/g,"{")
                                                    
                                                    temp=temp.replaceAll(",{","{")
                                                    temp=(temp).replaceAll('{,',"}&")
                                                    temp=(temp).replaceAll("[","").replaceAll("]","").replaceAll(" ","")
                                                    temp=(temp).split('&')
                                                    temp.pop()
                                                    // console.log("冒号",(temp));
                                                    

                                                    for(var t=0;t<(temp).length;t++){
                                                        var position=(temp[t]).indexOf('{')//第一次{的位置
                                                        temp[t]=(temp[t]).slice(position)
                                                        var tempo=(temp[t]).replaceAll(/'/g, '"').replaceAll("\\n',","").replaceAll(",{", '{')
                                                        // console.log("小问题",t,tempo)
                                                        flowLogsResponse1.push( eval("(" + tempo + ")") )
                                                    }
                                                this.flowDataB.push(flowLogsResponse1)
                                            }
                                           
                                              console.log("这里得到了this.flowDataB",(this.flowDataB));
                                              console.log("B加载完毕")  
                                              
                                                
                                      })

},
    // 正确力导引图
    drawForce(svgIdL,svgIdR,index,flowDataA,number,oneExplainGraphNodeType){
                            // console.log("用户",index,"调取后端数据",svgIdL,svgIdR,index,flowDataA,number,oneExplainGraphNodeType)
                            var convey1=JSON.parse(JSON.stringify(flowDataA));
                            var convey2=JSON.parse(JSON.stringify(flowDataA));
                        //   console.log("用户0的推荐的第0部电影flowLogsResponse",convey1,convey2) 

                            // 推荐原始图
                        //   console.log("推荐图传入的数据",convey2);
                            var _this=this;
                                // 对flowLogsResponse数据进行处理
                                

                            if(typeof(this.conveyGroupCompare)=="number"){
                                var returnValue=this.dealToOriginalGraph(convey2,1)

                                if(this.conveyGroupCompare==6527 || this.conveyGroupCompare==86 || this.conveyGroupCompare==4889 || this.conveyGroupCompare==9395){
                                    countGName=["导演","剧情","犯罪"]
                                }
                                if(this.conveyGroupCompare==149 || this.conveyGroupCompare==245 || this.conveyGroupCompare==27 || this.conveyGroupCompare==116 || this.conveyGroupCompare==616){
                                    countGName=["演员","剧情","喜剧"]
                                }
                            
                                
                                this.funOriginal(svgIdR,countGName,flowDataA)
                            }
                            else{
                                var returnValue=this.dealToOriginalGraph(convey2,1)
                                var flowLogsResponse=returnValue[0]
                                var countGName=returnValue[1]
                                this.funOriginal(svgIdR,countGName,flowLogsResponse)
                            }
                            
                           
                            
                            

                            var newConvey1=[]
                            // 解释图
                            // arr是解释图的几个重要节点,G9 (剧情，动作)
                            // oneExplainGraphNodeType//[0, 1, "20", "23", "27", 41]
                            // var arr=this.keynode[number]
                            var arr=oneExplainGraphNodeType.slice(2,oneExplainGraphNodeType.length-1)
                            console.log("新的arr",arr); // arr是解释图的几个重要节点
                            // console.log("convey1",convey1);
                            newConvey1.push(convey1[0])
                            for(var p=0;p<convey1.length;p++){
                                // console.log("值",parseInt(convey1[p].dest_name ),"_" ,arr.includes("2"+String( parseInt(convey1[p].dest_name )-28271 )))
                                // console.log("值",parseInt(convey1[p].source_name ) ,"_",arr.includes("2"+String( parseInt(convey1[p].source_name )-28271 )))
                                
                                // console.log("值",parseInt(convey1[p].dest_name ) ,"_" ,arr.includes("2"+String( parseInt(convey1[p].dest_name ) )))
                                // console.log("值",parseInt(convey1[p].source_name ) ,"_",arr.includes("2"+String( parseInt(convey1[p].source_name ) )), parseInt(convey1[p].dest_name)>=21984  && parseInt(convey1[p].source_name)<=28270 )
                                // 判断是不是类型
                                if( arr.includes("2"+String( parseInt(convey1[p].dest_name )-28271 )) || arr.includes("2"+String( parseInt(convey1[p].source_name )-28271 ))){
                                    newConvey1.push(convey1[p])
                                }
                                //     [12386-21983] 演员
                                //     [21984-28270] 导演
                                //     [28271-28305] 类型


                                // 判断是不是导演
                                if( arr.includes("235") && parseInt(convey1[p].dest_name)>=21984  && parseInt(convey1[p].dest_name)<=28270){
                                    newConvey1.push(convey1[p])
                                }
                                if( arr.includes("235") && parseInt(convey1[p].source_name)>=21984  && parseInt(convey1[p].source_name)<=28270 ){
                                    newConvey1.push(convey1[p])
                                }
                                // 判断是不是演员
                                if( arr.includes("236") && parseInt(convey1[p].dest_name)>=12386  && parseInt(convey1[p].dest_name)<=21893 ){
                                    newConvey1.push(convey1[p])
                                }
                                if( arr.includes("236") && parseInt(convey1[p].source_name)>=12386  && parseInt(convey1[p].source_name)<=21893 ){
                                    newConvey1.push(convey1[p])
                                }

                            }
                            // newConvey1.push(convey1[convey1.length-1])
                            
                            console.log("解释图",newConvey1,typeof(this.conveyGroupCompare),(this.conveyGroupCompare))
                            
                            
                            if(typeof(this.conveyGroupCompare)=="number"){
                                var returnValue2=this.userdealToOriginalGraph(newConvey1,0)
                                var flowLogsResponse2=returnValue2[0]
                                if(this.conveyGroupCompare==6527 || this.conveyGroupCompare==86 || this.conveyGroupCompare==4889 || this.conveyGroupCompare==9395){
                                    countGName2=["导演","剧情","犯罪"]
                                }
                                if(this.conveyGroupCompare==149 || this.conveyGroupCompare==245 || this.conveyGroupCompare==27 || this.conveyGroupCompare==116 || this.conveyGroupCompare==616){
                                    countGName2=["演员","剧情","喜剧"]
                                }
                                // console.log("平凡之路",returnValue);
                                this.funExplain(svgIdL,countGName2,flowLogsResponse2,arr)
                            }
                            else{
                                var returnValue2=this.dealToOriginalGraph(newConvey1,0)
                                var flowLogsResponse2=returnValue2[0]
                                var countGName2=returnValue2[1]
                                console.log("竟然报错",countGName2,flowLogsResponse2);
                                this.funExplain(svgIdL,countGName2,flowLogsResponse2,arr)
                            }

                            // console.log("解释图传入的数据",svgIdL,countGName2,flowLogsResponse2);

    },
  
   
      //  对后端数组进行处理
    dealpyData(groupA){
        // console.log("小问题",groupA);
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
                if(groupA[i].lenght>3){
                    groupA[i].pop()
                }
                
              }
              groupA.pop()
        // console.log("无伤大雅",groupA)
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
                                      temp1.push([labelA[0],labelA[1],i])
                                    }
                                    else{
                                      temp2.push([groupA[i][0][0],groupA[i][1][0],i])
                                    }
                              }
            }
            else{
                            for(var i=0;i<groupA.length;i++){
                                // console.log("哈",groupA[i][0][0],groupA[i][1][0],groupA[i][2][0]);
                                // console.log("哈哈",labelA.includes(groupA[i][0][0]) && labelA.includes(groupA[i][1][0]) && labelA.includes(groupA[i][2][0]))
                                var tempArr=[groupA[i][0][0],groupA[i][1][0],groupA[i][2][0]]
                                if(tempArr.includes(labelA[0]) && tempArr.includes(labelA[1]) && tempArr.includes(labelA[2]) ){
                                  temp1.push([labelA[0],labelA[1],labelA[2],i])
                                }
                                else{
                                  temp2.push([groupA[i][0][0],groupA[i][1][0],groupA[i][2][0],i])
                                }
                          }
            }
           
            sortGroupA=temp1.concat(temp2)
            // console.log("排序后的",sortGroupA)
            return sortGroupA;
    },

    // 对单个用户，
    sortGroupFunUser(groupA,labelA){
            var sortGroupA=[]
            var temp1=[]
            var temp2=[]
            // 如果只比前1位
            if(labelA.length==1){
                              for(var i=0;i<groupA.length;i++){
                                    // console.log("哈",groupA[i][0][0],groupA[i][1][0],groupA[i][2][0]);
                                    // console.log("哈哈",labelA.includes(groupA[i][0][0]) && labelA.includes(groupA[i][1][0]) && labelA.includes(groupA[i][2][0]))
                                    var tempArr=[groupA[i][0][0],groupA[i][1][0],groupA[i][2][0]]
                                    if(tempArr.includes(labelA[0])){
                                      temp1.push([labelA[0],i])
                                    }
                                    else{
                                      temp2.push([groupA[i][0][0],i])
                                    }
                              }
            }
            else if(labelA.length==2){
                              for(var i=0;i<groupA.length;i++){
                                    // console.log("哈",groupA[i][0][0],groupA[i][1][0],groupA[i][2][0]);
                                    // console.log("哈哈",labelA.includes(groupA[i][0][0]) && labelA.includes(groupA[i][1][0]) && labelA.includes(groupA[i][2][0]))
                                    var tempArr=[groupA[i][0][0],groupA[i][1][0],groupA[i][2][0]]
                                    if(tempArr.includes(labelA[0])  && tempArr.includes(labelA[1]) ){
                                      temp1.push([labelA[0],labelA[1],i])
                                    }
                                    else{
                                      temp2.push([groupA[i][0][0],groupA[i][1][0],i])
                                    }
                              }
            }
            else{
                            for(var i=0;i<groupA.length;i++){
                                // console.log("哈",groupA[i][0][0],groupA[i][1][0],groupA[i][2][0]);
                                // console.log("哈哈",labelA.includes(groupA[i][0][0]) && labelA.includes(groupA[i][1][0]) && labelA.includes(groupA[i][2][0]))
                                var tempArr=[groupA[i][0][0],groupA[i][1][0],groupA[i][2][0]]
                                if(tempArr.includes(labelA[0]) && tempArr.includes(labelA[1]) && tempArr.includes(labelA[2]) ){
                                  temp1.push([labelA[0],labelA[1],labelA[2],i])
                                }
                                else{
                                  temp2.push([groupA[i][0][0],groupA[i][1][0],groupA[i][2][0],i])
                                }
                          }
            }
           
            sortGroupA=temp1.concat(temp2)
            // console.log("排序后的",sortGroupA)
            return sortGroupA;
    },

    // 数组中的对象去重  解释图
    uniqueArr1(arr){
         let data = [];
          arr.forEach(item => {

            if (data.length == 0) {
              data.push(item);
            } else {

              let isDiff = true;//是否不同
              for (let i = 0; i < data.length; i++) {
                let dataItem = data[i];
                if ((dataItem.source_name == item.source_name && dataItem.dest_name == item.dest_name) || (dataItem.source_name == item.source_name && dataItem.source_namespace == "Genre") ) {
                // if ((dataItem.source_n &&(dataItem.source_name == item.source_name) )|| dataItem.dest_name == item.dest_name) {
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
    // 去重的方式不同  推荐图
    uniqueArr2(arr){
        // console.log("去重前",arr);
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


        // console.log("推荐去重",data);
        return data;




    },
    // 单个用户的去重
    useruniqueArr(arr){
         let data = [];
          arr.forEach(item => {

            if (data.length == 0) {
              data.push(item);
            } else {

              let isDiff = true;//是否不同
              for (let i = 0; i < data.length; i++) {
                let dataItem = data[i];
                if ((dataItem.source_name == item.source_name && dataItem.dest_name == item.dest_name)  ) {
                // if ((dataItem.source_n &&(dataItem.source_name == item.source_name) )|| dataItem.dest_name == item.dest_name) {
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
    dealToOriginalGraph(allData,uniqueMethods){
      var data=[]
      var tempSourceName=[]
      var tempDestName=[]
      for(var i=0;i<allData.length;i++){
        if( allData[i].source_namespace=="Movie" || allData[i].source_namespace=="MovieTarget"){
            allData[i].source_name="1"
        }
        if( allData[i].dest_namespace=="Movie" || allData[i].dest_namespace=="MovieTarget"){
            allData[i].dest_name="1"
        }
       
      }
      // 把allData中有uesrload的去除掉
      var list = allData.filter((val) => val.source_namespace!=="GUserLoad")
      list = list.filter((val) => val.dest_namespace!=="GUserLoad")

      // 把allData中有Actor的去除掉
      var list = list.filter((val) => val.source_namespace!=="Actor")
      list = list.filter((val) => val.dest_namespace!=="Actor")
     
     
      allData=list
      // console.log("元数据",list);
      // 对于一个用户来说,所有的推荐目标电影有20部,所以去重,应该是只看sourcename或者destname相等
    //   console.log("没有把Actor和GUseload去掉？",allData)
      if(uniqueMethods==0){
        // 解释图
        allData=this.uniqueArr1(allData)
      }
      else{
        // 推荐图
        allData=this.uniqueArr2(allData)
      }
      
    //   console.log("去重处理过的数据",allData)
      // exit()
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
      // console.log("空对象",allData);
      // 去除数组中的空对象
      for(var key in allData){
          if(Object.keys( allData[key] ).length==0){
            allData.splice(key,1)
          }
      }
      // console.log("空对象",allData);

      return [allData,countGName];
    },

    // 用户复杂Hull图得到原图
    userdealToOriginalGraph(allData,uniqueMethods){
   
      var data=[]
      var tempSourceName=[]
      var tempDestName=[]
      
      // 把allData中有uesrload的去除掉
      var list = allData.filter((val) => val.source_namespace!=="GUserLoad")
      list = list.filter((val) => val.dest_namespace!=="GUserLoad")

      // 把allData中有Actor的去除掉
    //   var list = list.filter((val) => val.source_namespace!=="Actor")
    //   list = list.filter((val) => val.dest_namespace!=="Actor")
     
     
      allData=list
    //   console.log("还没处理数据",allData)
      
      for(var i=0;i<allData.length;i++){
            
            if( allData[i].source_namespace=="Movie" || allData[i].source_namespace=="MovieTarget" ){
                allData[i].source_name="1"
            }
            if( allData[i].dest_namespace=="Movie" || allData[i].dest_namespace=="MovieTarget" ){
                allData[i].dest_name="1"
            }

            // 导演
            if( allData[i].source_namespace=="Director"){
                allData[i].source_name="2"
                // console.log("检查1",i,allData[i]);
            }
            if(  allData[i].dest_namespace=="Director"){
                allData[i].dest_name="2"
                // console.log("检查2",i,allData[i]);
            }
            // 演员
            if( allData[i].source_namespace=="Actor"){
                allData[i].source_name="3"
            }
            if(  allData[i].dest_namespace=="Actor"){
                allData[i].dest_name="3"
            }
       
      }

     

      
      
      
    //   console.log("中间合并后",allData)
      if(uniqueMethods==0){
        // 解释图
        
        allData=this.useruniqueArr(allData)
        // console.log("去重处理过的数据",allData)
      }
      else{
        // 推荐图
        allData=this.uniqueArr2(allData)
      }
      
      
      // 记录类型的名称
      var countGName=[]
      
      var countG=0;
      var countUL=0;
      var countD=0;
      var countA=0;
      
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
      }
    //   console.log("类型",countGName);
      // console.log("空对象",allData);
      // 去除数组中的空对象
      for(var key in allData){
          if(Object.keys( allData[key] ).length==0){
            allData.splice(key,1)
          }
      }
      

      return [allData,countGName];
    },
     
//  right1的
 funOriginal(svgName,countGName,flowLogsResponse){   
                var _this=this;
                // pauseLoading();
                // console.log("_this",_this)
                console.log("funOriginal",flowLogsResponse)
                // 对flowLogsResponse数据进行处理
                
                // console.log("推荐图的countGName",countGName,flowLogsResponse);
                var width = 60
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
                    
                    // console.log("data",data)
                    // console.log("vis",vis)
                    setTimeout(() => {
                    init();
                    },1000);
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
                console.log("vis都打印不出来",vis)
                console.log("init第一个",data, net, getGroup, expand)
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
                        .size([width, height/1.5])
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
                        .gravity(0.6)   // gravity+charge tweaked to ensure good 'grouped' view (e.g. green group not smack between blue&orange, ...
                        
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
              console.log("nodeg",nodeg)      
              console.log("net.nodes",net.nodes)
                node = nodeg.selectAll("circle.node").data(net.nodes, nodeid);
                console.log(node)
                console.log("net.nodes",net.nodes,nodeid)
                
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
                    .style("fill", function(d,i,k) {
                        // console.log("酷爱",d,i,k,this);
                         return fill(d.group); })
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
                    .style("stroke","none")
                    .style('fill', 'white')
                    .text(function(d,i) {
                        
                        // console.log("有一个文字不显示",d.group)
                        if(d.group=="GUserLoad"){
                            return "UL"
                        }
                        if(d.group.substring(0,1)=="G"){
                            // 如果选择的是用户
                            // console.log("text",d.group,_this.clustGroups,typeof(_this.conveyGroupCompare)=="number",_this.conveyGroupCompare)
                            if(typeof(_this.conveyGroupCompare)=="number"){
                                return "G";
                            }
                            else{
                                d3.select(this).attr("dx",-10).style('font-size', 12).style('fill', 'white')
                                return countGName[parseInt((d.group).replaceAll("Genre",""))]
                            }
                            
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
                // 如果是单个用户的话，看过的电影M可以展开
                if(typeof(_this.conveyGroupCompare)=="number"){
                                force.on("tick", function() {
                        


                            link.attr("x1", function(d) {
                                
                                    if(d.source.group=="UserTarget"){
                                        return width/2;
                                    }
                                   
                                    return d.source.x; 
                                    })

                                .attr("y1", function(d) {
                                    if(d.source.group=="UserTarget"){
                                        return 50
                                    }    
                                
                                    return d.source.y; 
                                })

                                .attr("x2", function(d) { 
                                    if(d.target.group=="MovieTarget"){
                                        return width/2;
                                    }
                                    
                                    
                                    return d.target.x; 
                                })
                                .attr("y2", function(d) {
                                    if(d.target.group=="MovieTarget"){
                                        return height-30
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
                               
                                
                            
                                return d.x; })
                                .attr("cy", function(d) {
                                if(d.group=="UserTarget"){
                                    return 50;
                                }
                                if(d.group=="MovieTarget"){
                                    return height-30;
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
                                
                            
                                return d.x; })
                                .attr("y", function(d) {
                                    if(d.group=="UserTarget"){
                                    return 50;
                                }
                                if(d.group=="MovieTarget"){
                                    return height-30;
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

                // 如果是用户群，不展开看过的电影M
                else{
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
           

               
                }

                return vis.node();
                 

            },   
 

    
    // 解释图
      //  xgnn导引图
    // 画力导引图调用的函数，svgName为svg的id       
    funExplain(svgName,countGName,flowLogsResponse,arr){   
      var _this=this;
                
                console.log("周元博来检查",svgName,countGName,flowLogsResponse)
                var width = 100
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
                        .size([width, height])
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
                        .charge(-600)    // ... charge is important to turn single-linked groups to the outside
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
                    .style("fill", function(d) { 
                        return fill(d.group); 
                        })
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
                var tempc=0   
                node = nodeg.selectAll("circle.node").data(net.nodes, nodeid);
                // console.log("第一个node",node)
                
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
                    .style("fill", function(d,i,k) {
                        console.log("酷帅",arr,tempc,arr.length!=0,d.group,_this.clustGroups.length);
                        // 如果是多个用户群
                        // if(_this.clustGroups.length>1){

                        // }
                        if(arr.length!=0){
                            if(d.group!="Movie" && d.group!="MovieTarget" && d.group!="UserTarget"){
                                var cc=arr[tempc]
                                console.log("++中间点",cc)
                                console.log("++中间点",arr,2+parseInt(cc.slice(1)))
                                
                                console.log("颜色",_this.nodeType[ 2+parseInt(cc.slice(1)) ])
                                tempc=tempc+1
                                return _this.nodeType[ 2+parseInt(cc.slice(1)) ]

                            }
                        }
                         return fill(d.group); })
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
                                console.log("d.name",d,d.name)

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
                    .style("stroke","none")
                    .style('fill', 'white')
                    .text(function(d,i) {
                        // console.log("有一个文字不显示",d.group)
                        if(d.group=="UserLoad"){
                            return "UL"
                        }
                        // if(d.group.substring(0,1)=="G"){
                        //   // console.log("初始1",(d))
                        //   // console.log("初始1",parseInt((d.group).replaceAll("Genre","")),countGName)
                        //   // console.log("添加的文字1",countGName[parseInt((d.group).replaceAll("Genre",""))])
                        //   d3.select(this).attr("dx",-10).style('font-size', 12).style('fill', 'white')
                        //   return countGName[parseInt((d.group).replaceAll("Genre",""))]
                        // }
                        if(d.group.substring(0,1)=="G"){
                            // 如果选择的是用户
                            console.log("text",d.group,_this.clustGroups,typeof(_this.conveyGroupCompare)=="number",_this.conveyGroupCompare)
                            if(typeof(_this.conveyGroupCompare)=="number"){
                                return "G";
                            }
                            else{
                                d3.select(this).attr("dx",-10).style('font-size', 12).style('fill', 'white')
                                return countGName[parseInt((d.group).replaceAll("Genre",""))]
                            }
                            
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
    // 添加结果评估图
    drawMeasure(newdata){
        var _this=this
        console.log("添加结果评估图",newdata);
      
var data=newdata
var height = 200
var width=600
// var x0 = 29177437549
var max = d3.max(data, d => +d.net_donations)
var min = d3.min(data, d => +d.net_donations)
var x0 = Math.max(Math.abs(min), Math.abs(max))
  var margin ={top: 30,
  right: 10,
  bottom: 20,
  left: 10}
var x = d3.scaleLinear()
  .range([margin.left, width - margin.right])
  .domain([-x0, x0]);

var y = d3.scaleBand()
  .range([margin.top, height - margin.bottom])
  .domain(data.map(d => d.country))
  .padding(0.2)

var xAxis = g => g.attr("class","ccaxis").attr("transform", `translate(0, ${margin.top})`)
  .call(d3.axisTop(x)
    .ticks(5)
    // .tickFormat(d => d3.format("$0.1s")(d).replace(/G/, "B")))
     .tickFormat(function(d){
        console.log("坐标轴",d,d3.format("$0.1s")(d).replace(/G/, "B"))
        return (d>0?(d*100):(-d*100))+"%"
    }))

var yAxis = g => g.attr("class","bbaxis").attr("transform", `translate(${x(0)}, 0)`)
  .call(d3.axisRight(y))
console.log("bb",d3.axisLeft(y))
var setYAxisDirection = (axis, reverseDirection) => {
  const textAnchor = axis.attr("text-anchor");
  const reverseTextAnchor = "start";
  
  axis.selectAll(".tick").each(function (d, i) {
    const tick = d3.select(this);
    // const tickSize = tick.select("line").attr("x2");
    // const tickTextX = tick.select("text").attr("x");
    const tickTextX = tick.select("text").style("font-family","fangsong").style("font-size","13px").attr("fill","#54759e");
    
    // tick
    //   .attr(
    //     "text-anchor", 
    //     reverseDirection(data[i]) ? reverseTextAnchor : textAnchor
    //   )
    //   .select("line")
    //   .attr("x2", reverseDirection(data[i]) ? -tickSize : tickSize);
    tick
      .select("text")
      .attr("x", reverseDirection(data[i]) ? -tickTextX : tickTextX);
  });
}




  
  var tooltip = d3.select("body").append("div")
                    .attr("class", "barchhart")
                    .style("opacity", 0);

  
var svg=  d3.select("#measureSvg")
.attr("width","600px")
.attr("height","200px")
.attr("transform",`translate(86, 0)`)

svg.append("g")
    .selectAll(".bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("height", y.bandwidth())
    .attr("x", d => x(Math.min(0, d.net_donations)))
    .attr("y", d => y(d.country))
    .attr("width", d => Math.abs(x(d.net_donations) - x(0)))
    .style("fill",function(d){
        // console.log("MM",_this.conveyGroupCompare);
        // console.log(_this.colorArr[_this.conveyGroupCompare[0]]);
        if(_this.conveyGroupCompare.length==1){
            return _this.colorArr[_this.conveyGroupCompare[0]]
        }
        if(_this.conveyGroupCompare.length==2){
            return d.net_donations > 0 ? _this.colorArr[_this.conveyGroupCompare[1]]:_this.colorArr[_this.conveyGroupCompare[0]]
        }

        return d.net_donations > 0 ? "#1f77b4" : "#ff7f0e"
    })
    .attr("opacity", 0.6)
    .style("cursor","pointer")
    .on("mouseover", function(i, d) {

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
                                
                            tooltip.html("Features："+d.country+"<br>"+"Value："+((d.net_donations).toFixed(2)).replace("-",""))
                                .style("left", i.pageX+30 + "px")
                                .style("top",i.pageY-20+ "px")

    //   console.log("不显示提示",d)
    })
    .on("mouseout", function() {
                tooltip.transition()
                .style('visibility', 'visible')
                .style("opacity", 0)
                          
    })
  
  svg.append("g")
    .call(xAxis);
  
  svg.append("g")
    .call(yAxis)
    .call(setYAxisDirection, d => d.net_donations < 0);
},

// 结果评估列表
evaluation(){
    this.showMeasure=true
}
 


 },
  mounted(){
               
            //    this.drawMeasure();
            var _this=this;
            // 读取当前选中的用户群
            pubsub.subscribe('conveyGroupCompare',(msgName,data)=>{
                this.conveyGroupCompare=data
                // console.log("用户群",typeof(this.conveyGroupCompare),this.conveyGroupCompare);
                // 如果选择的是用户
                if(typeof(this.conveyGroupCompare)=="number"){
                    _this.clustGroups=[this.conveyGroupCompare]
                }
                // 用户群,寻找所有用户
                else{
                            var path="http://localhost:5000/findGroupUser"
                                path +=`?conveyGroupCompare=${this.conveyGroupCompare}`;
                                axios.get(path)
                                .then(res=>{
                                    // res.data=(res.data.replaceAll("[","").replaceAll("]","")).split("间隔")
                                    
                                    res.data=(res.data).split("',")
                                    // console.log("刚开始对？",res.data);
                                    for(var i=0;i<(res.data).length;i++){
                                    res.data[i]=res.data[i].replaceAll("[","").replaceAll("/\\r\\n/g","").replaceAll("'","").replaceAll(" ","").replaceAll("]","")
                                    res.data[i]=res.data[i].split(",")
                                    res.data[i][(res.data[i]).length-1]=(res.data[i][(res.data[i]).length-1]).replaceAll("\\n","")
                                    }
                                    // console.log("处理是错了？",res.data);
                                    // console.log("处理是错了？",res.data[0]);
                                    // console.log("处理是错了？",res.data[0]);
                                // 得到所有的用户
                                console.log("11",res.data,res.data[0])
                                //   _this.clustGroups=res.data[0]
                                _this.clustGroups=res.data
                                //   console.log("22",typeof(res.data[0]),res.data[0])

                                _this.clustGroups[0].shift()
                                _this.clustGroups[0].shift()
                                //   去除前两个无关数据
                                if((_this.clustGroups).length>1){
                                    _this.clustGroups[1].shift()
                                    _this.clustGroups[1].shift()
                                }
                                
                                console.log("_this.clustGroups",typeof(_this.clustGroups),_this.clustGroups)   
                                })
                            
                }
              
            })

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

        // 接受排名前三的数组
            pubsub.subscribe('thirdName',(msgName,data)=>{
                        this.thirdName=data;
                        this.thirdNameIndex=[]
                        for(var l=0;l<data.length;l++){
                            for(var t=0;t<this.allFatureName.length;t++){
                                if(data[l]==this.allFatureName[t]){
                                    this.thirdNameIndex.push("2"+t)
                                    break;
                                }
                            }
                        }
                        console.log("thirdNameIndex",this.thirdNameIndex)
                    })


            // 当点击了推荐解释按钮，
            pubsub.subscribe('CenterGroups',(msgName,data)=>{
                this.ShowExplainButton=false

                d3.select(".explainResultsA").selectAll("svg").remove()
                d3.select(".explainResultsB").selectAll("svg").remove()
                this.keynode=[]
                // console.log("凌一尧",this.conveyGroupCompare);
                if(typeof(this.conveyGroupCompare)=="number"){
                    this.nodeNumber=1
                    this.title11="用户"
                    this.title12="图模式"
                    this.value11=this.conveyGroupCompare
                    this.value12=20
                    // this.title21=""
                    // this.title22=""
                    // this.value21=""
                    // this.value22=""
                    this.valueShow=false
                    // console.log("清空",this.value21,this.value22);
                        // 如果是用户，记录用户的推荐电影id20个
                        console.log("this.conveyGroupCompare",this.conveyGroupCompare);
                        var path="http://localhost:5000/userRecId"
                        path +=`?UserIndex=${this.conveyGroupCompare}`;
                            axios.get(path)
                            .then(res=>{
                                console.log("推荐电影",res.data);
                                res.data=res.data.split(",")
                                this.userRecId=res.data
                            })


                    
                }
                else{
                    this.nodeNumber=2
                    this.title11="用户群"
                    this.title12="图模式"
                    this.value11=parseInt(this.conveyGroupCompare[0])
                    this.value12=this.clustGroups[0].length
                }
                
                
                       
                 // 保存后端数据
                this.computeflowDataA(this.showDetailPanelData)

                
                // 解释图
                // arr是解释图的几个重要节点,G9 (剧情，动作)G31(剧情，喜剧)
                this.keynode.push( this.thirdNameIndex.slice(0,this.nodeNumber) )
                // 如果两个用户群，储存两个数据
                if((this.clustGroups.length)>1){
                    console.log("又进来了")
                    this.valueShow=true
                    this.title21="用户群"
                    this.title22="图模式"
                    this.value21=parseInt(this.conveyGroupCompare[1])
                    this.value22=(this.clustGroups[1].length)
                    console.log("出问题",this.value21,this.value22,typeof(value21),typeof(value22));
                    this.computeflowDataB(this.showDetailPanelData)
                    this.keynode.push( this.thirdNameIndex.slice(3,3+this.nodeNumber) )
                    
                }
                // console.log("keynodekeynode",this.keynode)
                // 开始画列向圆圈,点击就有面板
                this.drawExplainCircle()

                
              
            })

           
        // 接收全部电影的信息
        pubsub.subscribe('allMovieDetails',(msgName,data)=>{
            this.allMovieDetails=data
        })
            
            

    
    
        },
  watch:{
            value21:{
              handler(newVal,oldVal){
                  console.log("当前的选中的特征集合",oldVal,newVal);
              },
              immediate:true,
              deep:true,
            },
             value22:{
              handler(newVal,oldVal){
                  console.log("当前的选中的特征集合",oldVal,newVal);
              },
              immediate:true,
              deep:true,
            },
            showMovie:{
              handler(newVal,oldVal){
                //   console.log("当前的选中的特征集合",newVal.length,newVal);
              },
              immediate:true,
              deep:true,
            },
            selectedRow:{
              handler(newVal,oldVal){
                //   console.log("当前的选中的特征集合",newVal.length,newVal);
              },
              immediate:true,
              deep:true,
            },
             
            nodeNumber:{
              handler(newVal,oldVal){
                  console.log("nodeNumber发生了变化",newVal,oldVal);
                  this.ShowExplainButton=false
                  this.keynode=[]

                    // 改变了解释点的个数，重新加载解释图
                            // 解释图
                            // arr是解释图的几个重要节点,G9 (剧情，动作)G31(剧情，喜剧)
                            console.log("this.nodeNumber是什么",this.nodeNumber);
                            this.keynode.push( this.thirdNameIndex.slice(0,this.nodeNumber) )
                            // 如果两个用户群，储存两个数据
                            if((this.clustGroups.length)>1){
                                this.value21=parseInt(this.conveyGroupCompare[1])
                                this.value22=this.clustGroups[1].length
                                this.keynode.push( this.thirdNameIndex.slice(3,3+this.nodeNumber) )
                                
                            }
                            console.log("keynodekeynode",this.keynode)
                            // 开始画列向圆圈,点击就有面板
                            this.drawExplainCircle()
              },
            //   immediate:true,
              deep:true,
            },

  }
}
</script>

<style lang="less" scoped>
.like {
    cursor: pointer;
    font-size: 25px;
    display: inline-block;
  }

#newPanel0l{
  border:1px solid red;
}
.showExplainButtonDiv{
  margin-left: 10%;
  /* float:left; */
}
.operate{
    margin-left: 20px;
    margin-top:10px;
}
.explainRe{
  width:100%;
  height:68%;
  overflow-y:auto;
  border-bottom:1px solid #54759e;
}
.measureView{
  width:100%;
  height:20%;
  border-top:1px solid #54759e;
}
.measureViewl{
    width:50%;
    float: left;;
}
.measureViewr{
    width:50%;
    float: left;;
}
.explainResultsA{
  padding-left: 1%;
  padding-right: 0%;
  margin-top: 5%;
  float:left;
  width: 48%;
  height:1200%;
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

#closePanel{
    background: url('css/search.png') center no-repeat;
}


/* 修改行内线 */
::v-deep .el-table td,.building-top .el-table th.is-leaf {
    border-bottom:  1px solid #eae9e9 !important;
 }

::v-deep .el-switch__label.is-active{
    color:#54759e;
}

.picInfo{
    cursor: pointer;
    margin-left:-50px;
    margin-top:-30px;
    width:270px;
    float:left;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    height:176.5px;
}

.domain{
    stroke: none;
}

// 结果评估列表
.evaluation{
  width:120px;
  color: #54759e;
  cursor: pointer;
}
::v-deep .evaluation{
  float:left;
  width:30px;
  height:40px;
  background: url('css/check.png') center no-repeat;			
  /* font-size: 12px; */
  background-size: cover;
}
::v-deep .evaluation:before{
  content: "评估列表图";
  visibility: hidden;
}
.evaluationText{
  width:150px;
  margin-left: 35px;
  margin-top: -50px;
}

::v-deep .el-input-number--small {
    width: 100px;
}
::v-deep .el-input--small .el-input__inner {
    height: 30px;
    // width:20px;
    border: 2px solid #54759e;
}
::v-deep .el-input-number.is-controls-right .el-input-number__increase{
    border-top: 2px solid #54759e;
    border-right: 2px solid #54759e;
}
::v-deep .el-input-number.is-controls-right .el-input-number__decrease{
    border-bottom: 1px solid #54759e;
    // border-left: 2px solid #54759e;
    border-right: 2px solid #54759e;

}

</style>
<style>
/* 坐标轴样式 */
.bbaxis path,.bbaxis line{
    stroke:none;
}
.ccaxis path,.ccaxis line{
    stroke:#54759e;
    stroke-width: 2px;
}
.ccaxis text{
    fill:#54759e;
}
</style>


