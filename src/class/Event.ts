class Event {

    private readonly _id: number;
    private readonly _name: string;
    private readonly _isAfternoon: boolean;
    private readonly _isDiscover: boolean;
    private readonly _date: Date;
    private readonly _price: number;

    constructor(id: number, name: string, isDiscover: boolean, date: Date, isAfternoon : boolean, price : number) {
        this._id = id;
        this._name = name;
        this._isDiscover = isDiscover;
        this._isAfternoon = isAfternoon;
        this._date = date;
        this._price = price;
    }

    get id(): number {
        return this._id;
    }

    get price(): number {
        return this._price;
    }

    get isAfternoon(): boolean {
        return this._isAfternoon;
    }

    get name(): string {
        return this._name;
    }

    get isDiscover(): boolean {
        return this._isDiscover;
    }

    get date(): Date {
        return this._date;
    }
}

export default Event;