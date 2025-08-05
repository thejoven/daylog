import { Button } from '@/components/ui/button'
import { History, Calendar, Settings } from 'lucide-react'
import { useTranslation } from '@/utils/translations'
import { useApp } from '@/contexts/AppContext'

const BottomNavigation = ({ currentTab, onTabChange }) => {
  const { language, records } = useApp()
  const t = useTranslation(language)

  // 检查今天是否有记录
  const today = new Date().toLocaleDateString()
  const todayRecords = records.filter(record => 
    new Date(record.timestamp).toLocaleDateString() === today
  )
  const hasTodayRecords = todayRecords.length > 0

  const navItems = [
    {
      id: 'past',
      label: t('past'),
      icon: History,
      isActive: currentTab === 'past'
    },
    {
      id: 'today',
      label: t('today'),
      icon: Calendar,
      isActive: currentTab === 'today',
      highlight: !hasTodayRecords // 如果今天没有记录则高亮
    },
    {
      id: 'settings',
      label: t('settings'),
      icon: Settings,
      isActive: currentTab === 'settings'
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center h-12 px-3 py-1 transition-colors duration-200 ${
                item.isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700'
              } ${
                item.highlight && !item.isActive
                  ? 'bg-orange-50 text-orange-600 animate-pulse'
                  : ''
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${
                item.isActive ? 'text-blue-600' : ''
              } ${
                item.highlight && !item.isActive ? 'text-orange-600' : ''
              }`} />
              <span className="text-xs font-medium">{item.label}</span>
              {item.highlight && !item.isActive && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
              )}
            </Button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation

