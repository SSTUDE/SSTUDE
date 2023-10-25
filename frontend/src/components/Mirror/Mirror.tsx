import React from 'react'
import { HEADER_HEIGHT, MIRROR_WEIGHT, MIRROR_HEIGHT } from '../../store/slices/defaultSlices';
import { useNavigate } from 'react-router-dom';

function Mirror() {
  const navigate = useNavigate();

  return (
    <>
      <div className='header' style={styles.header}>
          mirror
          <button onClick={()=> {navigate('/test')}}>이동</button>
      </div>
      <div className='section' style={styles.section}></div>
    </>
  )
}

export default Mirror

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    height: `${HEADER_HEIGHT}`,
    width: `${MIRROR_WEIGHT}`,
    backgroundColor: "red"
  },
  section : {
    height: `${MIRROR_HEIGHT}`,
    width: `${MIRROR_WEIGHT}`,
    backgroundColor: "black"
  }
};


