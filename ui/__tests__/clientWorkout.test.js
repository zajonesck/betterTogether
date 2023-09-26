const { mount } = require("@vue/test-utils");
import ClientWorkout from "../src/component/ClientWorkout.vue";

describe("ClientWorkout.vue", () => {
  let wrapper;

  const clientWorkoutsData = [
    {
      id: 1,
      workout_name: "Chest Day",
      difficulty: "Intermediate",
      date: "2023-09-23",
      notes: "Intense",
    },
    {
      id: 2,
      workout_name: "Arm Day",
      difficulty: "Beginner",
      date: "2023-09-22",
      notes: "Light",
    },
    {
      id: 3,
      workout_name: "Leg Day",
      difficulty: "Advanced",
      date: "2023-09-21",
      notes: "Very Intense",
    },
  ];

  beforeEach(() => {
    wrapper = mount(ClientWorkout);
  });

  describe("Sorting functionality", () => {
    test.each([
      ["workout_name", true, "Arm Day"],
      ["workout_name", false, "Leg Day"],
      ["difficulty", true, "Advanced"],
      ["difficulty", false, "Intermediate"],
      ["date", true, "2023-09-21"],
      ["date", false, "2023-09-23"],
    ])("should sort by %s in %s order", (column, ascending, expected) => {
      wrapper.setData({
        clientWorkouts: clientWorkoutsData,
        sortedColumn: column,
        sortAscending: ascending,
      });
      expect(wrapper.vm.sortedWorkouts[0][column]).toBe(expected);
    });
  });

  describe("Search functionality", () => {
    test.each([
      ["Chest Day", "workout_name", 1, "Chest Day"],
      ["Calisthenics", "workout_name", 0],
      ["cHeSt DaY", "workout_name", 1, "Chest Day"],
      ["Intermediate", "difficulty", 1, "Intermediate"],
      ["Intense", "notes", 2, "Intense"],
    ])(
      "should filter workouts by %s in %s column",
      (query, column, expectedLength, expectedValue) => {
        wrapper.setData({
          clientWorkouts: clientWorkoutsData,
          searchQuery: query,
        });
        expect(wrapper.vm.filteredWorkouts.length).toBe(expectedLength);
        if (expectedLength > 0) {
          expect(wrapper.vm.filteredWorkouts[0][column]).toBe(expectedValue);
        }
      }
    );
  });
  describe("Pagination functionality", () => {
    test("should display correct number of workouts per page", () => {
      wrapper.setData({
        clientWorkouts: clientWorkoutsData,
        currentPageAssignedWorkouts: 1,
        itemsPerPageAssignedWorkouts: 2,
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
      wrapper.setData({
        clientWorkouts: clientWorkoutsData,
        itemsPerPageAssignedWorkouts: 2,
      });
      expect(wrapper.vm.totalPagesAssignedWorkouts).toBe(
        Math.ceil(clientWorkoutsData.length / 2)
      );
    });

    test("should navigate to next page correctly", async () => {
      await wrapper.setData({
        clientWorkouts: clientWorkoutsData,
        currentPage: 2,
        itemsPerPageAssignedWorkouts: 2,
      });

      // Check if it navigated to the next page correctly
      expect(wrapper.vm.currentPage).toBe(2);
      expect(wrapper.vm.paginatedAssignedWorkouts.length).toBe(1); // Only one item on the second page
      expect(wrapper.vm.paginatedAssignedWorkouts[0].workout_name).toBe(
        "Leg Day"
      );
    });
  });
});
