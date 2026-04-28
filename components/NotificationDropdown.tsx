"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  Tag,
  Star,
  AlertTriangle,
  X,
} from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Notification = {
  id: number;
  title: string;
  message: string;
  createdat: string;
  type: string;
  isread: boolean;
};

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/notifications/?orgId=1")
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Error fetching notifications:", err));
  }, []);

  // ✅ FIXED: unread count
  const unreadCount = notifications.filter((n) => !n.isread).length;

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // ✅ OPTIONAL: mark all as read (frontend only for now)
  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isread: true }))
    );
  };

  // ✅ FIXED: use backend "type"
  const getIcon = (type: string) => {
    switch (type) {
      case "order":
        return {
          icon: <Check className="text-blue-600" size={16} />,
          bg: "bg-blue-100",
        };
      case "sale":
        return {
          icon: <Tag className="text-green-600" size={16} />,
          bg: "bg-green-100",
        };
      case "review":
        return {
          icon: <Star className="text-yellow-600" size={16} />,
          bg: "bg-yellow-100",
        };
      case "stock":
        return {
          icon: <AlertTriangle className="text-red-600" size={16} />,
          bg: "bg-red-100",
        };
      default:
        return {
          icon: <Bell size={16} />,
          bg: "bg-gray-100",
        };
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg text-[#b7e4d8] hover:bg-white/10 hover:text-white">
          <Bell size={20} />

          {/* Badge */}
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white font-bold">
            {unreadCount}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-130 p-0 rounded-2xl border border-gray-200 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="font-semibold text-gray-900 text-lg">
            Notifications
          </h3>

          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-sm text-green-600 font-medium"
          >
            <Check size={16} />
            Mark all read
          </button>
        </div>

        <Separator />

        {/* List */}
        <ScrollArea className="max-h-105">
          <div className="px-3 py-2">
            {notifications.length === 0 && (
              <p className="text-center text-sm text-gray-400 py-6">
                No notifications yet
              </p>
            )}

            {notifications.map((n) => {
              const config = getIcon(n.type);

              return (
                <div
                  key={n.id}
                  className="flex gap-3 px-4 py-4 rounded-xl hover:bg-gray-50 transition"
                >
                  {/* Icon */}
                  <div
                    className={`h-10 w-10 flex items-center justify-center rounded-full ${config.bg}`}
                  >
                    {config.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-sm font-semibold text-gray-800">
                        {n.title}
                      </p>

                      <button
                        onClick={() => removeNotification(n.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-0.5 leading-snug line-clamp-2">
                      {n.message}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      {/* ✅ FIXED TIME */}
                      <span className="text-xs text-gray-400">
                        {new Date(n.createdat).toLocaleString()}
                      </span>

                      {/* unread indicator */}
                      {!n.isread && (
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <Separator />

        {/* Footer */}
        <div className="p-3">
          <button className="w-full text-sm text-green-600 font-medium hover:underline">
            View all notifications
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}