"use strict";

const CURRENT_VERSION = 1;

const RequestDataContainer = function RequestDataContainer (version, source) {

  this.version = version;
  this.deepProfileLeftSideData = {
    "source": source || null,
    "converterId": null,
    "creeperId": null,
    "creeperActionId": null
  };

  this.deepProfileRightSideData = {
    "TwitterHandle": null,
    "LinkedInHandle": null
  };

  this.setConverter = function (converterId) {
    this.deepProfileLeftSideData.converterId = converterId;
  };

  this.setCreeper = function (creeperId, creeperActionId) {
    this.deepProfileLeftSideData.creeperId = creeperId;
    this.deepProfileLeftSideData.creeperActionId = creeperActionId;
  };

  this.toString = function toString () {
    if (this.version !== CURRENT_VERSION) {
      return "rdc-version-mismatch";
    }
    let s = "";
    // version
    s += this.version;
    // ...
    s += "%%%";
    // deepProfileLeftSideData
    s += Object.keys(this.deepProfileLeftSideData).map(deepProfileLeftSideDataKey => {
      return this.deepProfileLeftSideData[deepProfileLeftSideDataKey];
    }).join(",");
    // ...
    s += "%%%";
    // deepProfileRightSideData
    s += Object.keys(this.deepProfileRightSideData).map(deepProfileRightSideDataKey => {
      return this.deepProfileRightSideData[deepProfileRightSideDataKey]
    }).join(",");
    return s;
  };

  this.fromString = function fromString () {
    if (this.version !== CURRENT_VERSION) {
      return null;
    }
  };

};

module.exports = RequestDataContainer;