import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/utils/translations'
import { useApp } from '@/contexts/AppContext'

const TodayView = () => {
  const { language, records, addRecord } = useApp()
  const t = useTranslation(language)
  
  const [selectedEmotion, setSelectedEmotion] = useState(null)
  const [intensity, setIntensity] = useState([5])
  const [trigger, setTrigger] = useState('')

  const emotions = [
    { id: 'happy', name: t('emotions.happy'), emoji: '😊', color: 'bg-green-500' },
    { id: 'sad', name: t('emotions.sad'), emoji: '😢', color: 'bg-blue-500' },
    { id: 'angry', name: t('emotions.angry'), emoji: '😠', color: 'bg-red-500' },
    { id: 'calm', name: t('emotions.calm'), emoji: '😌', color: 'bg-cyan-500' },
    { id: 'anxious', name: t('emotions.anxious'), emoji: '😰', color: 'bg-orange-500' },
    { id: 'excited', name: t('emotions.excited'), emoji: '🤩', color: 'bg-yellow-500' },
    { id: 'frustrated', name: t('emotions.frustrated'), emoji: '😤', color: 'bg-purple-500' },
    { id: 'peaceful', name: t('emotions.peaceful'), emoji: '🕊️', color: 'bg-pink-500' }
  ]

  // 获取今天的记录
  const today = new Date().toLocaleDateString()
  const todayRecords = records.filter(record => 
    new Date(record.timestamp).toLocaleDateString() === today
  )

  const handleSaveRecord = () => {
    if (!selectedEmotion) return

    const newRecord = {
      id: Date.now(),
      emotion: selectedEmotion,
      emotionName: emotions.find(e => e.id === selectedEmotion)?.name,
      intensity: intensity[0],
      trigger,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString()
    }

    addRecord(newRecord)
    
    // 重置表单
    setSelectedEmotion(null)
    setIntensity([5])
    setTrigger('')
    
    alert(t('saveRecord') + '!')
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="text-center pt-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('appTitle')}</h1>
        <p className="text-gray-600">{t('appSubtitle')}</p>
      </div>
      
      {/* 情绪选择 */}
      <Card>
        <CardHeader>
          <CardTitle>{t('howFeeling')}</CardTitle>
          <CardDescription>{t('selectEmotion')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {emotions.map((emotion) => (
              <Button
                key={emotion.id}
                variant={selectedEmotion === emotion.id ? "default" : "outline"}
                className={`h-16 flex flex-col gap-1 ${
                  selectedEmotion === emotion.id 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedEmotion(emotion.id)}
              >
                <span className="text-2xl">{emotion.emoji}</span>
                <span className="text-sm">{emotion.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 强度调节 */}
      {selectedEmotion && (
        <Card>
          <CardHeader>
            <CardTitle>{t('emotionIntensity')}</CardTitle>
            <CardDescription>{t('intensityDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Slider
                value={intensity}
                onValueChange={setIntensity}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{t('mild')}</span>
                <Badge variant="secondary" className="px-3 py-1">
                  {t('intensity')}: {intensity[0]}
                </Badge>
                <span>{t('intense')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 触发事件 */}
      {selectedEmotion && (
        <Card>
          <CardHeader>
            <CardTitle>{t('whatHappened')}</CardTitle>
            <CardDescription>{t('triggerDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={t('triggerPlaceholder')}
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="min-h-[80px]"
            />
          </CardContent>
        </Card>
      )}

      {/* 菲斯汀格法则提醒 */}
      {selectedEmotion && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-blue-800 mb-2">
                💡 {t('festingerRule')}
              </p>
              <p className="text-xs text-blue-600">
                {t('festingerSubtext')}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 保存按钮 */}
      {selectedEmotion && (
        <Button 
          onClick={handleSaveRecord}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {t('saveRecord')}
        </Button>
      )}

      {/* 今日记录 */}
      {todayRecords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('todayStats')}</CardTitle>
            <CardDescription>{t('todayTrack')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayRecords.slice(0, 5).map((record) => (
                <div 
                  key={record.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white"
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
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {t('intensity')} {record.intensity}
                  </Badge>
                </div>
              ))}
            </div>
            
            {/* 统计信息 */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{todayRecords.length}</div>
                <div className="text-sm text-gray-600">{t('recordCount')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {todayRecords.length > 0 ? (todayRecords.reduce((sum, r) => sum + r.intensity, 0) / todayRecords.length).toFixed(1) : 0}
                </div>
                <div className="text-sm text-gray-600">{t('avgIntensity')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 空状态 */}
      {todayRecords.length === 0 && !selectedEmotion && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl mb-3">📝</div>
              <p className="text-orange-800 font-medium">{t('noRecordsToday')}</p>
              <p className="text-orange-600 text-sm mt-1">{t('startRecording')}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default TodayView

