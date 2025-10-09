"use client"

import { useState } from "react"
import { Plane, Hotel, MapPin, Newspaper } from "lucide-react"

interface MenuItem {
  id: string
  label: string
  icon?: string
}

interface NavbarClientProps {
  mainMenuItems: MenuItem[]
}

const iconMap = {
  Plane,
  Hotel,
  MapPin,
  Newspaper,
}

export function NavbarClient({ mainMenuItems }: NavbarClientProps) {
  const [activeMenu, setActiveMenu] = useState("home")

  return (
    <div className="hidden md:flex items-center gap-1">
      {mainMenuItems.map((item) => {
        const Icon = item.icon ? iconMap[item.icon as keyof typeof iconMap] : null
        const isActive = activeMenu === item.id
        return (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-full font-medium transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
