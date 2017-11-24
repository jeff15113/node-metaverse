// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class GroupAccountTransactionsReplyPacket implements Packet
{
    name = 'GroupAccountTransactionsReply';
    flags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294902118;

    AgentData: {
        AgentID: UUID;
        GroupID: UUID;
    };
    MoneyData: {
        RequestID: UUID;
        IntervalDays: number;
        CurrentInterval: number;
        StartDate: string;
    };
    HistoryData: {
        Time: string;
        User: string;
        Type: number;
        Item: string;
        Amount: number;
    }[];

    getSize(): number
    {
        return (this.MoneyData['StartDate'].length + 1) + ((this.calculateVarVarSize(this.HistoryData, 'Time', 1) + this.calculateVarVarSize(this.HistoryData, 'User', 1) + this.calculateVarVarSize(this.HistoryData, 'Item', 1) + 8) * this.HistoryData.length) + 57;
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

}