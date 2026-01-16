import type { Component } from 'svelte';

/**
 * Public types describing the final hierarchy structure
 */
export type tHierarchy = tSection[];

/**
 * Highest Level in the hierarchy, sections don't have
 * anything "render-able" to them, they're just containers.
 * Like a folder structure
 */
export type tSection = {
  title: string;
  subsections: tSubSection[];
};

/**
 * One level below a section, this, named subsection.
 * Stores a root render component as well as all the topics
 * under this subsection
 */
export type tSubSection = {
  title: string;
  root?: Component;
  topics: tTopic[];
};

/**
 * Lowest level in this hierarchy, topics are like subsubsections,
 * has a guaranteed component type as well as any metadata given
 */
export type tTopic = {
  component: Component;
  [key: string]: any;
};

/**
 * Internal node model used to build the hierarchy tree from
 * the docs/object structure.
 */
export type Metadata = {
  title?: string;
  order?: number;
  [key: string]: any;
};

interface tNodeBase {
  root: tNode; // recursive reference to a node that has component/metadata
  component?: Component;
  metadata?: Metadata;
  path?: string;
  // Allow arbitrary additional children-keys that become deeper nodes
  // (but we remap them below in tNode to be of type tNode)
}

export type tNode = tNodeBase & {
  [K in string as Exclude<K, keyof tNodeBase>]?: tNode;
};

const DEFAULT_ORDER = 9999;

function getOrder(value: any): number {
  // Prefer nested root.metadata.order, then metadata.order, else fallback
  return (
    value?.root?.metadata?.order ??
    value?.metadata?.order ??
    DEFAULT_ORDER
  );
}

function getTitle(value: any, fallback = 'No Title'): string {
  return value?.root?.metadata?.title ?? value?.metadata?.title ?? fallback;
}

/**
 * Return the non-"root" entries of a record, sorted by common order rules.
 */
function getSortedEntries<T extends Record<string, any>>(obj: T | undefined | null): [string, any][] {
  if (!obj || typeof obj !== 'object') return [];
  return Object.entries(obj)
    .filter(([key]) => key !== 'root')
    .sort(([, a], [, b]) => getOrder(a) - getOrder(b));
}

/**
 * Normalize the user-provided nodes into a consistently sorted array.
 * Accepts: Array<tNode> | Record<string, tNode> | null | undefined
 */
function normalizeNodes(nodes: tNode[] | Record<string, tNode> | null | undefined): tNode[] {
  if (Array.isArray(nodes)) return nodes;
  if (nodes && typeof nodes === 'object') return Object.values(nodes);
  return [];
}

/**
 * Sorted copy of a tNode[] by common order rules.
 */
function sortNodes<T extends tNode>(nodes: T[]): T[] {
  return [...nodes].sort((a, b) => getOrder(a) - getOrder(b));
}

export class DocumentHierarchy {
  public hierarchy: tHierarchy = [];

  constructor(nodesInput: tNode[] | Record<string, tNode> | null | undefined) {
    const nodes = sortNodes(normalizeNodes(nodesInput));

    for (const nodeSection of nodes) {
      const section: tSection = {
        title: getTitle(nodeSection),
        subsections: []
      };

      // Subsections (sorted)
      const nodeSubsections = getSortedEntries(nodeSection) as [string, tNode][];
      for (const [, nodeSubsection] of nodeSubsections) {
        if (!nodeSubsection) continue;

        const subsection: tSubSection = {
          title: getTitle(nodeSubsection),
          root: nodeSubsection.root?.component,
          topics: []
        };

        // Topics (sorted)
        const nodeTopics = getSortedEntries(nodeSubsection) as [string, tNode][];
        for (const [, nodeTopic] of nodeTopics) {
          if (!nodeTopic) continue;
          if (!nodeTopic.component) continue; // Only emit real topics

          const topic: tTopic = {
            component: nodeTopic.component,
            ...(nodeTopic.metadata ?? {})
          };

          subsection.topics.push(topic);
        }

        section.subsections.push(subsection);
      }

      this.hierarchy.push(section);
    }
  }
}
