import {atom, map, MapStore, WritableAtom} from 'nanostores'
import ExtendedProspect from '../class/ExtendedProspect'
import emailjs, {EmailJSResponseStatus} from '@emailjs/browser'
import {EmailJsServices, EmailJsTemplates} from '../class/EmailJsServices'
import type Project from '../class/Project'

export const errorMsg: WritableAtom<unknown> & {} = atom(null);

export const clientType: WritableAtom<unknown> & {} = atom(null);
export const currentStep: WritableAtom<unknown> & {} = atom(0);

export const prospect: MapStore<Record<string, ExtendedProspect>> & {} = map<Record<string, ExtendedProspect>>({});

export const project: MapStore<Record<string, Project>> & {} = map<Record<string, Project>>({});

export async function sendProspectData(): Promise<boolean> {

    const data: any = {
        prospect: prospect.get(),
        project: project.get()
    }
    try {
        const result: EmailJSResponseStatus = await emailjs.send(EmailJsServices.DEFAULT, EmailJsTemplates.EVENT, data, import.meta.env.PUBLIC_EMAILJS)
        if(result.status && result.status%200 === 0){
            return true
        }
    } catch (e) {
        console.log(e)
    }
    return false
}