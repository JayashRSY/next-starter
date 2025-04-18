import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

type UIState = {
    darkMode: boolean
    sidebarOpen: boolean
    toggleDarkMode: () => void
    toggleSidebar: () => void
}

export const useUIStore = create<UIState>()(
    persist<UIState>(
        (set) => ({
            darkMode: false,
            sidebarOpen: false,
            toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
            toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        }),
        {
            name: 'ui-storage',
        } as PersistOptions<UIState>
    )
)
