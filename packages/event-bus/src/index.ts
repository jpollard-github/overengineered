import { randomUUID } from "node:crypto";
import type { EventEnvelope } from "@overengineered/contracts";
export type EventHandler = (event: EventEnvelope) => void | Promise<void>;
export interface EventBus {
  publish(event: EventEnvelope): Promise<void>;
  subscribe(handler: EventHandler): () => void;
  health(): Promise<boolean>;
}
export function createDoctrineViewedEvent(
  correlationId: string,
  principleCount: number,
  causationId?: string,
): EventEnvelope {
  return {
    eventId: randomUUID(),
    eventType: "DoctrineViewed",
    correlationId,
    ...(causationId ? { causationId } : {}),
    occurredAt: new Date().toISOString(),
    schemaVersion: "1.0",
    tenantId: "public",
    payload: { principleCount },
  };
}
export class InMemoryEventBus implements EventBus {
  private handlers = new Set<EventHandler>();
  async publish(event: EventEnvelope) {
    await Promise.all([...this.handlers].map((handler) => handler(event)));
  }
  subscribe(handler: EventHandler) {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }
  async health() {
    return true;
  }
}
export interface RedisQueueAdapter {
  connect(url: string): Promise<void>;
  enqueue(event: EventEnvelope): Promise<void>;
  close(): Promise<void>;
}
