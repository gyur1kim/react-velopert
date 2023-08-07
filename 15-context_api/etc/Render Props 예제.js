import React from "react";

const RenderPropsSample = ({children}) => {
  return <div>결과 : {children(5)}</div>
}


// =====================================================

<RenderPropsSample>
  {value => value * 2}
</RenderPropsSample>