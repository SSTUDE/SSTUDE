import React from 'react'
import { HEADER_HEIGHT, MIRROR_WEIGHT } from '../../store/slices/defaultSlices';

function Mirror() {
  return (
    <div className='header' style={styles.header}>mirror</div>
  )
}

export default Mirror

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    height: `${HEADER_HEIGHT}`,
    width: `${MIRROR_WEIGHT}`,
    backgroundColor: "red"
  },
};
