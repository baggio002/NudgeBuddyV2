const TEST_MODE = true;
const TEST_TO = 'zhaohu@google.com';
const TEST_LDAP = 'nasifa';
const TEST_SEND_REAL_MAIL = false;

const EMAIL_TSR_SUBJECT = "[NUDGE BUDDY V2] ⚠️ Possible action needed - [TEST EMAIL]";
const EMAIL_DAILY_SUBJECT = "[NUDGE BUDDY V2][{site}][{shard}] ⚠️ Team summary [TEST EMAIL]";
const EMAIL_WEEKLY_SUBJECT = "[NUDGE BUDDY V2][{site}][{shard}] ⚠️ Weekly Report [TEST EMAIL]";

function sendEmails() {
  configs = makeConfigurations_();
  configs.forEach(
    config => {
      sendEmailsByConfig_(config);
    }
  );
}

function sendEmailsByConfig_(config) {
  // Logger.log('send -- sendEmailsByConfig_' + config.site + ' shard = ' + config.shard + ' enable = ' + config.enable);
  sendTSREmails_(config);
  sendSubscribersEmails_(config);
}

function sendTSREmails_(config) {
  let ldaps = CasesProvider.getLdapSet(config.site, config.shard);
  Logger.log('send -- TSR EMIALS');
  if (TEST_MODE) {
    site = config.site;
    shard = config.shard;
    mail = makeTsrEmail_(TEST_LDAP, config);
    sendTestEmail_(mail);
  } else {
    if (verifyTSRsTime_(config)) {
      ldaps.forEach(
        ldap => {
          site = config.site;
          shard = config.shard;
          mail = makeTsrEmail_(ldap, config);
          sendEmail_(mail);
        }
      );
    }
  }
}

function sendTestEmail_(mail) {
  mail.to = TEST_TO;
  Logger.log('send === ' + mail.to);
  if (TEST_SEND_REAL_MAIL) {
    MailApp.sendEmail({
      to: mail.to,
      subject: mail.subject,
      // htmlBody: html.getContent(),
      htmlBody: mail.htmlBody
      // cc: email.ccs,
      // bcc: email.bccs
    });

  }
}

function sendEmail_(mail) {
  Logger.log('send === ' + mail.to);
  MailApp.sendEmail({
    to: mail.to,
    subject: mail.subject,
    // htmlBody: html.getContent(),
    htmlBody: mail.htmlBody
    // cc: email.ccs,
    // bcc: email.bccs
  });
}

function makeTsrEmail_(ldap, config) {
  let mail = {};
  mail.to = makeEmailAddress_(ldap);
  mail.subject = EMAIL_TSR_SUBJECT;
  mail.htmlBody = makeTsrMailBody_(ldap, config);
  // Logger.log('html = ' + html);
  return mail;
}

function makeTsrMailBody_(ldap, config) {
  let html = HtmlService.createTemplateFromFile('tsr_mail').getRawContent();
  getCases_(ldap, config);
  html = setHeadContent_(ldap, config, html);
  html = setCasesRows_(html);
  return html;
}

function makeEmailAddress_(ldap) {
  let to = ldap;
  if (!ldap.includes("@")) {
    to = ldap + "@google.com"
  }
  return to;
}

function setHeadContent_(ldap, config, html) {
  html = html.replaceAll("<?= getLdap(); ?>", ldap).replaceAll("<?!= styles.styel_close_trt ?>", STYLE_TD_CLOSE_TRT).replaceAll("<?!= styles.styel_long_wocr ?>", STYLE_TD_LONG_WOCR)
    .replaceAll("<?!= styles.styel_no_kcs ?>", STYLE_TD_NO_KCS).replaceAll("<?!= styles.styel_no_pfi ?>", STYLE_TD_NO_PFI).replaceAll("<?!= styles.styel_long_bugs ?>", STYLE_TD_LONG_BUGS)
    .replaceAll("<?!= styles.styel_hc_missing_fd ?>", STYLE_TD_HC_MISSING_FD).replaceAll("<?!= styles.styel_lc_missing_fd ?>", STYLE_TD_LC_MISSING_FD)
    .replaceAll("<?!= styles.trt_hours ?>", config.bustedHours).replaceAll("<?!= styles.wocr_hours ?>", makeDaysAndHoursStr_(config.wocrHours))
    .replaceAll("<?!= styles.config_stale_bug_hours ?>", makeDaysAndHoursStr_(config.bugStaleHours));
  // Logger.log('html ===== ' + html);
  return html;
}

// <?!= getFocusCasesRows(); ?>
// <?!= getOtherCasesRows(); ?>
function setCasesRows_(html) {
  html = html.replaceAll("<?!= getFocusCasesRows(); ?>", focusCasesRows.join(' '));
  html = html.replaceAll("<?!= getOtherCasesRows(); ?>", otherCasesRows.join(' '));
  return html;
}

function verifyWeeklyTime_(config) {
  let flag = false;
  let now = new Date();
  if (config.weeklySendDay.has(now.getDay()) && config.weeklySendHour == now.getHours()) {
    flag = true;
  }
  return flag;
}

function verifyDailyTime_(config) {
  let flag = false;
  let now = new Date();
  if (config.dailySendHour == now.getHours()) {
    flag = true;
  }
  return flag;
}

function verifyTSRsTime_(config) {
  let flag = false;
  let now = new Date();
  if (config.tsrEmailSendHour == now.getHours()) {
    flag = true;
  }
  return flag;
}

function testSendMails() {
  // sendEmails()
  MailApp.sendEmail({
    to: 'zhaohu@google.com, baggio.zhaohu@gmail.com',
    subject: 'test multi send',
    // htmlBody: html.getContent(),
    htmlBody: 'test'
    // cc: email.ccs,
    // bcc: email.bccs
  })
}

