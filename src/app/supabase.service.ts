import { Injectable } from '@angular/core';
import { personaData } from '../app/persona.data';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
export interface Skill {
  id?: number;
  skill_type: string;
  name: string;
  cost?: number;
  cost_type?: string;
  description?: string;
  inheritable?: boolean;
}
export interface Persona {
  id: number;
  name: string;
  img: string;
  rank?: string;
  persona_role?: string;
  skills?: Skill[];
  hp?: number;
  attack?: number;
  defence?: number;
  trait?: string;
}
@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = new SupabaseClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
  }
  /*
   * Only gets id and name
   * */
  async getPersonas(): Promise<Persona[]> {
    let personas: Persona[] = [];
    const value = await this.supabase.from('personas').select('id, name');
    personas = [...(value.data as Persona[])];
    personas.forEach((persona) => {
      persona.img = personaData[persona.name as keyof typeof personaData];
    });
    return personas;
  }
  /*
   * Gets ALL columns
   * */
  async getPersonasWithSkills(id: number) {
    const query = await this.supabase
      .from('personas')
      .select('*')
      .eq('id', id)
      .single();
    const personaQueryData = query.data;

    const skills = await Promise.all(
      (personaQueryData?.skills ?? []).map(async (skill: string) => {
        const skillQuery = await this.supabase
          .from('persona_skills')
          .select('*')
          .eq('name', skill)
          .single();
        return skillQuery.data;
      }),
    );
    personaQueryData.skills = skills as Skill[];

    const persona: Persona = personaQueryData as Persona;
    persona.img = personaData[persona.name as keyof typeof personaData];

    return persona;
  }
}
