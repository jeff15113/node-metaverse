// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class LogDwellTimeMessage implements MessageBase
{
    name = 'LogDwellTime';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.LogDwellTime;

    DwellInfo: {
        AgentID: UUID;
        SessionID: UUID;
        Duration: number;
        SimName: Buffer;
        RegionX: number;
        RegionY: number;
        AvgAgentsInView: number;
        AvgViewerFPS: number;
    };

    getSize(): number
    {
        return (this.DwellInfo['SimName'].length + 1) + 46;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.DwellInfo['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.DwellInfo['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeFloatLE(this.DwellInfo['Duration'], pos);
        pos += 4;
        buf.writeUInt8(this.DwellInfo['SimName'].length, pos++);
        this.DwellInfo['SimName'].copy(buf, pos);
        pos += this.DwellInfo['SimName'].length;
        buf.writeUInt32LE(this.DwellInfo['RegionX'], pos);
        pos += 4;
        buf.writeUInt32LE(this.DwellInfo['RegionY'], pos);
        pos += 4;
        buf.writeUInt8(this.DwellInfo['AvgAgentsInView'], pos++);
        buf.writeUInt8(this.DwellInfo['AvgViewerFPS'], pos++);
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjDwellInfo: {
            AgentID: UUID,
            SessionID: UUID,
            Duration: number,
            SimName: Buffer,
            RegionX: number,
            RegionY: number,
            AvgAgentsInView: number,
            AvgViewerFPS: number
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero(),
            Duration: 0,
            SimName: Buffer.allocUnsafe(0),
            RegionX: 0,
            RegionY: 0,
            AvgAgentsInView: 0,
            AvgViewerFPS: 0
        };
        newObjDwellInfo['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjDwellInfo['SessionID'] = new UUID(buf, pos);
        pos += 16;
        newObjDwellInfo['Duration'] = buf.readFloatLE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjDwellInfo['SimName'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjDwellInfo['RegionX'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjDwellInfo['RegionY'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjDwellInfo['AvgAgentsInView'] = buf.readUInt8(pos++);
        newObjDwellInfo['AvgViewerFPS'] = buf.readUInt8(pos++);
        this.DwellInfo = newObjDwellInfo;
        return pos - startPos;
    }
}

