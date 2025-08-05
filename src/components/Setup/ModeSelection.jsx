import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/utils/translations'

const ModeSelection = ({ language, onModeSelect, onBack }) => {
  const t = useTranslation(language)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('welcome')}</h1>
          <p className="text-gray-600">{t('festingerIntro')}</p>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <span className="text-2xl">💡</span>
              {t('festingerMode')}
            </CardTitle>
            <CardDescription className="text-center text-blue-700">
              {t('festingerModeDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="text-lg font-semibold text-blue-800 mb-2">
                  {t('festingerRule')}
                </div>
                <div className="text-sm text-blue-600">
                  {t('festingerExplanation')}
                </div>
              </div>
              
              <Button 
                onClick={() => onModeSelect('festinger')}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {t('startJourney')} ✨
              </Button>
            </div>
            
            <div className="mt-6">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="w-full"
              >
                ← {t('selectLanguage')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ModeSelection

