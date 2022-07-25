import AWS from 'aws-sdk';

export class SnsClient {

    private sns: AWS.SNS;

    constructor() {
        this.sns = new AWS.SNS({
            region: 'eu-west-1',
        })
    }

    public publishToIotNotifications = async (event) => {
        await this.sns.publish({
            TopicArn: process.env.IOT_NOTIFICATIONS_TOPIC,
            Message: JSON.stringify(event)
        }).promise()
    }
}