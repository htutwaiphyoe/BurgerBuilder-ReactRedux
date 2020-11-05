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
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" },
                    ],
                },
            },
        },
        loading: false,
        error: null,
        success: false,
    };
    onOrderClick = async (e) => {
        e.preventDefault();
        try {
            this.setState({ loading: true });
            await burgerbuilder.post("/orders.json", {
                ingredients: this.props.ingredients,
                price: this.props.price,
                customer: this.state.orderForm,
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
    render() {
        let component = (
            <React.Fragment>
                <h1>Fill your contact info</h1>
                <form>
                    <Input
                        inputtype="input"
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                    />
                    <Input
                        inputtype="input"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                    />
                    <Input
                        inputtype="input"
                        type="number"
                        name="phone"
                        placeholder="Your Phone"
                        required
                    />
                    <Input
                        inputtype="textarea"
                        name="address"
                        placeholder="Your Address"
                        required
                        rows="5"
                    />
                    <Button type="Success" onButtonClick={this.onOrderClick}>
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
