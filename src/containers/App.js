import React from "react";
import "./App.css";
import Layout from "./Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Layout>
                    <BurgerBuilder />
                </Layout>
            </div>
        );
    }
}

export default App;
