import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getPhoto = this.getPhoto.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    getPhoto(e) {
        console.log("user changed a photo");

        console.log("fileselecthandler", e.target.files[0]);
        this.setState({ file: e.target.files[0] }, () => {
            console.log("State after file selecting", this.state);
        });
    }
    uploadPhoto() {
        console.log("user wants to upload photo");
        if (!this.state.file) {
            console.log("no file");
            this.setState({ error: "No file" });
            return;
        }
        const fd = new FormData();
        fd.append("file", this.state.file);
        fd.append("id", this.props.userId);

        fetch("/uploadprofilepic/" + this.props.userId, {
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("result: ", result);
                if (result.success === false) {
                    this.setState({
                        error: "File did not upploaded. Please try again",
                    });
                } else {
                    //if success = True
                    console.log("success, file uploaded", result.url);

                    this.props.changePicUrl(result.url);
                }
            })
            .catch((err) => {
                console.log("error uploading new image: ", err);
                this.setState({
                    error: "File did not upploaded. Please try again",
                });
            });
    }
    closeModal(e) {
        if (e.target.classList.contains("overlay")) {
            this.props.close();
        }
    }
    render() {
        return (
            <div className="overlay" onClick={this.closeModal}>
                <div className="modal shadow ">
                    <div className="modal-header">
                        <h2>Upload your profile photo</h2>
                        {/* <div className="close-btn" onClick={this.props.close}>
                            X
                        </div> */}
                    </div>
                    <div className="modal-body">
                        {this.state.error && (
                            <p className="error"> {this.state.error}</p>
                        )}
                        <input
                            className="input-file"
                            type="file"
                            accept="image/*"
                            onChange={this.getPhoto}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={this.props.close}
                            className="secondary"
                        >
                            Cancel
                        </button>
                        <button onClick={this.uploadPhoto}>Upload</button>
                    </div>
                </div>
            </div>
        );
    }
}
