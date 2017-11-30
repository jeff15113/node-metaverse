// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class GroupRoleDataReplyMessage implements MessageBase
{
    name = 'GroupRoleDataReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.GroupRoleDataReply;

    AgentData: {
        AgentID: UUID;
    };
    GroupData: {
        GroupID: UUID;
        RequestID: UUID;
        RoleCount: number;
    };
    RoleData: {
        RoleID: UUID;
        Name: Buffer;
        Title: Buffer;
        Description: Buffer;
        Powers: Long;
        Members: number;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.RoleData, 'Name', 1) + this.calculateVarVarSize(this.RoleData, 'Title', 1) + this.calculateVarVarSize(this.RoleData, 'Description', 1) + 28) * this.RoleData.length) + 53;
    }

    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        block.forEach((bl: any) =>
        {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.GroupData['GroupID'].writeToBuffer(buf, pos);
        pos += 16;
        this.GroupData['RequestID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.GroupData['RoleCount'], pos);
        pos += 4;
        const count = this.RoleData.length;
        buf.writeUInt8(this.RoleData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.RoleData[i]['RoleID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.RoleData[i]['Name'].length, pos++);
            this.RoleData[i]['Name'].copy(buf, pos);
            pos += this.RoleData[i]['Name'].length;
            buf.writeUInt8(this.RoleData[i]['Title'].length, pos++);
            this.RoleData[i]['Title'].copy(buf, pos);
            pos += this.RoleData[i]['Title'].length;
            buf.writeUInt8(this.RoleData[i]['Description'].length, pos++);
            this.RoleData[i]['Description'].copy(buf, pos);
            pos += this.RoleData[i]['Description'].length;
            buf.writeInt32LE(this.RoleData[i]['Powers'].low, pos);
            pos += 4;
            buf.writeInt32LE(this.RoleData[i]['Powers'].high, pos);
            pos += 4;
            buf.writeUInt32LE(this.RoleData[i]['Members'], pos);
            pos += 4;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID
        } = {
            AgentID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjGroupData: {
            GroupID: UUID,
            RequestID: UUID,
            RoleCount: number
        } = {
            GroupID: UUID.zero(),
            RequestID: UUID.zero(),
            RoleCount: 0
        };
        newObjGroupData['GroupID'] = new UUID(buf, pos);
        pos += 16;
        newObjGroupData['RequestID'] = new UUID(buf, pos);
        pos += 16;
        newObjGroupData['RoleCount'] = buf.readInt32LE(pos);
        pos += 4;
        this.GroupData = newObjGroupData;
        const count = buf.readUInt8(pos++);
        this.RoleData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjRoleData: {
                RoleID: UUID,
                Name: Buffer,
                Title: Buffer,
                Description: Buffer,
                Powers: Long,
                Members: number
            } = {
                RoleID: UUID.zero(),
                Name: Buffer.allocUnsafe(0),
                Title: Buffer.allocUnsafe(0),
                Description: Buffer.allocUnsafe(0),
                Powers: Long.ZERO,
                Members: 0
            };
            newObjRoleData['RoleID'] = new UUID(buf, pos);
            pos += 16;
            varLength = buf.readUInt8(pos++);
            newObjRoleData['Name'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            varLength = buf.readUInt8(pos++);
            newObjRoleData['Title'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            varLength = buf.readUInt8(pos++);
            newObjRoleData['Description'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            newObjRoleData['Powers'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
            pos += 8;
            newObjRoleData['Members'] = buf.readUInt32LE(pos);
            pos += 4;
            this.RoleData.push(newObjRoleData);
        }
        return pos - startPos;
    }
}

