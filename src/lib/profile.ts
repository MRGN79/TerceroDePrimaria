/*
 * Catálogo cerrado de avatares y apodos (onboarding, D-2: lista cerrada, nunca
 * texto libre — privacidad de menores). Los nombres se resuelven por i18n.
 */

export interface AvatarDef {
  id: string;
  nameKey: string; // content:avatar.<id>.name
  emoji: string; // representación ligera sin assets externos
}

export interface NicknameDef {
  id: string;
  labelKey: string; // content:nickname.<id>
}

export const AVATARS: AvatarDef[] = [
  { id: "fox",       nameKey: "content:avatar.fox.name",       emoji: "🦊" },
  { id: "turtle",    nameKey: "content:avatar.turtle.name",    emoji: "🐢" },
  { id: "parrot",    nameKey: "content:avatar.parrot.name",    emoji: "🦜" },
  { id: "crab",      nameKey: "content:avatar.crab.name",      emoji: "🦀" },
  { id: "lion",      nameKey: "content:avatar.lion.name",      emoji: "🦁" },
  { id: "penguin",   nameKey: "content:avatar.penguin.name",   emoji: "🐧" },
  { id: "elephant",  nameKey: "content:avatar.elephant.name",  emoji: "🐘" },
  { id: "butterfly", nameKey: "content:avatar.butterfly.name", emoji: "🦋" },
  { id: "owl",       nameKey: "content:avatar.owl.name",       emoji: "🦉" },
  { id: "dolphin",   nameKey: "content:avatar.dolphin.name",   emoji: "🐬" },
  { id: "bear",      nameKey: "content:avatar.bear.name",      emoji: "🐻" },
  { id: "rabbit",    nameKey: "content:avatar.rabbit.name",    emoji: "🐰" },
];

export const NICKNAMES: NicknameDef[] = [
  { id: "explorer", labelKey: "content:nickname.explorer" },
  { id: "captain", labelKey: "content:nickname.captain" },
  { id: "star", labelKey: "content:nickname.star" },
  { id: "champion", labelKey: "content:nickname.champion" },
];

export const DEFAULT_AVATAR = AVATARS[0].id;
export const DEFAULT_NICKNAME = NICKNAMES[0].id;

export function avatarById(id: string | null): AvatarDef {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0];
}

export function nicknameKey(id: string | null): string {
  return (NICKNAMES.find((n) => n.id === id) ?? NICKNAMES[0]).labelKey;
}
