import React from "react";
import classes from "./BurgerControl.module.css";
const BurgerControl = (props) => {
    return (
        <div className={classes.BurgerControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={props.onLessClick}>
                Less
            </button>
            <button className={classes.More} onClick={props.onMoreClick}>
                More
            </button>
        </div>
    );
};

export default BurgerControl;
