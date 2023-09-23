import{_ as b,a as P,r as u,o as s,e as h,b as y,w as o,d as n,c as i,g as d,F as A,h as E,t as p}from"./index-0ef47bb2.js";const B={watch:{searchQuery(){this.currentPage=1}},data(){return{currentPage:1,itemsPerPage:10,exercises:[],searchQuery:"",sortedColumn:null,sortAscending:!0}},computed:{numericId(){return Number(this.id)},paginatedExercises(){const t=(this.currentPage-1)*this.itemsPerPage,e=t+this.itemsPerPage;return this.filteredExercises.slice(t,e)},totalExercises(){return this.filteredExercises.length},filteredExercises(){if(!this.searchQuery)return this.exercises;const t=this.searchQuery.toLowerCase();return this.exercises.filter(e=>{const l=e.name?e.name.toLowerCase():"",m=e.description?e.description.toLowerCase():"",r=e.primary_body_part?e.primary_body_part.toLowerCase():"",_=e.secondary_body_part?e.secondary_body_part.toLowerCase():"";return l.includes(t)||m.includes(t)||r.includes(t)||_.includes(t)})}},methods:{sortBy(t){this.sortedColumn===t?this.sortAscending=!this.sortAscending:(this.sortedColumn=t,this.sortAscending=!0),this.exercises.sort((e,l)=>{const m=e[t]?e[t].toString().toUpperCase():"",r=l[t]?l[t].toString().toUpperCase():"";return e[t]===null&&l[t]!==null?this.sortAscending?1:-1:e[t]!==null&&l[t]===null?this.sortAscending?-1:1:e[t]===null&&l[t]===null?0:this.sortAscending?m.localeCompare(r):r.localeCompare(m)})},async getAllExercises(){try{const t=await P.get("https://2dbflimh5a.execute-api.us-east-1.amazonaws.com/prod/exercises");t.data&&t.data.message?console.error(t.data.message):(this.exercises=t.data,this.exercises.sort((e,l)=>{const m=e.name?e.name.toUpperCase():"",r=l.name?l.name.toUpperCase():"";return m.localeCompare(r)}))}catch(t){console.error("An error occurred while fetching the exercises:",t)}}},async created(){await this.getAllExercises()}},V={key:1};function L(t,e,l,m,r,_){const g=u("v-card-title"),f=u("v-text-field"),x=u("v-progress-circular"),c=u("v-icon"),C=u("router-link"),v=u("v-table"),k=u("v-pagination"),w=u("v-container");return s(),h("div",null,[y(g,null,{default:o(()=>[n("Exercises")]),_:1}),y(w,{style:{"min-height":"calc(100vh - 250px)"}},{default:o(()=>[y(f,{modelValue:r.searchQuery,"onUpdate:modelValue":e[0]||(e[0]=a=>r.searchQuery=a),clearable:"",label:"Search Exercises",variant:"outlined"},null,8,["modelValue"]),r.exercises.length?(s(),h("div",V,[y(v,{"fixed-header":""},{default:o(()=>[d("thead",null,[d("tr",null,[d("th",{onClick:e[1]||(e[1]=a=>_.sortBy("name")),class:"clickable-header"},[n(" Name "),r.sortedColumn==="name"&&r.sortAscending?(s(),i(c,{key:0},{default:o(()=>[n("mdi-arrow-down")]),_:1})):r.sortedColumn==="name"?(s(),i(c,{key:1},{default:o(()=>[n("mdi-arrow-up")]),_:1})):(s(),i(c,{key:2},{default:o(()=>[n("mdi-sort")]),_:1}))]),d("th",{onClick:e[2]||(e[2]=a=>_.sortBy("primary_body_part")),class:"clickable-header"},[n(" Primary Body Part "),r.sortedColumn==="primary_body_part"&&r.sortAscending?(s(),i(c,{key:0},{default:o(()=>[n("mdi-arrow-down")]),_:1})):r.sortedColumn==="primary_body_part"?(s(),i(c,{key:1},{default:o(()=>[n("mdi-arrow-up")]),_:1})):(s(),i(c,{key:2},{default:o(()=>[n("mdi-sort")]),_:1}))]),d("th",{onClick:e[3]||(e[3]=a=>_.sortBy("secondary_body_part")),class:"clickable-header"},[n(" Secondary Body Part "),r.sortedColumn==="secondary_body_part"&&r.sortAscending?(s(),i(c,{key:0},{default:o(()=>[n("mdi-arrow-down")]),_:1})):r.sortedColumn==="secondary_body_part"?(s(),i(c,{key:1},{default:o(()=>[n("mdi-arrow-up")]),_:1})):(s(),i(c,{key:2},{default:o(()=>[n("mdi-sort")]),_:1}))])])]),d("tbody",null,[(s(!0),h(A,null,E(_.paginatedExercises,a=>(s(),h("tr",{key:a.id},[d("td",null,[y(C,{to:{name:"ExerciseDetail",params:{id:a.id}},class:"custom-link"},{default:o(()=>[n(p(a.name),1)]),_:2},1032,["to"])]),d("td",null,p(a.primary_body_part),1),d("td",null,p(a.secondary_body_part),1)]))),128))])]),_:1}),y(k,{modelValue:r.currentPage,"onUpdate:modelValue":e[4]||(e[4]=a=>r.currentPage=a),length:Math.ceil(_.totalExercises/r.itemsPerPage)},null,8,["modelValue","length"])])):(s(),i(x,{key:0,indeterminate:"",color:"primary"}))]),_:1})])}const U=b(B,[["render",L],["__scopeId","data-v-d176ee92"]]);export{U as default};
