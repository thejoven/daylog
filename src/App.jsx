import { useState } from 'react'
import { AppProvider, useApp } from './contexts/AppContext'
import LanguageSelection from './components/Setup/LanguageSelection'
import ModeSelection from './components/Setup/ModeSelection'
import EnhancedTodayView from './components/EnhancedTodayView'
import PastView from './components/PastView'
import SettingsView from './components/SettingsView'
import DynamicIslandNavigation from './components/DynamicIslandNavigation'
import './App.css'

const AppContent = () => {
  const { language, recordMode, isFirstTime, updateLanguage, updateRecordMode, completeSetup } = useApp()
  const [setupStep, setSetupStep] = useState('language')
  const [currentTab, setCurrentTab] = useState('today')

  // 如果是第一次使用，显示设置流程
  if (isFirstTime) {
    if (setupStep === 'language') {
      return (
        <LanguageSelection 
          onLanguageSelect={(lang) => {
            updateLanguage(lang)
            setSetupStep('mode')
          }}
        />
      )
    }
    
    if (setupStep === 'mode') {
      return (
        <ModeSelection 
          language={language}
          onModeSelect={(mode) => {
            updateRecordMode(mode)
            completeSetup()
          }}
          onBack={() => setSetupStep('language')}
        />
      )
    }
  }

  // 主应用界面
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 主内容区域 */}
      <main className="px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
        {currentTab === 'today' && <EnhancedTodayView />}
        {currentTab === 'past' && <PastView />}
        {currentTab === 'settings' && <SettingsView />}
      </main>
      
      {/* 灵动岛风格底部导航 */}
      <DynamicIslandNavigation 
        currentTab={currentTab} 
        onTabChange={setCurrentTab}
      />
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App

