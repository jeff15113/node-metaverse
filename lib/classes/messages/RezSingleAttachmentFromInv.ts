// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class RezSingleAttachmentFromInvMessage implements MessageBase
{
    name = 'RezSingleAttachmentFromInv';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.RezSingleAttachmentFromInv;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        ItemID: UUID;
        OwnerID: UUID;
        AttachmentPt: number;
        ItemFlags: number;
        GroupMask: number;
        EveryoneMask: number;
        NextOwnerMask: number;
        Name: Buffer;
        Description: Buffer;
    };

    getSize(): number
    {
        return (this.ObjectData['Name'].length + 1 + this.ObjectData['Description'].length + 1) + 81;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.ObjectData['ItemID'].writeToBuffer(buf, pos);
        pos += 16;
        this.ObjectData['OwnerID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.ObjectData['AttachmentPt'], pos++);
        buf.writeUInt32LE(this.ObjectData['ItemFlags'], pos);
        pos += 4;
        buf.writeUInt32LE(this.ObjectData['GroupMask'], pos);
        pos += 4;
        buf.writeUInt32LE(this.ObjectData['EveryoneMask'], pos);
        pos += 4;
        buf.writeUInt32LE(this.ObjectData['NextOwnerMask'], pos);
        pos += 4;
        buf.writeUInt8(this.ObjectData['Name'].length, pos++);
        this.ObjectData['Name'].copy(buf, pos);
        pos += this.ObjectData['Name'].length;
        buf.writeUInt8(this.ObjectData['Description'].length, pos++);
        this.ObjectData['Description'].copy(buf, pos);
        pos += this.ObjectData['Description'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            SessionID: UUID
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjObjectData: {
            ItemID: UUID,
            OwnerID: UUID,
            AttachmentPt: number,
            ItemFlags: number,
            GroupMask: number,
            EveryoneMask: number,
            NextOwnerMask: number,
            Name: Buffer,
            Description: Buffer
        } = {
            ItemID: UUID.zero(),
            OwnerID: UUID.zero(),
            AttachmentPt: 0,
            ItemFlags: 0,
            GroupMask: 0,
            EveryoneMask: 0,
            NextOwnerMask: 0,
            Name: Buffer.allocUnsafe(0),
            Description: Buffer.allocUnsafe(0)
        };
        newObjObjectData['ItemID'] = new UUID(buf, pos);
        pos += 16;
        newObjObjectData['OwnerID'] = new UUID(buf, pos);
        pos += 16;
        newObjObjectData['AttachmentPt'] = buf.readUInt8(pos++);
        newObjObjectData['ItemFlags'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjObjectData['GroupMask'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjObjectData['EveryoneMask'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjObjectData['NextOwnerMask'] = buf.readUInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjObjectData['Name'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjObjectData['Description'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.ObjectData = newObjObjectData;
        return pos - startPos;
    }
}

