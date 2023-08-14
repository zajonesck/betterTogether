import{_ as x,a as W,r as a,o as r,d as _,b as d,w as s,F as k,e as n,c,f as i,g as A,t as p,p as B,i as S}from"./index.f4f71b34.js";const V={data(){return{sortAscending:!0,workouts:[],loading:!0,searchQuery:"",sortedColumn:null}},methods:{async getWorkouts(){try{const e=await W.get("https://better-together-f87fbab820d6.herokuapp.com/workouts");this.workouts=e.data}catch(e){console.error("Failed to fetch workouts:",e)}finally{this.loading=!1}},sortBy(e){this.sortedColumn===e?this.sortAscending=!this.sortAscending:(this.sortedColumn=e,this.sortAscending=!0),this.workouts.sort((t,h)=>{const m=t[e].toString().toUpperCase(),o=h[e].toString().toUpperCase();return this.sortAscending?m.localeCompare(o):o.localeCompare(m)})}},computed:{filteredWorkouts(){if(!this.searchQuery)return this.workouts;const e=this.searchQuery.toLowerCase();return this.workouts.filter(t=>t.workout_name.toLowerCase().includes(e)||t.description.toLowerCase().includes(e)||t.difficulty.toLowerCase().includes(e))}},async mounted(){await this.getWorkouts()}},L=e=>(B("data-v-4c4b67a9"),e=e(),S(),e),Q={key:1},I=L(()=>i("th",null,"Description",-1));function D(e,t,h,m,o,f){const y=a("v-card-title"),g=a("v-text-field"),v=a("v-progress-circular"),u=a("v-icon"),w=a("router-link"),C=a("v-table"),b=a("v-container");return r(),_(k,null,[d(y,null,{default:s(()=>[n("Workouts")]),_:1}),d(b,{style:{"min-height":"calc(100vh - 250px)"}},{default:s(()=>[d(g,{modelValue:o.searchQuery,"onUpdate:modelValue":t[0]||(t[0]=l=>o.searchQuery=l),clearable:"",label:"Search Workouts",variant:"outlined"},null,8,["modelValue"]),o.loading?(r(),c(v,{key:0,indeterminate:"",color:"primary"})):(r(),_("div",Q,[d(C,{"fixed-header":""},{default:s(()=>[i("thead",null,[i("tr",null,[i("th",{onClick:t[1]||(t[1]=l=>f.sortBy("workout_name")),class:"clickable-header"},[n(" Workout "),o.sortedColumn==="workout_name"&&o.sortAscending?(r(),c(u,{key:0},{default:s(()=>[n("mdi-arrow-down")]),_:1})):o.sortedColumn==="workout_name"?(r(),c(u,{key:1},{default:s(()=>[n("mdi-arrow-up")]),_:1})):(r(),c(u,{key:2},{default:s(()=>[n("mdi-sort")]),_:1}))]),I,i("th",{onClick:t[2]||(t[2]=l=>f.sortBy("difficulty")),class:"clickable-header"},[n(" Difficulty "),o.sortedColumn==="difficulty"&&o.sortAscending?(r(),c(u,{key:0},{default:s(()=>[n("mdi-arrow-down")]),_:1})):o.sortedColumn==="difficulty"?(r(),c(u,{key:1},{default:s(()=>[n("mdi-arrow-up")]),_:1})):(r(),c(u,{key:2},{default:s(()=>[n("mdi-sort")]),_:1}))])])]),i("tbody",null,[(r(!0),_(k,null,A(f.filteredWorkouts,l=>(r(),_("tr",{key:l.id},[i("td",null,[d(w,{to:{name:"workout-detail",params:{id:l.id}}},{default:s(()=>[n(p(l.workout_name),1)]),_:2},1032,["to"])]),i("td",null,p(l.description),1),i("td",null,p(l.difficulty),1)]))),128))])]),_:1})]))]),_:1})],64)}const N=x(V,[["render",D],["__scopeId","data-v-4c4b67a9"]]);export{N as default};
