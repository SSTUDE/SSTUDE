
import React from 'react';
import Mirror from './components/Mirror/Mirror';
import { MIRROR_HEIGHT, MIRROR_WEIGHT, MIRROR_COLOR } from './store/slices/defaultSlices';

function App() {
  return (
    <div className="App" style={styles.app}>
      <Mirror />
    </div>
  );
}

export default App;

const styles: { [key: string]: React.CSSProperties } = {
  app: {
    height: `${MIRROR_HEIGHT}`,
    width: `${MIRROR_WEIGHT}`,
    backgroundColor: `${MIRROR_COLOR}`,
    marginLeft: "30%" //NOTE - 나중에 스크린 미러 구현시 지워야함
  },
};
