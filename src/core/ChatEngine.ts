import { Observable, Disposable } from './Observable';
import type { Profile } from '../domain/models';

export interface ChatLink { label: string; href: string; }
export class QuickReply {
  constructor(readonly label: string, readonly answer: string, readonly link?: ChatLink) {}
}
export interface ChatMessage { id: number; from: 'me' | 'you'; text: string; link?: ChatLink; }
export interface ChatState { messages: ChatMessage[]; typing: boolean; phase: 'name' | 'ready'; name: string; used: number[]; }

export class ChatEngine extends Observable<ChatState> implements Disposable {
  private seq = 0;
  private timers: number[] = [];

  constructor(private readonly profile: Profile, readonly replies: QuickReply[]) {
    super({ messages: [], typing: false, phase: 'name', name: '', used: [] });
  }
  init(): void {
    if (this.value.messages.length) return;
    this.say(`${this.profile.greeting()}! I\u2019m ${this.profile.shortName}, a ${this.profile.role}. Before we start, what should I call you?`);
  }
  destroy(): void { this.timers.forEach(clearTimeout); this.timers = []; this.set({ ...this.value, typing: false }); }

  submitName(raw: string): void {
    const name = raw.trim().slice(0, 40);
    this.set({ ...this.value, phase: 'ready', name });
    if (name) this.push('you', name);
    this.say(name ? `Nice to meet you, ${name}! What would you like to know?` : 'No problem! What would you like to know?');
  }
  ask(i: number): void {
    const r = this.replies[i];
    if (!r || this.value.typing) return;
    this.set({ ...this.value, used: [...this.value.used, i] });
    this.push('you', r.label);
    this.say(r.answer, r.link);
  }

  private push(from: 'me' | 'you', text: string, link?: ChatLink): void {
    this.set({ ...this.value, messages: [...this.value.messages, { id: ++this.seq, from, text, link }] });
  }
  private say(text: string, link?: ChatLink): void {
    this.set({ ...this.value, typing: true });
    this.timers.push(window.setTimeout(() => {
      this.set({ ...this.value, typing: false });
      this.push('me', text, link);
    }, 750));
  }
}
