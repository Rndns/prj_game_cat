import React from 'react';
  
  function Square(props) {

    return (
      <button className='square' onClick={props.counts >= 1 ? props.onClick: undefined} key={props.nums}>
        {props.nums}
      </button>

    );
  }
  
  

  export default Square;