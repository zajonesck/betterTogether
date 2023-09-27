const { mount } = require("@vue/test-utils");
import ClientWorkout from "../src/component/ClientWorkout.vue";

describe("ClientWorkout.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ClientWorkout, {
      data() {
        return {
          clientWorkouts: [
            {
              workout_name: "Chest Day",
              difficulty: "Intermediate",
              date: "2023-09-23",
              notes: "Intense",
            },
            {
              workout_name: "Arm Day",
              difficulty: "Beginner",
              date: "2023-09-22",
              notes: "Light",
            },
            {
              workout_name: "Leg Day",
              difficulty: "Advanced",
              date: "2023-09-21",
              notes: "Very Intense",
            },
          ],
          itemsPerPage: 2,
        };
      },
    });
  });

  describe("Sorting functionality", () => {
    test("should sort by workout_name in ascending order", async () => {
      wrapper.vm.sortBy("workout_name");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.sortedWorkouts[0].workout_name).toBe("Arm Day");
    });

    test("should sort by workout_name in descending order", async () => {
      wrapper.vm.sortBy("workout_name");
      wrapper.vm.sortBy("workout_name");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.clientWorkouts[0].workout_name).toBe("Leg Day");
    });

    test("should sort by difficulty in ascending order", async () => {
      wrapper.vm.sortBy("difficulty");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredWorkouts[0].difficulty).toBe("Advanced");
    });

    test("should sort by difficulty in descending order", async () => {
      wrapper.vm.sortBy("difficulty");
      wrapper.vm.sortBy("difficulty");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.clientWorkouts[0].difficulty).toBe("Intermediate");
    });

    test("should sort by date in ascending order", async () => {
      wrapper.vm.sortBy("date");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredWorkouts[0].date).toBe("2023-09-21");
    });

    test("should sort by date in descending order", async () => {
      wrapper.vm.sortBy("date");
      wrapper.vm.sortBy("date");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredWorkouts[0].date).toBe("2023-09-23");
    });
  });

  describe("Search functionality", () => {
    test("should return an empty list if no match is found", async () => {
      wrapper.setData({ searchQuery: "Nonexistent Workout" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredWorkouts.length).toBe(0);
    });

    test("should filter workouts case-insensitively", async () => {
      wrapper.setData({ searchQuery: "cHeSt DaY" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredWorkouts.length).toBe(1);
      expect(wrapper.vm.filteredWorkouts[0].workout_name).toBe("Chest Day");
    });

    test("should filter workouts across all fields", async () => {
      wrapper.setData({ searchQuery: "Intense" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredWorkouts.length).toBe(2);
    });
  });

  describe("Pagination functionality", () => {
    test("should display correct number of workouts per page", () => {
      wrapper.setData({
        currentPage: 1,
      });
      expect(wrapper.vm.paginatedAssignedWorkouts.length).toBe(2);
      expect(wrapper.vm.paginatedAssignedWorkouts[0].workout_name).toBe(
        "Chest Day"
      );
      expect(wrapper.vm.paginatedAssignedWorkouts[1].workout_name).toBe(
        "Arm Day"
      );
    });

    test("should calculate total pages correctly", () => {
      expect(wrapper.vm.totalPagesAssignedWorkouts).toBe(2);
    });

    test("should navigate to next page correctly", () => {
      wrapper.setData({
        currentPage: 2,
      });
      expect(wrapper.vm.paginatedAssignedWorkouts.length).toBe(1);
      expect(wrapper.vm.paginatedAssignedWorkouts[0].workout_name).toBe(
        "Leg Day"
      );
    });
  });
});
