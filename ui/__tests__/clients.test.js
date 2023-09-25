const { mount } = require("@vue/test-utils");
import Clients from "../src/views/Clients.vue";

describe("Clients.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Clients);
  });

  describe("sortedClients computed property", () => {
    test("should sort by first_name in ascending order", () => {
      wrapper.setData({
        clients: [
          { first_name: "Zachary", last_name: "Jones" },
          { first_name: "Alice", last_name: "Smith" },
        ],
        sortedColumn: "first_name",
        sortAscending: true,
      });

      expect(wrapper.vm.sortedClients[0].first_name).toBe("Alice");
    });

    test("should sort by first_name in descending order", () => {
      wrapper.setData({
        clients: [
          { first_name: "Zachary", last_name: "Jones" },
          { first_name: "Alice", last_name: "Smith" },
        ],
        sortedColumn: "first_name",
        sortAscending: false,
      });

      expect(wrapper.vm.sortedClients[0].first_name).toBe("Zachary");
    });

    test("should sort by birth_day in ascending order", () => {
      wrapper.setData({
        clients: [
          {
            first_name: "Zachary",
            last_name: "Jones",
            birth_day: "1995-05-15",
          },
          { first_name: "Alice", last_name: "Smith", birth_day: "1990-03-10" },
        ],
        sortedColumn: "birth_day",
        sortAscending: true,
      });
      expect(wrapper.vm.sortedClients[0].first_name).toBe("Alice");
    });
    test("should sort by birth_day in descending order", () => {
      wrapper.setData({
        clients: [
          {
            first_name: "Zachary",
            last_name: "Jones",
            birth_day: "1995-05-15",
          },
          { first_name: "Alice", last_name: "Smith", birth_day: "1990-03-10" },
        ],
        sortedColumn: "birth_day",
        sortAscending: false,
      });
      expect(wrapper.vm.sortedClients[0].first_name).toBe("Zachary");
    });
  });
  test("should filter clients by first_name", () => {
    wrapper.setData({
      clients: [
        { first_name: "Zachary", last_name: "Jones" },
        { first_name: "Alice", last_name: "Smith" },
      ],
      searchQuery: "Zachary",
    });
    expect(wrapper.vm.filteredClients.length).toBe(1);
    expect(wrapper.vm.filteredClients[0].first_name).toBe("Zachary");
  });
  test("should filter clients by last_name", () => {
    wrapper.setData({
      clients: [
        { first_name: "Zachary", last_name: "Jones" },
        { first_name: "Alice", last_name: "Smith" },
      ],
      searchQuery: "Smith",
    });
    expect(wrapper.vm.filteredClients.length).toBe(1);
    expect(wrapper.vm.filteredClients[0].last_name).toBe("Smith");
  });
  test("should filter clients by last_name", () => {
    wrapper.setData({
      clients: [
        { first_name: "Zachary", last_name: "Jones" },
        { first_name: "Alice", last_name: "Smith" },
      ],
      searchQuery: "Smith",
    });
    expect(wrapper.vm.filteredClients.length).toBe(1);
    expect(wrapper.vm.filteredClients[0].last_name).toBe("Smith");
  });
  test("should filter clients case-insensitively", () => {
    wrapper.setData({
      clients: [
        { first_name: "Zachary", last_name: "Jones" },
        { first_name: "Alice", last_name: "Smith" },
      ],
      searchQuery: "zachARY",
    });
    expect(wrapper.vm.filteredClients.length).toBe(1);
    expect(wrapper.vm.filteredClients[0].first_name).toBe("Zachary");
  });
});
