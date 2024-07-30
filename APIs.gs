const STYLE_TD_CLOSE_TRT = "style='color: Red'";
const STYLE_TD_LONG_WOCR = "style='color: DarkOrange'";
const STYLE_TD_NO_KCS = "style='background: Azure'";
const STYLE_TD_NO_PFI = "style='background: Beige'";
const STYLE_TD_LONG_BUGS = "style='background: Gold'";
const STYLE_TD_HC_MISSING_FD = "style='background: DeepSkyBlue'";
const STYLE_TD_LC_MISSING_FD = "style='background: LightCyan'";
const STYLE_DEFAULT = "";

const CONTENT_WOCR_HOURS = "{days}({hours})";
const CONTENT_STALE_BUG_HOURS = "{days}({hours})";
const HTML_BUG_LINK = "<a href='http://b/{bug_id}'>{bug_id}</a>";
const HTML_CONSULT_LINK = "<a href='http://go/vec/{consult_id}'>{consult_id}</a>";

const REASON_CLOSED_TRT = 'T';
const REASON_LONG_WOCR = 'W';
const REASON_NO_KCS = 'K';
const REASON_NO_PFI = 'P';
const REASON_LONG_BUGS = 'B';
const REASON_NO_HC_FEEDBACK = 'H';
const REASON_NO_LC_FEEDBACK = 'L';

const ROW_FOCUS_CASE = "<tr>"
  + "<td>{reasons}</td>"
  + "<td><a href='http://mb/vector/{case_number}'>{case_number}</a></td>"
  + "<td><a href='http://go/vec/{case_number}'>{case_subject}</td>"
  + "<td>{status}</td>"
  + "<td>{priority}</td>"
  + "<td>{escalated}</td>"
  + "<td>{specialization}</td>"
  + "<td {style_td_close_trt}>{trt_hours}</td>"
  + "<td {style_td_long_wocr}>{last_status_change_hours}</td>"
  + "<td {style_td_no_kcs}>{kcs}</td>"
  + "<td {style_td_no_pfi}>{pfi}</td>"
  + "<td>{open_bugs}</td>"
  + "<td {style_td_long_bugs}>{long_bugs}</td>"
  + "<td {style_td_hc_missing_fd}>{hc_missing_feedback}</td>"
  + "<td {style_td_lc_missing_feedback}>{lc_missing_feedback}</td>"
  + "</tr>";
const ROW_OTHER_CASE = "<tr>"
  + "<td><a href='http://mb/vector/{case_number}'>{case_number}</a></td>"
  + "<td><a href='http://go/vec/{case_number}'>{case_subject}</td>"
  + "<td>{status}</td>"
  + "<td>{priority}</td>"
  + "<td>{escalated}</td>"
  + "<td>{specialization}</td>"
  + "<td>{trt_hours}</td>"
  + "<td>{last_status_change_hours}</td>"
  + "<td>{kcs}</td>"
  + "<td>{pfi}</td>"
  + "<td>{open_bugs}</td>"
  + "<td>{long_bugs}</td>"
  + "<td>{hc_missing_feedback}</td>"
  + "<td>{lc_missing_feedback}</td>"
  + "</tr>";

const ROW_DAILY_CASE_BUSTED = "<tr>"
  + "<td><a href='http://mb/vector/{case_number}'>{case_number}</a></td>"
  + "<td><a href='http://go/vec/{case_number}'>{case_subject}</td>"
  + "<td>{owner}</td>"
  + "<td>{trt_hours}</td>"
  + "<td>{status}</td>"
  + "<td>{priority}</td>"
  + "<td>{escalated}</td>"
  + "<td>{specialization}</td>"
  + "<td>{last_status_change_hours}</td>"
  + "<td>{open_bugs}</td>"
  + "</tr>";

const ROW_DAILY_CASE_OPENED_BUG = "<tr>"
  + "<td><a href='http://mb/vector/{case_number}'>{case_number}</a></td>"
  + "<td><a href='http://go/vec/{case_number}'>{case_subject}</td>"
  + "<td>{owner}</td>"
  + "<td>{trt_hours}</td>"
  + "<td>{status}</td>"
  + "<td>{priority}</td>"
  + "<td>{escalated}</td>"
  + "<td>{specialization}</td>"
  + "<td>{last_status_change_hours}</td>"
  + "<td>{open_bugs}</td>"
  + "</tr>";

/**
 * <th>Case number</th>
        <th>Subject</th>
        <th>Owner</th>
        <th>Status</th>
        <th>priority</th>
        <th>Escalated</th>
        <th>Specialization</th>
        <th>Last stutas update</th>
        <th># Consults</th>
        <th>First Consult</th>
        <th>Sum Consult ages</th>
        <th>Sum bug ages</th>
        <th>opened bugs</th>
        <th>stale bugs<days(hours)></th>
 */
const ROW_WEEKLY_WITH_BUGS = "<tr>"
  + "<td><a href='http://mb/vector/{case_number}'>{case_number}</a></td>"
  + "<td><a href='http://go/vec/{case_number}'>{case_subject}</td>"
  + "<td>{owner}</td>"
  + "<td>{status}</td>"
  + "<td>{priority}</td>"
  + "<td>{escalated}</td>"
  + "<td>{specialization}</td>"
  + "<td>{last_status_change_hours}</td>"
  + "<td>{counsults_count}</td>"
  + "<td>{first_consult}</td>"
  + "<td>{total_consult_ages}</td>"
  + "<td>{total_bug_ages}</td>"
  + "<td>{open_bugs}{open_bugs_days_str}</td>"
  + "</tr>";

const ROW_WEEKLY_WITHOUT_BUGS = "<tr>"
  + "<td><a href='http://mb/vector/{case_number}'>{case_number}</a></td>"
  + "<td><a href='http://go/vec/{case_number}'>{case_subject}</td>"
  + "<td>{owner}</td>"
  + "<td>{status}</td>"
  + "<td>{priority}</td>"
  + "<td>{escalated}</td>"
  + "<td>{specialization}</td>"
  + "<td>{last_status_change_hours}</td>"
  + "<td>{counsults_count}</td>"
  + "<td>{first_consult}</td>"
  + "<td>{total_consult_ages}</td>"
  + "<td>{total_bug_ages}</td>"
  + "</tr>";

const TYPE_TSR = 'tsr';
const TYPE_DAILY = 'daily';
const TYPE_WEEKLY = 'weekly';

const HTML_TSR = 'tsr_mail';
const HTML_DAILY = 'daily_mail';
const HTML_WEEKLY = 'weekly';
const HTML_DISABLE = 'disable';

var ldap;
var site;
var shard;
var config;
var type;
var styles = {};
var focusCasesRows = [];
var otherCasesRows = [];
var dailyBustedCasesRows = [];
var dailyBugsOpenedCasesRows = [];
var weeklyWithOpenBugCasesRows = [];
var weeklyNoOpenBUgCasesRows = [];

// https://script.google.com/a/macros/google.com/s/AKfycbynWYRk9RexPpg78vW2fa_jFlFJraFKpmPokpDWiJG7fKAHlqgXk3FdCxtuMMrpKxmeew/exec
// https://script.google.com/a/macros/google.com/s/AKfycbz2hMfzie8CTdDi6SBowmlHew0lnyDs2-3Fpzm4mVrF/dev?site=tel-mon&shard=Data&ldap=nasifa
function doGet(e) {
  ldap = e.parameter.ldap;
  site = e.parameter.site;
  shard = e.parameter.shard;
  type = e.parameter.type;
  config = getConfig_(site, shard);
  styles = getStyles_();
  if (config == null) {
    return HtmlService
      .createTemplateFromFile('disable')
      .evaluate();
  } else if (Utils.isNull(type) || type == 'tsr') {
    getCases_(ldap, config);
    return HtmlService
      .createTemplateFromFile('tsr_mail')
      .evaluate();
  } else if (type == 'daily') {
    makeDailyRows_(config);
    return HtmlService
      .createTemplateFromFile('daily_mail')
      .evaluate();
  } else if (type == 'weekly') {
    return HtmlService
      .createTemplateFromFile('weekly_mail')
      .evaluate();
  }

}

function getStyles_() {
  let styles = {};
  styles.styel_close_trt = STYLE_TD_CLOSE_TRT;
  styles.styel_long_wocr = STYLE_TD_LONG_WOCR;
  styles.styel_no_kcs = STYLE_TD_NO_KCS;
  styles.styel_no_pfi = STYLE_TD_NO_PFI;
  styles.styel_long_bugs = STYLE_TD_LONG_BUGS;
  styles.styel_hc_missing_fd = STYLE_TD_HC_MISSING_FD;
  styles.styel_lc_missing_fd = STYLE_TD_LC_MISSING_FD;
  styles.trt_hours = config.bustedHours;
  styles.wocr_hours = CONTENT_WOCR_HOURS.replaceAll("{days}", Math.round(config.wocrHours / 24, 0)).replaceAll("{hours}", config.wocrHours);
  styles.config_stale_bug_hours = CONTENT_STALE_BUG_HOURS.replaceAll("{days}", Math.round(config.bugStaleHours / 24, 0)).replaceAll("{hours}", config.bugStaleHours);
  return styles;
}

function getConfig() {
  return makeConfigContent_(config);
}

function makeConfigContent_(config) {
  let configContent = {};
  configContent.config_trt_hours = config.bustedHours;
  configContent.config_last_wocr_hours = CONTENT_WOCR_HOURS.replaceAll("{days}", Math.round(config.wocrHours / 24, 0)).replaceAll("{hours}", config.wocrHours);
  configContent.config_stale_bug_hours = CONTENT_STALE_BUG_HOURS.replaceAll("{days}", Math.round(config.bugStaleHours / 24, 0)).replaceAll("{hours}", config.bugStaleHours);
  return configContent;
}

function getLdap() {
  return ldap;
}

function getFocusCasesRows() {
  return focusCasesRows.join(" ");
}

function getOtherCasesRows() {
  return otherCasesRows.join(" ");
}

function getCases_(ldap, config) {
  groupCases_(CasesProvider.getCasesByLdap(site, shard, ldap).filter(
    function (caseObj) {
      return caseObj.service_level == 'Platinum';
    }
  ), config);
}

function groupCases_(cases, config) {
  cases.forEach(
    caseObj => {
      // Logger.log(caseObj.case_number);
      let reasons = [];
      let styles = {};
      if (isCloseToTRT_(caseObj, config)) {
        reasons.push(REASON_CLOSED_TRT);
        styles.style_td_close_trt = STYLE_TD_CLOSE_TRT;
      }
      if (isLongWOCR_(caseObj, config)) {
        reasons.push(REASON_LONG_WOCR);
        styles.style_td_long_wocr = STYLE_TD_LONG_WOCR;
      }
      if (isNoKCS_(caseObj, config)) {
        reasons.push(REASON_NO_KCS);
        styles.style_td_no_kcs = STYLE_TD_NO_KCS;
      }
      if (isNoPfi_(caseObj, config)) {
        reasons.push(REASON_NO_PFI);
        styles.style_td_no_pfi = STYLE_TD_NO_PFI;
      }
      if (isWithLongBugs_(caseObj, config)) {
        reasons.push(REASON_LONG_BUGS);
        styles.style_td_long_bugs = STYLE_TD_LONG_BUGS;
      }
      if (isWithNoHcFeedbacks_(caseObj, config)) {
        reasons.push(REASON_NO_HC_FEEDBACK);
        styles.style_td_hc_missing_fd = STYLE_TD_HC_MISSING_FD;
      }
      if (isWithNoLcFeedbacks_(caseObj, config)) {
        reasons.push(REASON_NO_LC_FEEDBACK);
        styles.style_td_lc_missing_feedback = STYLE_TD_LC_MISSING_FD;
      }
      makeCasesRows_(caseObj, config, reasons, styles);
    }
  );
}

function makeCasesRows_(caseObj, config, reasons, styles) {
  let row;
  if (reasons.length > 0) {
    row = ROW_FOCUS_CASE.replaceAll("{reasons}", reasons.join(','));
    replaceContent_(caseObj, row, focusCasesRows, styles);
  } else {
    // row = ROW_OTHER_CASE;
    replaceContent_(caseObj, ROW_OTHER_CASE, otherCasesRows, styles);
  }
}

/**
 * const ROW_WEEKLY_WITH_BUGS = "<tr>"
  + "<td>{counsults_count}</td>"
  + "<td>{first_consult}</td>"
  + "<td>{total_consult_ages}</td>"
  + "<td>{total_bug_ages}</td>"
  + "<td>{open_bugs}</td>"
  + "</tr>";
 */
function replaceContent_(caseObj, defaultRow, rowArr, styles) {
  row = defaultRow;
  row = row.replaceAll("{case_number}", caseObj.case_number).replaceAll("{case_subject}", caseObj.case_subject)
    .replaceAll("{status}", caseObj.case_status_shortened).replaceAll("{priority}", caseObj.priority).replaceAll("{escalated}", caseObj.escalated)
    .replaceAll("{specialization}", caseObj.specialization).replaceAll("{trt_hours}", caseObj.trt_hours)
    .replaceAll("{last_status_change_hours}", makeDaysAndHoursStr_(caseObj.last_status_change_hours)).replaceAll("{kcs}", !caseObj.kcs).replaceAll("{pfi}", Utils.isNull(caseObj.pfi))
    .replaceAll("{open_bugs}", makeOpenedBugsHtmlStr_(caseObj)).replaceAll("{long_bugs}", makeLongOpenedBugsHtmlStr_(caseObj)).replaceAll('{owner}', caseObj.ldap)
    .replaceAll("{hc_missing_feedback}", makeConsultLink_(caseObj.hc_missing_feedback)).replaceAll("{lc_missing_feedback}", makeConsultLink_(caseObj.lc_missing_feedback))
    .replaceAll("{counsults_count}", caseObj.hard_consult_count).replaceAll("{total_consult_ages}", caseObj.consults_duration).replaceAll("{total_bug_ages}", calculateTotalBugAges_(caseObj))
    .replaceAll("{open_bugs_days_str}", caseObj.hard_consult_count);
  if (styles) {
    row = row.replaceAll("{style_td_close_trt}", styles.style_td_close_trt).replaceAll("{style_td_long_wocr}", styles.style_td_long_wocr).replaceAll("{style_td_no_kcs}", styles.style_td_no_kcs)
      .replaceAll("{style_td_no_pfi}", styles.style_td_no_pfi).replaceAll("{style_td_long_bugs}", styles.style_td_long_bugs).replaceAll("{style_td_hc_missing_fd}", styles.style_td_hc_missing_fd)
      .replaceAll("{style_td_lc_missing_feedback}", styles.style_td_lc_missing_feedback);
  }
  rowArr.push(row);
}

function makeDaysAndHoursStr_(hours) {
  return Math.round(hours / 24, 0) + "(" + hours + ")";
}

function isCloseToTRT_(caseObj, config) {
  return (caseObj.case_status_shortened != 'C' && caseObj.trt_hours > config.bustedHours && caseObj.trt_hours <= 0);
}

function isLongWOCR_(caseObj, config) {
  return (caseObj.case_status_shortened.includes('WOC') && caseObj.last_status_change_hours >= config.wocrHours);
}

function isNoKCS_(caseObj, config) {
  return (caseObj.case_status_shortened == 'C' && !caseObj.kcs);
  // return !caseObj.kcs;
}

function isNoPfi_(caseObj, config) {
  return (caseObj.case_status_shortened == 'C' && Utils.isNull(caseObj.pfi));
  // return Utils.isNull(caseObj.pfi);
}

function isWithLongBugs_(caseObj, config) {
  let flag = false;
  caseObj.long_bugs = [];
  if (Utils.isNull(caseObj.bugs_info)) {
    return flag;
  }
  // let openBugsRaw = caseObj.bugs_info.split(";");
  // caseObj.open_bugs = makeBugObjs_(caseObj);
  caseObj.open_bugs.forEach(
    bug => {
      if (bug.assignee == caseObj.ldap && bug.last_update_hours_until_now >= config.bugStaleHours) {
        caseObj.long_bugs.push(bug);
        flag = true;
      }
    }
  );
  return flag;
}

function isWithNoHcFeedbacks_(caseObj, config) {
  let flag = false;
  if (!Utils.isNull(caseObj.hc_missing_feedback)) {
    flag = true;
  }
  return flag;
}

function isWithNoLcFeedbacks_(caseObj, config) {
  let flag = false;
  if (!Utils.isNull(caseObj.lc_missing_feedback)) {
    flag = true;
  }
  return flag;
}

function makeConsultLink_(consults) {
  // EMAIL_CONSULT_LINK
  let links = "";
  let consults_ids = consults.split(",");
  for (let i = 0; i < consults_ids.length; i++) {
    links = links + HTML_CONSULT_LINK.replaceAll("{consult_id}", consults_ids[i]);
    if (i < consults_ids.length - 1) {
      links = links + "<br>"
    }
  }
  return links;
}

function makeOpenedBugsHtmlStr_(caseObj) {
  let link = "";
  // Logger.log('case = ' + caseObj + ' bugs = ' + caseObj.open_bugs );
  for (let i = 0; i < caseObj.open_bugs.length; i++) {
    link = link + HTML_BUG_LINK.replaceAll("{bug_id}", caseObj.open_bugs[i].bug_id);
    if (i < caseObj.open_bugs.length - 1) {
      link = link + "<br>"
    }
  }
  return link;
}

// long opened bugs/days(hours)
function makeLongOpenedBugsHtmlStr_(caseObj) {
  let links = "";
  if (caseObj.long_bug) {
    for (let i = 0; i < caseObj.long_bugs.length; i++) {
      links = links + HTML_BUG_LINK.replaceAll("{bug_id}", caseObj.long_bugs[i].bug_id) + Math.round(caseObj.long_bugs[i].bugs_stale_hours / 24, 0) + "(" + caseObj.long_bugs[i].bugs_stale_hours + " hours)";
      if (i < caseObj.long_bugs.length - 1) {
        links = links + "<br>"
      }
    }

  }
  return links;
}

/**
 * =====================DAILY MAIL API======================
 */
function getBustedHours() {
  return config.bustedHours;
}

function makeDailyRows_(config) {
  makeDailyBustedCasesRows_(CasesProvider.getCasesByTrtHours(config.site, config.shard, -1 * config.bustedHours));
  makeDailyBugsOpenedCasesRows_(CasesProvider.getOpenCasesWithOpenedBugs(config.site, config.shard));
  // caseObj.open_bugs = makeBugObjs_(caseObj);
}

function makeDailyBustedCasesRows_(dailyBustedCases) {
  dailyBustedCases.forEach(
    caseObj => {
      // Logger.log('case obj ==== ' + JSON.stringify(caseObj));
      replaceContent_(caseObj, ROW_DAILY_CASE_BUSTED, dailyBustedCasesRows)
    }
  );
}

function makeDailyBugsOpenedCasesRows_(opendBugsCases) {
  opendBugsCases.forEach(
    caseObj => {
      let flag = false;
      caseObj.open_bugs.forEach(
        bug => {
          if (bug.hours_util_now < 24) {
            flag = true;
          }
        }
      );
      if (flag) {
        replaceContent_(caseObj, ROW_DAILY_CASE_OPENED_BUG, dailyBugsOpenedCasesRows)
      }
    });
}

function getDailyBustedRows() {
  return dailyBustedCasesRows.join(' ');
}

function getDailyOpenedBugCasesRows() {
  return dailyBugsOpenedCasesRows.join(' ');
}

//===================weekly mail api=========================
function getWeeklyDays() {
  return Math.round(config.weeklyCasesAgeHours / 24, 0);
}

function makeWeeklyRows_() {
  CasesProvider.getCases(config.site, config.shard).forEach(
    caseObj => {
      if (caseObj.case_age_hours >= config.weeklyCasesAgeHours) {

      } else {

      }
    }
  );
}

function calculateTotalBugAges_(caseObj) {
  let totalAges = 0;
  if (caseObj.open_bugs.length > 0) {
    caseObj.open_bugs.forEach(
      bug => {
        totalAges = totalAges + bug.hours_util_now;
      }
    );
  }
  return totalAges;
}

function groupWeeklyCases_() {

}

function getWithBugCasesRows() {
  return '';
}

function getWithoutBugCasesRows() {
  return '';
}

function testAPIs() {
  // var response = UrlFetchApp.fetch("https://script.google.com/a/macros/google.com/s/AKfycbz2hMfzie8CTdDi6SBowmlHew0lnyDs2-3Fpzm4mVrF/dev?ldap=zhaohu&site=tel-mon&shard=Data", options);
  site = 'tel-mon';
  shard = 'Data';
  ldap = 'nasifa';
  type = 'daily';
  config = getConfig_(site, shard);
  makeDailyRows_(config)
  // getCases_(ldap, config);
}
