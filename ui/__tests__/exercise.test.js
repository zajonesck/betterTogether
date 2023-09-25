const { mount } = require("@vue/test-utils");
import Exercise from "../src/views/Exercise.vue";

describe("Exercise.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Exercise);
  });

  describe("Sorting functionality", () => {
    test("should sort by name in ascending order", async () => {
      wrapper.setData({
        exercises: [
          {
            name: "Zumba",
            primary_body_part: "Legs",
            secondary_body_part: "Arms",
          },
          {
            name: "Aerobics",
            primary_body_part: "Arms",
            secondary_body_part: "Legs",
          },
        ],
        sortedColumn: "name",
        sortAscending: true,
      });

      await wrapper.vm.$nextTick();
      wrapper.vm.sortBy("name");
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.paginatedExercises[0].name).toBe("Aerobics");
    });

    // You can add more tests for other properties and sorting orders
  });

  describe("Search functionality", () => {
    test("should filter exercises by name", async () => {
      wrapper.setData({
        exercises: [
          {
            name: "Aerobics",
            primary_body_part: "Legs",
            secondary_body_part: "Arms",
          },
          {
            name: "Zumba",
            primary_body_part: "Arms",
            secondary_body_part: "Legs",
          },
        ],
        searchQuery: "Zumba",
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.filteredExercises[0].name).toBe("Zumba");
    });

    // You can add more tests for other search criteria
  });
});
