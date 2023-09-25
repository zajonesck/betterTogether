const { mount } = require("@vue/test-utils");
import Workouts from "../src/views/Workouts.vue";

describe("Workouts.vue", () => {
  let wrapper;

  const setWorkoutsData = () => {
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
  };

  const runSortingTest = (property, expectedValue) => {
    wrapper.vm.sortBy(property);
    expect(wrapper.vm.filteredWorkouts[0][property]).toBe(expectedValue);
  };

  beforeEach(() => {
    wrapper = mount(Workouts);
    setWorkoutsData();
  });

  describe("Sorting functionality", () => {
    test("should sort by workout_name in ascending order", () => {
      runSortingTest("workout_name", "Arm Day");
    });

    test("should sort by workout_name in descending order", () => {
      wrapper.vm.sortBy("workout_name");
      runSortingTest("workout_name", "Chest Day");
    });

    test("should sort by difficulty in ascending order", () => {
      runSortingTest("difficulty", "Beginner");
    });

    test("should sort by difficulty in descending order", () => {
      wrapper.vm.sortBy("difficulty");
      runSortingTest("difficulty", "Intermediate");
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

    test("should filter workouts case-insensitively", () => {
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
        searchQuery: "cHeSt dAy",
      });

      expect(wrapper.vm.filteredWorkouts.length).toBe(1);
      expect(wrapper.vm.filteredWorkouts[0].workout_name).toBe("Chest Day");
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
  describe("Pagination functionality", () => {
    const workoutsData = [...Array(15).keys()].map((i) => ({
      id: i,
      workout_name: `Workout ${i}`,
      difficulty: "Intermediate",
      description: `Description ${i}`,
    }));

    beforeEach(() => {
      wrapper.setData({
        workouts: workoutsData,
      });
    });

    test("should render correct number of workouts per page", () => {
      expect(wrapper.vm.paginatedItems.length).toBe(wrapper.vm.itemsPerPage);
    });

    test("should calculate total pages correctly", () => {
      expect(Math.ceil(wrapper.vm.totalItems / wrapper.vm.itemsPerPage)).toBe(
        Math.ceil(workoutsData.length / wrapper.vm.itemsPerPage)
      );
    });

    test("should render correct workouts on changing page", async () => {
      wrapper.setData({ currentPage: 2 });

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.paginatedItems[0].workout_name).toBe("Workout 10");
    });
  });
});
