import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

import City from "./index.jsx";

describe(">>>CityComponentMain --- Shallow Render REACT COMPONENTS", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<City />);
  });

  it("+++ render the DUMB component", () => {
    expect(wrapper.length).toEqual(1);
  });
});
