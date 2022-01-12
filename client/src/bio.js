import ProfilePic from "./profilePic";
export default function Bio({ first, last, imageUrl, toggleUploader }) {
    return (
        <div className="bio">
            <h1>Biography</h1>
            <ProfilePic
                imageUrl={imageUrl}
                first={first}
                last={last}
                toggleUploader={toggleUploader}
            />
        </div>
    );
}
