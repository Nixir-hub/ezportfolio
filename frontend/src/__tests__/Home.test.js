import { render } from "@testing-library/react";
import Home from "../components/page/Home";

test("matches snapshot", () => {
  const { asFragment } = render(<Home />);
  expect(asFragment()).toMatchSnapshot();
});
