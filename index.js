import Twitter from 'twitter';
import axios from 'axios';
import https from 'https';

async function main() {
    try {
        const client = new Twitter({
            consumer_key: process.env.APPKEY,
            consumer_secret: process.env.APPSECRET,
            access_token_key: process.env.ACCESSTOKEN,
            access_token_secret: process.env.ACCESSSECRET,
        });

        const users = await client.get(
            'users/lookup.json', 
            {user_id: '1404876754548838406', include_entities: true}
        );

        const user = users[0];

        console.log(JSON.stringify(user, null, '  '));

        const updatedUser = await client.post(
            'account/update_profile.json',
            {
                name: 'Synapse Tech SOCi',
                description: 'Synapse Tech SOCi (bio)',
                location: 'Curitiba, Paraná, Brasil',
                url: 'https://example.com/synapse'
            }
        );

        console.log(JSON.stringify(updatedUser, null, '  '));

        const axiosInstance = axios.create({
            httpsAgent: new https.Agent({  
              rejectUnauthorized: false
            })
        });

        const image = await axiosInstance.get(
            'https://local.meetsoci.com/uploads/projects/photos/photo_upload_635a8cb8e87ae-2022-10-27.png',
            { responseType: 'arraybuffer' }
        );

        // const image = {
        //     data: await fs.readFile('synapse-alternate.png')
        // };

        const imageResponse = await client.post(
            'account/update_profile_image.json',
            {
                image: image.data.toString('base64'),
                include_entities: false, 
                skip_status: true
            }
        );

        console.log(JSON.stringify(imageResponse, null, '  '));

    } catch (error) {
        if (error instanceof Array) {
            console.log(JSON.stringify(error, null, '  '));
        } else {
            console.log(JSON.stringify(error, Object.getOwnPropertyNames(error), '  '));
        }
        
    }
}

await main();

