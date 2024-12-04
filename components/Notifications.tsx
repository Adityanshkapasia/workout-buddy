"use client";

import { useState, useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { Bell } from "lucide-react";

interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("newNotification", (notification: Notification) => {
        setNotifications((prev) => [notification, ...prev]);
      });
    }
    return () => {
      if (socket) {
        socket.off("newNotification");
      }
    };
  }, [socket]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.2)] dark:hover:shadow-[inset_0_-2px_4px_rgba(255,255,255,0.1),inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-200"
      >
        <Bell className="w-5 h-5" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
            {notifications.length === 0 ? (
              <p className="text-gray-500">No new notifications</p>
            ) : (
              <ul className="space-y-2">
                {notifications.map((notification) => (
                  <li key={notification.id} className="text-sm">
                    <p>{notification.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
