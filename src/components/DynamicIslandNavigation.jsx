import { Button } from '@/components/ui/button'
import { History, Calendar, Settings } from 'lucide-react'
import { useTranslation } from '@/utils/translations'
import { useApp } from '@/contexts/AppContext'

const DynamicIslandNavigation = ({ currentTab, onTabChange }) => {
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
      highlight: !hasTodayRecords
    },
    {
      id: 'settings',
      label: t('settings'),
      icon: Settings,
      isActive: currentTab === 'settings'
    }
  ]

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/80 backdrop-blur-xl rounded-full px-4 py-2 shadow-2xl border border-white/10">
        <div className="flex items-center gap-2">
          {navItems.map((item, index) => {
            const Icon = item.icon
            
            return (
              <div key={item.id} className="relative">
                <Button
                  variant="ghost"
                  onClick={() => onTabChange(item.id)}
                  className={`relative flex flex-col items-center justify-center h-10 px-3 py-1 rounded-full transition-all duration-300 ${
                    item.isActive 
                      ? 'bg-white text-black hover:bg-white/90' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  } ${
                    item.highlight && !item.isActive
                      ? 'bg-orange-500/20 text-orange-300 animate-pulse'
                      : ''
                  }`}
                >
                  <Icon className={`w-4 h-4 ${
                    item.isActive ? 'text-black' : ''
                  } ${
                    item.highlight && !item.isActive ? 'text-orange-300' : ''
                  }`} />
                  
                  {item.isActive && (
                    <span className="text-xs font-medium leading-none mt-0.5 text-black">
                      {item.label}
                    </span>
                  )}
                </Button>
                
                {/* 高亮指示器 */}
                {item.highlight && !item.isActive && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-ping"></div>
                )}
                
                {/* 活跃状态下的扩展动画 */}
                {item.isActive && (
                  <div className="absolute inset-0 bg-white rounded-full -z-10 animate-pulse opacity-20"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DynamicIslandNavigation

