import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Globe, Settings as SettingsIcon } from 'lucide-react'
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
    <div className="space-y-6 pb-20 pt-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('settingsTitle')}</h1>
        <p className="text-gray-600">{t('appTitle')}</p>
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
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
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
    </div>
  )
}

export default SettingsView

