// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class GenericMessageMessage implements MessageBase
{
    name = 'GenericMessage';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.GenericMessage;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        TransactionID: UUID;
    };
    MethodData: {
        Method: Buffer;
        Invoice: UUID;
    };
    ParamList: {
        Parameter: Buffer;
    }[];

    getSize(): number
    {
        return (this.MethodData['Method'].length + 1) + ((this.calculateVarVarSize(this.ParamList, 'Parameter', 1)) * this.ParamList.length) + 65;
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
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['TransactionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.MethodData['Method'].length, pos++);
        this.MethodData['Method'].copy(buf, pos);
        pos += this.MethodData['Method'].length;
        this.MethodData['Invoice'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.ParamList.length;
        buf.writeUInt8(this.ParamList.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeUInt8(this.ParamList[i]['Parameter'].length, pos++);
            this.ParamList[i]['Parameter'].copy(buf, pos);
            pos += this.ParamList[i]['Parameter'].length;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            SessionID: UUID,
            TransactionID: UUID
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero(),
            TransactionID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['TransactionID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjMethodData: {
            Method: Buffer,
            Invoice: UUID
        } = {
            Method: Buffer.allocUnsafe(0),
            Invoice: UUID.zero()
        };
        varLength = buf.readUInt8(pos++);
        newObjMethodData['Method'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjMethodData['Invoice'] = new UUID(buf, pos);
        pos += 16;
        this.MethodData = newObjMethodData;
        const count = buf.readUInt8(pos++);
        this.ParamList = [];
        for (let i = 0; i < count; i++)
        {
            const newObjParamList: {
                Parameter: Buffer
            } = {
                Parameter: Buffer.allocUnsafe(0)
            };
            varLength = buf.readUInt8(pos++);
            newObjParamList['Parameter'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            this.ParamList.push(newObjParamList);
        }
        return pos - startPos;
    }
}

