import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/utils/translations'
import { useApp } from '@/contexts/AppContext'

const EnhancedTodayView = () => {
  const { language, records, addRecord } = useApp()
  const t = useTranslation(language)
  
  const [selectedEmotion, setSelectedEmotion] = useState(null)
  const [intensity, setIntensity] = useState([5])
  const [trigger, setTrigger] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const emotions = [
    { id: 'happy', name: t('emotions.happy'), emoji: '😊', color: 'from-green-400 to-green-600', shadow: 'shadow-green-200' },
    { id: 'sad', name: t('emotions.sad'), emoji: '😢', color: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-200' },
    { id: 'angry', name: t('emotions.angry'), emoji: '😠', color: 'from-red-400 to-red-600', shadow: 'shadow-red-200' },
    { id: 'calm', name: t('emotions.calm'), emoji: '😌', color: 'from-cyan-400 to-cyan-600', shadow: 'shadow-cyan-200' },
    { id: 'anxious', name: t('emotions.anxious'), emoji: '😰', color: 'from-orange-400 to-orange-600', shadow: 'shadow-orange-200' },
    { id: 'excited', name: t('emotions.excited'), emoji: '🤩', color: 'from-yellow-400 to-yellow-600', shadow: 'shadow-yellow-200' },
    { id: 'frustrated', name: t('emotions.frustrated'), emoji: '😤', color: 'from-purple-400 to-purple-600', shadow: 'shadow-purple-200' },
    { id: 'peaceful', name: t('emotions.peaceful'), emoji: '🕊️', color: 'from-pink-400 to-pink-600', shadow: 'shadow-pink-200' }
  ]

  // 获取今天的记录
  const today = new Date().toLocaleDateString()
  const todayRecords = records.filter(record => 
    new Date(record.timestamp).toLocaleDateString() === today
  )

  const handleEmotionSelect = (emotionId) => {
    setIsAnimating(true)
    setSelectedEmotion(emotionId)
    
    // 添加触觉反馈效果
    setTimeout(() => setIsAnimating(false), 300)
  }

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
    
    // 显示成功动画
    setShowSuccess(true)
    
    // 重置表单
    setTimeout(() => {
      setSelectedEmotion(null)
      setIntensity([5])
      setTrigger('')
      setShowSuccess(false)
    }, 2000)
  }

  // 成功保存的动画效果
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  return (
    <div className="space-y-6 pb-24 pt-4">
      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg">
            ✨ {t('saveRecord')}成功！
          </div>
        </div>
      )}

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in">{t('appTitle')}</h1>
        <p className="text-gray-600 animate-fade-in-delay">{t('appSubtitle')}</p>
      </div>
      
      {/* 情绪选择 - 增强版 */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="text-center text-xl">{t('howFeeling')}</CardTitle>
          <CardDescription className="text-center">{t('selectEmotion')}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {emotions.map((emotion) => (
              <Button
                key={emotion.id}
                variant="ghost"
                className={`relative h-20 flex flex-col gap-2 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  selectedEmotion === emotion.id 
                    ? `bg-gradient-to-br ${emotion.color} text-white shadow-lg ${emotion.shadow} scale-105` 
                    : 'hover:bg-gray-50 border-2 border-gray-100'
                } ${
                  isAnimating && selectedEmotion === emotion.id ? 'animate-pulse' : ''
                }`}
                onClick={() => handleEmotionSelect(emotion.id)}
              >
                <span className={`text-3xl transition-transform duration-300 ${
                  selectedEmotion === emotion.id ? 'scale-110' : ''
                }`}>
                  {emotion.emoji}
                </span>
                <span className={`text-sm font-medium ${
                  selectedEmotion === emotion.id ? 'text-white' : 'text-gray-700'
                }`}>
                  {emotion.name}
                </span>
                
                {/* 选中时的光环效果 */}
                {selectedEmotion === emotion.id && (
                  <div className="absolute inset-0 rounded-2xl bg-white/20 animate-ping"></div>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 强度调节 - 增强版 */}
      {selectedEmotion && (
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">
                {emotions.find(e => e.id === selectedEmotion)?.emoji}
              </span>
              {t('emotionIntensity')}
            </CardTitle>
            <CardDescription>{t('intensityDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="relative">
                <Slider
                  value={intensity}
                  onValueChange={setIntensity}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                {/* 强度可视化 */}
                <div className="flex justify-between mt-2">
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <div 
                      key={num}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        num <= intensity[0] 
                          ? `bg-gradient-to-r ${emotions.find(e => e.id === selectedEmotion)?.color}` 
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{t('mild')}</span>
                <Badge 
                  variant="secondary" 
                  className={`px-4 py-2 text-lg font-bold bg-gradient-to-r ${
                    emotions.find(e => e.id === selectedEmotion)?.color
                  } text-white`}
                >
                  {intensity[0]}
                </Badge>
                <span className="text-sm text-gray-500">{t('intense')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 触发事件 - 增强版 */}
      {selectedEmotion && (
        <Card className="animate-slide-up-delay">
          <CardHeader>
            <CardTitle>{t('whatHappened')}</CardTitle>
            <CardDescription>{t('triggerDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={t('triggerPlaceholder')}
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="min-h-[100px] rounded-xl border-2 focus:border-blue-400 transition-colors duration-300"
            />
          </CardContent>
        </Card>
      )}

      {/* 菲斯汀格法则提醒 - 增强版 */}
      {selectedEmotion && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 animate-slide-up-delay-2">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="text-4xl mb-2">💡</div>
              <p className="text-lg font-semibold text-blue-800">
                {t('festingerRule')}
              </p>
              <p className="text-sm text-blue-600">
                {t('festingerExplanation')}
              </p>
              <div className="bg-white/50 rounded-lg p-3 mt-4">
                <p className="text-xs text-blue-700">
                  {t('festingerSubtext')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 保存按钮 - 增强版 */}
      {selectedEmotion && (
        <Button 
          onClick={handleSaveRecord}
          disabled={showSuccess}
          className={`w-full h-14 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r ${
            emotions.find(e => e.id === selectedEmotion)?.color
          } text-white shadow-lg hover:shadow-xl animate-slide-up-delay-3`}
        >
          {showSuccess ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⭐</span>
              已保存！
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>✨</span>
              {t('saveRecord')}
            </span>
          )}
        </Button>
      )}

      {/* 今日记录 - 增强版 */}
      {todayRecords.length > 0 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📊</span>
              {t('todayStats')}
            </CardTitle>
            <CardDescription>{t('todayTrack')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayRecords.slice(0, 3).map((record, index) => (
                <div 
                  key={record.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 animate-slide-in-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
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
                  <Badge 
                    variant="secondary"
                    className={`bg-gradient-to-r ${
                      emotions.find(e => e.id === record.emotion)?.color
                    } text-white`}
                  >
                    {record.intensity}
                  </Badge>
                </div>
              ))}
            </div>
            
            {/* 统计信息 */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-4">
                <div className="text-3xl font-bold">{todayRecords.length}</div>
                <div className="text-sm opacity-90">{t('recordCount')}</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl p-4">
                <div className="text-3xl font-bold">
                  {todayRecords.length > 0 ? (todayRecords.reduce((sum, r) => sum + r.intensity, 0) / todayRecords.length).toFixed(1) : 0}
                </div>
                <div className="text-sm opacity-90">{t('avgIntensity')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 空状态 - 增强版 */}
      {todayRecords.length === 0 && !selectedEmotion && (
        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 animate-bounce-slow">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-6xl animate-float">📝</div>
              <p className="text-orange-800 font-medium text-lg">{t('noRecordsToday')}</p>
              <p className="text-orange-600 text-sm">{t('startRecording')}</p>
              <div className="flex justify-center">
                <div className="animate-pulse bg-orange-200 rounded-full px-4 py-2 text-orange-700 text-sm">
                  {t('tapToSelect')} ☝️
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default EnhancedTodayView

