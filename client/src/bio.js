import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";

export default function Bio({
    first,
    last,
    imageUrl,
    toggleUploader,
    bio,
    changeBio,
    userId,
}) {
    return (
        <div className="bio">
            <div className="bioPic">
                <ProfilePic
                    imageUrl={imageUrl}
                    first={first}
                    last={last}
                    toggleUploader={toggleUploader}
                />
            </div>
            <div>
                <h2>
                    {first} {last}
                </h2>
                <BioEditor bio={bio} changeBio={changeBio} userId={userId} />
            </div>
        </div>
    );
}
