import{_ as w,a as x,r as u,o as s,b as h,d as y,w as n,e as o,c as l,f as i,F as A,g as B,t as p}from"./index.2f751fa3.js";const E={data(){return{exercises:[],searchQuery:"",sortedColumn:null,sortAscending:!0}},computed:{filteredExercises(){if(!this.searchQuery)return this.exercises;const e=this.searchQuery.toLowerCase();return this.exercises.filter(t=>{const c=t.name?t.name.toLowerCase():"",m=t.description?t.description.toLowerCase():"",r=t.primary_body_part?t.primary_body_part.toLowerCase():"",_=t.secondary_body_part?t.secondary_body_part.toLowerCase():"";return c.includes(e)||m.includes(e)||r.includes(e)||_.includes(e)})}},methods:{sortBy(e){this.sortedColumn===e?this.sortAscending=!this.sortAscending:(this.sortedColumn=e,this.sortAscending=!0),this.exercises.sort((t,c)=>{const m=t[e]?t[e].toString().toUpperCase():"",r=c[e]?c[e].toString().toUpperCase():"";return t[e]===null&&c[e]!==null?this.sortAscending?1:-1:t[e]!==null&&c[e]===null?this.sortAscending?-1:1:t[e]===null&&c[e]===null?0:this.sortAscending?m.localeCompare(r):r.localeCompare(m)})},async getAllExercises(){try{const e=await x.get("https://better-together-f87fbab820d6.herokuapp.com/exercises");e.data&&e.data.message?console.error(e.data.message):this.exercises=e.data}catch(e){console.error("An error occurred while fetching the exercises:",e)}}},async created(){await this.getAllExercises()}},L={key:1};function V(e,t,c,m,r,_){const f=u("v-card-title"),g=u("v-text-field"),b=u("v-progress-circular"),d=u("v-icon"),k=u("router-link"),v=u("v-table"),C=u("v-container");return s(),h("div",null,[y(f,null,{default:n(()=>[o("Exercises")]),_:1}),y(C,{style:{"min-height":"calc(100vh - 250px)"}},{default:n(()=>[y(g,{modelValue:r.searchQuery,"onUpdate:modelValue":t[0]||(t[0]=a=>r.searchQuery=a),clearable:"",label:"Search Exercises",variant:"outlined"},null,8,["modelValue"]),r.exercises.length?(s(),h("div",L,[y(v,{"fixed-header":""},{default:n(()=>[i("thead",null,[i("tr",null,[i("th",{onClick:t[1]||(t[1]=a=>_.sortBy("name")),class:"clickable-header"},[o(" Name "),r.sortedColumn==="name"&&r.sortAscending?(s(),l(d,{key:0},{default:n(()=>[o("mdi-arrow-down")]),_:1})):r.sortedColumn==="name"?(s(),l(d,{key:1},{default:n(()=>[o("mdi-arrow-up")]),_:1})):(s(),l(d,{key:2},{default:n(()=>[o("mdi-sort")]),_:1}))]),i("th",{onClick:t[2]||(t[2]=a=>_.sortBy("primary_body_part")),class:"clickable-header"},[o(" Primary Body Part "),r.sortedColumn==="primary_body_part"&&r.sortAscending?(s(),l(d,{key:0},{default:n(()=>[o("mdi-arrow-down")]),_:1})):r.sortedColumn==="primary_body_part"?(s(),l(d,{key:1},{default:n(()=>[o("mdi-arrow-up")]),_:1})):(s(),l(d,{key:2},{default:n(()=>[o("mdi-sort")]),_:1}))]),i("th",{onClick:t[3]||(t[3]=a=>_.sortBy("secondary_body_part")),class:"clickable-header"},[o(" Secondary Body Part "),r.sortedColumn==="secondary_body_part"&&r.sortAscending?(s(),l(d,{key:0},{default:n(()=>[o("mdi-arrow-down")]),_:1})):r.sortedColumn==="secondary_body_part"?(s(),l(d,{key:1},{default:n(()=>[o("mdi-arrow-up")]),_:1})):(s(),l(d,{key:2},{default:n(()=>[o("mdi-sort")]),_:1}))])])]),i("tbody",null,[(s(!0),h(A,null,B(_.filteredExercises,a=>(s(),h("tr",{key:a.id},[i("td",null,[y(k,{to:{name:"ExerciseDetail",params:{id:a.id}}},{default:n(()=>[o(p(a.name),1)]),_:2},1032,["to"])]),i("td",null,p(a.primary_body_part),1),i("td",null,p(a.secondary_body_part),1)]))),128))])]),_:1})])):(s(),l(b,{key:0,indeterminate:"",color:"primary"}))]),_:1})])}const Q=w(E,[["render",V],["__scopeId","data-v-ba1eab21"]]);export{Q as default};
