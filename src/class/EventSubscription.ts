class EventSubscription {
    private _date: Date;
    private _number: Number;
    constructor(date: Date, number: Number) {
        this._date = date;
        this._number = number;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    get number(): Number {
        return this._number;
    }

    set number(value: Number) {
        this._number = value;
    }
}

export default EventSubscription;