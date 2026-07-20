export class StandardAppValidators {
    public static EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$";
    public static USERNAME = "^[a-zA-Z0-9_.]+$";
    public static PASSWORD = "(?=\\D*\\d)(?=.*[$#@$!%*?&])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}";
    public static PHONE = "^[0-9]+$";
    public static CURRENCY = "^[0-9.]+$";
    public static PORT = "^[0-9].{0,4}";
    public static NUMBER_ONLY = "^[0-9]*$";
  }
  