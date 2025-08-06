import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/utils/translations'
import { useApp } from '@/contexts/AppContext'

const PastView = () => {
  const { language, records } = useApp()
  const t = useTranslation(language)

  const emotions = [
    { id: 'happy', name: t('emotions.happy'), emoji: '😊' },
    { id: 'sad', name: t('emotions.sad'), emoji: '😢' },
    { id: 'angry', name: t('emotions.angry'), emoji: '😠' },
    { id: 'calm', name: t('emotions.calm'), emoji: '😌' },
    { id: 'anxious', name: t('emotions.anxious'), emoji: '😰' },
    { id: 'excited', name: t('emotions.excited'), emoji: '🤩' },
    { id: 'frustrated', name: t('emotions.frustrated'), emoji: '😤' },
    { id: 'peaceful', name: t('emotions.peaceful'), emoji: '🕊️' }
  ]

  // 按日期分组记录
  const groupedRecords = records.reduce((groups, record) => {
    const date = new Date(record.timestamp).toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(record)
    return groups
  }, {})

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date().toLocaleDateString()
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString()
    
    if (dateString === today) {
      return t('today')
    } else if (dateString === yesterday) {
      return t('yesterday')
    } else {
      return date.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', {
        month: 'short',
        day: 'numeric',
        weekday: 'short'
      })
    }
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-3">{t('pastRecords')}</h1>
        <p className="text-slate-600 text-lg">{t('recentRecords')}</p>
      </div>

      {Object.keys(groupedRecords).length === 0 ? (
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl mb-3">📚</div>
              <p className="text-gray-600 font-medium">{t('noRecords')}</p>
              <p className="text-gray-500 text-sm mt-1">{t('startRecording')}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedRecords)
            .sort(([a], [b]) => new Date(b) - new Date(a))
            .map(([date, dayRecords]) => (
              <Card key={date}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{formatDate(date)}</CardTitle>
                  <CardDescription>
                    {dayRecords.length} {t('recordCount').toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dayRecords
                      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                      .map((record) => (
                        <div 
                          key={record.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {emotions.find(e => e.id === record.emotion)?.emoji}
                            </span>
                            <div>
                              <div className="font-medium text-sm">{record.emotionName}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(record.timestamp).toLocaleTimeString(language === 'zh' ? 'zh-CN' : 'en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </div>
                              {record.trigger && (
                                <div className="text-xs text-gray-600 mt-1 max-w-48 truncate">
                                  {record.trigger}
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge variant="secondary">
                            {t('intensity')} {record.intensity}
                          </Badge>
                        </div>
                      ))}
                  </div>
                  
                  {/* 日统计 */}
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-blue-600">{dayRecords.length}</div>
                        <div className="text-xs text-gray-600">{t('recordCount')}</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">
                          {(dayRecords.reduce((sum, r) => sum + r.intensity, 0) / dayRecords.length).toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-600">{t('avgIntensity')}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  )
}

export default PastView

