export class StandardNotification {
  id!: string;
  notiId!: string;
  uid!: string;
  subject!: string;
  detail!: string;
  param!: string;
  routing!: string;
  type!: string;
  isSeen!: boolean;
  isRead!: boolean;
  createDate!: string;
  lastUpdate!: string;
  timesAgoText!: string;
}

export interface IStandardNotification {
  id: string;
  notiId?: string;
  uid?: string;
  subject?: string;
  detail?: string;
  param?: string;
  routing?: string;
  type?: string;
  isSeen?: boolean;
  isRead?: boolean;
  createDate?: string;
  lastUpdate?: string;
  timesAgoText?: string;
}

export class StandardSearchNotification {
  uid: string | null;
  isSeen: boolean | null;

  constructor(options: {
      uid?: string;
      isSeen?: boolean | null;
  } = {}) {
      this.uid = options.uid || null,
      this.isSeen = options.isSeen == null ? null : !!options.isSeen
  }
}

export interface IReceivePushNotification {
  count: number;
  data: IStandardNotification;
}