class Budget {

    private _min: number;
    private _max: number;

    constructor(min: number, max: number) {
        this._min = min;
        this._max = max;
    }

    get min(): number {
        return this._min;
    }

    set min(value: number) {
        this._min = value;
    }

    get max(): number {
        return this._max;
    }

    set max(value: number) {
        this._max = value;
    }
}

export default Budget;