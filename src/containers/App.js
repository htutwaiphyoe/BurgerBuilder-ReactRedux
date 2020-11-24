import React, { useEffect, useCallback } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Layout from "./Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import { Suspense } from "react";
import * as actionCreators from "../store/actions";
const Checkout = React.lazy(() => import("./Checkout/Checkout"));
const Orders = React.lazy(() => import("./Orders/Orders"));
const Auth = React.lazy(() => import("./Auth/Auth"));
const Logout = React.lazy(() => import("./Auth/Logout/Logout"));
const App = (props) => {
    const token = useSelector((state) => state.auth.token !== null);
    const dispatch = useDispatch();
    const checkLocalstorage = useCallback(() => {
        dispatch(actionCreators.checkLocalstorage());
    }, [dispatch]);
    useEffect(() => {
        checkLocalstorage();
    }, [checkLocalstorage]);

    let routes = (
        <Suspense fallback={<div style={{ margin: "20rem auto" }}>{/* <Spinner /> */}</div>}>
            <Route path="/auth" exact component={Auth} />
        </Suspense>
    );
    if (token) {
        routes = (
            <Suspense fallback={<div style={{ margin: "20rem auto" }}>{/* <Spinner /> */}</div>}>
                <Route path="/auth" exact component={Auth} />
                <Route path="/orders" exact component={Orders} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/logout" exact component={Logout} />
            </Suspense>
        );
    }
    return (
        <BrowserRouter>
            <div className="App">
                <Layout>
                    <Switch>
                        <Route path="/" exact component={BurgerBuilder} />
                        {routes}
                    </Switch>
                    <Redirect to="/" />
                </Layout>
            </div>
        </BrowserRouter>
    );
};

export default App;
