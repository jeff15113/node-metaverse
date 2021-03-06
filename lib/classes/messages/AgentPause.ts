// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class AgentPauseMessage implements MessageBase
{
    name = 'AgentPause';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.AgentPause;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        SerialNum: number;
    };

    getSize(): number
    {
        return 36;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.AgentData['SerialNum'], pos);
        pos += 4;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            SessionID: UUID,
            SerialNum: number
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero(),
            SerialNum: 0
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SerialNum'] = buf.readUInt32LE(pos);
        pos += 4;
        this.AgentData = newObjAgentData;
        return pos - startPos;
    }
}

