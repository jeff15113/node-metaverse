// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ClearFollowCamPropertiesMessage implements MessageBase
{
    name = 'ClearFollowCamProperties';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.ClearFollowCamProperties;

    ObjectData: {
        ObjectID: UUID;
    };

    getSize(): number
    {
        return 16;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.ObjectData['ObjectID'].writeToBuffer(buf, pos);
        pos += 16;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjObjectData: {
            ObjectID: UUID
        } = {
            ObjectID: UUID.zero()
        };
        newObjObjectData['ObjectID'] = new UUID(buf, pos);
        pos += 16;
        this.ObjectData = newObjObjectData;
        return pos - startPos;
    }
}

