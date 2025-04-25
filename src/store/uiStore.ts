import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

type UIState = {
    sidebarOpen: boolean
    toggleSidebar: () => void
}

export const useUIStore = create<UIState>()(
    persist<UIState>(
        (set) => ({
            sidebarOpen: false,
            toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        }),
        {
            name: 'ui-storage',
        } as PersistOptions<UIState>
    )
)
