const { mount } = require("@vue/test-utils");
const Clients = require("../ui/src/views/Clients.vue");
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

    // Repeat similar tests for other columns like last_name, id, etc.
  });

  // You can also add more tests related to other functionalities
  // like filtering, pagination, and so on.
});
