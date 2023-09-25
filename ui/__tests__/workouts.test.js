const { mount } = require("@vue/test-utils");
import Workouts from "../src/views/Workouts.vue";

describe("Workouts.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Workouts);
  });

  describe("Sorting functionality", () => {
    test("should sort by workout_name in ascending order", () => {
      wrapper.setData({
        workouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            description: "Weight based workout",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            description: "Low impact exercise",
          },
        ],
      });

      wrapper.vm.sortBy("workout_name"); // Call the sortBy method

      expect(wrapper.vm.filteredWorkouts[0].workout_name).toBe("Arm Day");
    });

    test("should sort by workout_name in descending order", () => {
      wrapper.setData({
        workouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            description: "Weight based workout",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            description: "Low impact exercise",
          },
        ],
      });

      wrapper.vm.sortBy("workout_name"); // Sort ascending first
      wrapper.vm.sortBy("workout_name"); // Sort descending next

      expect(wrapper.vm.filteredWorkouts[0].workout_name).toBe("Chest Day");
    });

    test("should sort by difficulty in ascending order", () => {
      wrapper.setData({
        workouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            description: "Weight based workout",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            description: "Low impact exercise",
          },
        ],
      });

      wrapper.vm.sortBy("difficulty"); // Call the sortBy method

      expect(wrapper.vm.filteredWorkouts[0].difficulty).toBe("Beginner");
    });

    test("should sort by difficulty in descending order", () => {
      wrapper.setData({
        workouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            description: "Weight based workout",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            description: "Low impact exercise",
          },
        ],
      });

      wrapper.vm.sortBy("difficulty"); // Sort ascending first
      wrapper.vm.sortBy("difficulty"); // Sort descending next

      expect(wrapper.vm.filteredWorkouts[0].difficulty).toBe("Intermediate");
    });
  });

  describe("Search functionality", () => {
    test("should filter workouts by workout_name", () => {
      wrapper.setData({
        workouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            description: "Weight based workout",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            description: "Low impact exercise",
          },
        ],
        searchQuery: "Chest Day",
      });

      expect(wrapper.vm.filteredWorkouts.length).toBe(1);
      expect(wrapper.vm.filteredWorkouts[0].workout_name).toBe("Chest Day");
    });

    test("should filter workouts by description", () => {
      wrapper.setData({
        workouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            description: "Weight based workout",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            description: "Low impact exercise",
          },
        ],
        searchQuery: "Weight",
      });

      expect(wrapper.vm.filteredWorkouts.length).toBe(1);
      expect(wrapper.vm.filteredWorkouts[0].description).toBe(
        "Weight based workout"
      );
    });

    test("should filter workouts by difficulty", () => {
      wrapper.setData({
        workouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            description: "Weight based workout",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            description: "Low impact exercise",
          },
        ],
        searchQuery: "Beginner",
      });

      expect(wrapper.vm.filteredWorkouts.length).toBe(1);
      expect(wrapper.vm.filteredWorkouts[0].difficulty).toBe("Beginner");
    });
  });
});
