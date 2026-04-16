"use client";

import { useState } from "react";
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
  time: string;
  icon: "order" | "sale" | "review" | "stock";
};

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Order Shipped",
      message: "Your order #1234 has been shipped and is on its way.",
      time: "5 min ago",
      icon: "order",
    },
    {
      id: 2,
      title: "Flash Sale! 30% Off",
      message:
        "Don't miss our flash sale on electronics — ends tonight!",
      time: "15 min ago",
      icon: "sale",
    },
    {
      id: 3,
      title: "Review Response",
      message:
        "TechStore replied to your review on Wireless Earbuds.",
      time: "1 hour ago",
      icon: "review",
    },
    {
      id: 4,
      title: "Back in Stock",
      message:
        "Premium Bluetooth Speaker is back in stock — grab it now!",
      time: "2 hours ago",
      icon: "stock",
    },
  ]);

  const unreadCount = notifications.length;

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllRead = () => {
    // optional logic
  };

  const getIcon = (type: Notification["icon"]) => {
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
            {notifications.map((n) => {
              const config = getIcon(n.icon);

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
                      <span className="text-xs text-gray-400">
                        {n.time}
                      </span>
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
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