export default function ProfilePic({
    first,
    last,
    imageUrl,
    toggleUploader,
    size,
}) {
    const picUrl = imageUrl || "default_profile.png";
    const imgClass = size == "small" ? "img_profile_small" : "img_profile_big";
    return (
        <>
            <img
                src={picUrl}
                alt={`${first} ${last}`}
                className={imgClass}
                onClick={toggleUploader}
            />
        </>
    );
}
