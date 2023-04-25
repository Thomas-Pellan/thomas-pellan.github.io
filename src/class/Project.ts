import type Budget from './Budget'

class Project {

    private _services: string[];
    private _attendees: string;
    private _budget: Budget;
    private _isPresent: boolean;

    constructor(services: string[], attendees: string, budget: Budget, isPresent: boolean) {
        this._services = services;
        this._attendees = attendees;
        this._budget = budget;
        this._isPresent = isPresent;
    }

    get services(): string[] {
        return this._services;
    }

    set services(value: string[]) {
        this._services = value;
    }

    get attendees(): string {
        return this._attendees;
    }

    set attendees(value: string) {
        this._attendees = value;
    }

    get budget(): Budget {
        return this._budget;
    }

    set budget(value: Budget) {
        this._budget = value;
    }

    get isPresent(): boolean {
        return this._isPresent;
    }

    set isPresent(value: boolean) {
        this._isPresent = value;
    }
}

export default Project;