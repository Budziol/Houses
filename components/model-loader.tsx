import { Html, useProgress } from "@react-three/drei";

const ModelLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div>{progress.toFixed(0)} % loaded</div>
    </Html>
  );
};
export default ModelLoader;
