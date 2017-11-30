// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class PickInfoUpdateMessage implements MessageBase
{
    name = 'PickInfoUpdate';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.PickInfoUpdate;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        PickID: UUID;
        CreatorID: UUID;
        TopPick: boolean;
        ParcelID: UUID;
        Name: Buffer;
        Desc: Buffer;
        SnapshotID: UUID;
        PosGlobal: Vector3;
        SortOrder: number;
        Enabled: boolean;
    };

    getSize(): number
    {
        return (this.Data['Name'].length + 1 + this.Data['Desc'].length + 2) + 126;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['PickID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['CreatorID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8((this.Data['TopPick']) ? 1 : 0, pos++);
        this.Data['ParcelID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.Data['Name'].length, pos++);
        this.Data['Name'].copy(buf, pos);
        pos += this.Data['Name'].length;
        buf.writeUInt16LE(this.Data['Desc'].length, pos);
        pos += 2;
        this.Data['Desc'].copy(buf, pos);
        pos += this.Data['Desc'].length;
        this.Data['SnapshotID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['PosGlobal'].writeToBuffer(buf, pos, true);
        pos += 24;
        buf.writeInt32LE(this.Data['SortOrder'], pos);
        pos += 4;
        buf.writeUInt8((this.Data['Enabled']) ? 1 : 0, pos++);
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
        const newObjData: {
            PickID: UUID,
            CreatorID: UUID,
            TopPick: boolean,
            ParcelID: UUID,
            Name: Buffer,
            Desc: Buffer,
            SnapshotID: UUID,
            PosGlobal: Vector3,
            SortOrder: number,
            Enabled: boolean
        } = {
            PickID: UUID.zero(),
            CreatorID: UUID.zero(),
            TopPick: false,
            ParcelID: UUID.zero(),
            Name: Buffer.allocUnsafe(0),
            Desc: Buffer.allocUnsafe(0),
            SnapshotID: UUID.zero(),
            PosGlobal: Vector3.getZero(),
            SortOrder: 0,
            Enabled: false
        };
        newObjData['PickID'] = new UUID(buf, pos);
        pos += 16;
        newObjData['CreatorID'] = new UUID(buf, pos);
        pos += 16;
        newObjData['TopPick'] = (buf.readUInt8(pos++) === 1);
        newObjData['ParcelID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjData['Name'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjData['Desc'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjData['SnapshotID'] = new UUID(buf, pos);
        pos += 16;
        newObjData['PosGlobal'] = new Vector3(buf, pos, true);
        pos += 24;
        newObjData['SortOrder'] = buf.readInt32LE(pos);
        pos += 4;
        newObjData['Enabled'] = (buf.readUInt8(pos++) === 1);
        this.Data = newObjData;
        return pos - startPos;
    }
}

