class TimeAgo {

  constructor(timestamp) {
    const YEAR_IN_SECONDS = 31536000;
    const MONTH_IN_SECONDS = 2592000;
    const DAY_IN_SECONDS = 86400;
    const HOUR_IN_SECONDS = 3600;
    const MINUTE_IN_SECONDS = 60;

    this.VARIANTS = [
      {
        key: 'minutes',
        minimumSecondsPassed: MINUTE_IN_SECONDS
      },
      {
        key: 'hours',
        minimumSecondsPassed: HOUR_IN_SECONDS
      },
      {
        key: 'days',
        minimumSecondsPassed: DAY_IN_SECONDS
      },
      {
        key: 'months',
        minimumSecondsPassed: MONTH_IN_SECONDS
      },
      {
        key: 'years',
        minimumSecondsPassed: YEAR_IN_SECONDS
      }
    ];

    var date = new Date(timestamp * 1000);

    this.secondsPassed = Math.floor((new Date() - date) / 1000);
  }

  get text() {

    for(var i = 0; i < this.VARIANTS.length; i++) {
      var interval = Math.floor(this.secondsPassed / this.VARIANTS[i].minimumSecondsPassed);

      if (interval > 1) {
          return "".concat(interval, " ", this.VARIANTS[i].key, " ago");
      }
    }

  }
}

module.exports = TimeAgo;
