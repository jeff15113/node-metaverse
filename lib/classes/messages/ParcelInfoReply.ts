// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ParcelInfoReplyMessage implements MessageBase
{
    name = 'ParcelInfoReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.ParcelInfoReply;

    AgentData: {
        AgentID: UUID;
    };
    Data: {
        ParcelID: UUID;
        OwnerID: UUID;
        Name: Buffer;
        Desc: Buffer;
        ActualArea: number;
        BillableArea: number;
        Flags: number;
        GlobalX: number;
        GlobalY: number;
        GlobalZ: number;
        SimName: Buffer;
        SnapshotID: UUID;
        Dwell: number;
        SalePrice: number;
        AuctionID: number;
    };

    getSize(): number
    {
        return (this.Data['Name'].length + 1 + this.Data['Desc'].length + 1 + this.Data['SimName'].length + 1) + 97;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['ParcelID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['OwnerID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.Data['Name'].length, pos++);
        this.Data['Name'].copy(buf, pos);
        pos += this.Data['Name'].length;
        buf.writeUInt8(this.Data['Desc'].length, pos++);
        this.Data['Desc'].copy(buf, pos);
        pos += this.Data['Desc'].length;
        buf.writeInt32LE(this.Data['ActualArea'], pos);
        pos += 4;
        buf.writeInt32LE(this.Data['BillableArea'], pos);
        pos += 4;
        buf.writeUInt8(this.Data['Flags'], pos++);
        buf.writeFloatLE(this.Data['GlobalX'], pos);
        pos += 4;
        buf.writeFloatLE(this.Data['GlobalY'], pos);
        pos += 4;
        buf.writeFloatLE(this.Data['GlobalZ'], pos);
        pos += 4;
        buf.writeUInt8(this.Data['SimName'].length, pos++);
        this.Data['SimName'].copy(buf, pos);
        pos += this.Data['SimName'].length;
        this.Data['SnapshotID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeFloatLE(this.Data['Dwell'], pos);
        pos += 4;
        buf.writeInt32LE(this.Data['SalePrice'], pos);
        pos += 4;
        buf.writeInt32LE(this.Data['AuctionID'], pos);
        pos += 4;
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
        const newObjData: {
            ParcelID: UUID,
            OwnerID: UUID,
            Name: Buffer,
            Desc: Buffer,
            ActualArea: number,
            BillableArea: number,
            Flags: number,
            GlobalX: number,
            GlobalY: number,
            GlobalZ: number,
            SimName: Buffer,
            SnapshotID: UUID,
            Dwell: number,
            SalePrice: number,
            AuctionID: number
        } = {
            ParcelID: UUID.zero(),
            OwnerID: UUID.zero(),
            Name: Buffer.allocUnsafe(0),
            Desc: Buffer.allocUnsafe(0),
            ActualArea: 0,
            BillableArea: 0,
            Flags: 0,
            GlobalX: 0,
            GlobalY: 0,
            GlobalZ: 0,
            SimName: Buffer.allocUnsafe(0),
            SnapshotID: UUID.zero(),
            Dwell: 0,
            SalePrice: 0,
            AuctionID: 0
        };
        newObjData['ParcelID'] = new UUID(buf, pos);
        pos += 16;
        newObjData['OwnerID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjData['Name'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjData['Desc'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjData['ActualArea'] = buf.readInt32LE(pos);
        pos += 4;
        newObjData['BillableArea'] = buf.readInt32LE(pos);
        pos += 4;
        newObjData['Flags'] = buf.readUInt8(pos++);
        newObjData['GlobalX'] = buf.readFloatLE(pos);
        pos += 4;
        newObjData['GlobalY'] = buf.readFloatLE(pos);
        pos += 4;
        newObjData['GlobalZ'] = buf.readFloatLE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjData['SimName'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjData['SnapshotID'] = new UUID(buf, pos);
        pos += 16;
        newObjData['Dwell'] = buf.readFloatLE(pos);
        pos += 4;
        newObjData['SalePrice'] = buf.readInt32LE(pos);
        pos += 4;
        newObjData['AuctionID'] = buf.readInt32LE(pos);
        pos += 4;
        this.Data = newObjData;
        return pos - startPos;
    }
}

