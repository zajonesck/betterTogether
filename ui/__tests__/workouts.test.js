const { mount } = require("@vue/test-utils");
import Workouts from "../src/views/Workouts.vue";

describe("Workouts.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Workouts, {
      data() {
        return {
          workouts: [
            {
              workout_name: "Chest Day",
              difficulty: "Intermediate",
              description: "Bench press focused",
            },
            {
              workout_name: "Arm Day",
              difficulty: "Beginner",
              description: "Arm focused hypertrophy",
            },
            {
              workout_name: "Back Day",
              difficulty: "Advanced",
              description: "Back focused hypertrophy",
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
      expect(wrapper.vm.filteredWorkouts[0].workout_name).toBe("Arm Day");
    });

    test("should sort by workout_name in descending order", async () => {
      wrapper.vm.sortBy("workout_name");
      wrapper.vm.sortBy("workout_name");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredWorkouts[0].workout_name).toBe("Chest Day");
    });

    test("should sort by difficulty in ascending order alphabetically", async () => {
      wrapper.vm.sortBy("difficulty");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredWorkouts[0].difficulty).toBe("Advanced");
    });

    test("should sort by difficulty in descending order", async () => {
      wrapper.vm.sortBy("difficulty");
      wrapper.vm.sortBy("difficulty");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredWorkouts[0].difficulty).toBe("Intermediate");
    });
  });

  describe("Search functionality", () => {
    test("should return an empty list if no match is found", async () => {
      wrapper.setData({ searchQuery: "Nonexistent Workout" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredWorkouts.length).toBe(0);
    });

    test("should filter workouts case-insensitively", async () => {
      wrapper.setData({ searchQuery: "cHeSt dAy" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredWorkouts.length).toBe(1);
      expect(wrapper.vm.filteredWorkouts[0].workout_name).toBe("Chest Day");
    });

    test("should filter workouts across all fields", async () => {
      // Searching for "Chest" should match the workout "Chest Day"
      wrapper.setData({ searchQuery: "Chest" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredWorkouts.length).toBe(1);
      expect(wrapper.vm.filteredWorkouts[0].workout_name).toBe("Chest Day");

      // Searching for "Arm" should match the workout "Arm Day"
      wrapper.setData({ searchQuery: "Arm" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredWorkouts.length).toBe(1);
      expect(wrapper.vm.filteredWorkouts[0].workout_name).toBe("Arm Day");

      // Searching for "Back" should match the workout "Back Day"
      wrapper.setData({ searchQuery: "Back" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredWorkouts.length).toBe(1);
      expect(wrapper.vm.filteredWorkouts[0].workout_name).toBe("Back Day");
    });
  });

  describe("Pagination functionality", () => {
    test("should display correct number of workouts per page", async () => {
      wrapper.setData({
        currentPage: 1,
      });
      await wrapper.vm.$nextTick(); // Wait for Vue's reactivity system
      expect(wrapper.vm.paginatedItems.length).toBe(2); // Corrected to paginatedItems
      expect(wrapper.vm.paginatedItems[0].workout_name).toBe("Chest Day");
      expect(wrapper.vm.paginatedItems[1].workout_name).toBe("Arm Day");
    });

    test("should calculate total pages correctly", async () => {
      await wrapper.vm.$nextTick(); // Wait for Vue's reactivity system
      expect(
        Math.ceil(wrapper.vm.totalItems / wrapper.vm.itemsPerPage) // Corrected to totalItems
      ).toBe(2); // As there are 3 workouts and 2 items per page
    });

    test("should navigate to next page correctly", async () => {
      wrapper.setData({
        currentPage: 2,
      });
      await wrapper.vm.$nextTick(); // Wait for Vue's reactivity system
      expect(wrapper.vm.paginatedItems.length).toBe(1); // Corrected to paginatedItems
      expect(wrapper.vm.paginatedItems[0].workout_name).toBe("Back Day");
    });
  });
});
