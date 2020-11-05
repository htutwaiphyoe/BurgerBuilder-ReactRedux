import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import { Suspense } from "react";
import Spinner from "../components/UI/Spinner/Spinner";
const Checkout = React.lazy(() => import("./Checkout/Checkout"));
const Orders = React.lazy(() => import("./Orders/Orders"));
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Layout>
                        <Switch>
                            <Route path="/" exact component={BurgerBuilder} />
                            <Suspense fallback={<Spinner />}>
                                <Route path="/orders" exact component={Orders} />
                                <Route path="/checkout" component={Checkout} />
                            </Suspense>
                        </Switch>
                    </Layout>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
