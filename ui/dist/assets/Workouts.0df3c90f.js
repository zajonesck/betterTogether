import{_ as k,h as _,r as t,o as x,i as w,w as o,a as l,d as e,b as d}from"./index.cc2aa31c.js";const $={setup(){const s=_(null),c=_([]),a=_(""),r=()=>{l.get(`https://better-together-f87fbab820d6.herokuapp.com/workouts/${s.value}`).then(n=>{c.value=n.data})};return{clientId:s,workouts:c,newWorkoutName:a,getWorkouts:r,addWorkout:()=>{const n={workout_name:a.value};l.post(`https://better-together-f87fbab820d6.herokuapp.com/workouts/${s.value}`,n).then(u=>{r(),a.value=""})}}},async mounted(){this.clientId=this.$route.params.clientId,await this.getWorkouts()}},b=d("h1",{class:"text-h5 white--text"},"Workouts",-1),W=d("h2",{class:"text-h6 white--text"},"Coming Soon",-1);function g(s,c,a,r,p,n){const u=t("v-card-title"),i=t("v-card-text"),h=t("v-card"),m=t("v-col"),v=t("v-row"),f=t("v-container");return x(),w(f,null,{default:o(()=>[e(v,{class:"text-center"},{default:o(()=>[e(m,null,{default:o(()=>[e(h,{class:"mx-auto",dark:""},{default:o(()=>[e(u,null,{default:o(()=>[b]),_:1}),e(i,null,{default:o(()=>[W]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const C=k($,[["render",g]]);export{C as default};
