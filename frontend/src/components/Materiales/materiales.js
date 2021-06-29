import React, { useState } from 'react';
import './estilos.css';

/**
* @author 
* @function 
**/

const Modal = (props) => {
    if (!props.visible) {
        return null;
    }
    return (
        <>
            <div className="bg">
                <div style={{ position: 'relative' }}>
                    <div className="modalClose" onClick={props.onClose}>X</div>
                    <div className="modalContainer">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

const IngresarDatos = (props) => {
    const [focus, setFocus] = useState(false);

    return (
        <div className="ingresarDatos">
            <label className={`label ${focus ? 'focus' : ''}`} style={{
                top: 0,
                lineHeight: 'none'
            }}>{props.label}</label>
            <div style={{
                display: 'flex'
            }}>
                <input className="input"
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    onFocus={(e) => {
                        setFocus(true)
                    }}
                    onBlur={(e) => {
                        if(e.target.value === ""){
                            setFocus(false)
                        }
                    }} />
                {
                    props.rightElement ? props.rightElement : null
                }
            </div>
        </div>
    )
}

const BotonM = (props) => {

    const onClick = () => {
        props.onClick && props.onClick();
    }

    return (
        <div style={{ width: '90%', ...props.style}}>
            <button
                className="botonM"
                onClick = {onClick}
                style = {{backgroundColor: props.bgColor, color: props.textColor}}
                
            >
                {props.title && props.title}
            </button>
        </div>

    )
}



const MenuDropDown = (props) => {
    return (
      <div className="headerDrop">
        {props.menu}
        <div className="dropdown">
          <div className="upArrow"></div>
          {props.menuP}
          <ul className="headerDropMenu">
            {
              props.menus && props.menus.map((item, index) =>
                <li key={index}><a href={item.href}>{item.label}</a></li>
              )
            }
          </ul>
        </div>
      </div>
    );
  }

export {
    Modal,
    IngresarDatos,
    BotonM,
    MenuDropDown,
}