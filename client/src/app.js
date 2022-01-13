import { Component } from "react";
import Header from "./header";
import Navigation from "./navigation";
import Uploader from "./uploader";
import Bio from "./bio";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.logName = this.logName.bind(this);
        this.changePic = this.changePic.bind(this);
        this.changeBioState = this.changeBioState.bind(this);
    }

    //here will be a fetch where we can get a data
    componentDidMount() {
        console.log("app component mounted");
        fetch("/user/" + this.props.user_id)
            .then((response) => response.json())
            .then((data) => {
                if (data.success == true) {
                    // console.log(data);
                    this.setState(data);
                } else {
                    this.setState((error = "smth is wrong"));
                }

                // console.log(this.state);
            })
            .catch((err) => console.log("error in fetch user info", err));
        console.log(this.props.user_id);
    }

    logName(val) {
        console.log(val);
    }

    toggleUploader() {
        // console.log("toggle uploader");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }
    changePic(url) {
        console.log("app.js:  changing picture");
        this.setState({ imageUrl: url }, () => {
            console.log("State after changepic", this.state);
        });
    }
    changeBioState(bio) {
        console.log("app.js: i have new bio", bio);
        this.setState({ bio: bio }, () => {
            console.log("State after changeBio", this.state);
        });
    }
    render() {
        return (
            <div>
                <Header
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.imageUrl}
                    toggleUploader={this.toggleUploader}
                />
                <div className="main-body">
                    <Navigation />
                    <Bio
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                        toggleUploader={this.toggleUploader}
                        bio={this.state.bio}
                        changeBio={this.changeBioState}
                        userId={this.props.user_id}
                    />
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        close={this.toggleUploader}
                        userId={this.props.user_id}
                        changePicUrl={this.changePic}
                    />
                )}
            </div>
        );
    }
}
