// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class FeatureDisabledMessage implements MessageBase
{
    name = 'FeatureDisabled';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.FeatureDisabled;

    FailureInfo: {
        ErrorMessage: Buffer;
        AgentID: UUID;
        TransactionID: UUID;
    };

    getSize(): number
    {
        return (this.FailureInfo['ErrorMessage'].length + 1) + 32;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeUInt8(this.FailureInfo['ErrorMessage'].length, pos++);
        this.FailureInfo['ErrorMessage'].copy(buf, pos);
        pos += this.FailureInfo['ErrorMessage'].length;
        this.FailureInfo['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.FailureInfo['TransactionID'].writeToBuffer(buf, pos);
        pos += 16;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjFailureInfo: {
            ErrorMessage: Buffer,
            AgentID: UUID,
            TransactionID: UUID
        } = {
            ErrorMessage: Buffer.allocUnsafe(0),
            AgentID: UUID.zero(),
            TransactionID: UUID.zero()
        };
        varLength = buf.readUInt8(pos++);
        newObjFailureInfo['ErrorMessage'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjFailureInfo['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjFailureInfo['TransactionID'] = new UUID(buf, pos);
        pos += 16;
        this.FailureInfo = newObjFailureInfo;
        return pos - startPos;
    }
}

