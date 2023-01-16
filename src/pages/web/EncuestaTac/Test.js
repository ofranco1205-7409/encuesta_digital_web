import React from "react";
import { Button } from "semantic-ui-react";

import "./Test.scss";

export function Test() {
  const handleClick = () => console.log("Hello");
  return (
    <>
      <Button content="Click" onClick={handleClick} />
    </>
  );
}
