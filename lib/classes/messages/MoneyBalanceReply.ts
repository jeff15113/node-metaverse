// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class MoneyBalanceReplyMessage implements MessageBase
{
    name = 'MoneyBalanceReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.MoneyBalanceReply;

    MoneyData: {
        AgentID: UUID;
        TransactionID: UUID;
        TransactionSuccess: boolean;
        MoneyBalance: number;
        SquareMetersCredit: number;
        SquareMetersCommitted: number;
        Description: Buffer;
    };
    TransactionInfo: {
        TransactionType: number;
        SourceID: UUID;
        IsSourceGroup: boolean;
        DestID: UUID;
        IsDestGroup: boolean;
        Amount: number;
        ItemDescription: Buffer;
    };

    getSize(): number
    {
        return (this.MoneyData['Description'].length + 1) + (this.TransactionInfo['ItemDescription'].length + 1) + 87;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.MoneyData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.MoneyData['TransactionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8((this.MoneyData['TransactionSuccess']) ? 1 : 0, pos++);
        buf.writeInt32LE(this.MoneyData['MoneyBalance'], pos);
        pos += 4;
        buf.writeInt32LE(this.MoneyData['SquareMetersCredit'], pos);
        pos += 4;
        buf.writeInt32LE(this.MoneyData['SquareMetersCommitted'], pos);
        pos += 4;
        buf.writeUInt8(this.MoneyData['Description'].length, pos++);
        this.MoneyData['Description'].copy(buf, pos);
        pos += this.MoneyData['Description'].length;
        buf.writeInt32LE(this.TransactionInfo['TransactionType'], pos);
        pos += 4;
        this.TransactionInfo['SourceID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8((this.TransactionInfo['IsSourceGroup']) ? 1 : 0, pos++);
        this.TransactionInfo['DestID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8((this.TransactionInfo['IsDestGroup']) ? 1 : 0, pos++);
        buf.writeInt32LE(this.TransactionInfo['Amount'], pos);
        pos += 4;
        buf.writeUInt8(this.TransactionInfo['ItemDescription'].length, pos++);
        this.TransactionInfo['ItemDescription'].copy(buf, pos);
        pos += this.TransactionInfo['ItemDescription'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjMoneyData: {
            AgentID: UUID,
            TransactionID: UUID,
            TransactionSuccess: boolean,
            MoneyBalance: number,
            SquareMetersCredit: number,
            SquareMetersCommitted: number,
            Description: Buffer
        } = {
            AgentID: UUID.zero(),
            TransactionID: UUID.zero(),
            TransactionSuccess: false,
            MoneyBalance: 0,
            SquareMetersCredit: 0,
            SquareMetersCommitted: 0,
            Description: Buffer.allocUnsafe(0)
        };
        newObjMoneyData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjMoneyData['TransactionID'] = new UUID(buf, pos);
        pos += 16;
        newObjMoneyData['TransactionSuccess'] = (buf.readUInt8(pos++) === 1);
        newObjMoneyData['MoneyBalance'] = buf.readInt32LE(pos);
        pos += 4;
        newObjMoneyData['SquareMetersCredit'] = buf.readInt32LE(pos);
        pos += 4;
        newObjMoneyData['SquareMetersCommitted'] = buf.readInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjMoneyData['Description'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.MoneyData = newObjMoneyData;
        const newObjTransactionInfo: {
            TransactionType: number,
            SourceID: UUID,
            IsSourceGroup: boolean,
            DestID: UUID,
            IsDestGroup: boolean,
            Amount: number,
            ItemDescription: Buffer
        } = {
            TransactionType: 0,
            SourceID: UUID.zero(),
            IsSourceGroup: false,
            DestID: UUID.zero(),
            IsDestGroup: false,
            Amount: 0,
            ItemDescription: Buffer.allocUnsafe(0)
        };
        newObjTransactionInfo['TransactionType'] = buf.readInt32LE(pos);
        pos += 4;
        newObjTransactionInfo['SourceID'] = new UUID(buf, pos);
        pos += 16;
        newObjTransactionInfo['IsSourceGroup'] = (buf.readUInt8(pos++) === 1);
        newObjTransactionInfo['DestID'] = new UUID(buf, pos);
        pos += 16;
        newObjTransactionInfo['IsDestGroup'] = (buf.readUInt8(pos++) === 1);
        newObjTransactionInfo['Amount'] = buf.readInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjTransactionInfo['ItemDescription'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.TransactionInfo = newObjTransactionInfo;
        return pos - startPos;
    }
}

