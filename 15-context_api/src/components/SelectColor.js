import React from 'react';
import {ColorConsumer} from "../contexts/color";

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
function SelectColor() {
  return (
    <div>
      <h2>색상을 선택하세요</h2>
      <ColorConsumer>
        {({actions}) =>
          <div style={{display: "flex"}}>
            {colors.map(color => (
              <div
                key={color}
                style={{
                  background: color,
                  width: "24px",
                  height: "24px",
                  cursor: "pointer"
                }}
                onClick={() => actions.setColor(color)}  // 마우스 왼쪽 버튼
                onContextMenu={e => {                    // 마우스 오른쪽 버튼 이벤트
                  e.preventDefault();
                  actions.setSubColor(color);
                }}
              />
            ))}
          </div>
        }
      </ColorConsumer>
      <hr />
    </div>
  );
}

export default SelectColor;