// 簡單的事件發射器工具，用於在不同組件間通信
type EventHandler = (...args: any[]) => void;

class EventEmitter {
  private events: Record<string, EventHandler[]> = {};

  // 註冊事件監聽器
  on(event: string, handler: EventHandler): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  // 移除事件監聽器
  off(event: string, handler: EventHandler): void {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter(h => h !== handler);
  }

  // 觸發事件
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

  // 只監聽一次事件
  once(event: string, handler: EventHandler): void {
    const onceHandler = (...args: any[]) => {
      handler(...args);
      this.off(event, onceHandler);
    };
    this.on(event, onceHandler);
  }
}

// 創建一個單例實例，以便在整個應用中共享
export const eventEmitter = new EventEmitter();
