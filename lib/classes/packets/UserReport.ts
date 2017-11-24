// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class UserReportPacket implements Packet
{
    name = 'UserReport';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901893;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ReportData: {
        ReportType: number;
        Category: number;
        Position: Vector3;
        CheckFlags: number;
        ScreenshotID: UUID;
        ObjectID: UUID;
        AbuserID: UUID;
        AbuseRegionName: string;
        AbuseRegionID: UUID;
        Summary: string;
        Details: string;
        VersionString: string;
    };

    getSize(): number
    {
        return (this.ReportData['AbuseRegionName'].length + 1 + this.ReportData['Summary'].length + 1 + this.ReportData['Details'].length + 2 + this.ReportData['VersionString'].length + 1) + 111;
    }

}