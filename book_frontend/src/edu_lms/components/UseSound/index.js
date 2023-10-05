import { useEffect, useState } from "react";
import styled from "styled-components";
import useSound from "use-sound";
const IconStyle = styled.div`
  position: absolute;
  top: ${(props) => (props.top ? props.top : "1px")};
  left: ${(props) => (props.left ? props.left : "5px")};
  cursor: pointer;
  &:hover {
    color: #00c2f3;
  }
  i {
    font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
  }
`;

const UseSound = ({ src, left, top, fontSize }) => {
  const [playAudio, setPlayAudio] = useState(false);
  const [play, { pause }] = useSound(src, {
    onend: () => {
      setPlayAudio(false);
    },
  });

  const onClickAudio = () => {
    setPlayAudio(!playAudio);
  };

  useEffect(() => {
    playAudio ? play() : pause();
  }, [playAudio]);
  return (
    <IconStyle
      fontSize={fontSize}
      left={left}
      top={top}
      onClick={() => onClickAudio()}
    >
      <i className="fa fa-volume-up" aria-hidden="true"></i>
    </IconStyle>
  );
};

export default UseSound;