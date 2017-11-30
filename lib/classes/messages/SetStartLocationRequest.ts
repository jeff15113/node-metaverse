// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class SetStartLocationRequestMessage implements MessageBase
{
    name = 'SetStartLocationRequest';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.SetStartLocationRequest;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    StartLocationData: {
        SimName: Buffer;
        LocationID: number;
        LocationPos: Vector3;
        LocationLookAt: Vector3;
    };

    getSize(): number
    {
        return (this.StartLocationData['SimName'].length + 1) + 60;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.StartLocationData['SimName'].length, pos++);
        this.StartLocationData['SimName'].copy(buf, pos);
        pos += this.StartLocationData['SimName'].length;
        buf.writeUInt32LE(this.StartLocationData['LocationID'], pos);
        pos += 4;
        this.StartLocationData['LocationPos'].writeToBuffer(buf, pos, false);
        pos += 12;
        this.StartLocationData['LocationLookAt'].writeToBuffer(buf, pos, false);
        pos += 12;
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
        const newObjStartLocationData: {
            SimName: Buffer,
            LocationID: number,
            LocationPos: Vector3,
            LocationLookAt: Vector3
        } = {
            SimName: Buffer.allocUnsafe(0),
            LocationID: 0,
            LocationPos: Vector3.getZero(),
            LocationLookAt: Vector3.getZero()
        };
        varLength = buf.readUInt8(pos++);
        newObjStartLocationData['SimName'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjStartLocationData['LocationID'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjStartLocationData['LocationPos'] = new Vector3(buf, pos, false);
        pos += 12;
        newObjStartLocationData['LocationLookAt'] = new Vector3(buf, pos, false);
        pos += 12;
        this.StartLocationData = newObjStartLocationData;
        return pos - startPos;
    }
}

