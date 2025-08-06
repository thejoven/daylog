import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Globe, Settings as SettingsIcon, BookOpen, Lightbulb, Target, TrendingUp, Heart, Clock } from 'lucide-react'
import { useTranslation } from '@/utils/translations'
import { useApp } from '@/contexts/AppContext'

const SettingsView = () => {
  const { language, updateLanguage } = useApp()
  const t = useTranslation(language)

  const languages = [
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const handleLanguageChange = (newLanguage) => {
    updateLanguage(newLanguage)
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-3">{t('settingsTitle')}</h1>
        <p className="text-slate-600 text-lg">{t('appTitle')}</p>
      </div>

      {/* 语言设置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {t('languageSetting')}
          </CardTitle>
          <CardDescription>{t('changeLanguage')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? "default" : "outline"}
                className={`w-full h-12 flex items-center justify-between ${
                  language === lang.code 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </div>
                {language === lang.code && (
                  <Badge variant="secondary" className="bg-white text-blue-600">
                    {language === 'zh' ? '当前' : 'Current'}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 应用信息 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            {t('appTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-blue-700">
              {t('appSubtitle')}
            </p>
            
            <div className="bg-white/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">💡</span>
                <span className="font-semibold text-blue-800">{t('festingerRule')}</span>
              </div>
              <p className="text-xs text-blue-600">
                {t('festingerExplanation')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 为什么要记录情绪 */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-600" />
            {t('whyRecord')}
          </CardTitle>
          <CardDescription className="text-green-700">
            {t('recordingBenefits')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* 价值列表 */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                <Target className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-green-800">{t('benefitsList.awareness')}</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-green-800">{t('benefitsList.patterns')}</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                <Heart className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-green-800">{t('benefitsList.control')}</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                <Lightbulb className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-green-800">{t('benefitsList.growth')}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 记录例子 */}
      <Card className="bg-orange-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            {t('recordExamples')}
          </CardTitle>
          <CardDescription className="text-orange-700">
            {t('exampleTitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 工作压力例子 */}
            <div className="bg-white/60 rounded-lg p-4 border-l-4 border-orange-300">
              <div className="font-semibold text-orange-800 mb-2">
                📊 {t('examples.workStress.situation')}
              </div>
              <div className="space-y-1 text-sm text-orange-700">
                <div><strong>情绪：</strong>{t('examples.workStress.emotion')}</div>
                <div><strong>触发：</strong>{t('examples.workStress.trigger')}</div>
                <div><strong>反思：</strong>{t('examples.workStress.reflection')}</div>
              </div>
            </div>

            {/* 社交愉悦例子 */}
            <div className="bg-white/60 rounded-lg p-4 border-l-4 border-green-300">
              <div className="font-semibold text-green-800 mb-2">
                😊 {t('examples.socialJoy.situation')}
              </div>
              <div className="space-y-1 text-sm text-green-700">
                <div><strong>情绪：</strong>{t('examples.socialJoy.emotion')}</div>
                <div><strong>触发：</strong>{t('examples.socialJoy.trigger')}</div>
                <div><strong>反思：</strong>{t('examples.socialJoy.reflection')}</div>
              </div>
            </div>

            {/* 交通愤怒例子 */}
            <div className="bg-white/60 rounded-lg p-4 border-l-4 border-red-300">
              <div className="font-semibold text-red-800 mb-2">
                🚗 {t('examples.trafficAnger.situation')}
              </div>
              <div className="space-y-1 text-sm text-red-700">
                <div><strong>情绪：</strong>{t('examples.trafficAnger.emotion')}</div>
                <div><strong>触发：</strong>{t('examples.trafficAnger.trigger')}</div>
                <div><strong>反思：</strong>{t('examples.trafficAnger.reflection')}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 菲斯汀格法则核心原理 */}
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            {t('festingerPrinciple')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white/60 rounded-lg p-4">
            <div className="whitespace-pre-line text-sm text-purple-800">
              {t('principleExplanation')}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsView

