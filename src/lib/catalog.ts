/*
 * Catálogo de materias/temas como view-models para la UI. Lee materias.json
 * (índice ligero) y construye los datos que consumen SubjectSelect y Print.
 * Resuelve qué temas tienen contenido real (registry) para marcar "Pronto".
 */
import materiasData from "@content/materias.json";
import type { CatalogoMaterias, Materia } from "@content/types";
import { topicsWithContent } from "@content/registry";

const catalog = materiasData as CatalogoMaterias;

/** materia id → namespace de contenido en content.json */
const CONTENT_KEY: Record<Materia, string> = {
  matematicas: "math",
  lengua: "spanish",
  ciencias: "science",
  sociales: "social",
  ingles: "english",
};

export function contentKeyFor(materia: Materia): string {
  return CONTENT_KEY[materia];
}

export interface SubjectVM {
  id: Materia;
  title: string;
  zone: string;
  icon: string;
  colorToken: string;
  langTag?: string;
  soon?: boolean;
}

export interface TopicVM {
  id: string;
  title: string;
  challengeG4?: boolean;
  soon?: boolean;
}

export type TFn = (key: string, opts?: Record<string, unknown>) => string;

/** Construye los VMs de materia. Una materia es "soon" si no tiene temas con contenido. */
export function buildSubjectVMs(t: TFn): SubjectVM[] {
  return catalog.materias.map((m) => {
    const hasContent = topicsWithContent(m.id).length > 0;
    return {
      id: m.id,
      title: t(m.tituloKey),
      zone: t(`content:${CONTENT_KEY[m.id]}.zone`),
      icon: m.icon,
      colorToken: m.colorToken,
      langTag: m.langTagKey ? t(m.langTagKey) : undefined,
      soon: !hasContent,
    };
  });
}

/** Construye los VMs de tema para una materia, marcando "Pronto" los sin contenido. */
export function buildTopicVMs(materia: Materia, t: TFn): TopicVM[] {
  const m = catalog.materias.find((x) => x.id === materia);
  if (!m) return [];
  const withContent = new Set(topicsWithContent(materia));
  return m.temas.map((tp) => ({
    id: tp.id,
    title: t(tp.tituloKey),
    challengeG4: tp.reto4,
    soon: !withContent.has(tp.id) || !tp.disponible,
  }));
}

export function subjectColorToken(materia: Materia): string {
  return catalog.materias.find((m) => m.id === materia)?.colorToken ?? "--tdp-subject-math";
}

export function subjectTitleKey(materia: Materia): string {
  return catalog.materias.find((m) => m.id === materia)?.tituloKey ?? "";
}
