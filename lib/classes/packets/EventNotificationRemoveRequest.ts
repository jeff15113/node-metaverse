// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class EventNotificationRemoveRequestPacket implements Packet
{
    name = 'EventNotificationRemoveRequest';
    flags = MessageFlags.FrequencyLow;
    id = 4294901942;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    EventData: {
        EventID: number;
    };

    getSize(): number
    {
        return 36;
    }

}