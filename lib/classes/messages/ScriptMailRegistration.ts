// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ScriptMailRegistrationMessage implements MessageBase
{
    name = 'ScriptMailRegistration';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.ScriptMailRegistration;

    DataBlock: {
        TargetIP: Buffer;
        TargetPort: number;
        TaskID: UUID;
        Flags: number;
    };

    getSize(): number
    {
        return (this.DataBlock['TargetIP'].length + 1) + 22;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeUInt8(this.DataBlock['TargetIP'].length, pos++);
        this.DataBlock['TargetIP'].copy(buf, pos);
        pos += this.DataBlock['TargetIP'].length;
        buf.writeUInt16LE(this.DataBlock['TargetPort'], pos);
        pos += 2;
        this.DataBlock['TaskID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.DataBlock['Flags'], pos);
        pos += 4;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjDataBlock: {
            TargetIP: Buffer,
            TargetPort: number,
            TaskID: UUID,
            Flags: number
        } = {
            TargetIP: Buffer.allocUnsafe(0),
            TargetPort: 0,
            TaskID: UUID.zero(),
            Flags: 0
        };
        varLength = buf.readUInt8(pos++);
        newObjDataBlock['TargetIP'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjDataBlock['TargetPort'] = buf.readUInt16LE(pos);
        pos += 2;
        newObjDataBlock['TaskID'] = new UUID(buf, pos);
        pos += 16;
        newObjDataBlock['Flags'] = buf.readUInt32LE(pos);
        pos += 4;
        this.DataBlock = newObjDataBlock;
        return pos - startPos;
    }
}

