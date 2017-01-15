"use strict";

const CURRENT_VERSION = 1;
const PART_SPLITTER = "^^^";

const RequestDataContainer = function RequestDataContainer (version, source) {

  this.version = version;
  this.accessCode = "*";

  this.deepProfileLeftSideData = {
    "source": source || null,
    "converterId": null,
    "creeperId": null,
    "creeperActionId": null
  };

  this.deepProfileRightSideData = {
    "TwitterHandle": null,
    "LinkedInHandle": null,
    "convert_name": null,
    "convert_email": null
  };

};

RequestDataContainer.prototype.setAccessCode = function (accessCode) {
  this.accessCode = accessCode;
};

RequestDataContainer.prototype.setConverter = function (converterId) {
  this.deepProfileLeftSideData.converterId = converterId;
};

RequestDataContainer.prototype.setCreeper = function (creeperId, creeperActionId) {
  this.deepProfileLeftSideData.creeperId = creeperId;
  this.deepProfileLeftSideData.creeperActionId = creeperActionId;
};

RequestDataContainer.prototype.setField = function (key, value) {
  this.deepProfileRightSideData[key] = value;
};

RequestDataContainer.prototype.toString = function toString () {
  if (this.version !== CURRENT_VERSION) {
    return "rdc-version-mismatch";
  }
  let s = "";
  // version
  s += this.version;
  s += PART_SPLITTER;
  // access code
  s += this.accessCode;
  s += PART_SPLITTER;
  // deepProfileLeftSideData
  s += Object.keys(this.deepProfileLeftSideData).map(deepProfileLeftSideDataKey => {
    return this.deepProfileLeftSideData[deepProfileLeftSideDataKey];
  }).join(",");
  s += PART_SPLITTER;
  // deepProfileRightSideData
  s += Object.keys(this.deepProfileRightSideData).map(deepProfileRightSideDataKey => {
    return this.deepProfileRightSideData[deepProfileRightSideDataKey]
  }).join(",");
  return s;
};

RequestDataContainer.prototype.fromString = function fromString (string) {
  let processKeyValue = (key, value) => {
    if (value === "") return null;
    if (key.toString().substring(key.length - 2) === "Id") {
      return parseInt(value) || null;
    }
    return value;
  };
  if (string === null) {
    console.log('rdc: string null');
    return;
  }
  let parts = string.toString().split(PART_SPLITTER);
  if (parts.length !== 4) {
    console.log('rdc: wrong parts number (needs 4)');
    return;
  }
  let version = parseInt(parts[0]) || null;
  if (!version || version !== CURRENT_VERSION) {
    console.log('rdc: wrong version number (falsey or not CURRENT_VERSION)');
    return;
  }
  this.version = version;
  // access code
  this.accessCode = parts[1];
  // deepProfileLeftSideData
  let deepProfileLeftSideDataKeys = Object.keys(this.deepProfileLeftSideData);
  parts[2].split(",").forEach((value, valueIndex) => {
    let key = deepProfileLeftSideDataKeys[valueIndex];
    this.deepProfileLeftSideData[key] = processKeyValue(key, value);
  });
  // deepProfileRightSideData
  let deepProfileRightSideDataKeys = Object.keys(this.deepProfileRightSideData);
  parts[3].split(",").forEach((value, valueIndex) => {
    let key = deepProfileRightSideDataKeys[valueIndex] || "unsupported"; // don't ask, prevents a crash
    this.deepProfileRightSideData[key] = processKeyValue(key, value);
  });
};

module.exports = RequestDataContainer;