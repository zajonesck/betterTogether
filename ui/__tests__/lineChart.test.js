const { mount } = require("@vue/test-utils");
import LineChart from "../src/component/lineChart.vue";
import { vi, expect } from "vitest";

describe("LineChart.vue", () => {
  it("renders a canvas for the chart", () => {
    const mockContext = {
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
    };
    HTMLCanvasElement.prototype.getContext = vi.fn(() => mockContext);

    const wrapper = mount(LineChart);

    const element = wrapper.element;

    expect(element.querySelector("canvas")).toBeTruthy();
  });
});
