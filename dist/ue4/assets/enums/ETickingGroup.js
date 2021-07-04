"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETickingGroup = void 0;
/**
 * ETickingGroup
 * @enum
 */
var ETickingGroup;
(function (ETickingGroup) {
    ETickingGroup[ETickingGroup["TG_PrePhysics"] = 0] = "TG_PrePhysics";
    ETickingGroup[ETickingGroup["TG_StartPhysics"] = 1] = "TG_StartPhysics";
    ETickingGroup[ETickingGroup["TG_DuringPhysics"] = 2] = "TG_DuringPhysics";
    ETickingGroup[ETickingGroup["TG_EndPhysics"] = 3] = "TG_EndPhysics";
    ETickingGroup[ETickingGroup["TG_PostPhysics"] = 4] = "TG_PostPhysics";
    ETickingGroup[ETickingGroup["TG_PostUpdateWork"] = 5] = "TG_PostUpdateWork";
    ETickingGroup[ETickingGroup["TG_LastDemotable"] = 6] = "TG_LastDemotable";
    ETickingGroup[ETickingGroup["TG_NewlySpawned"] = 7] = "TG_NewlySpawned";
})(ETickingGroup = exports.ETickingGroup || (exports.ETickingGroup = {}));
