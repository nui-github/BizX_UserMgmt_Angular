export class i18n {
  public buttons = {
    add: "components.button.add",
    search: "components.button.search",
    clear: "components.button.clear",
    save: "components.button.save",
    back: "components.button.back",
    resetPassword: "components.button.resetpassword",
    unlock: "components.button.unlock",
    changeStatus: "components.button.changestatus",
    view: "components.button.view",
    edit: "components.button.edit",
    approve: "components.button.approve",
    reject: "components.button.reject",
    delete: "components.button.delete",
    cancel: "components.button.cancel",
    next: "components.button.next",
    backToLogin: "components.button.back.to.login",
    submit: "components.button.submit"

  };

  public fields = {
    placeholder: "fields.placeholder.search",
    emptyData: "fields.empty.data"
  };

  public companyType = {
    pageTitle:"pages.company.type.page.title",
    cardTitleName: "page.company.type.list.card.name.title",
    cardTitleType: "page.company.type.list.card.register.type.title",

    alertMessageMenuRequired: "alert.message.company.type.menu.required",
    alertMessageCreateSuccess: "alert.message.create.company.type.success",
    alertMessageUpdateSuccess: "alert.message.update.company.type.success",
    alertMessageCreateFailure: "alert.message.create.company.type.failue",
    alertMessageUpdateFailure: "alert.message.update.company.type.failue",

  };

  public company = {
    pageTitle:"pages.company.page.title",
    cardTitleType: "pages.company.list.card.registerType.title",
    cardTitleTaxId: "pages.company.list.card.companyTaxId.title",
    cardTitleName: "pages.company.list.card.name.title",
    cardTitleCompanyType: "pages.company.list.card.companyTypeId.title",
    cardTitleStatus: "pages.company.list.card.status.title",

    streetLabel: "pages.company.detail.address.information.input.street.label",
    streetSubLabel: "pages.company.detail.address.information.input.street.sublabel",
    companyTaxIdLabel: "pages.company.detail.information.input.companyTaxId.label",
    companyTaxIdSubLabel: "pages.company.detail.information.input.companyTaxId.sublabel",
    personalTaxIdLabel: "pages.company.detail.information.input.personalTaxId.label",
    personalTaxIdSubLabel: "pages.company.detail.information.input.personalTaxId.sublabel",
    typeLabel: "pages.company.detail.information.select.type.label",
    typeSubLabel: "pages.company.detail.information.select.type.sublabel",
    companyTypeLabel: "pages.company.detail.information.select.companyTypeId.label",
    companyTypeSubLabel: "pages.company.detail.information.select.companyTypeId.sublabel",
    personalTypeLabel: "pages.company.detail.information.select.personalType.label",
    personalTypeSubLabel: "pages.company.detail.information.select.personalType.sublabel",
    companyNameLabel: "pages.company.detail.information.input.name.label",
    companyNameSubLabel: "pages.company.detail.information.input.name.sublabel",
    personalNameLabel: "pages.company.detail.information.input.personalName.label",
    personalNameSubLabel: "pages.company.detail.information.input.personalName.sublabel",

    alertMessageCreateSuccess: "alert.message.create.company.success",
    alertMessageUpdateSuccess: "alert.message.update.company.success",
    alertMessageCreateFailure: "alert.message.create.company.failue",
    alertMessageUpdateFailure: "alert.message.update.company.failue",
    companyChangeStatus: "alert.message.company.change.status",
    dataUpdateStatus: "pages.company.list.update.status",
    dataUpdateStatusFailed: "pages.company.list.update.status.failed",
  };

  public ocrCompany = {
    pageTitle:"pages.ocr.company.page.title",
    cardTitleOcrCompanyName: "pages.ocr.company.list.input.name.label",

    alertCreate:"alert.message.create.ocr.company",
    alertUpdate:"alert.message.update.ocr.company",
    alertMessageCreateSuccess: "alert.message.create.ocr.company.success",
    alertMessageUpdateSuccess: "alert.message.update.ocr.company.success",
    alertMessageCreateFailure: "alert.message.create.ocr.company.failue",
    alertMessageUpdateFailure: "alert.message.update.ocr.company.failue",
  };

  public ocrTransaction = {
    pageTitle:"pages.ocr.transaction.page.title",
    cardTitleOcrTransactionId: "pages.ocr.transaction.list.input.ocrTransactionId.label",
    cardTitleClientTransactionId: "pages.ocr.transaction.list.input.clientTransactionId.label",
    cardTitleRef1: "pages.ocr.transaction.list.input.ref1.label",
    cardTitleRef2: "pages.ocr.transaction.list.input.ref2.label",
    cardTitleRef3: "pages.ocr.transaction.list.input.ref3.label",
    cardTitleStatus: "pages.ocr.transaction.list.input.status.label",
    cardTitleDocType: "pages.ocr.transaction.list.input.docType.label",
    cardTitleOcrCompanyName: "pages.ocr.transaction.list.input.ocrCompanyName.label",
  };

  public apiKey = {
    pageTitle:"pages.api.key.page.title",
    cardTitleApiKeyId: "pages.api.key.list.input.apiKeyId.label",
    cardTitleApiKeyName: "pages.api.key.list.input.apiKeyName.label",
    cardTitleApiKeyValue: "pages.api.key.list.input.apiKeyValue.label",
    cardTitleApiKeyDesc: "pages.api.key.list.input.apiKeyDescription.label",
    cardTitleActive: "pages.api.key.list.input.active.label",

    alertMessageCreateWarning: "alert.message.create.api.key.warning",
    alertMessageUpdateWarning: "alert.message.update.api.key.warning",
    alertMessageCreateSuccess: "alert.message.create.api.key.success",
    alertMessageUpdateSuccess: "alert.message.update.api.key.success",
    alertMessageCreateFailure: "alert.message.create.api.key.failue",
    alertMessageUpdateFailure: "alert.message.update.api.key.failue",

    apiKeyChangeStatus:"alert.message.api.key.change.status",
    apiKeyChangeStatusSuccess:"alert.message.api.key.change.status.success",
    apiKeyChangeStatusFailed:"alert.message.api.key.change.status.failed",
    generateApiKeyBtn: "pages.api.key.edit.regenerate.btn",
    apiKeyChangeValue:"alert.message.api.key.change.apiKeyValue",
  };

  public servicePackage = {
    pageTitle:"pages.service.package.page.title",
    cardTitleServicePackageName: "pages.service.package.list.input.name.label",
    cardTitleServicePackageCode: "pages.service.package.list.input.code.label",
    cardTitleServicePackageDesc: "pages.service.package.list.input.description.label",
    cardTitleServicePackagePrice: "pages.service.package.list.input.price.label",

    alertMessageCreateWarning: "alert.message.create.service.package.warning",
    alertMessageUpdateWarning: "alert.message.update.service.package.warning",
    alertMessageCreateSuccess: "alert.message.create.service.package.success",
    alertMessageUpdateSuccess: "alert.message.update.service.package.success",
    alertMessageCreateFailure: "alert.message.create.service.package.failue",
    alertMessageUpdateFailure: "alert.message.update.service.package.failue",
  };

  public billingDocument = {
    pageTitle:"pages.billing.document.page.title",
    cardTitleBillingDocumentName: "pages.billing.document.list.input.name.label",
    cardTitleBillingDocumentCode: "pages.billing.document.list.input.doc.code.label",
    cardTitleBillingDocumentCodeEpo: "pages.billing.document.list.input.doc.code.epo.label",
    cardTitleBillingDocumentDesc: "pages.billing.document.list.input.description.label",

    alertMessageCreateWarning: "alert.message.create.billing.document.warning",
    alertMessageUpdateWarning: "alert.message.update.billing.document.warning", 
    alertMessageCreateSuccess: "alert.message.create.billing.document.success",
    alertMessageUpdateSuccess: "alert.message.update.billing.document.success",
    alertMessageCreateFailure: "alert.message.create.billing.document.failue",
    alertMessageUpdateFailure: "alert.message.update.billing.document.failue",
  };

  public billingDocumentUsePackage = {
    pageTitle:"pages.bill.doc.use.package.page.title",
    cardTitleBillingDocumentActive: "pages.bill.doc.use.package.list.input.active.label",
    cardTitleBillingDocumentCode: "pages.bill.doc.use.package.list.input.doc.code.label",
    cardTitleBillingDocumentbillingDate: "pages.bill.doc.use.package.list.input.billingDate.label",
    alertChangeStatus: "alert.message.bill.doc.use.package.change.status",

    alertMessageCreateWarning: "alert.message.create.bill.doc.use.package.warning",
    alertMessageUpdateWarning: "alert.message.update.bill.doc.use.package.warning", 
    alertMessageCreateSuccess: "alert.message.create.bill.doc.use.package.success",
    alertMessageUpdateSuccess: "alert.message.update.bill.doc.use.package.success",
    alertMessageCreateFailure: "alert.message.create.bill.doc.use.package.failue",
    alertMessageUpdateFailure: "alert.message.update.bill.doc.use.package.failue",
  };

  public billingDocumentPackageUseApiKey = {
    alertMessageAddWarning: "alert.message.add.apikey.warning",
    alertMessageCreateSuccess: "alert.message.create.bill.doc.use.apikey.success",
    alertMessageCreateFailure: "alert.message.create.bill.doc.use.apikey.failue",
  };

  
  public billingDocumentConfig = {
    pageTitle: "pages.bill.doc.config.page.title",
    pageSubTitle: "pages.bill.doc.config.page.subtitle",

  }


  










  public group = {
    pageTitle:"pages.group.page.title",
    cardTitleCompanyName: "pages.group.list.card.company.title",
    cardTitleGroup: "pages.group.list.card.group.title",
    cardTitleStatus: "pages.group.list.card.status.title",

    alertMessageCreateSuccess: "alert.message.create.group.success",
    alertMessageUpdateSuccess: "alert.message.update.group.success",
    alertMessageCreateFailure: "alert.message.create.group.failue",
    alertMessageUpdateFailure: "alert.message.update.group.failue",
    groupChangeStatus:"alert.message.group.change.status",
    groupChangeStatusSuccess:"alert.message.group.change.status.success",
    groupChangeStatusFailed:"alert.message.group.change.status.failed"
  };

  public user = {
    pageTitle:"pages.user.page.title",
    cardTitleName: "pages.user.list.card.name.title",
    cardTitleUsername: "pages.user.list.card.username.title",
    cardTitleApprove: "pages.user.list.card.approve.title",
    cardTitleEmail: "pages.user.list.card.email.title",
    cardTitleCompanyName: "pages.user.list.card.cpid.title",
    cardTitleGroup: "pages.user.list.card.gid.title",
    cardTitleStatus: "pages.user.list.card.status.title",

    alertMessageCreateSuccess: "alert.message.create.user.success",
    alertMessageUpdateSuccess: "alert.message.update.user.success",
    alertMessageCreateFailure: "alert.message.create.user.failue",
    alertMessageUpdateFailure: "alert.message.update.user.failue",
    userChangeStatus: "alert.message.user.change.status",
    userApprove: "alert.message.user.approve",
    userResetPassword: "alert.message.user.reset.password",
    userUnlock: "alert.message.user.unlock",

    userChangeStatusSuccess: "alert.message.user.change.status.success",
    userChangeStatusFailed: "alert.message.user.change.status.failed",
    userResetPasswordSuccess: "alert.message.user.reset.password.success",
    userResetPasswordFailed: "alert.message.user.reset.password.failed",
    userUnlockSuccess: "alert.message.user.unlock.success",
    userUnlockFailed: "alert.message.user.unlock.failed",
  }

  public role = {
    pageTitle:"pages.role.page.title",
    cardTitleCompanyName: "pages.role.list.card.company.title",
    cardTitleName: "pages.role.list.card.name.title",

    alertMessageCreateSuccess: "alert.message.create.role.success",
    alertMessageUpdateSuccess: "alert.message.update.role.success",
    alertMessageCreateFailure: "alert.message.create.role.failue",
    alertMessageUpdateFailure: "alert.message.update.role.failue",
  };

  public permission = {
    pageTitle:"pages.permission.page.title",
    cardTitlePermissionCode: "pages.permission.list.card.permission.code.title",

    alertMessageCreateSuccess: "alert.message.create.permission.success",
    alertMessageUpdateSuccess: "alert.message.update.permission.success",
    alertMessageCreateFailure: "alert.message.create.permission.failue",
    alertMessageUpdateFailure: "alert.message.update.permission.failue",
  };

  public menu = {
    pageTitle:"pages.menu.page.title",
    cardTitleName: "pages.menu.list.card.name.title",
    cardTitleUrl: "pages.menu.list.card.url.title",

    alertMessageCreateSuccess: "alert.message.create.menu.success",
    alertMessageUpdateSuccess: "alert.message.update.menu.success",
    alertMessageCreateFailure: "alert.message.create.menu.failue",
    alertMessageUpdateFailure: "alert.message.update.menu.failue",
  };

  public register = {
    pageTitle:"pages.register.page.title",
    name: "pages.register.list.card.name.title",
    taxId: "pages.register.list.card.taxId.title",
    approveDate: "pages.register.list.card.approveDate.title",
    branch: "pages.register.list.card.branch.title",
    type: "pages.register.list.card.type.title",
    registerDate: "pages.register.list.card.registerDate.title",
    status: "pages.register.list.card.status.title",
    companyTypeLabel: "pages.regsiter.management.detail.information.select.companyTypeId.label",
    companyTypeSubLabel: "pages.regsiter.management.detail.information.select.companyTypeId.sublabel",
    personalTypeLabel: "pages.regsiter.management.detail.information.select.personalType.label",
    personalTypeSubLabel: "pages.regsiter.management.detail.information.select.personalType.sublabel",

    alertMessageCreateRegisterSuccess: "alert.message.create.register.success",
    alertMessageUpdateRegisterSuccessWaitApprove: "alert.message.update.register.success.wait.approve",
    companyInformationcompanyTypeId:"pages.regsiter.management.detail.information.select.companyTypeId.label",
    resendEmailSuccess:"alert.message.resend.email.success",
    resendEmailFailed:"alert.message.resend.email.failed",
  };

  public registerDetail = {
    pageTitle:"pages.register.detail.page.title",
    streetLabel: "pages.register.detail.address.information.input.street.label",
    streetSubLabel: "pages.register.detail.address.information.input.street.sublabel",
    companyTaxIdLabel: "pages.regsiter.detail.information.input.companyTaxId.label",
    companyTaxIdSubLabel: "pages.regsiter.detail.information.input.companyTaxId.sublabel",
    personalTaxIdLabel: "pages.regsiter.detail.information.input.personalTaxId.label",
    personalTaxIdSubLabel: "pages.regsiter.detail.information.input.personalTaxId.sublabel",
    typeLabel: "pages.regsiter.detail.information.select.type.label",
    typeSubLabel: "pages.regsiter.detail.information.select.type.sublabel",
    companyTypeLabel: "pages.regsiter.detail.information.select.companyTypeId.label",
    companyTypeSubLabel: "pages.regsiter.detail.information.select.companyTypeId.sublabel",
    personalTypeLabel: "pages.regsiter.detail.information.select.personalType.label",
    personalTypeSubLabel: "pages.regsiter.detail.information.select.personalType.sublabel",
    companyNameLabel: "pages.regsiter.detail.information.input.companyName.label",
    companyNameSubLabel: "pages.regsiter.detail.information.input.companyName.sublabel",
    personalNameLabel: "pages.regsiter.detail.information.input.personalName.label",
    personalNameSubLabel: "pages.regsiter.detail.information.input.personalName.sublabel",

    verificationTitle:"pages.regsiter.detail.title.verification",
    companyTitle:"pages.regsiter.detail.title.company.information",
    personalTitle:"pages.regsiter.detail.title.personal.information",
    attachmentTitle:"pages.regsiter.detail.title.attachment",
    userTitle:"pages.regsiter.detail.title.user.information",
    loginTitle:"pages.regsiter.detail.title.login.information",

  }

  public validation = {
    required: "standard.validation.required",
    minlength: "standard.validation.minlength",
    maxlength: "standard.validation.maxlength",
    email: "standard.validation.email",
    pattern: "standard.validation.invalid",
  };

  public alert = {
    titleSuccess: "alert.title.success",
    titleError: "alert.title.error",
    titleWarning: "alert.title.warning",
    defaultdDelete: "alert.default.delete",

    select : "alert.message.select",
    limitUserNotEqualZero: "alert.message.limit.user.not.equal.zero",
    limitUserNotLessThanMinusOne: "alert.message.limit.user.not.less.than.minus.one",
    limitLoginNotEqualZero: "alert.message.limit.login.not.equal.zero",
    limitLoginNotLessThanMinusOne: "alert.message.limit.login.not.less.than.minus.one",
    limitRepeatPasswordNotZero: "alert.message.limit.repeat.password.not.equal.zero",
    limitRepeatPasswordNotLessThanMinusOne: "alert.message.limit.repeat.password.not.less.than.minus.one",
    passwordExpireNotEqualZero: "alert.message.password.expire.day.not.equal.zero",
    passwordExpireNotLessThanMinusOne: "alert.message.password.expire.day.not.less.than.minus.one",
    limitLoginSessionNotLessThanOrEqualZero: "alert.message.limit.login.session.not.less.than.or.eqal.zero",
    sessionExpireNotLessThanOrEqualZero: "alert.message.session.expire.not.less.than.or.eqal.zero",
    duplicatedCompanyName: "alert.message.duplicated.company.name",
    duplicatedPersonalName: "alert.message.duplicated.company.personal.name",
    duplicatedCompanyTaxId: "alert.message.duplicated.company.tax.id",
    cannotCheckDuplicatedCompany: "alert.message.can.not.check.duplicated.company",
    approveComplete: "alert.message.approve.complete",
    rejectComplete: "alert.message.reject.complete",
    contactAdministrator: "alert.message.contact.admin",
    rejectReason: "alert.message.reject.reason",
    selectType : "alert.message.select.type",
    taxIdRequired : "alert.message.input.tax.id.required",
    taxIdLength : "alert.message.input.tax.id.length",
    taxIdPattern : "alert.message.input.tax.id.pattern",
    notFoundDoc: "alert.message.not.found.document",
    documentEmpty: "alert.message.document.empty",

    deletePrefix:"alert.message.delete.prefix",
    deleteSuccess:"alert.message.delete.success",
    deleteFailure:"alert.message.delete.failure"

  };

  public showingPage = {
    showPage:"standard.showing.page.show.page",
    showEntries:"standard.showing.page.show.entries",
  }

  public showing = {
    showPage:"standard.showing.page.show.page",
    showEntries:"standard.showing.page.show.entries",
  }

  public pagination = {
    previousText: "components.pagination.previous",
    nextText: "components.pagination.next",
    firstText: "components.pagination.first",
    lastText: "components.pagination.last",
    showing: "components.pagination.showing",
    to: "components.pagination.to",
    of: "components.pagination.of",
    entries: "components.pagination.entries",
  }

  public pageStandardTitle = {
    companyInformationTitle: "pages.standard.title.company.information",
    personalInformationTitle:"pages.standard.title.personal.information",
    companyAddressTitle: "pages.standard.title.company.address.information",
    personalAddressTitle: "pages.standard.title.personal.address.information",
    companyContactTitle: "pages.standard.title.company.contact.information",
    personalContactTitle: "pages.standard.title.personal.contact.information",
    companyPolicyTitle: "pages.standard.title.company.policy.information",
    personalPolicyTitle: "pages.standard.title.personal.policy.information",
    attachmentDocTitle:"pages.standard.title.attachemnt.docs.information",
    userTitle:"pages.regsiter.detail.title.user.information",
    loginTitle:"pages.regsiter.detail.title.login.information",
    additionalTitle: "pages.standard.title.additional.data",
    docTypeTitle: "pages.standard.title.doc.type",
    actionTitle: "pages.standard.title.action"
  }

  public profileSetting = {
    cardTabTitle:"pages.profile.setting.account.tab.title",
    cardTitle: "pages.profile.setting.account.title",
    cardDetailTitle: "pages.profile.setting.account.detail.title",
    cardDetailSubTitle: "pages.profile.setting.account.detail.sub.title",

    alertMessageCreateSuccess: "alert.message.create.permission.success",
    alertMessageUpdateSuccess: "alert.message.update.permission.success",
    alertMessageCreateFailure: "alert.message.create.permission.failue",
    alertMessageUpdateFailure: "alert.message.update.permission.failue",
  };

  public changePassword = {
    cardTitle:"pages.standard.change.password.title",
    subTitle:"pages.standard.change.password.subtitle",
    oldPasswordLabel:"pages.standard.change.password.old.password.label",
    oldPasswordSubLabel:"pages.standard.change.password.old.password.sublabel",
    newPasswordLabel:"pages.standard.change.password.new.password.label",
    newPasswordSubLabel:"pages.standard.change.password.new.password.sublabel",
    confirmPasswordLabel:"pages.standard.change.password.confirm.password.label",
    confirmPasswordSubLabel:"pages.standard.change.password.confirm.password.sublabel",
    submitButton:"pages.standard.change.password.submit.button",
    resetButton:"pages.standard.change.password.reset.button",
    backButton:"pages.standard.change.password.back.button",
    back:"pages.standard.change.password.back",
    usernameLabel: "pages.standard.change.password.username.label",
    usernameSubLabel: "pages.standard.change.password.username.sublabel",


    oldPasswordRequire:"standard.validation.old.password.require",
    newPasswordRequire:"standard.validation.new.password.require",
    newPasswordPattern:"standard.validation.new.password.pattern",
    confirmPasswordRequire:"standard.validation.confirm.password.require",
    confirmPasswordMustMatch:"standard.validation.confirm.password.mustmatch",

  }

  public ocrPdf = {
    title:"pages.upload.pdf.title",
    uploadText:"pages.upload.pdf.text",
    uploadHint:"pages.upload.pdf.hint",
    deleteParam:"pages.ocr.pdf.delete.param.warning",
  }
}
