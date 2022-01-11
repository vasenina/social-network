const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./passwords"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1", // Make sure this corresponds to the region in which you have verified your email address (or 'eu-west-1' if you are using the Spiced credentials)
});

module.exports.sendEmail = function (code) {
    return ses
        .sendEmail({
            Source: "Vasenina <adaptive.finch@spicedling.email>",
            Destination: {
                ToAddresses: ["adaptive.finch@spicedling.email"],
            },
            Message: {
                Body: {
                    Text: {
                        Data: "This is your code " + code,
                    },
                },
                Subject: {
                    Data: "Code for changing a password!",
                },
            },
        })
        .promise();
    // .then(() => console.log("it worked!"))
    // .catch((err) => console.log("Email delivery does not work", err));
};
