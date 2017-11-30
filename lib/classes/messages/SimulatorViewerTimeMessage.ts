// This file has been automatically generated by writeMessageClasses.js

import {Vector3} from '../Vector3';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class SimulatorViewerTimeMessageMessage implements MessageBase
{
    name = 'SimulatorViewerTimeMessage';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.SimulatorViewerTimeMessage;

    TimeInfo: {
        UsecSinceStart: Long;
        SecPerDay: number;
        SecPerYear: number;
        SunDirection: Vector3;
        SunPhase: number;
        SunAngVelocity: Vector3;
    };

    getSize(): number
    {
        return 44;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeInt32LE(this.TimeInfo['UsecSinceStart'].low, pos);
        pos += 4;
        buf.writeInt32LE(this.TimeInfo['UsecSinceStart'].high, pos);
        pos += 4;
        buf.writeUInt32LE(this.TimeInfo['SecPerDay'], pos);
        pos += 4;
        buf.writeUInt32LE(this.TimeInfo['SecPerYear'], pos);
        pos += 4;
        this.TimeInfo['SunDirection'].writeToBuffer(buf, pos, false);
        pos += 12;
        buf.writeFloatLE(this.TimeInfo['SunPhase'], pos);
        pos += 4;
        this.TimeInfo['SunAngVelocity'].writeToBuffer(buf, pos, false);
        pos += 12;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjTimeInfo: {
            UsecSinceStart: Long,
            SecPerDay: number,
            SecPerYear: number,
            SunDirection: Vector3,
            SunPhase: number,
            SunAngVelocity: Vector3
        } = {
            UsecSinceStart: Long.ZERO,
            SecPerDay: 0,
            SecPerYear: 0,
            SunDirection: Vector3.getZero(),
            SunPhase: 0,
            SunAngVelocity: Vector3.getZero()
        };
        newObjTimeInfo['UsecSinceStart'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
        pos += 8;
        newObjTimeInfo['SecPerDay'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjTimeInfo['SecPerYear'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjTimeInfo['SunDirection'] = new Vector3(buf, pos, false);
        pos += 12;
        newObjTimeInfo['SunPhase'] = buf.readFloatLE(pos);
        pos += 4;
        newObjTimeInfo['SunAngVelocity'] = new Vector3(buf, pos, false);
        pos += 12;
        this.TimeInfo = newObjTimeInfo;
        return pos - startPos;
    }
}
