import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";
import Wall from "./wall";

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
        <div className="user-info-container">
            <div className="user-bio-info">
                <div className="bioPic">
                    <ProfilePic
                        imageUrl={imageUrl}
                        first={first}
                        last={last}
                        action={toggleUploader}
                    />
                </div>
                <div>
                    <h2>
                        {first} {last}
                    </h2>
                    <BioEditor
                        bio={bio}
                        changeBio={changeBio}
                        userId={userId}
                    />
                </div>
            </div>
            <div>
                <Wall id={userId} />
            </div>
        </div>
    );
}
