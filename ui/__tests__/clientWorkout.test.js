const { mount } = require("@vue/test-utils");
import ClientWorkout from "../src/component/ClientWorkout.vue";

describe("Clientorkout.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ClientWorkout);
  });

  describe("Sorting functionality", () => {
    test("should sort by workout_name in ascending order", () => {
      wrapper.setData({
        clientWorkouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            date: "2023-09-23",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            date: "2023-09-22",
          },
        ],
        sortedColumn: "workout_name",
        sortAscending: true,
      });

      expect(wrapper.vm.sortedWorkouts[0].workout_name).toBe("Arm Day");
    });

    test("should sort by workout_name in descending order", () => {
      wrapper.setData({
        clientWorkouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            date: "2023-09-23",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            date: "2023-09-22",
          },
        ],
        sortedColumn: "workout_name",
        sortAscending: false,
      });

      expect(wrapper.vm.sortedWorkouts[0].workout_name).toBe("Chest Day");
    });

    test("should sort by difficulty in ascending order", () => {
      wrapper.setData({
        clientWorkouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            date: "2023-09-23",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            date: "2023-09-22",
          },
        ],
        sortedColumn: "difficulty",
        sortAscending: true,
      });

      expect(wrapper.vm.sortedWorkouts[0].difficulty).toBe("Beginner");
    });

    test("should sort by difficulty in descending order", () => {
      wrapper.setData({
        clientWorkouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            date: "2023-09-23",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            date: "2023-09-22",
          },
        ],
        sortedColumn: "difficulty",
        sortAscending: false,
      });

      expect(wrapper.vm.sortedWorkouts[0].difficulty).toBe("Intermediate");
    });

    test("should sort by date in ascending order", () => {
      wrapper.setData({
        clientWorkouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            date: "2023-09-23",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            date: "2023-09-22",
          },
        ],
        sortedColumn: "date",
        sortAscending: true,
      });

      expect(wrapper.vm.sortedWorkouts[0].date).toBe("2023-09-22");
    });

    test("should sort by date in descending order", () => {
      wrapper.setData({
        clientWorkouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            date: "2023-09-23",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            date: "2023-09-22",
          },
        ],
        sortedColumn: "date",
        sortAscending: false,
      });

      expect(wrapper.vm.sortedWorkouts[0].date).toBe("2023-09-23");
    });
  });

  describe("Search functionality", () => {
    test("should filter workouts by workout_name", () => {
      wrapper.setData({
        clientWorkouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            date: "2023-09-23",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            date: "2023-09-22",
          },
        ],
        searchQuery: "Chest Day",
      });

      expect(wrapper.vm.filteredWorkouts.length).toBe(1);
      expect(wrapper.vm.filteredWorkouts[0].workout_name).toBe("Chest Day");
    });

    test("should return empty list if no match found", () => {
      wrapper.setData({
        clientWorkouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            date: "2023-09-23",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            date: "2023-09-22",
          },
        ],
        searchQuery: "Calisthenics",
      });

      expect(wrapper.vm.filteredWorkouts.length).toBe(0);
    });

    test("should filter workouts case-insensitively", () => {
      wrapper.setData({
        clientWorkouts: [
          {
            workout_name: "Chest Day",
            difficulty: "Intermediate",
            date: "2023-09-23",
          },
          {
            workout_name: "Arm Day",
            difficulty: "Beginner",
            date: "2023-09-22",
          },
        ],
        searchQuery: "cHeSt DaY",
      });

      expect(wrapper.vm.filteredWorkouts.length).toBe(1);
      expect(wrapper.vm.filteredWorkouts[0].workout_name).toBe("Chest Day");
    });
    test("should filter workouts by difficulty", () => {
      wrapper.setData({
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
        ],
        searchQuery: "Intermediate",
      });

      expect(wrapper.vm.filteredWorkouts.length).toBe(1);
      expect(wrapper.vm.filteredWorkouts[0].difficulty).toBe("Intermediate");
    });
    test("should filter workouts by notes", () => {
      wrapper.setData({
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
        ],
        searchQuery: "Intense",
      });

      expect(wrapper.vm.filteredWorkouts.length).toBe(1);
      expect(wrapper.vm.filteredWorkouts[0].notes).toBe("Intense");
    });
  });
});
