import {atom, map, MapStore, WritableAtom} from 'nanostores'
import ExtendedProspect from "../class/ExtendedProspect";
export const currentStep: WritableAtom<unknown> & {} = atom(0);

export const prospect: MapStore<Record<string, ExtendedProspect>> & {} = map<Record<string, ExtendedProspect>>({});