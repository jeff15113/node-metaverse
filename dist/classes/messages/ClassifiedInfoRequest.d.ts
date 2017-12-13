/// <reference types="node" />
import { UUID } from '../UUID';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';
export declare class ClassifiedInfoRequestMessage implements MessageBase {
    name: string;
    messageFlags: number;
    id: Message;
    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        ClassifiedID: UUID;
    };
    getSize(): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}