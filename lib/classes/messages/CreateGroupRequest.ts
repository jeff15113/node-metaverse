// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class CreateGroupRequestMessage implements MessageBase
{
    name = 'CreateGroupRequest';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.CreateGroupRequest;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    GroupData: {
        Name: Buffer;
        Charter: Buffer;
        ShowInList: boolean;
        InsigniaID: UUID;
        MembershipFee: number;
        OpenEnrollment: boolean;
        AllowPublish: boolean;
        MaturePublish: boolean;
    };

    getSize(): number
    {
        return (this.GroupData['Name'].length + 1 + this.GroupData['Charter'].length + 2) + 56;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.GroupData['Name'].length, pos++);
        this.GroupData['Name'].copy(buf, pos);
        pos += this.GroupData['Name'].length;
        buf.writeUInt16LE(this.GroupData['Charter'].length, pos);
        pos += 2;
        this.GroupData['Charter'].copy(buf, pos);
        pos += this.GroupData['Charter'].length;
        buf.writeUInt8((this.GroupData['ShowInList']) ? 1 : 0, pos++);
        this.GroupData['InsigniaID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.GroupData['MembershipFee'], pos);
        pos += 4;
        buf.writeUInt8((this.GroupData['OpenEnrollment']) ? 1 : 0, pos++);
        buf.writeUInt8((this.GroupData['AllowPublish']) ? 1 : 0, pos++);
        buf.writeUInt8((this.GroupData['MaturePublish']) ? 1 : 0, pos++);
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
        const newObjGroupData: {
            Name: Buffer,
            Charter: Buffer,
            ShowInList: boolean,
            InsigniaID: UUID,
            MembershipFee: number,
            OpenEnrollment: boolean,
            AllowPublish: boolean,
            MaturePublish: boolean
        } = {
            Name: Buffer.allocUnsafe(0),
            Charter: Buffer.allocUnsafe(0),
            ShowInList: false,
            InsigniaID: UUID.zero(),
            MembershipFee: 0,
            OpenEnrollment: false,
            AllowPublish: false,
            MaturePublish: false
        };
        varLength = buf.readUInt8(pos++);
        newObjGroupData['Name'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjGroupData['Charter'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjGroupData['ShowInList'] = (buf.readUInt8(pos++) === 1);
        newObjGroupData['InsigniaID'] = new UUID(buf, pos);
        pos += 16;
        newObjGroupData['MembershipFee'] = buf.readInt32LE(pos);
        pos += 4;
        newObjGroupData['OpenEnrollment'] = (buf.readUInt8(pos++) === 1);
        newObjGroupData['AllowPublish'] = (buf.readUInt8(pos++) === 1);
        newObjGroupData['MaturePublish'] = (buf.readUInt8(pos++) === 1);
        this.GroupData = newObjGroupData;
        return pos - startPos;
    }
}

