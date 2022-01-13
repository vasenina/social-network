import { Component } from "react";
export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        };
        this.editBioToggle = this.editBioToggle.bind(this);
        this.textAreaChanged = this.textAreaChanged.bind(this);
        this.changeBio = this.changeBio.bind(this);
    }

    editBioToggle() {
        this.setState({ edit: !this.state.edit });
        console.log("user wants to edit bio");
    }
    textAreaChanged(e) {
        this.setState({ draft: e.target.value }, () => {
            console.log("user idits bio", this.state.draft);
        });
    }
    changeBio() {
        console.log("bioEditior: before change bio ", this.props);

        if (this.state.draft == this.props.bio) {
            console.log("no changes");
            this.editBioToggle();
            return;
        }
        //fetch request
        console.log(this.props.userId);
        fetch("/changebio/" + this.props.userId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newBio: this.state.draft }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    this.props.changeBio(this.state.draft);
                    this.editBioToggle();
                    console.log("bioEditior: after change bio ");
                }
            })
            .catch((err) => {
                console.log("error uploading new image: ", err);
            });
    }
    render() {
        return (
            <section>
                {!this.props.bio && !this.state.edit && (
                    <button onClick={this.editBioToggle}>Add Bio</button>
                )}
                {this.props.bio && !this.state.edit && (
                    <>
                        <p>{this.props.bio}</p>
                        <button onClick={this.editBioToggle}>Edit</button>
                    </>
                )}
                {this.state.edit && (
                    <>
                        <textarea
                            defaultValue={this.props.bio}
                            rows="4"
                            cols="50"
                            maxLength="300"
                            onChange={this.textAreaChanged}
                        />
                        <button onClick={this.editBioToggle} className="cancel">
                            Cancel
                        </button>
                        <button onClick={this.changeBio}>Add</button>
                    </>
                )}
            </section>
        );
    }
}
