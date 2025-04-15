
// Simple event emitter tool for communication between different components
type EventHandler = (...args: any[]) => void;

class EventEmitter {
  private events: Record<string, EventHandler[]> = {};

  // Register event listener
  on(event: string, handler: EventHandler): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  // Remove the event listener
  off(event: string, handler: EventHandler): void {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter(h => h !== handler);
  }

  // trigger event
  emit(event: string, ...args: any[]): void {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach(handler => {
      try {
        handler(...args);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }

  // Only listen for one event
  once(event: string, handler: EventHandler): void {
    const onceHandler = (...args: any[]) => {
      handler(...args);
      this.off(event, onceHandler);
    };
    this.on(event, onceHandler);
  }
}

// Create a singleton instance to share across the application
export const eventEmitter = new EventEmitter();
