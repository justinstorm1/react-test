"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

type Task = {
  id: string
  title: string
  completed: boolean
}

type List = {
  id: string
  name: string
  tasks: Task[]
}

type ListContextType = {
  lists: List[]
  addList: (name: string) => void
  deleteList: (id: string) => void
}

const defaultLists: List[] = [
  {
    id: "default-1",
    name: "Personal",
    tasks: [
      { id: "t1", title: "Workout", completed: false },
    ],
  },
  {
    id: "default-2",
    name: "School",
    tasks: [
      { id: "t2", title: "Homework", completed: false },
    ],
  },
]

const ListContext = createContext<ListContextType | null>(null)

export function ListProvider({ children }: { children: React.ReactNode }) {
  const [lists, setLists] = useState<List[]>([])
  const initialized = useRef(false)

  useEffect(() => {
    const stored = localStorage.getItem("lists")
    if (stored) {
      setLists(JSON.parse(stored))
    } else {
      setLists(defaultLists)
    }
    initialized.current = true
  }, [])

  useEffect(() => {
    if (!initialized.current) return
    localStorage.setItem("lists", JSON.stringify(lists))
  }, [lists])

  const addList = (name: string) => {
    setLists(prev => [...prev, { id: crypto.randomUUID(), name, tasks: [] }])
  }

  const deleteList = (id: string) => {
    setLists(prev => prev.filter(list => list.id !== id))
  }

  return (
    <ListContext.Provider value={{ lists, addList, deleteList }}>
      {children}
    </ListContext.Provider>
  )
}

export function useLists() {
  const context = useContext(ListContext)
  if (!context) throw new Error("useLists must be used within ListProvider")
  return context
}
