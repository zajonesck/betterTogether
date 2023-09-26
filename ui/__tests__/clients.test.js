const { mount } = require("@vue/test-utils");
import Clients from "../src/views/Clients.vue";

describe("Clients.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Clients, {
      data() {
        return {
          clients: [
            {
              id: 1,
              first_name: "Zachary",
              last_name: "Jones",
              birth_day: "1995-05-15",
            },
            {
              id: 2,
              first_name: "Alice",
              last_name: "Smith",
              birth_day: "1990-03-10",
            },
            {
              id: 3,
              first_name: "Bobby",
              last_name: "Doeford",
              birth_day: "1985-01-01",
            },
          ],
          itemsPerPage: 2,
        };
      },
    });
  });

  describe("Sorting functionality", () => {
    test("should sort by first_name in ascending order", async () => {
      wrapper.vm.sortBy("first_name");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.sortedClients[0].first_name).toBe("Alice");
    });

    test("should sort by first_name in descending order", async () => {
      wrapper.vm.sortBy("first_name");
      wrapper.vm.sortBy("first_name");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.sortedClients[0].first_name).toBe("Zachary");
    });

    test("should sort by birth_day in ascending order", async () => {
      wrapper.vm.sortBy("birth_day");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.sortedClients[0].first_name).toBe("Bobby");
    });

    test("should sort by birth_day in descending order", async () => {
      wrapper.vm.sortBy("birth_day");
      wrapper.vm.sortBy("birth_day");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.sortedClients[0].first_name).toBe("Zachary");
    });
  });

  describe("Search functionality", () => {
    test("should filter clients by first_name", async () => {
      wrapper.setData({ searchQuery: "Zachary" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredClients.length).toBe(1);
      expect(wrapper.vm.filteredClients[0].first_name).toBe("Zachary");
    });

    test("should filter clients by last_name", async () => {
      wrapper.setData({ searchQuery: "Smith" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredClients.length).toBe(1);
      expect(wrapper.vm.filteredClients[0].last_name).toBe("Smith");
    });

    test("should filter clients case-insensitively", async () => {
      wrapper.setData({ searchQuery: "zachARY" });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredClients.length).toBe(1);
      expect(wrapper.vm.filteredClients[0].first_name).toBe("Zachary");
    });
  });

  describe("Pagination functionality", () => {
    test("should display correct number of clients per page", async () => {
      wrapper.setData({ currentPage: 1 });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.paginatedClients.length).toBe(2);
      expect(wrapper.vm.paginatedClients[0].first_name).toBe("Zachary");
      expect(wrapper.vm.paginatedClients[1].first_name).toBe("Alice");
    });

    test("should calculate total pages correctly", async () => {
      await wrapper.vm.$nextTick();
      expect(
        Math.ceil(wrapper.vm.filteredClients.length / wrapper.vm.itemsPerPage)
      ).toBe(2);
    });

    test("should navigate to next page correctly", async () => {
      wrapper.setData({ currentPage: 2 });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.paginatedClients.length).toBe(1);
      expect(wrapper.vm.paginatedClients[0].first_name).toBe("Bobby");
    });
  });
});
