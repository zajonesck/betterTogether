import {
  _ as l,
  d as i,
  o as n,
  a as u,
  b as e,
  F as d,
  f as k,
  h as p,
  v as m,
  t as c,
} from "./index.b3ed7097.js";
const h = {
    data() {
      return { clientId: null, workouts: [], newWorkoutName: "" };
    },
    async mounted() {
      (this.clientId = this.$route.params.clientId), await this.getWorkouts();
    },
    methods: {
      getWorkouts() {
        i.get(
          `https://better-together-f87fbab820d6.herokuapp.com/workouts/${this.clientId}`
        ).then((r) => {
          this.workouts = r.data;
        });
      },
      addWorkout() {
        const r = { workout_name: this.newWorkoutName };
        i.post(
          `https://better-together-f87fbab820d6.herokuapp.com/workouts/${this.clientId}`,
          r
        ).then((o) => {
          this.getWorkouts(), (this.newWorkoutName = "");
        });
      },
    },
  },
  W = { id: "app" },
  w = e("h1", null, "Workouts", -1),
  _ = e("label", null, "Workout: ", -1);
function g(r, o, f, y, s, a) {
  return (
    n(),
    u("div", W, [
      w,
      e("ul", null, [
        (n(!0),
        u(
          d,
          null,
          k(
            s.workouts,
            (t) => (n(), u("li", { key: t.id }, c(t.workout_name), 1))
          ),
          128
        )),
      ]),
      _,
      p(
        e(
          "input",
          {
            "onUpdate:modelValue":
              o[0] || (o[0] = (t) => (s.newWorkoutName = t)),
            type: "text",
            id: "workoutName",
            placeholder: "Workout",
          },
          null,
          512
        ),
        [[m, s.newWorkoutName]]
      ),
      e(
        "button",
        {
          onClick:
            o[1] || (o[1] = (...t) => a.addWorkout && a.addWorkout(...t)),
        },
        "Log Workout"
      ),
    ])
  );
}
const x = l(h, [["render", g]]);
export { x as default };
