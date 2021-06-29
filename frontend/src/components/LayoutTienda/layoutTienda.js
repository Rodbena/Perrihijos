import React from 'react';
import HeaderTienda from '../Header/indexTienda';
import MenuHd from '../MenuHD/indexMenu';

/**
* @author
* @function LayoutTienda
**/

const LayoutTienda = (props) => {
  return(
    <>
        <HeaderTienda />
        <MenuHd />
        {props.children}
    </>
   )

 }

export default LayoutTienda