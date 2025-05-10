import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css'

const Button = () => {

    return (
        <Link to="/home"> <button className="button" id="forButton">View</button></Link>
    );

};

export const AddPizzaButton = () => {

    return (
        <Link to="/add-pizza"> <button className="button" id="addButton">Add Pizza</button></Link>
    );

};



export default Button;
