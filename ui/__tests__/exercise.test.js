const { mount } = require("@vue/test-utils");
import Exercise from "../src/views/Exercise.vue";

describe("Exercise.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Exercise, {
      data() {
        return {
          exercises: [
            {
              id: 1,
              name: "Leg Press",
              primary_body_part: "Quads",
              secondary_body_part: "Hamstrings",
            },
            {
              id: 2,
              name: "Bicep Curl",
              primary_body_part: "Biceps",
              secondary_body_part: "Forearms",
            },
            {
              id: 3,
              name: "Tricep Pushdown",
              primary_body_part: "Triceps",
              secondary_body_part: "Forearms",
            },
          ],
          itemsPerPage: 2,
        };
      },
    });
  });

  describe("Sorting functionality", () => {
    test("should sort by name in ascending order", async () => {
      wrapper.vm.sortBy("name");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredExercises[0].name).toBe("Bicep Curl");
    });

    test("should sort by name in descending order", async () => {
      wrapper.vm.sortBy("name");
      wrapper.vm.sortBy("name");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredExercises[0].name).toBe("Tricep Pushdown");
    });

    test("should sort by primary_body_part in ascending order", async () => {
      wrapper.vm.sortBy("primary_body_part");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredExercises[0].primary_body_part).toBe("Biceps");
    });

    test("should sort by primary_body_part in descending order", async () => {
      wrapper.vm.sortBy("primary_body_part");
      wrapper.vm.sortBy("primary_body_part");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredExercises[0].primary_body_part).toBe("Triceps");
    });

    test("should sort by secondary_body_part in ascending order", async () => {
      wrapper.vm.sortBy("secondary_body_part");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredExercises[0].secondary_body_part).toBe(
        "Forearms"
      );
    });

    test("should sort by secondary_body_part in descending order", async () => {
      wrapper.vm.sortBy("secondary_body_part");
      wrapper.vm.sortBy("secondary_body_part");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredExercises[0].secondary_body_part).toBe(
        "Hamstrings"
      );
    });
  });
  describe("Search functionality", () => {
    test("should return an empty list if no match is found", async () => {
      wrapper.setData({ searchQuery: "Nonexistent Exercise" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredExercises.length).toBe(0);
    });

    test("should filter workouts case-insensitively", async () => {
      wrapper.setData({ searchQuery: "lEg PREss" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredExercises.length).toBe(1);
      expect(wrapper.vm.filteredExercises[0].name).toBe("Leg Press");
    });

    test("should filter exercises across all fields", async () => {
      // Searching for "Bicep" should match the exercise "Bicep Curl"
      wrapper.setData({ searchQuery: "Bicep" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredExercises.length).toBe(1);
      expect(wrapper.vm.filteredExercises[0].name).toBe("Bicep Curl");

      // Searching for "Triceps" should match the exercise "Tricep Pushdown" by its primary body part
      wrapper.setData({ searchQuery: "Triceps" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredExercises.length).toBe(1);
      expect(wrapper.vm.filteredExercises[0].name).toBe("Tricep Pushdown");

      // Searching for "Forearms" should match two exercises "Bicep Curl" and "Tricep Pushdown" by their secondary body parts
      wrapper.setData({ searchQuery: "Forearms" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredExercises.length).toBe(2);
    });
  });
  describe("Pagination functionality", () => {
    test("should display correct number of exercises per page", () => {
      wrapper.setData({
        currentPage: 1,
      });
      expect(wrapper.vm.paginatedExercises.length).toBe(2);
      expect(wrapper.vm.paginatedExercises[0].name).toBe("Leg Press");
      expect(wrapper.vm.paginatedExercises[1].name).toBe("Bicep Curl");
    });

    test("should calculate total pages correctly", () => {
      expect(
        Math.ceil(wrapper.vm.totalExercises / wrapper.vm.itemsPerPage)
      ).toBe(2); // As there are 3 exercises and 2 items per page
    });

    test("should navigate to next page correctly", () => {
      wrapper.setData({
        currentPage: 2,
      });
      expect(wrapper.vm.paginatedExercises.length).toBe(1);
    });
  });
});
