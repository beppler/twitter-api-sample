const twitter = require('twitter-api-v2');
const axios = require('axios');
const https = require('https');
const fspromises = require('fs/promises');

async function main() {
    const baseClient = new twitter.TwitterApi({
        appKey: process.env.APPKEY,
        appSecret: process.env.APPSECRET,
        accessToken: process.env.ACCESSTOKEN,
        accessSecret: process.env.ACCESSSECRET,
    });

    try {

        const user = await baseClient.v1.updateAccountProfile({
            name: 'Synapse Tech SOCi',
            description: 'Synapse Tech SOCi (bio)',
            location: 'Curitiba, Paraná, Brasil',
            url: 'https://example.com/synapse'
        });

        //const user = await baseClient.currentUser();
        //const user = await baseClient.v1.user({ screen_name: 'synapsetechsoci' });

        console.log(JSON.stringify(user, null, '  '));

        // const image = await fspromises.open('synapse-alternate.png');

        const axiosInstance = axios.create({
            httpsAgent: new https.Agent({  
              rejectUnauthorized: false
            })
        });

        const image = await axiosInstance.get(
            'https://local.meetsoci.com/uploads/projects/photos/photo_upload_635a8cb8e87ae-2022-10-27.png',
            { responseType: 'arraybuffer' }
        );

        const response = await baseClient.v1.updateAccountProfileImage(image.data);

        // image.close();

        console.log(JSON.stringify(response, null, '  '));

    } catch (error) {
        console.log(error.message);
        console.log(JSON.stringify(error));
    }
}

main();
