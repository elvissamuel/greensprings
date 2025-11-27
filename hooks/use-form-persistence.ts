"use client"

import { useEffect, useCallback, useRef } from "react"
import { UseFormReturn } from "react-hook-form"

const STORAGE_KEY = "greensprings_application_draft"
const DEBOUNCE_MS = 1000

type SavedData = {
  formData: any
  currentStep: number
  savedAt: string
  documentNames: string[] // Track which documents were uploaded (can't store files)
}

export function useFormPersistence(
  methods: UseFormReturn<any>,
  currentStep: number,
  setCurrentStep: (step: number) => void,
  uploadedDocuments: Record<string, File>
) {
  const isInitialized = useRef(false)
  const isRestoring = useRef(false)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  // Check if there's saved data
  const getSavedData = useCallback((): SavedData | null => {
    if (typeof window === "undefined") return null
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  }, [])

  // Save form data to localStorage
  const saveData = useCallback(() => {
    if (typeof window === "undefined") return
    if (isRestoring.current) return // Don't save while restoring
    
    const data: SavedData = {
      formData: methods.getValues(),
      currentStep,
      savedAt: new Date().toISOString(),
      documentNames: Object.keys(uploadedDocuments),
    }
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error("Failed to save form data:", error)
    }
  }, [methods, currentStep, uploadedDocuments])

  // Debounced save
  const debouncedSave = useCallback(() => {
    if (isRestoring.current) return // Don't save while restoring
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    debounceTimer.current = setTimeout(saveData, DEBOUNCE_MS)
  }, [saveData])

  // Clear saved data
  const clearSavedData = useCallback(() => {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  // Restore form data
  const restoreData = useCallback((savedData: SavedData) => {
    isRestoring.current = true
    methods.reset(savedData.formData)
    setCurrentStep(savedData.currentStep)
    // Allow saving again after a short delay
    setTimeout(() => {
      isRestoring.current = false
    }, 100)
  }, [methods, setCurrentStep])

  // Auto-save on form changes
  useEffect(() => {
    if (!isInitialized.current) return

    const subscription = methods.watch(() => {
      debouncedSave()
    })

    return () => subscription.unsubscribe()
  }, [methods, debouncedSave])

  // Save when step changes
  useEffect(() => {
    if (isInitialized.current && !isRestoring.current) {
      saveData()
    }
  }, [currentStep, saveData])

  // Mark as initialized after first render
  useEffect(() => {
    // Small delay to prevent immediate save on mount
    const timer = setTimeout(() => {
      isInitialized.current = true
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  return {
    getSavedData,
    saveData,
    clearSavedData,
    restoreData,
    hasSavedData: () => getSavedData() !== null,
  }
}

export function formatSavedDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}
