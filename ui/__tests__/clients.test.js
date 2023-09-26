const { mount } = require("@vue/test-utils");
import Clients from "../src/views/Clients.vue";

describe("Clients.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Clients);
  });

  describe("Sorting functionality", () => {
    const clientData = [
      { first_name: "Zachary", last_name: "Jones", birth_day: "1995-05-15" },
      { first_name: "Alice", last_name: "Smith", birth_day: "1990-03-10" },
    ];

    test("should sort by first_name in ascending order", () => {
      wrapper.setData({
        clients: clientData,
        sortedColumn: "first_name",
        sortAscending: true,
      });
      expect(wrapper.vm.sortedClients[0].first_name).toBe("Alice");
    });

    test("should sort by first_name in descending order", () => {
      wrapper.setData({
        clients: clientData,
        sortedColumn: "first_name",
        sortAscending: false,
      });
      expect(wrapper.vm.sortedClients[0].first_name).toBe("Zachary");
    });

    test("should sort by birth_day in ascending order", () => {
      wrapper.setData({
        clients: clientData,
        sortedColumn: "birth_day",
        sortAscending: true,
      });
      expect(wrapper.vm.sortedClients[0].first_name).toBe("Alice");
    });

    test("should sort by birth_day in descending order", () => {
      wrapper.setData({
        clients: clientData,
        sortedColumn: "birth_day",
        sortAscending: false,
      });
      expect(wrapper.vm.sortedClients[0].first_name).toBe("Zachary");
    });
  });

  describe("Search functionality", () => {
    const clientData = [
      { first_name: "Zachary", last_name: "Jones" },
      { first_name: "Alice", last_name: "Smith" },
    ];

    test("should filter clients by first_name", () => {
      wrapper.setData({ clients: clientData, searchQuery: "Zachary" });
      expect(wrapper.vm.filteredClients.length).toBe(1);
      expect(wrapper.vm.filteredClients[0].first_name).toBe("Zachary");
    });

    test("should filter clients by last_name", () => {
      wrapper.setData({ clients: clientData, searchQuery: "Smith" });
      expect(wrapper.vm.filteredClients.length).toBe(1);
      expect(wrapper.vm.filteredClients[0].last_name).toBe("Smith");
    });

    test("should filter clients case-insensitively", () => {
      wrapper.setData({ clients: clientData, searchQuery: "zachARY" });
      expect(wrapper.vm.filteredClients.length).toBe(1);
      expect(wrapper.vm.filteredClients[0].first_name).toBe("Zachary");
    });
  });
  describe("Pagination functionality", () => {
    const clientData = [
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
    ];

    test("should display correct number of clients per page", () => {
      wrapper.setData({
        clients: clientData,
        currentPage: 1,
        itemsPerPage: 2,
      });
      expect(wrapper.vm.paginatedClients.length).toBe(2);
      expect(wrapper.vm.paginatedClients[0].first_name).toBe("Zachary");
      expect(wrapper.vm.paginatedClients[1].first_name).toBe("Alice");
    });

    test("should calculate total pages correctly", () => {
      wrapper.setData({
        clients: clientData,
        itemsPerPage: 2,
      });
      expect(wrapper.vm.totalPages).toBe(Math.ceil(clientData.length / 2));
    });

    test("should navigate to next page correctly", () => {
      wrapper.setData({
        clients: clientData,
        currentPage: 2,
        itemsPerPage: 2,
      });
      expect(wrapper.vm.paginatedClients.length).toBe(1); // As we only have 3 clients in the sample data
      expect(wrapper.vm.paginatedClients[0].first_name).toBe("Bobby");
    });
  });
});
