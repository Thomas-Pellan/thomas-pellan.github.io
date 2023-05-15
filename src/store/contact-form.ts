import {atom, map, MapStore, WritableAtom} from 'nanostores'
import ExtendedProspect from '../class/ExtendedProspect'
import {EmailJsServices, EmailJsTemplates} from '../class/EmailJsServices'
import type Project from '../class/Project'
import {sendEmailJsData} from '../pages/helper/emailjs'

export const errorMsg: WritableAtom<unknown> & {} = atom(null);

export const clientType: WritableAtom<unknown> & {} = atom(null);
export const currentStep: WritableAtom<unknown> & {} = atom(0);

export const prospect: MapStore<Record<string, ExtendedProspect>> & {} = map<Record<string, ExtendedProspect>>({});

export const project: MapStore<Record<string, Project>> & {} = map<Record<string, Project>>({});

export async function sendContact(): Promise<boolean> {

    const data: any = {
        prospect: prospect.get(),
        project: project.get()
    }
    return sendEmailJsData(EmailJsServices.DEFAULT, EmailJsTemplates.CONTACT, data)
}