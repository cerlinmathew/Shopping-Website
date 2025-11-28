import Lottie from "react-lottie-player";
const Lottiefy = (props: any) => {
  const { json, height, width } = props;
  return (
    <Lottie
      loop
      animationData={json}
      play
      style={{ width: width, height: height }}
    />
  );
};
export default Lottiefy;
