import{_ as f,h as l,r as t,o as x,i as w,w as o,a as u,d as e,b as d}from"./index.26b75667.js";const $={setup(){const s=l(null),c=l([]),n=l(""),r=()=>{u.get(`http://localhost:3000/workouts/${s.value}`).then(a=>{c.value=a.data})};return{clientId:s,workouts:c,newWorkoutName:n,getWorkouts:r,addWorkout:()=>{const a={workout_name:n.value};u.post(`http://localhost:3000/workouts/${s.value}`,a).then(_=>{r(),n.value=""})}}},async mounted(){this.clientId=this.$route.params.clientId,await this.getWorkouts()}},W=d("h1",{class:"text-h5 white--text"},"Workouts",-1),g=d("h2",{class:"text-h6 white--text"},"Coming Soon",-1);function B(s,c,n,r,i,a){const _=t("v-card-title"),p=t("v-card-text"),h=t("v-card"),v=t("v-col"),m=t("v-row"),k=t("v-container");return x(),w(k,null,{default:o(()=>[e(m,{class:"text-center"},{default:o(()=>[e(v,null,{default:o(()=>[e(h,{class:"mx-auto",dark:""},{default:o(()=>[e(_,null,{default:o(()=>[W]),_:1}),e(p,null,{default:o(()=>[g]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const I=f($,[["render",B]]);export{I as default};
