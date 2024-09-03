"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAttendance = findAttendance;
function findAttendance(bundleBody) {
    return bundleBody.result.entry.filter((item) => item.resource.resourceType == 'Encounter');
}
