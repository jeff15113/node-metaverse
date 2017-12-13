"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
const Message_1 = require("../../enums/Message");
class UserInfoReplyMessage {
    constructor() {
        this.name = 'UserInfoReply';
        this.messageFlags = MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = Message_1.Message.UserInfoReply;
    }
    getSize() {
        return (this.UserData['DirectoryVisibility'].length + 1 + this.UserData['EMail'].length + 2) + 17;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8((this.UserData['IMViaEMail']) ? 1 : 0, pos++);
        buf.writeUInt8(this.UserData['DirectoryVisibility'].length, pos++);
        this.UserData['DirectoryVisibility'].copy(buf, pos);
        pos += this.UserData['DirectoryVisibility'].length;
        buf.writeUInt16LE(this.UserData['EMail'].length, pos);
        pos += 2;
        this.UserData['EMail'].copy(buf, pos);
        pos += this.UserData['EMail'].length;
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData = {
            AgentID: UUID_1.UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjUserData = {
            IMViaEMail: false,
            DirectoryVisibility: Buffer.allocUnsafe(0),
            EMail: Buffer.allocUnsafe(0)
        };
        newObjUserData['IMViaEMail'] = (buf.readUInt8(pos++) === 1);
        varLength = buf.readUInt8(pos++);
        newObjUserData['DirectoryVisibility'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjUserData['EMail'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.UserData = newObjUserData;
        return pos - startPos;
    }
}
exports.UserInfoReplyMessage = UserInfoReplyMessage;
//# sourceMappingURL=UserInfoReply.js.map