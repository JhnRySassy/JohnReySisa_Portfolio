/** Domain layer: every piece of portfolio content is an object with its own behaviour. */
export abstract class Entity {
  constructor(readonly id: string) {}
}

export class Profile extends Entity {
  constructor(
    readonly fullName: string,
    readonly role: string,
    readonly email: string,
    readonly facebook: string,
    readonly location: string,
  ) {
    super("profile");
  }
  get shortName(): string {
    return this.fullName.split(" ").slice(0, 2).join(" ");
  }
  get cvLink(): string {
    return `mailto:${this.email}?subject=CV%20request`;
  }
  greeting(d: Date = new Date()): string {
    const h = d.getHours();
    return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  }
}

export class Principle extends Entity {
  constructor(
    id: string,
    readonly title: string,
    readonly body: string,
  ) {
    super(id);
  }
}
export class SkillGroup extends Entity {
  constructor(
    id: string,
    readonly title: string,
    readonly skills: string[],
    readonly primary?: string,
  ) {
    super(id);
  }
}
export class ProcessStep extends Entity {
  constructor(
    id: string,
    readonly title: string,
    readonly body: string,
  ) {
    super(id);
  }
}
export class Certificate extends Entity {
  constructor(
    id: string,
    readonly issuer: string,
    readonly title: string,
    readonly note: string,
    readonly year: string,
    readonly color: string,
  ) {
    super(id);
  }
}
export class Decision extends Entity {
  constructor(
    id: string,
    readonly label: string,
    readonly problem: string,
    readonly decision: string,
  ) {
    super(id);
  }
}
export class Project extends Entity {
  constructor(
    id: string,
    readonly name: string,
    readonly subtitle: string,
    readonly summary: string,
    readonly tags: string[],
    readonly meta: Record<string, string>,
  ) {
    super(id);
  }
  get href(): string {
    return `#${this.id}`;
  }
}

export class TimelineEvent extends Entity {
  constructor(
    id: string,
    readonly when: string,
    readonly title: string,
    readonly body: string,
  ) {
    super(id);
  }
}
export class Strength extends Entity {
  constructor(
    id: string,
    readonly title: string,
    readonly body: string,
  ) {
    super(id);
  }
}
