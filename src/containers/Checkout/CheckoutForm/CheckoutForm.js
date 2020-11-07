import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import burgerbuilder from "../../../api/burgerbuilder";
import classes from "./CheckoutForm.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Message from "../../../components/UI/Message/Message";
import Input from "../../../components/UI/Input/Input";
class CheckoutForm extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "name",
                    placeholder: "Your Name",
                    required: true,
                },
                value: "",
                validations: {
                    required: true,
                    minLength: 3,
                },
                valid: false,
                touch: false,
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    name: "email",
                    placeholder: "Your Email",
                    required: true,
                },
                value: "",
                validations: {},
                valid: true,
            },
            phone: {
                elementType: "input",
                elementConfig: {
                    type: "number",
                    name: "phone",
                    placeholder: "Your Phone",
                    required: true,
                },
                value: "",
                validations: {
                    required: true,
                    minLength: 10,
                },
                valid: false,
                touch: false,
            },
            address: {
                elementType: "textarea",
                elementConfig: {
                    name: "address",
                    placeholder: "Your Address",
                    rows: "5",
                    required: true,
                },
                value: "",
                validations: {
                    required: true,
                    minLength: 5,
                },
                valid: false,
                touch: false,
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" },
                    ],
                },
                value: "fastest",
                validations: {},
                valid: true,
            },
        },
        valid: false,
        loading: false,
        error: null,
        success: false,
    };
    onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            this.setState({ loading: true });
            const customer = {};
            for (let key in this.state.orderForm) {
                customer[key] = this.state.orderForm[key].value;
            }
            await burgerbuilder.post("/orders.json", {
                ingredients: this.props.ingredients,
                price: this.props.price,
                customer,
            });

            this.setState({
                loading: false,
                success: true,
            });
            setTimeout(() => {
                this.props.history.replace("/");
            }, 1000);
        } catch (err) {
            this.setState({
                loading: false,
                error: {
                    type: "POST_ORDER",
                    message: err.message,
                },
            });
        }
    };
    checkValidation = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        return isValid;
    };
    onInputChange = (e, type) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[type] };
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidation(
            updatedFormElement.value,
            updatedFormElement.validations
        );
        updatedFormElement.touch = true;
        updatedOrderForm[type] = updatedFormElement;
        let formValid = true;
        for (let i in updatedOrderForm) {
            formValid = formValid && updatedOrderForm[i].valid;
        }
        this.setState({ orderForm: updatedOrderForm, valid: formValid });
    };
    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }   
        let component = (
            <React.Fragment>
                <h1>Fill your contact info</h1>
                <form onSubmit={this.onFormSubmit}>
                    {formElements.map((e) => (
                        <Input
                            key={e.id}
                            type={e.config.elementType}
                            config={e.config.elementConfig}
                            value={e.config.value}
                            invalid={!e.config.valid}
                            touch={e.config.touch}
                            onInputChange={(event) => this.onInputChange(event, e.id)}
                        />
                    ))}
                    <Button type="Success" disabled={!this.state.valid}>
                        Order
                    </Button>
                </form>
            </React.Fragment>
        );
        if (this.state.loading) {
            component = <Spinner />;
        }
        if (this.state.error) {
            component = <Message type="Error">{this.state.error.message}</Message>;
        }
        if (this.state.success) {
            component = <Message type="Success">Your order successfully completed</Message>;
        }
        return <div className={classes.CheckoutForm}>{component}</div>;
    }
}

export default withRouter(CheckoutForm);
