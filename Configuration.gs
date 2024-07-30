const SHEET_CONFIG_PART = "config";
const SHEET_SUBSCRIBERS_PART = "subscribers";

const RANGE_CONFIG = "A1:H10";
const RANGE_CONFIG_DATA = "B1:B10";
const RANGE_CONFIG_INFRA = "C1:C10";
const RANGE_CONFIG_NETWORKING = "D1:D10";
const RANGE_CONFIG_PLATFORM = "E1:E10";

const RANGE_SUBSCRIBERS = "A2:I";

const CONFIGURATIONS_MAP = new Map();

const TYPE_CONFIG = "config";
const TYPE_SUBSCRIBERS = "subscribers";

const SHARD_DATA = "Data";
const SHARD_INFRA = "Infra";
const SHARD_NETWORKING = "Networking";
const SHARD_PLATFORM = "Platform";

class Configuration {
  constructor() {
    this.site = 'tel-mon';
    this.enable = false;
    this.shard = 'Data';
    this.bustedHours = 48;
    this.wocrHours = 48;
    this.bugStaleHours = 168;
    this.tsrEmailSendHour = 9;
    this.weeklyCasesAgeHours = 240;
    this.weeklySendDay = new Set();
    this.weeklySendHour = 9;
    this.dailySendHour = 9;

    this.dailySubscribers = [];
    this.weeklySubscribers = [];
  }
}

function makeConfigurations_() {
  let sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  let configs = [];
  sheets.forEach(
    sheet => {
      let sheetName = sheet.getName();
      if (sheetName.split(" ").length == 2) {
        let site = sheetName.split(" ")[0];
        let type = sheetName.split(" ")[1];
        if (type == TYPE_CONFIG) {
          configs.push(...getSiteConfigurations_(sheetName, site));
        }
      }
    }
  );
  return configs;
}

function getSiteConfigurations_(sheetName, site) {
  let configurations = [];
  let dataConfig = getConfiguration_(sheetName, RANGE_CONFIG_DATA, site);
  if (dataConfig != null) {
    configurations.push(dataConfig);
  }
  let infraConfig = getConfiguration_(sheetName, RANGE_CONFIG_INFRA, site);
  if (infraConfig != null) {
    configurations.push(infraConfig);
  }
  let networkingConfig = getConfiguration_(sheetName, RANGE_CONFIG_NETWORKING, site);
  if (networkingConfig != null) {
    configurations.push(networkingConfig);
  }
  let platformConfig = getConfiguration_(sheetName, RANGE_CONFIG_PLATFORM, site);
  if (platformConfig != null) {
    configurations.push(platformConfig);
  }
  return configurations;
}

function getConfiguration_(sheetName, range, site) {
  return makeConfig_(Utils.getValues(sheetName, range), site);
}

function makeConfig_(raws, site) {
  Logger.log("enable = " + raws[1][0]);
  if (Utils.isNull(raws[1][0]) || !raws[1][0]) {
    return null;
  }
  let config = new Configuration();
  config.enable = true;
  config.site = site;
  config.shard = raws[0][0];
  config.bustedHours = raws[2][0];
  config.wocrHours = raws[3][0];
  config.bugStaleHours = raws[4][0];
  config.tsrEmailSendHour = raws[5][0];
  config.weeklyCasesAgeHours = raws[6][0];
  config.weeklySendDay = convertWeekDays_(raws[7][0].split(","));
  config.weeklySendHour = raws[8][0];
  config.dailySendHour = raws[9][0];
  let [dailySubscribers, weeklySubscribers] = getSubscribers_(config)
  config.dailySubscribers = dailySubscribers;
  config.weeklySubscribers = weeklySubscribers;
  Logger.log("config === " + JSON.stringify(config) + ' days = ' + config.weeklySendDay.has(1));
  return config;
}

function getSubscribers_(config) {
  let sheetName = config.site + " " + TYPE_SUBSCRIBERS;
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (sheet == null) {
    return [[], []];
  }
  return groupSubscribers_(Utils.getValuesWithNonLastRow(sheetName, RANGE_SUBSCRIBERS), config);
}

function groupSubscribers_(raws, config) {
  let dailySubscribers = [];
  let weeklySubscribers = [];
  raws.forEach(
    raw => {
      if (isDailySubscribed_(config, raw)) {
        dailySubscribers.push(raw[0]);
      }
      if (isWeeklySubscribed_(config, raw)) {
        weeklySubscribers.push(raw[0]);
      }
    }
  );
  return [dailySubscribers, weeklySubscribers];
}

function isDailySubscribed_(config, raw) {
  let flag = false;
  if ((config.shard == SHARD_DATA && raw[1] == true) || (config.shard == SHARD_INFRA && raw[2] == true) || (config.shard == SHARD_NETWORKING && raw[3] == ture) || (config.shard == SHARD_PLATFORM && raw[4] == true)) {
    flag = true;
  }
  return flag;
}

function isWeeklySubscribed_(config, raw) {
  let flag = false;
  if ((config.shard == SHARD_DATA && raw[5] == true) || (config.shard == SHARD_INFRA && raw[6] == true) || (config.shard == SHARD_NETWORKING && raw[7] == ture) || (config.shard == SHARD_PLATFORM && raw[8] == true)) {
    flag = true;
  }
  return flag;
}

function convertWeekDays_(daysStrArr) {
  let days = new Set();
  daysStrArr.forEach(
    dayStr => {
      let day = Utils.convertDayStr2Int(dayStr);
      if (day != -1) {
        days.add(day);
      }
    }
  );
  Logger.log('days = ' + days);
  return days;
}

function testConfig() {
  // makeConfigurations_();
  getConfig_('tel-mon', 'Data');
}

function getConfig_(site, shard) {
  let sheetName = site + " " + SHEET_CONFIG_PART;
  let config;
  if (Utils.compareStrIgnoreCases(shard, SHARD_DATA)) {
    config = getConfiguration_(sheetName, RANGE_CONFIG_DATA, site);
  } else if (Utils.compareStrIgnoreCases(shard, SHARD_INFRA)) {
    config = getConfiguration_(sheetName, RANGE_CONFIG_DATA, site);
  } else if (Utils.compareStrIgnoreCases(shard, SHARD_NETWORKING)) {
    config = getConfiguration_(sheetName, RANGE_CONFIG_DATA, site);
  } else if (Utils.compareStrIgnoreCases(shard, SHARD_PLATFORM)) {
    config = getConfiguration_(sheetName, RANGE_CONFIG_DATA, site);
  }
  return config;
}

