import { Component } from "react";
import Header from "./header";
import Navigation from "./navigation";

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <>
                <Header first={this.props.first} last={this.props.last} />
                <Navigation />
            </>
        );
    }
}
