import{_ as V,a as W,r as i,o as n,e as m,b as c,w as s,F as k,d as l,c as u,g as a,h as A,t as p,p as B,j as I}from"./index.6a4a1f13.js";const S={data(){return{currentPage:1,itemsPerPage:10,sortAscending:!0,workouts:[],loading:!0,searchQuery:"",sortedColumn:null}},methods:{async getWorkouts(){try{const e=await W.get("https://better-together-f87fbab820d6.herokuapp.com/workouts");this.workouts=e.data}catch(e){console.error("Failed to fetch workouts:",e)}finally{this.loading=!1}},sortBy(e){this.sortedColumn===e?this.sortAscending=!this.sortAscending:(this.sortedColumn=e,this.sortAscending=!0),this.workouts.sort((t,f)=>{const h=t[e].toString().toUpperCase(),o=f[e].toString().toUpperCase();return this.sortAscending?h.localeCompare(o):o.localeCompare(h)})}},computed:{paginatedItems(){const e=(this.currentPage-1)*this.itemsPerPage,t=e+this.itemsPerPage;return this.filteredWorkouts.slice(e,t)},totalItems(){return this.filteredWorkouts.length},filteredWorkouts(){if(!this.searchQuery)return this.workouts;const e=this.searchQuery.toLowerCase();return this.workouts.filter(t=>t.workout_name.toLowerCase().includes(e)||t.description.toLowerCase().includes(e)||t.difficulty.toLowerCase().includes(e))}},async mounted(){await this.getWorkouts()}},L=e=>(B("data-v-c4e9a004"),e=e(),I(),e),Q={key:1},U=L(()=>a("th",null,"Description",-1));function D(e,t,f,h,o,_){const g=i("router-link"),y=i("v-list-subheader"),v=i("v-card-title"),w=i("v-text-field"),C=i("v-progress-circular"),d=i("v-icon"),x=i("v-table"),b=i("v-pagination"),P=i("v-container");return n(),m(k,null,[c(v,null,{default:s(()=>[l(" Workouts "),c(y,null,{default:s(()=>[c(g,{to:"/exercises",class:"custom-link"},{default:s(()=>[l("View Exercises")]),_:1})]),_:1})]),_:1}),c(P,{style:{"min-height":"calc(100vh - 250px)"}},{default:s(()=>[c(w,{modelValue:o.searchQuery,"onUpdate:modelValue":t[0]||(t[0]=r=>o.searchQuery=r),clearable:"",label:"Search Workouts",variant:"outlined"},null,8,["modelValue"]),o.loading?(n(),u(C,{key:0,indeterminate:"",color:"primary"})):(n(),m("div",Q,[c(x,{"fixed-header":""},{default:s(()=>[a("thead",null,[a("tr",null,[a("th",{onClick:t[1]||(t[1]=r=>_.sortBy("workout_name")),class:"clickable-header"},[l(" Workout "),o.sortedColumn==="workout_name"&&o.sortAscending?(n(),u(d,{key:0},{default:s(()=>[l("mdi-arrow-down")]),_:1})):o.sortedColumn==="workout_name"?(n(),u(d,{key:1},{default:s(()=>[l("mdi-arrow-up")]),_:1})):(n(),u(d,{key:2},{default:s(()=>[l("mdi-sort")]),_:1}))]),U,a("th",{onClick:t[2]||(t[2]=r=>_.sortBy("difficulty")),class:"clickable-header"},[l(" Difficulty "),o.sortedColumn==="difficulty"&&o.sortAscending?(n(),u(d,{key:0},{default:s(()=>[l("mdi-arrow-down")]),_:1})):o.sortedColumn==="difficulty"?(n(),u(d,{key:1},{default:s(()=>[l("mdi-arrow-up")]),_:1})):(n(),u(d,{key:2},{default:s(()=>[l("mdi-sort")]),_:1}))])])]),a("tbody",null,[(n(!0),m(k,null,A(_.paginatedItems,r=>(n(),m("tr",{key:r.id},[a("td",null,[c(g,{to:{name:"workout-detail",params:{id:r.id}},class:"custom-link"},{default:s(()=>[l(p(r.workout_name),1)]),_:2},1032,["to"])]),a("td",null,p(r.description),1),a("td",null,p(r.difficulty),1)]))),128))])]),_:1}),c(b,{modelValue:o.currentPage,"onUpdate:modelValue":t[3]||(t[3]=r=>o.currentPage=r),length:Math.ceil(_.totalItems/o.itemsPerPage)},null,8,["modelValue","length"])]))]),_:1})],64)}const N=V(S,[["render",D],["__scopeId","data-v-c4e9a004"]]);export{N as default};
