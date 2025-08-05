import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('emotion-app-language') || null
  })
  
  const [recordMode, setRecordMode] = useState(() => {
    return localStorage.getItem('emotion-app-record-mode') || null
  })
  
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('emotion-app-records')
    return saved ? JSON.parse(saved) : []
  })
  
  const [isFirstTime, setIsFirstTime] = useState(() => {
    return !language || !recordMode
  })

  // 保存语言设置
  const updateLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('emotion-app-language', lang)
  }

  // 保存记录模式
  const updateRecordMode = (mode) => {
    setRecordMode(mode)
    localStorage.setItem('emotion-app-record-mode', mode)
  }

  // 保存记录
  const addRecord = (record) => {
    const newRecords = [record, ...records]
    setRecords(newRecords)
    localStorage.setItem('emotion-app-records', JSON.stringify(newRecords))
  }

  // 完成初始设置
  const completeSetup = () => {
    setIsFirstTime(false)
  }

  // 保存记录到localStorage
  useEffect(() => {
    localStorage.setItem('emotion-app-records', JSON.stringify(records))
  }, [records])

  const value = {
    language,
    recordMode,
    records,
    isFirstTime,
    updateLanguage,
    updateRecordMode,
    addRecord,
    completeSetup,
    setRecords
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

