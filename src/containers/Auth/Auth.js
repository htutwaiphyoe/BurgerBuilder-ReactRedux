import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actionCreators from "../../store/actions";
import { checkValidation } from "../../utils/utils";
const Auth = (props) => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                name: "email",
                placeholder: "Email",
                required: true,
            },
            value: "",
            validations: {},
            valid: true,
        },
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                name: "password",
                placeholder: "Password",
                required: true,
            },
            value: "",
            validations: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touch: false,
        },
    });

    const [isSignUp, setIsSignUp] = useState(true);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const token = useSelector((state) => state.auth.token !== null);
    const building = useSelector((state) => state.burgerbuilder.building);
    const onInputChange = (e, type) => {
        const updatedAuthForm = {
            ...authForm,
            [type]: {
                ...authForm[type],
                value: e.target.value,
                valid: checkValidation(e.target.value, authForm[type].validations),
                touch: true,
            },
        };
        setAuthForm(updatedAuthForm);
    };
    const onSwitchAuthMode = () => {
        setIsSignUp((prevState) => !prevState);
    };
    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(actionCreators.auth(authForm.email.value, authForm.password.value, isSignUp));
    };

    const formElements = [];
    for (let key in authForm) {
        formElements.push({
            id: key,
            config: authForm[key],
        });
    }
    let err = null;
    if (error) {
        err = <p className={classes.Error}>{error.message}</p>;
    }
    let component = (
        <React.Fragment>
            <h1>Sign {isSignUp ? "Up" : "In"} Here</h1>
            {err}
            <form onSubmit={onFormSubmit}>
                {formElements.map((e) => (
                    <Input
                        key={e.id}
                        type={e.config.elementType}
                        config={e.config.elementConfig}
                        value={e.config.value}
                        invalid={!e.config.valid}
                        touch={e.config.touch}
                        onInputChange={(event) => onInputChange(event, e.id)}
                    />
                ))}
                <Button type="Success">Sign {isSignUp ? "Up" : "In"}</Button>
            </form>
            <p onClick={onSwitchAuthMode}>
                {isSignUp ? "Already have an account? Sign Up" : "Do not have an account? Sign In"}
            </p>
        </React.Fragment>
    );
    if (token) {
        component = building ? <Redirect to="/checkout" /> : <Redirect to="/" />;
    }
    if (loading) {
        component = <Spinner />;
    }

    return <div className={classes.Auth}>{component}</div>;
};

export default Auth;
