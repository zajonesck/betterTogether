import { mount } from "@vue/test-utils";
import ClientGoal from "../src/component/ClientGoal.vue";

describe("ClientGoal.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ClientGoal, {
      data() {
        return {
          notes: {
            healthMedsNote: "",
            goalsNote: "",
            goalWeight: "",
            miscNote: "",
          },
        };
      },
    });
  });

  describe("Rendering functionality", () => {
    test("renders text areas correctly", async () => {
      await wrapper.vm.$nextTick();
      expect(wrapper.findAll("v-textarea").length).toBe(4);
      expect(
        wrapper.find('v-textarea[label="Add Health/Meds Notes"]').exists()
      ).toBe(true);
      expect(wrapper.find('v-textarea[label="Add Goals"]').exists()).toBe(true);
      expect(wrapper.find('v-textarea[label="Add Misc. Notes"]').exists()).toBe(
        true
      );
    });
  });

  describe("Note update functionality", () => {
    test("updates health/meds note correctly", async () => {
      await wrapper.setData({ notes: { healthMedsNote: "Test Health Note" } });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.notes.healthMedsNote).toBe("Test Health Note");
    });

    test("updates goals note correctly", async () => {
      await wrapper.setData({ notes: { goalsNote: "Test Goals Note" } });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.notes.goalsNote).toBe("Test Goals Note");
    });
    test("updates misc note correctly", async () => {
      await wrapper.setData({ notes: { miscNote: "Test Misc Note" } });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.notes.miscNote).toBe("Test Misc Note");
    });
    test("updates goal weight correctly", async () => {
      await wrapper.setData({ notes: { goalWeight: 65 } }); // assuming goalWeight is a number
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.notes.goalWeight).toBe(65);
    });
  });
});
