import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const LanguageSelection = ({ onLanguageSelect }) => {
  const languages = [
    {
      code: 'zh',
      name: '中文',
      flag: '🇨🇳',
      description: '简体中文'
    },
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
      description: 'English (US)'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">欢迎</h1>
          <p className="text-gray-600">Select your preferred language</p>
          <p className="text-gray-600">选择您的首选语言</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Language / 语言</CardTitle>
            <CardDescription className="text-center">
              Choose your language / 选择语言
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant="outline"
                  className="w-full h-16 flex items-center justify-start gap-4 hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => onLanguageSelect(lang.code)}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="text-left">
                    <div className="font-semibold">{lang.name}</div>
                    <div className="text-sm text-gray-500">{lang.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LanguageSelection

