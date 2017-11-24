// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class LoadURLPacket implements Packet
{
    name = 'LoadURL';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294901954;

    Data: {
        ObjectName: string;
        ObjectID: UUID;
        OwnerID: UUID;
        OwnerIsGroup: boolean;
        Message: string;
        URL: string;
    };

    getSize(): number
    {
        return (this.Data['ObjectName'].length + 1 + this.Data['Message'].length + 1 + this.Data['URL'].length + 1) + 33;
    }

}