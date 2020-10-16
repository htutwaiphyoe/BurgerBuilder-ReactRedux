import React from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";

const INGREDIENT_PRICE = {
    Salad: 0.4,
    Bacon: 0.7,
    Cheese: 0.5,
    Meat: 1.5,
};
class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            Salad: 0,
            Bacon: 0,
            Cheese: 0,
            Meat: 0,
        },
        price: 2,
    };
    onMoreButtonClick = (type) => {
        const ingredients = { ...this.state.ingredients };
        ingredients[type] += 1;
        const oldPrice = this.state.price;
        const price = oldPrice + INGREDIENT_PRICE[type];
        this.setState({
            ingredients,
            price,
        });
    };
    onLessButtonClick = (type) => {
        const ingredients = { ...this.state.ingredients };
        ingredients[type] -= 1;
        const oldPrice = this.state.price;
        const price = oldPrice - INGREDIENT_PRICE[type];
        this.setState({
            ingredients,
            price,
        });
    };
    render() {
        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    onMoreButtonClick={this.onMoreButtonClick}
                    onLessButtonClick={this.onLessButtonClick}
                />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;
