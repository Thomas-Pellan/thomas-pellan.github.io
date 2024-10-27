import {atom, map} from 'nanostores'
import type { WritableAtom, MapStore } from 'nanostores'
import type ExtendedProspect from '../class/ExtendedProspect'
import {EmailJsServices, EmailJsTemplates} from '../class/EmailJsServices'
import type Project from '../class/Project'
import {sendEmailJsData} from '../pages/helper/emailjs'

export const errorMsg: WritableAtom<unknown> & object = atom(null);

export const currentStep: WritableAtom<unknown> & object = atom(0);

export const prospect: MapStore<Record<string, ExtendedProspect>> & object = map<Record<string, ExtendedProspect>>({});

export const project: MapStore<Record<string, Project>> & object = map<Record<string, Project>>({});

export async function sendContact(): Promise<boolean> {

    const data: Record<string, unknown> = {
        prospect: prospect.get(),
        project: project.get()
    }
    return sendEmailJsData(EmailJsServices.DEFAULT, EmailJsTemplates.CONTACT, data)
}