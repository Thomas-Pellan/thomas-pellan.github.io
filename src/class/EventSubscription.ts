class EventSubscription {
    private _date: Date;
    private _number: number;
    constructor(date: Date, number: number) {
        this._date = date;
        this._number = number;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    get number(): number {
        return this._number;
    }

    set number(value: number) {
        this._number = value;
    }
}

export default EventSubscription;