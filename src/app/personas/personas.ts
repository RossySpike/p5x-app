import { Component, WritableSignal, signal } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { SupabaseService, Persona, Skill } from '../supabase.service';

@Component({
  selector: 'app-personas',
  imports: [],
  templateUrl: './personas.html',
  styleUrl: './personas.css',
})
export class Personas implements OnInit {
  db: SupabaseService = new SupabaseService();
  personas: WritableSignal<Persona[]> = signal<Persona[]>([]);

  @ViewChild('dialogRef') dialog!: ElementRef<HTMLDialogElement>;

  selectedPersona: WritableSignal<Persona> = signal<Persona>(undefined!);
  selectedPersonaSkill: WritableSignal<Skill> = signal<Skill>(undefined!);
  ngOnInit() {
    this.db.getPersonas().then((data) => {
      this.personas.set(data);
    });
  }
  constructor() {}
  openModal(personaId: number) {
    this.db.getPersonasWithSkills(personaId).then((data) => {
      this.selectedPersona.set(data);
    });
    this.dialog.nativeElement.showModal(); // to open
  }
  selectSkill(skill: Skill) {
    this.selectedPersonaSkill.set(skill);
  }
}
